import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  
  return (
    <div className='relative min-h-screen max-w-screen'>
      <Header />
      <Toaster />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
