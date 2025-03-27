import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, resetState } from '@/store/authSlice/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isloading, isAuthenticated, user } = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    console.log(data);
    dispatch(registerUser(data)).then((response) => {
      if (response?.payload?.success) {
        toast.success(response?.payload?.message);
        navigate("/login");
      } else {
        toast.error(response?.payload?.message || "Registration failed");
      }
    });
  };

  useEffect(() => {
    if (user) {
      dispatch(resetState()); // Reset state after success
    }
  }, [user, dispatch]);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Create new account</h1>
        <p className="mt-2">
          Already have an account?
          <Link className="font-medium ml-2 text-blue-500 hover:underline" to="/login">
            Login
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div className="space-y-2">
          <label htmlFor="userName" className="block font-medium">Name:</label>
          <input
            id="userName"
            type="text"
            {...register('userName', { required: 'Name is required' })}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.userName && <p className="text-red-500 text-sm">{errors.userName.message}</p>}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="block font-medium">Email:</label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: 'Invalid email address',
              },
            })}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label htmlFor="password" className="block font-medium">Password:</label>
          <input
            id="password"
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            })}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 ${
            isloading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isloading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default Register;
