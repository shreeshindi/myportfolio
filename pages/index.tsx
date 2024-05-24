import Head from 'next/head';
import Eye from '../components/Eye';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';

const Home = () => {
  const [isNearButton, setIsNearButton] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      console.log('Mouse moved:', event.clientX, event.clientY); // Debug log
      const button = document.getElementById('bonkers-button');
      if (button) {
        const rect = button.getBoundingClientRect();
        console.log('Button rect:', rect); // Debug log
        const isNear = (
          event.clientX > rect.left - 50 &&
          event.clientX < rect.right + 50 &&
          event.clientY > rect.top - 50 &&
          event.clientY < rect.bottom + 50
        );
        console.log('Mouse is near button:', isNear); // Debug log
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
      <main className="container mx-auto p-4 text-center relative z-10">
        <section className="mb-8">
          <h2 className="text-2xl font-bold">About Me</h2>
          <p className="mt-2">Hello! I am a backend developer skilled in Spring Boot. Welcome to my portfolio website.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold">Projects</h2>
          <ul className="mt-2 list-disc list-inside">
            <li>Project 1: Description</li>
            <li>Project 2: Description</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold">Skills</h2>
          <ul className="mt-2 list-disc list-inside">
            <li>Spring Boot</li>
            <li>Java</li>
            <li>SQL</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold">Contact</h2>
          <p className="mt-2">Email: yourname@example.com</p>
        </section>
        <div className="flex justify-center items-center space-x-4">
          <Eye />
          <Eye />
        </div>
        <button
          id="bonkers-button"
          className={`mt-8 bg-red-500 text-white py-2 px-4 rounded transition-transform ${isNearButton ? styles.animateBonkers : ''}`}
        >
          Click Me
        </button>
      </main>
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
