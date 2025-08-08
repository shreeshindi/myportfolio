// /funpart/Footer.tsx
import { FC, useState, useEffect } from 'react';
import styles from './Footer.module.css';

const gifs = [
  'https://giphy.com/embed/byG6iLcetCAxthCoZr',
  'https://giphy.com/embed/sDpMYf7C6Yupzcpz8u',
  'https://giphy.com/embed/7tQgWApWxExNdbYHCV'
];

const Footer: FC<{ toggleShowGif: (show: boolean) => void }> = ({ toggleShowGif }) => {
  const [showGif, setShowGif] = useState(false);
  const [gifUrl, setGifUrl] = useState('');

  useEffect(() => {
    if (showGif) {
      document.body.style.overflow = 'hidden';
      toggleShowGif(true);
    } else {
      document.body.style.overflow = 'auto';
      toggleShowGif(false);
    }
  }, [showGif, toggleShowGif]);

  const handleButtonClick = () => {
    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
    setGifUrl(randomGif);
    setShowGif(true);
  };

  const closeGif = () => {
    setShowGif(false);
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as Element).classList.contains(styles.popup)) {
      closeGif();
    }
  };

  return (
    <footer className={`${styles.terminalWindow} py-4 mt-8 w-full text-center`}>
      <div className="flex flex-col items-center space-y-4">
        <div className={`${styles.terminalHeader} w-full text-left px-4 py-1`}>
          <span className={styles.terminalButton} onClick={handleButtonClick}></span>
          <span className={styles.terminalButton} onClick={handleButtonClick}></span>
          <span className={styles.terminalButton} onClick={handleButtonClick}></span>
        </div>
        <div className={`flex justify-center space-x-12 ${styles.terminalContent}`}>
          <a href="https://www.youtube.com/channel/UCbpQHosJd4BhKeqyKqrezTw" target="_blank" rel="noopener noreferrer" className={`hover:text-white ${styles.link}`}>
            <span className={styles.typingEffect} data-text="YouTube">YouTube</span>
          </a>
          <a href="https://www.instagram.com/shreenidhi.mc/" target="_blank" rel="noopener noreferrer" className={`hover:text-white ${styles.link}`}>
            <span className={styles.typingEffect} data-text="Instagram">Instagram</span>
          </a>
          <a href="https://github.com/shreeshindi" target="_blank" rel="noopener noreferrer" className={`hover:text-white ${styles.link}`}>
            <span className={styles.typingEffect} data-text="GitHub">GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/shreenidhi-mc-vernekar-29a050259/" target="_blank" rel="noopener noreferrer" className={`hover:text-white ${styles.link}`}>
            <span className={styles.typingEffect} data-text="LinkedIn">LinkedIn</span>
          </a>
        </div>
        <div className="text-green-400">
          &copy; 2025
        </div>
      </div>
      {showGif && (
        <div className={styles.popup} onClick={handleClickOutside}>
          <div className={styles.popupContent}>
            <span className={styles.closeButton} onClick={closeGif}>&times;</span>
            <iframe src={gifUrl} width="480" height="270" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;



