// pages/landing.tsx
import Head from 'next/head';
import { useEffect, useRef } from 'react';
import styles from '../styles/Home.module.css';

const Landing = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScrollTrigger = async () => {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (textRef.current) {
        const textElement = textRef.current;
        const chars = textElement.textContent!.split('');
        textElement.innerHTML = '';

        chars.forEach((char, i) => {
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
    };

    handleScrollTrigger();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center"
      style={{ backgroundImage: "url('/image/p1.jpg')" }}
    >
      <Head>
        <title>Welcome to My Portfolio</title>
      </Head>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
        <p className="text-xl" ref={textRef}>Scroll down to see more</p>
      </div>
    </div>
  );
};

export default Landing;
