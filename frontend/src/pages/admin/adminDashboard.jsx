import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser, setToken} from '../../store';
import toast from 'react-hot-toast';
import { FaUser } from 'react-icons/fa';
import { BiSolidShoppingBags } from 'react-icons/bi';
import { IoLogOut } from 'react-icons/io5';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('token'));

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
        localStorage.removeItem('user');
        toast.success('User logged out.');
        dispatch(setUser(null));
        dispatch(setToken(''));
        navigate('/');
        location.reload();
      } else {
        toast.error('Unable to log out.');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const style = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#161616',
  };

  return (
    <div className="pt-20 pb-24 px-4 flex gap-8 max-md:flex-col max-md:gap-4">
      <div className="border-2 rounded-xl p-4 min-w-48 shadow-2xl h-full max-md:hidden">
        <h1 className="text-lg font-medium">Admin Panel</h1>
        <ul className="ml-4 mt-4 mb-20 flex flex-col gap-4">
          <li className="flex gap-2 items-center">
            <FaUser className="text-sm" />
            <NavLink
              to={'.'}
              style={({ isActive }) => (isActive ? style : null)}
              end
            >
              Profile
            </NavLink>
          </li>
          <li className="flex gap-2 items-center">
            <BiSolidShoppingBags className="text-lg" />
            <NavLink
              to={'show-products'}
              style={({ isActive }) => (isActive ? style : null)}
            >
              Products
            </NavLink>
          </li>
          <li className="flex gap-2 items-center">
            <IoLogOut className="text-lg" />
            <button onClick={handleLogout}>LogOut</button>
          </li>
        </ul>
      </div>
      <div className="flex items-center border-2 rounded-xl p-4 shadow-2xl md:hidden gap-4">
        {/* <h1 className="text-lg font-medium">Admin Panel</h1> */}
        <li className="flex items-center">
          <FaUser className="text-sm" />
          <NavLink
            to={'.'}
            style={({ isActive }) => (isActive ? style : null)}
            end
          >
            Profile
          </NavLink>
        </li>
        <li className="flex items-center">
          <BiSolidShoppingBags className="text-lg" />
          <NavLink
            to={'show-products'}
            style={({ isActive }) => (isActive ? style : null)}
          >
            Products
          </NavLink>
        </li>
        <li className="flex items-center">
          <IoLogOut className="text-lg" />
          <button onClick={handleLogout}>LogOut</button>
        </li>
      </div>
      <div className="overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
