import React from 'react';

const AdminProfile = () => {
  const admin = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="font-semibold border-2 border-black p-4 rounded-xl">
      <p className='font-extrabold'>AdminProfile</p>
      <p>Name:- {admin?.name}</p>
      <p>Email:- {admin?.email}</p>
    </div>
  );
};

export default AdminProfile;
