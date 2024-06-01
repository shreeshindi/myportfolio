// components/Modal.tsx
import { FC } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="bg-gray-800 text-green-200 p-8 rounded-lg shadow-lg z-10 border-4 border-green-500 pixelated">
        <h2 className="text-2xl font-bold mb-4 pixelated-text">Welcome!</h2>
        <p className="mb-4 pixelated-text">This is your pop-up message before the landing page loads.</p>
        <button onClick={onClose} className="px-4 py-2 bg-green-700 text-white rounded pixelated-text hover:bg-green-800">Close</button>
      </div>
    </div>
  );
};

export default Modal;
