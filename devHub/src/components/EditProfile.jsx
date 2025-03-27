// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import { updateUserProfile } from "../redux/actions/authActions";
// import { useNavigate } from "react-router-dom";
// // import { setUser } from "../store/authSlice";
// import { setUser } from "../store/authSlice/authSlice";

// const EditProfile = () => {
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     userName: user?.userName || "",
//     experience: user?.experience || "0",
//     languages: user?.languages || [],
//     availability: user?.availability || "FullTime",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleCheckboxChange = (lang) => {
//     setFormData((prev) => ({
//       ...prev,
//       languages: prev.languages.includes(lang)
//         ? prev.languages.filter((l) => l !== lang)
//         : [...prev.languages, lang],
//     }));
//   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     dispatch(updateUserProfile(formData)); // Update Redux Store
// //     navigate("/dashboard"); // Redirect back to Dashboard
// //   };
// const handleSubmit = (e) => {
//     e.preventDefault();
  
//     dispatch(setUser(formData)); // ✅ Updates user state in Redux
  
//     console.log("Profile updated locally:", formData);
//   };

//   return (
//     <div className="p-8 bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
//       <form onSubmit={handleSubmit}>
//         <label className="block mb-2">Full Name:</label>
//         <input
//           type="text"
//           name="userName"
//           value={formData.userName}
//           onChange={handleChange}
//           className="border rounded p-2 w-full mb-4"
//           required
//         />

//         <label className="block mb-2">Experience (Years):</label>
//         <input
//           type="number"
//           name="experience"
//           value={formData.experience}
//           onChange={handleChange}
//           className="border rounded p-2 w-full mb-4"
//           required
//         />

//         <label className="block mb-2">Select Programming Languages:</label>
//         <div className="grid grid-cols-3 gap-2">
//           {["Java", "Python", "JavaScript", "PHP", "C++", "Ruby"].map((lang) => (
//             <label key={lang} className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={formData.languages.includes(lang)}
//                 onChange={() => handleCheckboxChange(lang)}
//                 className="mr-2"
//               />
//               {lang}
//             </label>
//           ))}
//         </div>

//         <label className="block mb-2 mt-4">Availability:</label>
//         <select
//           name="availability"
//           value={formData.availability}
//           onChange={handleChange}
//           className="border rounded p-2 w-full mb-4"
//         >
//           <option value="FullTime">Full-Time</option>
//           <option value="PartTime">Part-Time</option>
//           <option value="Weekends">Weekends</option>
//         </select>

//         <button
//           type="submit"
//           className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditProfile;


import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/authSlice/authSlice"; // Ensure the correct path

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get current user data from Redux (if already stored)
  const currentUser = useSelector((state) => state.auth.user);

  // State to hold form data dynamically
  const [formData, setFormData] = useState({
    userName: currentUser?.userName || "",
    experience: currentUser?.experience || "",
    languages: currentUser?.languages || [],
    availability: currentUser?.availability || "FullTime",
  });

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle language input separately (if using checkboxes)
  const handleLanguageChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      languages: checked
        ? [...prevState.languages, value]
        : prevState.languages.filter((lang) => lang !== value),
    }));
  };

  // Submit function to update Redux and redirect
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setUser(formData)); // Update Redux store
    navigate("/dashboard"); // Redirect to Dashboard
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <label>
    //     Name:
    //     <input
    //       type="text"
    //       name="userName"
    //       value={formData.userName}
    //       onChange={handleChange}
    //     />
    //   </label>

    //   <label>
    //     Experience (Years):
    //     <input
    //       type="number"
    //       name="experience"
    //       value={formData.experience}
    //       onChange={handleChange}
    //     />
    //   </label>

    //   <label>Languages:</label>
    //   <label>
    //     <input
    //       type="checkbox"
    //       value="Java"
    //       checked={formData.languages.includes("Java")}
    //       onChange={handleLanguageChange}
    //     />
    //     Java
    //   </label>
    //   <label>
    //     <input
    //       type="checkbox"
    //       value="PHP"
    //       checked={formData.languages.includes("PHP")}
    //       onChange={handleLanguageChange}
    //     />
    //     PHP
    //   </label>

    //   <label>
    //     Availability:
    //     <select
    //       name="availability"
    //       value={formData.availability}
    //       onChange={handleChange}
    //     >
    //       <option value="FullTime">Full Time</option>
    //       <option value="PartTime">Part Time</option>
    //     </select>
    //   </label>

    //   <button type="submit">Save Changes</button>
    // </form>
