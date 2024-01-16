import React from 'react';
import SearchBar from '../SearchBar';
import Sidebar from '../Sidebar';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div className="absolute top-0 w-full h-16 bg-white flex items-center gap-8 py-4 px-8 shadow-md">
      <NavLink to={'/'} className="font-semibold text-2xl">
        #LOGO
      </NavLink>
      <SearchBar />
      <Sidebar />
    </div>
  );
};

export default Header;
