import { useState,useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import { ToastContainer } from "react-toastify";
import { useAuthStore } from './store/useAuthStore';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';
import DataHub from './pages/DataHub';
import Atlas from './pages/Atlas';
import DSS from './pages/DSS';
 
function App() {
  const { checkAuth, authUser } = useAuthStore(); // get auth info
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const navigate = useNavigate();
  return (
    <div>
      <ToastContainer position="top-right" autoClose={1000} />
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/home" element={<Home />   }
        />
        <Route path="/profile" element={<Profile /> } />
        <Route path="/dashboard" element={<DataHub /> } />
        <Route path="/atlas" element={<Atlas /> } />
        <Route path="/dss" element={<DSS /> } />
         
      </Routes>
    </div>
  )
}

export default App
