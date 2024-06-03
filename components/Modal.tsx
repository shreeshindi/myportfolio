import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const gifs = [
  'https://media.giphy.com/media/dupS3dOY2Na1BmlmYJ/giphy.gif',
  'https://media.giphy.com/media/Ni4cpi0uUkd6U/giphy.gif',
  'https://media.giphy.com/media/3ohfFpHY8mfSqIapuE/giphy.gif',
  'https://media.giphy.com/media/26vUugZNrrr1aF7qw/giphy.gif',
  'https://media.giphy.com/media/XpuTLtJZM8903cXitm/giphy.gif',
  'https://media.giphy.com/media/m42kulmpRncAXrHTWO/giphy.gif',
  'https://media.giphy.com/media/AkAb9pi0dPMqDmJjor/giphy.gif',
];

const Modal: FC<ModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showUnderConstruction, setShowUnderConstruction] = useState(false);
  const [selectedGif, setSelectedGif] = useState('');

  useEffect(() => {
    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
    setSelectedGif(randomGif);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleRedirectToProfessional = () => {
    setShowUnderConstruction(true);
  };

  const handleShowConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="bg-gray-800 text-green-200 p-4 sm:p-8 rounded-lg shadow-lg z-10 border-4 border-green-500 pixelated flex flex-col items-center justify-center w-full max-w-md sm:max-w-lg mx-4 sm:mx-auto">
        {showUnderConstruction ? (
          <>
            <h2 className="text-2xl font-bold mb-4 pixelated-text text-center">Under Construction</h2>
            <p className="mb-4 pixelated-text text-center">The professional profile page is still under construction. Please check back later!</p>
            <button onClick={onClose} className="px-4 py-2 bg-green-700 text-white rounded pixelated-text hover:bg-green-800">
              Close
            </button>
          </>
        ) : showConfirmation ? (
          <>
            <h2 className="text-2xl font-bold mb-4 pixelated-text text-center">uh..?</h2>
            <div className="flex justify-center mb-4">
              <img src={selectedGif} alt="Are you sure?" className="w-full h-auto sm:w-96" />
            </div>
            <p className="mb-4 pixelated-text text-center">Really, you dont want to go to the more creative part of the page?</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button onClick={onClose} className="px-4 py-2 bg-green-700 text-white rounded pixelated-text hover:bg-green-800">
                Alright, Go with Fun Part
              </button>
              <button onClick={handleRedirectToProfessional} className="px-4 py-2 bg-blue-700 text-white rounded pixelated-text hover:bg-blue-800">
                Yes, Go with Professional Part
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 pixelated-text text-center">Welcome!</h2>
            <p className="mb-4 pixelated-text text-center">This is your pop-up message before the landing page loads.</p>
            <p className="mb-4 pixelated-text text-center">Would you like to continue with the fun, creative portfolio page filled with humor and personality, or switch to a more straightforward, professional profile page? Just a heads-up, the fun page is meant to showcase my skills with a light-hearted touch!</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button onClick={onClose} className="px-4 py-2 bg-green-700 text-white rounded pixelated-text hover:bg-green-800">
                Fun Portfolio
              </button>
              <button onClick={handleShowConfirmation} className="px-4 py-2 bg-blue-700 text-white rounded pixelated-text hover:bg-blue-800">
                Professional Profile
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
