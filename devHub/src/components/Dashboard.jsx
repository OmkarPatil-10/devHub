import React from "react";
import chats from "../assets/chats.png";
import home from "../assets/home.png";
import search from "../assets/search.png";
import myNetwork from "../assets/myNetwork.png";

const Dashboard = () => {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        
        {/* Navbar */}
        <nav className="flex justify-end items-center bg-white p-4 shadow-md rounded-lg mb-8 gap-5">
          <div className="flex items-center space-x-6">
            <div className="flex flex-col items-center space-x-2 cursor-pointer">
              <img src={search} alt="search" className="w-6 h-6" />
              <p className="text-gray-700">Search</p>
            </div>
            <div className="flex flex-col items-center space-x-2 cursor-pointer">
              <img src={home} alt="search" className="w-6 h-6" />
              <p className="text-gray-700">Home</p>
            </div>
            <div className="flex flex-col items-center space-x-2 cursor-pointer">
              <img src={myNetwork} alt="search" className="w-8 h-6" />
              <p className="text-gray-700">My Network</p>
            </div>
            <div className="flex flex-col items-center space-x-2 cursor-pointer">
              <img src={chats} alt="search" className="w-6 h-6" />
              <p className="text-gray-700">Chats</p>
            </div>
          </div>
        </nav>
  
        {/* Profile Section */}
        <div className="bg-white shadow-md rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="w-32 h-32 rounded-full mr-8"
            />
            <div>
              <p className="text-lg font-semibold">Name: Ayush Rokade</p>
              <p className="text-gray-600">Experience: 2 years</p>
              <p className="text-gray-600">Language: Python, JavaScript</p>
              <p className="text-gray-600">Availability: FullTime</p>
            </div>
          </div>
          <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Edit Profile
          </button>
        </div>
  
        {/* Projects Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Omkar Patil", "Reshma Zore", "Divesh Prasad"].map((author, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-6">
                <p className="text-sm text-gray-500">~ By {author}</p>
                <h3 className="text-lg font-bold mt-2">
                  Transforming Cancer Navigation with Open Data & APIs
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Support care Navigators with digital tools that integrate openly available datasets
                  and APIs. Enhance patient care and support systems.
                </p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    );
  };
  
  export default Dashboard;
  