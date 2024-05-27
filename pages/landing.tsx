// pages/landing.tsx
import Head from 'next/head';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/Home.module.css';

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const chars = textRef.current.querySelectorAll('span');
      gsap.set(chars, { opacity: 0 });

      gsap.to(chars, {
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
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="inline-block">
        {char}
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <Head>
        <title>Welcome to My Portfolio</title>
      </Head>
      <div ref={textRef} className="text-center">
        <h1 className="text-4xl font-bold mb-4">{splitText('Welcome to My Portfolio')}</h1>
        <p className="text-xl">{splitText('Scroll down to see more')}</p>
      </div>
    </div>
  );
};

export default Landing;
