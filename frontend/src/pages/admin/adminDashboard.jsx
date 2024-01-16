import React from 'react';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { FaUser, FaShoppingBag, FaUsers } from 'react-icons/fa';
import { BiSolidShoppingBags } from 'react-icons/bi';
import { IoLogOut } from 'react-icons/io5';

const AdminDashboard = () => {
  const style = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#161616',
  };

  return (
    <div className="pt-20 pb-24 px-4 flex gap-8 ">
      <div className="border-2 rounded-xl p-4 w-48 shadow-2xl h-full">
        <h1 className="text-lg font-medium">Admin Panel</h1>
        <ul className="ml-4 mt-4 mb-20 flex flex-col gap-4">
          <li className="flex gap-2 items-center">
            <FaUser className='text-sm'/>
            <NavLink
              to={'.'}
              style={({ isActive }) => (isActive ? style : null)}
              end
            >
              Profile
            </NavLink>
          </li>
          <li className="flex gap-2 items-center">
            <FaUsers className='text-lg'/>
            <NavLink
              to={'show-users'}
              style={({ isActive }) => (isActive ? style : null)}
            >Users</NavLink>
          </li>
          <li className="flex gap-2 items-center">
            <BiSolidShoppingBags className='text-lg'/>
            <NavLink
              to={'show-products'}
              style={({ isActive }) => (isActive ? style : null)}
            >
              Products
            </NavLink>
          </li>
          <li className="flex gap-2 items-center">
            <IoLogOut className='text-lg'/>
            <NavLink to={'/'}>LogOut</NavLink>
          </li>
        </ul >
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
