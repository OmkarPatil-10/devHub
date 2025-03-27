import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/authSlice/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated || localStorage.getItem("token")) {
      navigate("/dashboard"); // Redirect to UserDashboard after login
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(loginUser(data));
      if (response?.payload?.success) {
        localStorage.setItem("token", response.payload.token);
        toast.success(response.payload.message);

        setTimeout(() => {
          navigate("/dashboard"); // Redirect to UserDashboard
        }, 500);
      } else {
        toast.error(response?.payload?.message || "Login failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center">Sign in to your account</h1>
      <p className="mt-2 text-center">
        Don't have an account?
        <Link to="/register" className="ml-2 text-blue-500 hover:underline">
          Register
        </Link>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block font-medium">Email:</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email address",
              },
            })}
            placeholder="Enter your email"
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block font-medium">Password:</label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            placeholder="Enter your password"
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Submit
        </button>
      </form>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default Login;


// import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser,setAuthenticated } from "../store/authSlice/authSlice";  // Add setAuthenticated if needed
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Login() {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated } = useSelector((state) => state.auth);

//   useEffect(() => {
//     // If already authenticated, redirect to dashboard
//     if (isAuthenticated || localStorage.getItem("token")) {
//       navigate("/dashboard");
//     }
//   }, [isAuthenticated, navigate]);

//   const onSubmit = async (data) => {
//     try {
//       const response = await dispatch(loginUser(data));
//       if (response?.payload?.success) {
//         const token = response.payload.token;
//         localStorage.setItem("token", token);

//         // Update the redux state to reflect successful login
//         dispatch(setAuthenticated(true));  // Assuming you have setAuthenticated action to update the state

//         toast.success(response.payload.message);

//         // Delay to ensure state is updated before redirect
//         setTimeout(() => {
//           navigate("/dashboard"); // Redirect to UserDashboard
//         }, 500);
//       } else {
//         toast.error(response?.payload?.message || "Login failed");
//       }
//     } catch (error) {
//       toast.error("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
//       <h1 className="text-2xl font-bold text-center">Sign in to your account</h1>
//       <p className="mt-2 text-center">
//         Don't have an account?
//         <Link to="/register" className="ml-2 text-blue-500 hover:underline">
//           Register
//         </Link>
//       </p>

//       <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
//         {/* Email Field */}
//         <div>
//           <label htmlFor="email" className="block font-medium">Email:</label>
//           <input
//             id="email"
//             type="email"
//             {...register("email", {
//               required: "Email is required",
//               pattern: {
//                 value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
//                 message: "Invalid email address",
//               },
//             })}
//             placeholder="Enter your email"
//             className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.email && (
//             <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//           )}
//         </div>

//         {/* Password Field */}
//         <div>
//           <label htmlFor="password" className="block font-medium">Password:</label>
//           <input
//             id="password"
//             type="password"
//             {...register("password", {
//               required: "Password is required",
//               minLength: {
//                 value: 6,
//                 message: "Password must be at least 6 characters long",
//               },
//             })}
//             placeholder="Enter your password"
//             className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {errors.password && (
//             <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//           )}
//         </div>

//         {/* Submit Button */}
//         <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
//           Submit
//         </button>
//       </form>

//       {/* Toast Container */}
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default Login;
