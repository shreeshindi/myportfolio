// pages/index.tsx
import Head from 'next/head'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Head>
        <title>My Portfolio</title>
      </Head>
      <header className="bg-gray-900 text-white py-4">
        <h1 className="text-center text-3xl">My Portfolio</h1>
      </header>
      <main className="container mx-auto p-4">
        <section className="mb-8">
          <h2 className="text-2xl font-bold">About Me</h2>
          <p className="mt-2">Hello! I am a backend developer skilled in Spring Boot. Welcome to my portfolio website.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold">Projects</h2>
          <ul className="mt-2 list-disc list-inside">
            <li>Project 1: Description</li>
            <li>Project 2: Description</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold">Skills</h2>
          <ul className="mt-2 list-disc list-inside">
            <li>Spring Boot</li>
            <li>Java</li>
            <li>SQL</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold">Contact</h2>
          <p className="mt-2">Email: yourname@example.com</p>
        </section>
      </main>
    </div>
  )
}

export default Home
