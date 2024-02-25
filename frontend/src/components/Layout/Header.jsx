import React from 'react';
import SearchBar from '../SearchBar';
import Sidebar from '../Sidebar';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/images/amazon_logo.png';

const Header = () => {

  return (
    <div className="absolute top-0 w-full h-16 bg-[#0F1111] flex items-center gap-8 py-4 px-8 shadow-md max-[480px]:p-2 max-[480px]:gap-4">
      <div className='h-12 w-32'>
        <NavLink to={'/'}>
          <img className='h-12 object-contain' src={Logo} alt="Logo"/>
        </NavLink>
      </div>
      <SearchBar />
      <Sidebar />
    </div>
  );
};

export default Header;
