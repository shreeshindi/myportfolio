// pages/landing.tsx
import Head from 'next/head';
import { useEffect, useRef } from 'react';

const Landing = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScrollTrigger = async () => {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (textRef.current) {
        const textElement = textRef.current;
        const chars = textElement.textContent!.split('');
        textElement.innerHTML = '';

        chars.forEach((char) => {
          const span = document.createElement('span');
          span.textContent = char;
          textElement.appendChild(span);
        });

        const spans = textElement.querySelectorAll('span');
        gsap.set(spans, { opacity: 0 });

        gsap.to(spans, {
          opacity: 1,
          duration: 0.05,
          stagger: {
            each: 0.05,
            from: 'start',
          },
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: '60%',
          ease: 'none',
          scrollTrigger: {
            trigger: bgRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    };

    handleScrollTrigger();
  }, []);

  return (
    <div
      ref={bgRef}
      className="min-h-screen w-full bg-cover bg-center flex flex-col justify-center items-center"
      style={{ backgroundImage: "url('/image/p1.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
      <Head>
        <title>Shreenidhi</title>
      </Head>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-shadow">Welcome to My Portfolio</h1>
        <p className="text-xl text-shadow" ref={textRef}>Scroll down to see more</p>
      </div>

      <style jsx>{`
        .bg-cover {
          background-attachment: fixed;
        }
        .text-shadow {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
        @media (max-width: 768px) {
          .text-4xl {
            font-size: 2.5rem;
          }
          .text-xl {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Landing;
