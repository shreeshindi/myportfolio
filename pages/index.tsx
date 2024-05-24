import Head from 'next/head';
import Eye from '../components/Eye';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';

const Home = () => {
  const [isNearButton, setIsNearButton] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const button = document.getElementById('bonkers-button');
      if (button) {
        const rect = button.getBoundingClientRect();
        const isNear = (
          event.clientX > rect.left - 50 &&
          event.clientX < rect.right + 50 &&
          event.clientY > rect.top - 50 &&
          event.clientY < rect.bottom + 50
        );
        setIsNearButton(isNear);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <Head>
        <title>My Portfolio</title>
      </Head>
      <div className="flex justify-center items-center space-x-4 relative z-10">
        <Eye />
        <Eye />
      </div>
      <button
        id="bonkers-button"
        className={`mt-8 bg-red-500 text-white py-2 px-4 rounded transition-transform relative z-10 ${isNearButton ? styles.animateBonkers : ''}`}
      >
        Click Me
      </button>
      {isNearButton && (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src="/video/jdi.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      )}
      <div className="absolute top-0 left-0 w-full h-full opacity-95 z-0"></div>
    </div>
  );
};

export default Home;
