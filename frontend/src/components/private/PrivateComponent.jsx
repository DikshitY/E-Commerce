import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const PrivateComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem('auth'));
  const token = auth?.token;

  useEffect(() => {
    const handleNavigation = () => {
      toast.error('Please Login.');
      navigate('/login', {
        state: location.pathname
      });
    };
    if (!token) {
      handleNavigation()
    }
  }, [token, navigate, location]);

  return token ? <Outlet /> : null;
};

export default PrivateComponent;
