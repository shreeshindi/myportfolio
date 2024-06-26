// pages/index.tsx
import Head from 'next/head';
import Image from 'next/image';
import Eye from '../components/Eye';
import { useState, useEffect } from 'react';
import Landing from './landing';
import Footer from '../funpart/Footer';
import { useRouter } from 'next/router';

const Home = () => {
  const [isNearButton, setIsNearButton] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const router = useRouter();

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

  const handleMouseEnter = () => {
    setIsButtonHovered(true);
  };

  const handleMouseLeave = () => {
    setIsButtonHovered(false);
  };

  const toggleShowGif = (show: boolean) => {
    setShowGif(show);
  };

  const handleHireMeClick = () => {
    router.push('/hire-me');
  };

  return (
    <div>
      <Head>
        <title>My Portfolio</title>
      </Head>
      <div id="landing" className={`min-h-screen ${showGif ? 'hidden' : ''}`}>
        <Landing />
      </div>
      <div
        id="home"
        className={`min-h-screen bg-gray-100 relative flex flex-col justify-center items-center ${showGif ? 'hidden' : ''}`}
        style={{
          backgroundImage: "url('/image/p2.jpg')", // Change to your image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>
        {!isButtonHovered && (
          <Image
            src="/image/cm.png" // Path to the provided image
            alt="Your Image"
            className="absolute bottom-0 left-0 z-10 w-72 h-72" // Increased size
            layout="fixed"
            width={288} // 72 * 4
            height={288} // 72 * 4
            style={{ margin: 0, padding: 0 }}
          />
        )}
        {!isButtonHovered && (
          <div className="absolute bottom-0 left-0 z-20 flex space-x-4" style={{ transform: 'translate(130px, -170px)' }}>
            <Eye />
            <Eye />
          </div>
        )}
        <div className="flex justify-center items-center space-x-4 relative z-10 mb-4">
          {/* Removed Eye components from here */}
        </div>
        <button
          id="bonkers-button"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleHireMeClick}
          className={`text-white py-2 px-4 rounded transition-transform relative z-10 ${isNearButton ? 'animate-bonkers' : ''} ${isNearButton ? 'bg-blue-500' : 'bg-red-500'}`}
        >
          Hire me!
        </button>
        {isNearButton && (
          <iframe
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            src="https://www.youtube.com/embed/urLf8lLOqnQ?autoplay=1&loop=1&playlist=urLf8lLOqnQ"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
        <div className="absolute top-0 left-0 w-full h-full opacity-95 z-0"></div>
      </div>
      <Footer toggleShowGif={toggleShowGif} />
    </div>
  );
};

export default Home;
