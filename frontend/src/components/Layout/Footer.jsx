import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="absolute w-full h-20 bg-black py-4 text-white bottom-0">
      <h2 className="text-center text-xl max-[500px]:text-lg max-[425px]:text-base">
        All rights reserved &copy; Amazon.in
      </h2>
      <p className="text-center font-thin max-[500px]:text-sm max-[425px]:text-xs">
        <NavLink to={'/about'}>About</NavLink> | <NavLink to={'/contact'}>Contact</NavLink> |{' '}
        <NavLink to={'/privacypolicy'}>Privacy Policy</NavLink>
      </p>
    </div>
  );
};

export default Footer;
