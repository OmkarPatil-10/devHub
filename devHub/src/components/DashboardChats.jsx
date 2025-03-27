import React, { useState } from "react";
import photoIcon from "../assets/photoIcon.svg";
import attachmentIcon from "../assets/attachmentIcon.svg";


const ChatApp = () => {
  const [selectedUser, setSelectedUser] = useState("Omkar Patil");
  const [message, setMessage] = useState("");

  const connections = ["Omkar Patil", "Reshma Zore", "Divesh Prasad"];

  return (
    <div className="flex h-screen p-4 bg-gray-100">
      {/* Connections List */}
      <div className="w-1/3 bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Your Connection ({connections.length})</h2>
        <ul>
          {connections.map((name) => (
            <li
              key={name}
              className={`flex items-center p-3 rounded-lg cursor-pointer ${
                selectedUser === name ? "bg-blue-100" : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedUser(name)}
            >
              <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex justify-center items-center mr-3">
                {name[0]}
              </div>
              <span className="text-gray-800">{name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Section */}
      <div className="w-2/3 bg-white shadow-lg rounded-lg ml-4 flex flex-col">
        <div className="flex items-center p-4 border-b">
          <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex justify-center items-center">
            {selectedUser[0]}
          </div>
          <h3 className="text-lg font-semibold ml-4">{selectedUser}</h3>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <p className="text-gray-500 italic">No messages yet...</p>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t flex items-center">
          <input
            type="text"
            placeholder="Write a message..."
            className="flex-1 p-3 border rounded-lg outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          
          {/* Image Upload SVG */}
          <button className="p-2 mx-2">
            <img src={photoIcon} alt="Upload Image" className="w-6 h-6" />
          </button>

          {/* File Upload SVG */}
          <button className="p-2">
            <img src={attachmentIcon} alt="Upload File" className="w-6 h-6" />
          </button>

          <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
