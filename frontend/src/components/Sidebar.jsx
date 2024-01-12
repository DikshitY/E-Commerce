import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const navigate = useNavigate()
  const auth = localStorage.getItem('auth');

  const logout = () => {
    localStorage.removeItem('auth')
    toast.success("User logged out.")
    navigate('login')
  }

  return (
    <div className="flex gap-4 items-center">
      <NavLink to="products">Products</NavLink>

      <NavLink to="category">Category</NavLink>

      {auth ? (
        <NavLink to="login" onClick={logout}>LogOut</NavLink>
      ) : (
        <>
          <NavLink to="signup">SignUp</NavLink>

          <NavLink to="login">LogIn</NavLink>
        </>
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
