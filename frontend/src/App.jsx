import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { setToken } from './store';
import Layout from './components/Layout/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import PageNotFound from './pages/PageNotFound'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import PrivateComponent from './components/private/PrivateComponent';
import Dashboard from './pages/user/Dashboard';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

const App = () => {

  const auth = JSON.parse(localStorage.getItem('auth'))
  if(auth){
    axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`
  }

  const disptach = useDispatch()

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth'))
    if(auth){
      disptach(setToken(auth))
    }
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route index element={<HomePage/>}/>
          <Route path='dashboard' element={<PrivateComponent/>}>
            <Route index element={<Dashboard/>}/>
          </Route>
          <Route path='signup' element={<SignupPage/>}/>
          <Route path='login' element={<LoginPage/>}/>
          <Route path='forgotpassword' element={<ForgotPasswordPage/>}/>
          <Route path='about' element={<AboutPage/>}/>
          <Route path='contact' element={<ContactPage/>}/>
          <Route path='privacypolicy' element={<PrivacyPolicyPage/>}/>
          <Route path='*' element={<PageNotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App