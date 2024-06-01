// /funpart/Footer.tsx
import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="bg-gray-800 text-green-200 py-4 mt-8 w-full text-center">
      <div className="flex justify-center space-x-6">
        <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
          YouTube
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
          Instagram
        </a>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
          GitHub
        </a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
          LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
