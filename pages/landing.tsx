// pages/landing.tsx
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <Head>
        <title>Welcome to My Portfolio</title>
      </Head>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
        <p className="text-xl">Scroll down to see more</p>
      </div>
    </div>
  );
};

export default Landing;
