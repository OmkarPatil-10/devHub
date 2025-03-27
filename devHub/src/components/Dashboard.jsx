import React, { useState } from "react";
import chats from "../assets/chats.png";
import home from "../assets/home.png";
import searchLogo from "../assets/searchLogo.svg";
import myNetwork from "../assets/myNetwork.png";
import DashboardHome from "./DashboardHome";
import DashboardSearch from "./DashboardSearch";
import DashboardNetwork from "./DashboardNetwork";
import DashboardChats from "./DashboardChats";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("Home");

  const renderSection = () => {
    switch (activeSection) {
      case "Search":
        return <DashboardSearch />;
      case "MyNetwork":
        return <DashboardNetwork />;
      case "Chats":
        return <DashboardChats />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Navbar */}
      <nav className="flex justify-end items-center bg-white p-4 shadow-md rounded-lg mb-8 gap-5">
        <div className="flex items-center space-x-6">
          {[
            { name: "Search", icon: searchLogo },
            { name: "Home", icon: home },
            { name: "MyNetwork", icon: myNetwork },
            { name: "Chats", icon: chats },
          ].map((item) => (
            <div
              key={item.name}
              className="flex flex-col items-center space-x-2 cursor-pointer"
              onClick={() => setActiveSection(item.name)}
            >
              <img src={item.icon} alt={item.name} className="w-6 h-6" />
              <p
                className={` hover:text-blue-600 ${
                  activeSection === item.name
                    ? " text-blue-600 font-bold underline "
                    : ""
                }`}
              >
                {item.name.replace(/([A-Z])/g, " $1").trim()}
              </p>
            </div>
          ))}
        </div>
      </nav>

      {/* Render Active Section */}
      {renderSection()}
    </div>
  );
};

export default Dashboard;
