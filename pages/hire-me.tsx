// pages/hire-me.tsx
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const HireMe = () => {
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    const images = [
      '/image/dev1.webp',
      '/image/dev2.webp',
      '/image/dev3.webp',
      '/image/dev4.webp',
      '/image/dev5.webp'
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    setSelectedImage(images[randomIndex]);
  }, []);

  return (
    <div className="min-h-screen bg-red-700 flex flex-col justify-center items-center text-white">
      <Head>
        <title>Hire Me</title>
      </Head>
      <div className="relative w-full h-full flex flex-col justify-center items-center">
        <h1 className="text-8xl font-bold absolute top-20 z-20 text-black">CONNECT</h1>
        
        {selectedImage && (
          <div className="relative z-10 mt-40">
            <Image src={selectedImage} alt="Panda" width={600} height={400} className="opacity-75" />
          </div>
        )}

        <div className="mt-10 flex flex-col space-y-4">
          {/* <Link href="/contact" legacyBehavior>
            <a className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-300">Contact</a>
          </Link>
          <Link href="/work-done" legacyBehavior>
            <a className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-300">Work Done</a>
          </Link> */}
          <Link href="/image/shreenidhi.pdf" passHref legacyBehavior>
            <a className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-300" target="_blank" download>Download Resume</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HireMe;