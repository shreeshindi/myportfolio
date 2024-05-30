// pages/index.tsx
import Head from 'next/head';
import Eye from '../components/Eye';
import { useState, useEffect } from 'react';
import Landing from './landing';

const Home = () => {
  const [isNearButton, setIsNearButton] = useState(false);

  useEffect(() => {
    const handleMove = (event: MouseEvent | TouchEvent) => {
      const { clientX, clientY } = 'touches' in event ? event.touches[0] : event;
      const button = document.getElementById('bonkers-button');
      if (button) {
        const rect = button.getBoundingClientRect();
        const isNear = (
          clientX > rect.left - 50 &&
          clientX < rect.right + 50 &&
          clientY > rect.top - 50 &&
          clientY < rect.bottom + 50
        );
        setIsNearButton(isNear);
      }
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('touchmove', handleMove);
    };
  }, []);

  return (
    <div>
      <Head>
        <title>My Portfolio</title>
      </Head>
      <div id="landing" className="min-h-screen">
        <Landing />
      </div>
      <div id="home" className="min-h-screen bg-gray-100 relative">
        <div className="flex justify-center items-center space-x-4 relative z-10">
          <Eye />
          <Eye />
        </div>
        <button
          id="bonkers-button"
          className={`mt-8 text-white py-2 px-4 rounded transition-transform relative z-10 ${isNearButton ? 'animate-bonkers' : ''} ${isNearButton ? 'bg-blue-500' : 'bg-red-500'}`}
        >
          Hire me!
        </button>
        {isNearButton && (
          <video
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            src="/video/p22oi.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        )}
        <div className="absolute top-0 left-0 w-full h-full opacity-95 z-0"></div>
      </div>
    </div>
  );
};

export default Home;
