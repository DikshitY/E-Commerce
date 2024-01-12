import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="absolute w-full h-20 bg-black py-4 text-white bottom-0">
      <h2 className="text-center text-xl">
        All rights reserved &copy; E-Commerce
      </h2>
      <p className="text-center font-thin">
        <NavLink to={'/about'}>About</NavLink> | <NavLink to={'/contact'}>Contact</NavLink> |{' '}
        <NavLink to={'/privacypolicy'}>Privacy Policy</NavLink>
      </p>
    </div>
  );
};

export default Footer;
