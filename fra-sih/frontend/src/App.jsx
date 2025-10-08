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
        <Route path="/home" element={authUser ? <Home /> : <Navigate to="/" />}
        />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/" />} />
        <Route path="/dashboard" element={authUser ? <DataHub /> : <Navigate to="/" />} />
        <Route path="/atlas" element={authUser ? <Atlas /> : <Navigate to="/" />} />
        <Route path="/dss" element={authUser ? <DSS /> : <Navigate to="/" />} />
         
      </Routes>
    </div>
  )
}

export default App
