import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const PrivateComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('token'));
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const handleNavigation = () => {
      if (user.role) {
       navigate('/dashboard/admin');
       toast.error("You are not a User!")
      }
    };

    const initialCheck = () => {
      toast.error('Please Login.');
      navigate('/login', {
        state: location.pathname,
      });
    };

    if (!token) {
      return initialCheck();
    }

    return handleNavigation()
  }, [token]);

  return token ? <Outlet /> : null;
};

export default PrivateComponent;
