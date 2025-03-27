import { useState } from "react";
import userSmall from "../assets/userSmall.svg";
import dashboardLogo from "../assets/dashboardLogo.png";
import sidebarJoin from "../assets/sidebarJoin.png";
import sidebarCreate from "../assets/sidebarCreate.png";
import helpCenter from "../assets/helpCenter.png";


const Sidebar = ({ setActivePage }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("Dashboard"); // Track active item

  const menuItems = [
    { name: "Dashboard", page: "Dashboard", icon: dashboardLogo },
    { name: "Join Challenge", page: "JoinChallenge", icon: sidebarJoin },
    { name: "Create Challenge", page: "CreateChallenge", icon: sidebarCreate }
  ];

  const handleItemClick = (page) => {
    setActivePage(page);
    setActiveItem(page); // Set active item when clicked
  };

  return (
    <div
      className={`sticky bottom-0 top-0 h-screen ${
        isOpen ? "w-64" : "w-20"
      } bg-slate-100 text-black duration-300 border-r border-gray-300`}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <button
            className="text-2xl cursor-pointer text-blue-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "</>" : "</>"}
          </button>
          {isOpen && <h1 className="ml-3 text-lg font-bold">DevHub</h1>}
        </div>
      </div>

      <div className="mt-10 flex align-center flex-col">
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleItemClick(item.page)}
            className={`flex items-center p-4 cursor-pointer 
              ${
                activeItem === item.page
                  ? "bg-[#D6DAFF]"
                  : "hover:bg-[#E2E5FF]"
              }`}
          >
            {/* Render icon using img tag */}
            <img src={item.icon} alt={item.name} className=" w-4 h-4" />
            {isOpen && <span className="ml-4">{item.name}</span>}
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 ">
        <div
          onClick={() => setActivePage("HelpCenter")}
          className="flex items-center p-4 cursor-pointer "
        >
          <img src={helpCenter} className="w-6 h-6"/>
          {isOpen && <span className="ml-4 hover:underline">Help Center</span>}
        </div>

        <div
          onClick={() => alert("Signing out...")}
          className="flex items-center p-4 cursor-pointer "
        >
          <span className="text-xl">🚪</span>
          {isOpen && <span className="ml-4 hover:underline">Sign Out</span>}
        </div>

        <div className="border-t border-gray-300 flex flex-row items-center p-4 cursor-pointer gap-5">
          <div>
            <img src={userSmall} className="w-8 h-8" />
          </div>
          <div>
            {isOpen && (
              <span className="ml-4 hover:underline">Ayush Rokade</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
