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
import ShowProducts from './pages/admin/ShowProducts';
import UserProfile from './pages/user/UserProfile';
import AdminComponent from './components/private/adminComponent';
import Products from './pages/Products';
import ProductDetailShow from './components/ProductDetailShow';
import CartPage from './pages/CartPage';

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
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetailShow />} />
          <Route path="dashboard" element={<PrivateComponent />}>
            <Route path="user" element={<Dashboard />}>
              <Route index element={<UserProfile />} />
            </Route>
          </Route>
          <Route path="dashboard" element={<AdminComponent />}>
            <Route path="admin" element={<AdminDashboard />}>
              <Route index element={<AdminProfile />} />
              <Route path="show-products" element={<ShowProducts />} />
            </Route>
          </Route>
          <Route path="signup" element={<SignupPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="cart" element={<CartPage />} />
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
