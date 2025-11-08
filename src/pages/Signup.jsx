import React, { useState } from 'react';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${USER_API_END_POINT}/register`, formData);
      if (response.data) navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex bg-base-200">
      {/* Left Section - Image */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
        <img
          src="/sample1.jpg"
          alt="Signup"
          className="w-4/5 rounded-2xl shadow-xl"
        />
      </div>

      {/* Right Section - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="card bg-base-100 shadow-xl p-10">
            <h2 className="text-3xl font-bold text-center mb-8">
              Signup  
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="alert alert-error text-sm text-left">
                  {error}
                </div>
              )}

              {/* Name Field */}
              <div className="form-control">
                <label htmlFor="name" className="label pl-1">
                  <span className="label-text font-medium">Name</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Email Field */}
              <div className="form-control">
                <label htmlFor="email" className="label pl-1">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Password Field */}
              <div className="form-control">
                <label htmlFor="password" className="label pl-1">
                  <span className="label-text font-medium">Password</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Role Field */}
              <div className="form-control">
                <label htmlFor="role" className="label pl-1">
                  <span className="label-text font-medium">Role</span>
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-full mt-2"
              >
                Sign up
              </button>
            </form>

            {/* Login Redirect */}
            <div className="text-sm text-center mt-6">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="btn btn-link text-primary p-0"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
