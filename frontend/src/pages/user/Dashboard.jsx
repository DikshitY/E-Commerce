import React from 'react';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { BiSolidShoppingBags } from 'react-icons/bi';
import { IoLogOut } from 'react-icons/io5';

const Dashboard = () => {
  const style = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#161616',
  };
  return (
    <div className="pt-20 pb-24 px-4 flex gap-8 h-screen">
      <div className="border-2 shadow-2xl rounded-xl h-full  p-4 w-48">
        <h1 className="text-lg font-medium">User Panel</h1>
        <ul className="ml-4 mt-4 flex flex-col gap-4">
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
              to={'orders'}
              style={({ isActive }) => (isActive ? style : null)}
            >
              Orders
            </NavLink>
          </li>
          <li className="flex gap-2 items-center">
            <IoLogOut className="text-lg" />
            <NavLink to={'/'}>LogOut</NavLink>
          </li>
        </ul>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
