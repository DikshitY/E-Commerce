import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/api/v1/users/resetpassword`, {
        email,
      });

      navigate('/login');

    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="pt-20 pb-28 flex items-center justify-center h-screen">
      <div className="px-8 py-4 shadow-2xl rounded-xl w-[300px]">
        <h1 className="text-2xl font-semibold mb-6">Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              <p className="font-semibold mb-1">E-mail</p>
              <input
                type="email"
                placeholder="Enter your e-mail"
                className="w-full focus:outline-none border-b-2 border-black mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <Link to="/login" className="text-blue-600 text-sm">
            Login
          </Link>{' '}
          ?
          <div className="flex gap-8 mt-6">
            <button className="bg-black text-white px-6 py-1 rounded-3xl">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
