 
import { motion } from "motion/react";
import { useNavigate,Navigate } from "react-router-dom";
const Navbar = () => {
  const navigate=useNavigate();
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/40 dark:bg-black/40 border-b border-gray-300/20 dark:border-gray-700/20"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-900 cursor-pointer dark:text-white tracking-wide" onClick={()=>navigate('/')} >
          FRA<span className="text-blue-500">ATLAS</span>
        </div>

        {/* Links */}
        <ul className="hidden md:flex gap-8 text-gray-700 dark:text-gray-300 font-medium">
          <li className="hover:text-blue-500 cursor-pointer transition">Home</li>
          <li className="hover:text-blue-500 cursor-pointer transition">ATLAS Map</li>
          <li className="hover:text-blue-500 cursor-pointer transition">AI Mapping</li>
          <li className="hover:text-blue-500 cursor-pointer transition">DSS</li>
          <li className="hover:text-blue-500 cursor-pointer transition">About us</li>
        </ul>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-blue-500 transition">
            Login
          </button>
          <button className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold shadow-md transition">
            Sign Up
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
