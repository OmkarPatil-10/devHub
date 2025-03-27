// import React from "react";
// import userBig from "../assets/userBig.png";
// import { useSelector } from "react-redux";

// const DashboardHome = () => {
//   const { user } = useSelector((state) => state.auth);
//   console.log("User in DashboardHome:", user); // Debugging
//   return (
//     <div>
//       {/* Profile Section */}
//       <div className="bg-white shadow-md rounded-lg p-8 mb-8">
//         <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
//         <div className="flex items-center">
//           <img
//             src={userBig}
//             alt="Profile"
//             className="w-32 h-32 rounded-full mr-8"
//           />
//           <div>
//             <p className="text-lg font-semibold">Name: {user?.userName || "User"}</p>
//             <p className="text-gray-600">Experience: 2 years</p>
//             <p className="text-gray-600">Language: Python, JavaScript</p>
//             <p className="text-gray-600">Availability: FullTime</p>
//           </div>
//         </div>
//         <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//           Edit Profile
//         </button>
//       </div>

//       {/* Projects Section */}
//       <div>
//         <h2 className="text-2xl font-bold mb-6">Projects</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {["Omkar Patil", "Reshma Zore", "Divesh Prasad"].map((author, index) => (
//             <div key={index} className="bg-white shadow-md rounded-lg p-6">
//               <p className="text-sm text-gray-500">~ By {author}</p>
//               <h3 className="text-lg font-bold mt-2">
//                 Transforming Cancer Navigation with Open Data & APIs
//               </h3>
//               <p className="text-sm text-gray-600 mt-2">
//                 Support care Navigators with digital tools that integrate openly available datasets
//                 and APIs. Enhance patient care and support systems.
//               </p>
//               <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//                 View
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardHome;

import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userBig from "../assets/userBig.png";

const DashboardHome = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
        <div className="flex items-center">
          <img
            src={userBig}
            alt="Profile"
            className="w-32 h-32 rounded-full mr-8"
          />
          <div>
            <p className="text-lg font-semibold">Name: {user?.userName || "User"}</p>
            <p className="text-gray-600">Experience: {user?.experience} years</p>
            <p className="text-gray-600">
              Languages: {user?.languages?.join(", ") || "Not specified"}
            </p>
            <p className="text-gray-600">Availability: {user?.availability}</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/edit-profile")}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default DashboardHome;
