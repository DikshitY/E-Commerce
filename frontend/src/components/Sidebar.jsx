import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('token'));
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = async () => {
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
  };

  return (
    <div className="flex gap-4 items-center">
      <NavLink to="products">Products</NavLink>
      <NavLink to="category">Category</NavLink>
      <div className="group relative cursor-pointer">
        <FaUser className="text-xl" />
        <ul className="absolute -left-4 top-6 py-4 px-1 rounded-xl bg-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col gap-2">
          {token ? (
            <>
              <li>
                <Link
                  to={user?.role ? '/dashboard/admin' : '/dashboard/user'}
                  className="px-2 font-medium text-slate-600 hover:text-black hover:bg-slate-300 hover:rounded-lg py-1 transition-all duration-500"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  // to={'/login'}
                  className="px-2 font-medium text-slate-600 hover:text-black hover:bg-slate-300 hover:rounded-lg py-1 transition-all duration-500"
                  onClick={handleLogout}
                >
                  LogOut
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="px-2 font-medium text-slate-600 hover:text-black hover:bg-slate-300 hover:rounded-lg py-1 transition-all duration-500">
                <Link to="signup">SignUp</Link>
              </li>
              <li className="px-2 font-medium text-slate-600 hover:text-black hover:bg-slate-300 hover:rounded-lg py-1 transition-all duration-500">
                <Link to="login">LogIn</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <NavLink to="/wishlist">
        <FaHeart className="text-xl" />
      </NavLink>
      <NavLink to="/cart">
        <FaCartShopping className="text-xl" />
      </NavLink>
    </div>
  );
};

export default Sidebar;
