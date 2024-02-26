import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { IoMenu } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser, setToken, useFetchCartQuery } from '../store';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem('token'));
  const user = JSON.parse(localStorage.getItem('user'));
  const [menuOpen, setMenuOpen] = useState(false);
  const { data } = useFetchCartQuery();

  const handleLogout = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.post(
        '/api/v1/users/logout',
        {},
        { headers }
      );
      if (res) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.success('User logged out.');
        setMenuOpen(!menuOpen)
        dispatch(setUser(null));
        dispatch(setToken(''));
        navigate('/');
        location.reload();
      } else {
        toast.error('Unable to log out.');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={`flex gap-4 items-center text-white max-[769px]:hidden`}>
        <NavLink className="whitespace-nowrap font-medium" to="products">
          All Products
        </NavLink>
        <div className="group relative cursor-pointer">
          <FaUser className="text-xl" />
          <ul className="z-10 absolute -left-8 top-6 py-4 px-1 rounded-xl bg-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col gap-2">
            {token ? (
              <div className='w-24'>
                <li>
                  <Link
                    to={user?.role ? '/dashboard/admin' : '/dashboard/user'}
                    className="px-2 font-medium text-slate-600 hover:text-black hover:bg-slate-300 hover:rounded-lg py-1 transition-all duration-500"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    className="px-2 font-medium text-slate-600 hover:text-black hover:bg-slate-300 hover:rounded-lg py-1 transition-all duration-500"
                    onClick={handleLogout}
                  >
                    LogOut
                  </Link>
                </li>
              </div>
            ) : (
              <div className='w-20'>
                <li className="px-2 font-medium text-slate-600 hover:text-black hover:bg-slate-300 hover:rounded-lg py-1 transition-all duration-500">
                  <Link to="signup">SignUp</Link>
                </li>
                <li className="px-2 font-medium text-slate-600 hover:text-black hover:bg-slate-300 hover:rounded-lg py-1 transition-all duration-500">
                  <Link to="login">LogIn</Link>
                </li>
              </div>
            )}
          </ul>
        </div>
        <NavLink to="/cart" className="relative">
          <FaCartShopping className="text-xl" />
          <div className="flex items-center justify-center h-5 w-5 rounded-full bg-red-500 absolute right-[-10px] top-[-10px]">
            {data?.items?.length || 0}
          </div>
        </NavLink>
      </div>
      <IoMenu
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-white text-[48px] hidden max-[769px]:block"
      />
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`${
          menuOpen ? 'block' : 'hidden'
        } fixed top-2 right-6 max-sm:right-2 text-white z-50 font-bold text-[20px] px-4 py-2 rounded-full hover:bg-slate-700 min-[769px]:hidden`}
      >
        X
      </button>
      <div
        className={`${
          menuOpen ? 'flex' : 'hidden'
        } flex-col justify-center items-center gap-8 fixed z-40 top-0 left-0 right-0 bottom-0 bg-[#0F1111] text-white min-[769px]:hidden`}
      >
        <NavLink
          onClick={() => setMenuOpen(!menuOpen)}
          className="whitespace-nowrap font-medium px-4 py-2 rounded-xl hover:bg-slate-700"
          to="products"
        >
          All Products
        </NavLink>
        <NavLink
          onClick={() => setMenuOpen(!menuOpen)}
          to="/cart"
          className="relative flex items-center px-4 py-2 rounded-xl hover:bg-slate-700"
        >
          <FaCartShopping className="text-xl" /> (Cart)
          <div className="flex items-center justify-center h-5 w-5 rounded-full bg-red-500 absolute right-[-10px] top-[-10px] text-white">
            {data?.items?.length || 0}
          </div>
        </NavLink>
        {token ? (
          <>
            <Link
              onClick={() => setMenuOpen(!menuOpen)}
              to={user?.role ? '/dashboard/admin' : '/dashboard/user'}
              className="font-medium px-4 py-2 rounded-xl hover:bg-slate-700"
            >
              Dashboard {user.role ? '(Admin)' : '(User)'}
            </Link>
            <Link
              className="font-medium px-4 py-2 rounded-xl hover:bg-slate-700"
              onClick={handleLogout}
            >
              LogOut
            </Link>
          </>
        ) : (
          <>
            <Link
              onClick={() => setMenuOpen(!menuOpen)}
              to="signup"
              className="px-4 py-2 rounded-xl hover:bg-slate-700"
            >
              SignUp
            </Link>
            <Link
              onClick={() => setMenuOpen(!menuOpen)}
              to="login"
              className="px-4 py-2 rounded-xl hover:bg-slate-700"
            >
              LogIn
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Sidebar;
