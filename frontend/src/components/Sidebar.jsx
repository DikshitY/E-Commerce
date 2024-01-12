import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import Dropdown from './Dropdown';

const Sidebar = () => {
  const token = JSON.parse(localStorage.getItem('token'));

  return (
    <div className="flex gap-4 items-center">
      <NavLink to="products">Products</NavLink>

      <NavLink to="category">Category</NavLink>

      {token ? (
        <Dropdown data={['Dashboard', 'LogOut']} />
      ) : (
        <Dropdown data={['SignUp', 'LogIn']} />
      )}

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
