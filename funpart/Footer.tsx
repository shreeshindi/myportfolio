// /funpart/Footer.tsx
import { FC } from 'react';
import styles from './Footer.module.css';

const Footer: FC = () => {
  return (
    <footer className="bg-gray-800 text-green-200 py-4 mt-8 w-full text-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex justify-center space-x-12">
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className={`hover:text-white ${styles.link}`}>
            <span className={styles.typingEffect} data-text="YouTube">YouTube</span>
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className={`hover:text-white ${styles.link}`}>
            <span className={styles.typingEffect} data-text="Instagram">Instagram</span>
          </a>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className={`hover:text-white ${styles.link}`}>
            <span className={styles.typingEffect} data-text="GitHub">GitHub</span>
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className={`hover:text-white ${styles.link}`}>
            <span className={styles.typingEffect} data-text="LinkedIn">LinkedIn</span>
          </a>
        </div>
        <div className="text-green-400">
          &copy; 2024
        </div>
      </div>
    </footer>
  );
};

export default Footer;
