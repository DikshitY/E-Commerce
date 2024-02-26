import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../Axios';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const navigate = useNavigate();
  const param = useParams();
  const { token } = param;

  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.patch(
        `/api/v1/users/resetpassword`,
        {
          password,
        },
        { headers }
      );
      if (res) {
        toast.success('Password updated.');
        navigate('/login');
      }
    } catch (err) {
        console.log(err);
      toast.error('Unauthorized access.');
    }
  };

  return (
    <div className="pt-20 pb-28 flex items-center justify-center h-screen">
      <div className="px-8 py-4 shadow-2xl rounded-xl w-[300px]">
        <h1 className="text-2xl font-semibold mb-6">Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              <p className="font-semibold mb-4">Enter new password</p>
              <input
                type="password"
                placeholder="Set password"
                className="w-full focus:outline-none border-b-2 border-black mb-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="flex gap-8 mt-6">
            <button className="bg-black text-white px-6 py-1 rounded-3xl">
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
