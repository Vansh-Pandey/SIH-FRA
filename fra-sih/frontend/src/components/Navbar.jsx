"use client";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import SignupForm from "./Signup";
import LoginForm from "./Login";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const { checkAuth, authUser, logout } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, []);

  const openSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  const openLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const closeModals = () => {
    setShowSignup(false);
    setShowLogin(false);
  };
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-50  bg-black  dark:bg-black  border-b border-gray-300/20 dark:border-gray-700/20"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <div
            className="text-2xl font-bold text-gray-900 dark:text-white cursor-pointer tracking-wide"
            onClick={() => navigate("/")}
          >
            FRA<span className="text-blue-500">ATLAS</span>
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex gap-6 text-gray-700 dark:text-gray-300 font-medium">
            <li onClick={() => navigate("/home")} className="hover:text-blue-500 cursor-pointer transition">Home</li>
            <li onClick={() => navigate("/dashboard")} className="hover:text-blue-500 cursor-pointer transition">DataHub</li>
            <li onClick={() => navigate("/atlas")} className="hover:text-blue-500 cursor-pointer transition">ATLAS Mapping</li>
            {/* <li className="hover:text-blue-500 cursor-pointer transition">AI Mapping</li> */}
            <li onClick={() => navigate("/dss")} className="hover:text-blue-500 cursor-pointer transition">DSS</li>
            <li onClick={() => navigate("/about")} className="hover:text-blue-500 cursor-pointer transition">About us</li>
          </ul>

          {/* Desktop Auth / Profile */}
          {/* Desktop Auth / Profile */}
          <div className="hidden md:flex items-center gap-4">
            {!authUser ? (
              <>
                <button
                  onClick={openLogin}
                  className="px-4 py-2 text-sm font-medium text-gray-200 hover:text-blue-500 transition"
                >
                  Login
                </button>
                <button
                  onClick={openSignup}
                  className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold shadow-md transition"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <img
                  src={"/default-avatar.png"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => navigate("/profile")}
                />
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold shadow-md transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>


          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            {authUser && (
              <img
                src={"/default-avatar.png"}
                alt="Profile"
                className="w-8 h-8 rounded-full"
                onClick={() => navigate("/profile")}
              />
            )}
            <button onClick={() => setShowMobileMenu(!showMobileMenu)}>
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" color="white" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
            <button
              onClick={() => setShowMobileMenu(false)}
              className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <X className="w-6 h-6 text-gray-800 dark:text-gray-200" />
            </button>
            <ul className="flex flex-col gap-2 p-4">
              <li onClick={() => navigate("/home")} className="hover:text-blue-500 cursor-pointer transition">Home</li>
              <li onClick={() => navigate("/dashboard")}className="hover:text-blue-500 cursor-pointer transition">DataHub</li>
              <li onClick={() => navigate("/atlas")}className="hover:text-blue-500 cursor-pointer transition">ATLAS Map</li>
              {/* <li className="hover:text-blue-500 cursor-pointer transition">AI Mapping</li> */}
              <li onClick={() => navigate("/dss")}className="hover:text-blue-500 cursor-pointer transition">DSS</li>
              <li onClick={() => navigate("/about")} className="hover:text-blue-500 cursor-pointer transition">About us</li>
              {!authUser ? (
                <>
                  <li><button onClick={openLogin} className="w-full text-left">Login</button></li>
                  <li><button onClick={openSignup} className="w-full text-left">Sign Up</button></li>
                </>
              ) : (
                <li><button
                  onClick={handleLogout}
                  className="border border-stone-300 hover:bg-stone-100 text-stone-800 px-6 py-2 rounded-full font-medium transition-all duration-300"
                >
                  Logout
                </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </motion.nav>

      {/* Modal Forms */}
      {showSignup && <SignupForm onClose={closeModals} switchToLogin={() => { setShowSignup(false); setShowLogin(true); }} />}
      {showLogin && <LoginForm onClose={closeModals} switchToSignup={() => { setShowLogin(false); setShowSignup(true); }} />}
    </>
  );
};

export default Navbar;
