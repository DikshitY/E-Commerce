import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from './store';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PageNotFound from './pages/PageNotFound';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import PrivateComponent from './components/private/PrivateComponent';
import Dashboard from './pages/user/Dashboard';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPassword from './pages/ResetPassword';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProfile from './pages/admin/AdminProfile';
import AddProduct from './pages/admin/AddProduct';
import ShowUsers  from './pages/admin/ShowUsers';
import UpdateAdminProfile from './pages/admin/UpdateAdminProfile';
import UpdateProduct from './pages/admin/UpdateProduct';
import ShowProducts from './pages/admin/ShowProducts';
import UserProfile from './pages/user/UserProfile';
import UpdateUserProfile from './pages/user/UpdateUserProfile';
import Orders from './pages/user/Orders'

const App = () => {
  const disptach = useDispatch();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      const headers = { Authorization: `Bearer ${token}` };
      axios
        .get('http://localhost:5000/api/v1/users/me', { headers })
        .then((res) => res.data)
        .then((data) => disptach(setUser(data)))
        .catch((err) => console.log(err));

      disptach(setToken(token));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="dashboard" element={<PrivateComponent />}>
            <Route path='user' element={<Dashboard />}>
              <Route index element={<UserProfile/>}/>
              <Route path='update-user-profile' element={<UpdateUserProfile/>}/>
              <Route path='orders' element={<Orders/>}/>
            </Route>
            <Route path='admin' element={<AdminDashboard/>}>
                <Route index element={<AdminProfile/>} />
                <Route path='update-admin-profile' element={<UpdateAdminProfile/>} />
                <Route path='add-product' element={<AddProduct/>}/>
                <Route path='update-product' element={<UpdateProduct/>}/>
                <Route path='show-products' element={<ShowProducts/>}/>
                <Route path='show-users' element={<ShowUsers/>}/>
            </Route>
          </Route>
          <Route path="signup" element={<SignupPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="forgotpassword" element={<ForgotPasswordPage />} />
          <Route path="resetpassword/:id/:token" element={<ResetPassword />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacypolicy" element={<PrivacyPolicyPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
