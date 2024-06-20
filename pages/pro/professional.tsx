import { FC, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Dialog } from '@headlessui/react';

const Professional: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4">
      <header className="w-full max-w-screen-xl flex justify-between items-center py-6">
        <div className="flex items-center">
          <Image src="/image/12.png" alt="Logo" width={40} height={40} className="mr-2" />
          <span className="text-2xl font-bold text-red-500">shreenidhi</span>
        </div>
        <nav className="flex space-x-6">
          <Link href="/pro/professional" legacyBehavior>
            <a className="text-lg text-gray-800 hover:text-gray-600">Home</a>
          </Link>
          <Link href="/pro/about" legacyBehavior>
            <a className="text-lg text-gray-800 hover:text-gray-600">About</a>
          </Link>
          {/* <Link href="/tools" legacyBehavior>
            <a className="text-lg text-gray-800 hover:text-gray-600">Tools</a>
          </Link> */}
        </nav>
        <button onClick={openModal} className="text-lg text-gray-800 hover:text-gray-600">
          Contact
        </button>
      </header>
      <main className="w-full max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center">
          <Image src="/image/12.png" alt="Profile" width={60} height={60} className="mb-4" />
          <p className="text-center text-lg font-semibold">
            I am <span className="text-red-500">shreenidhi</span>, a backend developer specializing in Spring Boot and Java. I have a passion for creating robust and scalable server-side applications.
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <Image src="/image/Capture.png" alt="Map" width={400} height={200} />
        </div>
        <a href="/image/best_dev.pdf" download>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center justify-center">
            <Image src="/image/dpdf.png" alt="resume" width={60} height={60} />
          </div>
        </a>
        <a 
          href="https://www.linkedin.com/in/shreenidhi-mc-vernekar-29a050259/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center justify-center"
        >
          <Image src="/image/linkedin.png" alt="Magic Items" width={60} height={60} />
          <span className="ml-2 text-lg"></span>
        </a>
        <a href="https://github.com/shreeshindi" target="_blank" rel="noopener noreferrer">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center justify-center">
            <Image src="/image/git.png" alt="git" width={60} height={60} />
            <span className="ml-2 text-lg"></span>
          </div>
        </a>
      </main>
      <footer className="w-full max-w-screen-xl flex justify-center py-6">
        <p className="text-gray-600">©2024 Shreenidhi </p>
      </footer>

      <Dialog open={isOpen} onClose={closeModal} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 bg-black opacity-30" onClick={closeModal}></div>
          <div className="bg-white rounded-lg p-6 mx-4 max-w-sm mx-auto z-20">
            <Dialog.Title className="text-lg font-bold">Contact Me</Dialog.Title>
            <Dialog.Description className="mt-2">
              You can reach me at: <br />
              <a href="mailto:connect@mcshreenidhi.in" className="text-blue-600 underline">connect@mcshreenidhi.in</a>
            </Dialog.Description>
            <div className="mt-4">
              <button onClick={closeModal} className="bg-red-500 text-white py-2 px-4 rounded">
                Close
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Professional;
