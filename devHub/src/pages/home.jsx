import React from 'react';
import { useNavigate } from "react-router-dom";
import sideGif from '../assets/sideGif.gif';

const Home = () => {
const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header Section */}
      <header className="flex justify-between items-center p-6">
        <div>
            <h1 className='text-2xl font-bold'>  </h1>
            <h1 className="text-2xl font-bold">DevHub</h1>
        </div>
        
        {/* <nav className="flex space-x-6">
          <a href="#" className="hover:text-green-400">Features</a>
          <a href="#" className="hover:text-green-400">How it Works</a>
          <a href="#" className="hover:text-green-400">Testimonials</a>
          <a href="#" className="hover:text-green-400">Pricing</a>
        </nav> */}
        {/* <div>
          <button className="text-green-400 mr-4">Login</button>
          <button className="bg-green-500 px-4 py-2 rounded-lg">Sign Up</button>
        </div> */}
      </header>

      {/* Main Section */}
      <main className="flex items-center justify-center px-8 py-20">
        {/* Left Content */}
        <div className="max-w-lg">
          <h2 className="text-5xl font-bold mb-6">
            Find Your Perfect <span className="text-blue-600">Coding Partner</span>
          </h2>
          <p className="text-gray-400 mb-8">
            Connect with developers who match your skill level, interests, and coding style. Build amazing projects together.
          </p>
          <div className="flex space-x-4">
          <button
            onClick={() => navigate("/login")} // Redirect to login page
            className="mt-4 px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">
            Get Started </button>
            {/* <button className="border border-blue-600  px-6 py-3 rounded-lg">Watch Demo</button> */}
          </div>
          {/* <div className="flex items-center mt-6">
            <img src="https://via.placeholder.com/40" alt="avatar1" className="w-10 h-10 rounded-full" />
            <img src="https://via.placeholder.com/40" alt="avatar2" className="w-10 h-10 rounded-full -ml-3" />
            <img src="https://via.placeholder.com/40" alt="avatar3" className="w-10 h-10 rounded-full -ml-3" />
            <span className="ml-4 text-gray-400">Join 10,000+ developers</span>
          </div> */}
        </div>

        {/* Right Content */}
        <div>
          <img src={sideGif} alt="coding setup" className="rounded-lg w-[500px]"  />
        </div>
      </main>

      {/* footer section */}
      <footer className=" fixed bottom-0 w-full bg-gray-800 text-white text-center py-6">
        <p>&copy; 2025 DevHub. All rights reserved by "The Algorithmists".</p>
        </footer>
    </div>
  );
}

export default Home;