//     <form onSubmit={handleSubmit} class="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
//   <div class="space-y-2">
//     <label class="block text-sm font-medium text-gray-700">
//       Name:
//       <input
//         type="text"
//         name="userName"
//         value={formData.userName}
//         onChange={handleChange}
//         class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//       />
//     </label>
//   </div>

//   <div class="space-y-2">
//     <label class="block text-sm font-medium text-gray-700">
//       Experience (Years):
//       <input
//         type="number"
//         name="experience"
//         value={formData.experience}
//         onChange={handleChange}
//         class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//       />
//     </label>
//   </div>

//   <div class="space-y-2">
//     <label class="block text-sm font-medium text-gray-700">Languages:</label>
//     <div class="space-y-2">
//       <label class="inline-flex items-center">
//         <input
//           type="checkbox"
//           value="Java"
//           checked={formData.languages.includes("Java")}
//           onChange={handleLanguageChange}
//           class="form-checkbox h-5 w-5 text-indigo-600"
//         />
//         <span class="ml-2 text-sm text-gray-700">Java</span>
//       </label>
//       <label class="inline-flex items-center">
//         <input
//           type="checkbox"
//           value="PHP"
//           checked={formData.languages.includes("PHP")}
//           onChange={handleLanguageChange}
//           class="form-checkbox h-5 w-5 text-indigo-600"
//         />
//         <span class="ml-2 text-sm text-gray-700">PHP</span>
//       </label>
//     </div>
//   </div>

//   <div class="space-y-2">
//     <label class="block text-sm font-medium text-gray-700">
//       Availability:
//       <select
//         name="availability"
//         value={formData.availability}
//         onChange={handleChange}
//         class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//       >
//         <option value="FullTime">Full Time</option>
//         <option value="PartTime">Part Time</option>
//       </select>
//     </label>
//   </div>

//   <button
//     type="submit"
//     class="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//   >
//     Save Changes
//   </button>
// </form>
<form onSubmit={handleSubmit} class="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">
      Name:
      <input
        type="text"
        name="userName"
        value={formData.userName}
        onChange={handleChange}
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </label>
  </div>

  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">
      Experience (Years):
      <input
        type="number"
        name="experience"
        value={formData.experience}
        onChange={handleChange}
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </label>
  </div>

  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">Languages:</label>
    <div class="space-y-2">
      <label class="inline-flex items-center">
        <input
          type="checkbox"
          value="Java"
          checked={formData.languages.includes("Java")}
          onChange={handleLanguageChange}
          class="form-checkbox h-5 w-5 text-indigo-600"
        />
        <span class="ml-2 text-sm text-gray-700">Java</span>
      </label>
      <label class="inline-flex items-center">
        <input
          type="checkbox"
          value="PHP"
          checked={formData.languages.includes("PHP")}
          onChange={handleLanguageChange}
          class="form-checkbox h-5 w-5 text-indigo-600"
        />
        <span class="ml-2 text-sm text-gray-700">PHP</span>
      </label>
      <label class="inline-flex items-center">
        <input
          type="checkbox"
          value="JavaScript"
          checked={formData.languages.includes("JavaScript")}
          onChange={handleLanguageChange}
          class="form-checkbox h-5 w-5 text-indigo-600"
        />
        <span class="ml-2 text-sm text-gray-700">JavaScript</span>
      </label>
      <label class="inline-flex items-center">
        <input
          type="checkbox"
          value="Python"
          checked={formData.languages.includes("Python")}
          onChange={handleLanguageChange}
          class="form-checkbox h-5 w-5 text-indigo-600"
        />
        <span class="ml-2 text-sm text-gray-700">Python</span>
      </label>
      <label class="inline-flex items-center">
        <input
          type="checkbox"
          value="C++"
          checked={formData.languages.includes("C++")}
          onChange={handleLanguageChange}
          class="form-checkbox h-5 w-5 text-indigo-600"
        />
        <span class="ml-2 text-sm text-gray-700">C++</span>
      </label>
      <label class="inline-flex items-center">
        <input
          type="checkbox"
          value="Ruby"
          checked={formData.languages.includes("Ruby")}
          onChange={handleLanguageChange}
          class="form-checkbox h-5 w-5 text-indigo-600"
        />
        <span class="ml-2 text-sm text-gray-700">Ruby</span>
      </label>
    </div>
  </div>

  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">
      Availability:
      <select
        name="availability"
        value={formData.availability}
        onChange={handleChange}
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="FullTime">Full Time</option>
        <option value="PartTime">Part Time</option>
      </select>
    </label>
  </div>

  <button
    type="submit"
    class="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  >
    Save Changes
  </button>
</form>


  );
};

export default EditProfile;
