import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../Axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../store';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      navigate('/')
    }
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `/api/v1/users/login`,
        {
          email,
          password,
        }
      );
      const data = res.data
      if (data.user && data.token) {
        toast.success(data.message);
        localStorage.setItem('token', JSON.stringify(data.token))
        localStorage.setItem('user', JSON.stringify(data.user))
        dispatch(setUser(data.user))
        dispatch(setToken(data.token))
        navigate('/');
        location.reload();
      } else {
        toast.error("Unable to login.");
      }
    } catch (err) {
      console.log(err);
      toast.error('Email or password is incorrect.');
    }
  };

  return (
    <div className="pt-20 pb-28 flex items-center justify-center h-screen px-4">
      <div className="px-8 py-12 shadow-2xl rounded-xl bg-white">
        <h1 className="text-2xl font-semibold mb-12 max-sm:mb-8 max-sm:text-xl">
          Login into your account
        </h1>
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
          <Link to="/forgotpassword" className='text-blue-600 text-sm'>Forgot Password</Link> ?
          <div className="flex gap-8 mt-12 max-sm:flex-col max-sm:gap-4 max-sm:mt-4">
            <button className="bg-black text-white px-6 py-2 rounded-3xl">
              Log In
            </button>
            <Link
              to={'/signup'}
              className="text-center border-2 border-black px-6 py-[6px] rounded-3xl"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
