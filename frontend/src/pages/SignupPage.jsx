import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../store';

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      navigate('/')
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/users/signup`,
        {
          name,
          email,
          password,
        }
      );
      const data = res.data
      if (data.user && data.token) {
        toast.success(data.message);
        localStorage.setItem('token', JSON.stringify(data.token) )
        localStorage.setItem('user', JSON.stringify(data.user) )
        dispatch(setUser(data.user))
        dispatch(setToken(data.token))
        navigate('/');
      } else {
        toast.error('Unable to sign up.');
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="pt-20 pb-28 flex items-center justify-center h-screen">
      <div className="px-8 py-12 shadow-2xl rounded-xl">
        <h1 className="text-2xl font-semibold mb-12">Create your account</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              <p className="font-semibold mb-1">Name</p>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full focus:outline-none border-b-2 border-black mb-4"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>

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

          <div>
            <label>
              <p className="font-semibold mb-1">Password</p>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full focus:outline-none border-b-2 border-black mb-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" className="mr-1 mb-8" required />
              By signing up I agree with T&C.
            </label>
          </div>
          <div className="flex gap-8">
            <button className="bg-black text-white px-6 py-1 rounded-3xl">
              Sign Up
            </button>
            <Link
              to={'/login'}
              className="border-2 border-black px-6 py-1 rounded-3xl"
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
