import React from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';

const Dropdown = ({ data }) => {
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem('token'));

  const handleClick = async (e) => {
    if (e.target.innerText === 'LogOut') {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const res = await axios.post(
          'http://localhost:5000/api/v1/users/logout',
          {},
          { headers }
        );
        if (res) {
          localStorage.removeItem('token');
          toast.success('User logged out.');
          navigate('/login');
        } else {
          toast.error('Unable to log out.');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const renderOptions = data.map((option, index) => {
    if (option === 'LogOut') {
      return (
        <li key={index}>
          <Link
            to={'/login'}
            className="px-2 font-medium text-slate-600 hover:text-black hover:bg-slate-300 hover:rounded-lg hover:py-1 transition-all duration-500"
            onClick={handleClick}
          >
            {option}
          </Link>
        </li>
      );
    }
    return (
      <li
        key={index}
        className="px-2 font-medium text-slate-600 hover:text-black hover:bg-slate-300 hover:rounded-lg hover:py-1 transition-all duration-500"
      >
        <Link to={`/${option.toLowerCase()}`} onClick={handleClick}>
          {option}
        </Link>
      </li>
    );
  });

  return (
    <div className="group relative cursor-pointer z-10">
      <FaUser className="text-xl" />
      <ul className="absolute -left-4 top-6 py-4 px-2 rounded-xl bg-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col gap-2">
        {renderOptions}
      </ul>
    </div>
  );
};

export default Dropdown;
