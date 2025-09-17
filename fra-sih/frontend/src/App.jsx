import { useState } from 'react'
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Navbar from  './components/Navbar';
import { ToastContainer } from "react-toastify";
function App() {

  const navigate = useNavigate();
  return (
    <div>
      <ToastContainer position="top-right" autoClose={1000} />
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/home" element={authUser ? <Home /> : <Navigate to="/" />} />
        <Route path="/learn/kana" element={authUser ? <LearnKana /> : <Navigate to="/" />} />
        <Route path="/courses" element={authUser ? <Courses /> : <Navigate to="/" />} />
        <Route path="/games" element={authUser ? <Games /> : <Navigate to="/" />} />
        <Route path="/learn/kanji" element={authUser ? <LearnKanji /> : <Navigate to="/" />} />
        <Route path="/practice/kana" element={authUser ? <PracticeKana /> : <Navigate to="/" />} />
        <Route path="/support" element={authUser ? <Support /> : <Navigate to="/" />} />
        <Route path="/practice/kanji" element={authUser ? <PracticeKanji /> : <Navigate to="/" />} /> 
        <Route path="/ai-tutor" element={authUser ? <AiTutor /> : <Navigate to="/" />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/" />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        {/* <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/> */}
      </Routes>
    </div>
  )
}

export default App
