import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button, Alert, Spinner } from "flowbite-react";
import { useDispatch } from 'react-redux';
import { updateBlocks } from '../redux/admin/adminSlice';

export default function LoginAdmin() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      return setErrorMessage("Please fill out all fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/admin/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success == false) {
        setLoading(false);
        setErrorMessage(data.message);
      }

      if (res.ok) {
        console.log(data);
        dispatch(updateBlocks(data));
        navigate("/adminpage");
      }
    }
    catch (err) {
      setErrorMessage(err.message);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Welcome Section */}
      <div className="lg:w-1/2 w-full flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-orange-100 text-center px-6 py-12 lg:py-0">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Welcome Admin!</h2>
          <h3 className="text-xl md:text-2xl text-gray-600 mb-8">Access your admin panel</h3>
          <div className="hidden lg:block">
            <img 
              src="./login_img.png" 
              alt="admin login illustration" 
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
                <h1 className="text-xl font-bold text-red-700">SKCET INSTITUTE</h1>
              </div>

              {/* Admin Badge */}
              <div className="flex justify-center mb-6">
                <span className="bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full">
                  Admin Portal
                </span>
              </div>

              {/* Username Field */}
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                  onChange={handleChange}
                  placeholder="Enter admin username"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                  onChange={handleChange}
                  placeholder="Enter admin password"
                />
              </div>

              {/* Submit Button */}
              <div className="mb-4">
                <Button
                  type="submit"
                  className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <Spinner size="sm" className="mr-2" />
                      <span>Loading...</span>
                    </div>
                  ) : (
                    "Admin Login"
                  )}
                </Button>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <Alert className="mt-4" color="failure">
                  {errorMessage}
                </Alert>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
