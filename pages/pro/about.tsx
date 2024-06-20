import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const About: FC = () => {
  return (
    <>
    <head>
        <title>
        Shreenidhi
        </title>
    </head>
    <div className="min-h-screen bg-white flex flex-col items-center px-4" style={{ fontFamily: 'Arial, sans-serif' }}>
      <header className="w-full max-w-screen-xl flex justify-between items-center py-6">
        <div className="flex items-center">
          <Image src="/image/12.png" alt="Logo" width={40} height={40} className="mr-2" />
          <span className="text-2xl font-bold text-red-500">Shreenidhi</span>
        </div>
        <nav className="flex space-x-6">
          <div className="flex space-x-4">
            <Link href="/pro/professional" legacyBehavior>
              <a className="text-lg text-gray-800 hover:text-red-500 rounded-full border-2 border-gray-800 p-2 hover:bg-gray-200 transition-transform transform hover:scale-105 duration-300">
                Home
              </a>
            </Link>
            <Link href="/pro/about" legacyBehavior>
              <a className="text-lg text-gray-800 hover:text-red-500 rounded-full border-2 border-gray-800 p-2 hover:bg-gray-200 transition-transform transform hover:scale-105 duration-300">
                About
              </a>
            </Link>
          </div>
        </nav>
      </header>
      <br></br>
      <main className="w-full max-w-screen-xl flex flex-col items-center py-6">
        <h1 className="text-3xl font-bold mb-6 text-black">About Me</h1>
        <p className="text-lg mb-4 text-black">
          I am <span className="text-red-500">Shreenidhi M C</span>, a dynamic and results-oriented Software Engineer with over 4 years of experience in developing robust code for high-volume businesses. I specialize in Java and Spring Boot, with a proven track record in enhancing existing software systems and developing new solutions to drive business success. I am eager to bring top-class backend development and problem-solving skills to a forward-thinking company in the technology sector.
        </p>
        <h2 className="text-2xl font-bold mt-6 mb-2 text-black">Skills</h2>
        <ul className="list-disc list-inside text-lg mb-4 text-black">
          <li>Languages: Java, Python</li>
          <li>Frameworks/Technologies: Spring Boot, Spring MVC, Hibernate, Spring Security, Servlets, JPA, FastAPI</li>
          <li>Databases: MySQL, PostgreSQL, MongoDB, RDBMS (MySQL/Postgres/Oracle), NoSQL</li>
          <li>Tools & Build Systems: Maven, Gradle, Docker, Git</li>
          <li>Concepts: Microservices Architecture, RESTful APIs, CI/CD, Performance Optimization, Caching, Application Resiliency, Security</li>
        </ul>
        <h2 className="text-2xl font-bold mt-6 mb-2 text-black">Education</h2>
        <ul className="list-disc list-inside text-lg mb-4 text-black">
          <li>Bachelor of Engineering in Computer Science, Visvesvaraya Technological University, 2020</li>
          <li>Diploma in Computer Science, PES University, 2016</li>
        </ul>
        <h2 className="text-2xl font-bold mt-6 mb-2 text-black">Work Experience</h2>
        <p className="text-lg mb-4 text-black">
          <strong>Software Engineer | Hanriver, Kolkata</strong><br />
          May 2023 - Present
          <ul className="list-disc list-inside text-lg mb-4 text-black">
            <li>Lead developer on the SSO SmartFarm and SmartRoot projects, utilizing Spring Boot, Java, Docker, PostgreSQL, and MySQL to create scalable, efficient backend solutions.</li>
            <li>Implemented robust security measures and authentication processes using Spring Security, significantly reducing vulnerabilities.</li>
            <li>Facilitated the containerization of applications using Docker, improving deployment efficiency and environment consistency across development, testing, and production.</li>
            <li>Conducted performance tuning and optimization of backend services, leading to a 20% increase in application response times.</li>
          </ul>
        </p>
        <p className="text-lg mb-4 text-black">
          <strong>Backend Developer | Kingston Info Solution Services</strong><br />
          April 2020 - April 2023
          <ul className="list-disc list-inside text-lg mb-4 text-black">
            <li>Developed and maintained the MFS Bulk Payment system, a critical infrastructure project that handled secure, high-volume transactions using Java, Spring Boot, and Hibernate.</li>
            <li>Applied best practices in code quality and maintainability, incorporating Log4J and Spring AOP for efficient logging and error handling.</li>
            <li>Collaborated with cross-functional teams to define and implement new features, enhancing the overall functionality and user experience of the system.</li>
          </ul>
        </p>
        <h2 className="text-2xl font-bold mt-6 mb-2 text-black">Projects</h2>
        <ul className="list-disc list-inside text-lg mb-4 text-black">
          <li><strong>SmartFarm | Hanriver</strong><br />Developed a routing and task management platform for smart farms, focusing on optimizing schedules for farming services. The project was built using Spring Boot and leveraged monolithic architecture to ensure scalability and resilience.</li>
          <li><strong>SmartRoot | Hanriver</strong><br />A scalable solution for farm management, integrating IoT devices and providing real-time data analytics to farmers. Utilized Java Spring Boot for backend services, Docker for containerization.</li>
          <li><strong>MFS Bulk Payment | Kingston Info Solution Services</strong><br />A secure, high-performance bulk payment processing system designed for financial institutions, enabling the handling of large-volume transactions with high reliability and security.</li>
        </ul>
        <a href="/image/best_dev.pdf" download>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center justify-center">
            <Image src="/image/dpdf.png" alt="Resume" width={60} height={60} />
            <span className="ml-2 text-lg text-black">Download Resume</span>
          </div>
        </a>
      </main>
      <footer className="w-full max-w-screen-xl flex justify-center py-6">
        <p className="text-gray-600">©2024 Shreenidhi </p>
      </footer>
    </div>
    </>
  );
};

export default About;
