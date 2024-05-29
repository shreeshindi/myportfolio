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
        const paragraphs = textRef.current.querySelectorAll('p');
        paragraphs.forEach((p) => {
          const chars = p.textContent!.split('');
          p.innerHTML = '';

          chars.forEach((char) => {
            const span = document.createElement('span');
            span.textContent = char;
            p.appendChild(span);
          });

          const spans = p.querySelectorAll('span');
          gsap.set(spans, { opacity: 0 });

          gsap.to(spans, {
            opacity: 1,
            duration: 0.05,
            stagger: {
              each: 0.05,
              from: 'start',
            },
            scrollTrigger: {
              trigger: p,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
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
      className="min-h-screen w-full bg-cover bg-center flex flex-col justify-start items-center pt-16"
      style={{ backgroundImage: "url('/image/p1.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
      <Head>
        <title>Shreenidhi</title>
      </Head>
      <div className="text-center mt-12 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-shadow">Are you looking for a good backend developer?</h1>
  <br />
  <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mt-4 text-shadow space-y-6 text-left mx-auto" ref={textRef}>
    <p className="mb-6">🎩 Allow me to introduce myself – Im Shreenidhi, the wizard behind the curtain, the Gandalf of code, if you will.</p>
    <p className="mb-6">🔧 Whether its <span className="font-bold">Spring Boot</span>, <span className="font-bold">Spring Security</span>, <span className="font-bold">Django</span>, or <span className="font-bold">FastAPI</span>, Ive tamed them all. Think of me as the Dwight Schrute of backend development – except, you know, way cooler.</p>
    <p className="mb-6">🎉 When it comes to making your server-side dreams come true, Im like the Sheldon Cooper of clean, efficient code. And yes, Im fun at parties too – if those parties are tech meetups.</p>
    <p className="mb-6">🚀 Why settle for average when you can have the Jim Halpert of backend developers? Let’s create something so good, even Michael Scott would call it a “win-win-win situation”!</p>
  </div>
</div>

      {/* Adjusting padding to increase the height of the page */}
      <div style={{ paddingBottom: '40rem' }}></div>
    </div>
  );
};

export default Landing;
