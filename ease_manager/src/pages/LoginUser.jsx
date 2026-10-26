import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button, Alert, Spinner } from "flowbite-react";
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';

export default function LoginUser() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.rollnum || !formData.password) {
      return dispatch(signInFailure("Please fill out all fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/student/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success == false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/dashboard?tab=dashboard');
      }
    }
    catch (err) {
      dispatch(signInFailure(err.message));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Welcome Section */}
      <div className="lg:w-1/2 w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 text-center px-6 py-12 lg:py-0">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Welcome!</h2>
          <h3 className="text-xl md:text-2xl text-gray-600 mb-8">Login to your account</h3>
          <div className="hidden lg:block">
            <img 
              src="./login_img.png" 
              alt="login illustration" 
              className="w-full max-w-sm mx-auto h-auto drop-shadow-lg" 
            />
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="lg:w-1/2 w-full flex items-center justify-center bg-white px-6 py-12 lg:py-0">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form Container */}
            <div className="bg-white border border-gray-200 rounded-md shadow-lg p-8">
              {/* Header */}
              <div className="flex items-center justify-center mb-8">
                <img 
                  src="/SKCET.jpg" 
                  alt="SKCET Institute logo" 
                  className="h-12 w-auto max-w-40 object-contain mr-3" 
                />
                <h1 className="text-xl font-bold text-blue-900">SKCET INSTITUTE</h1>
              </div>

              {/* Roll Number Field */}
              <div className="mb-4">
                <label htmlFor="rollnum" className="block text-sm font-semibold text-gray-700 mb-2">
                  Roll Number
                </label>
                <input
                  type="text"
                  id="rollnum"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  onChange={handleChange}
                  placeholder="Enter your roll number"
                />
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
              </div>

              {/* Submit Button */}
              <div className="mb-4">
                <Button
                  type="submit"
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <Spinner size="sm" className="mr-2" />
                      <span>Loading...</span>
                    </div>
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <Alert className="mt-4" color="failure">
                  {errorMessage}
                </Alert>
              )}

              {/* Optional: Forgot Password Link */}
              {/* <div className="text-center mt-4">
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                  Forgot Password?
                </Link>
              </div> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
