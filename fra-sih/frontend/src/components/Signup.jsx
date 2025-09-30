"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

export default function SignupForm({ onClose, switchToLogin }) {
  const { signup, isRegistering } = useAuthStore();
  
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    role: "User",
    state: "Other",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success= await signup(formData);
    if(success){
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-md rounded-3xl border border-neutral-200 dark:border-neutral-800 
                   bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 
                   shadow-xl p-8 space-y-6"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
        >
          <X className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
        </button>

        <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent 
                       bg-gradient-to-r from-green-600 to-emerald-600">
          Create Account
        </h2>
        <p className="text-center text-neutral-600 dark:text-neutral-400">
          Join FRA Atlas and start contributing
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
              className="mt-2 w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-600 
                 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 
                 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Your full name"
              required
              className="mt-2 w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-600 
                 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 
                 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="mt-2 w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-600 
                 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 
                 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              className="mt-2 w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-600 
                 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 
                 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-600 
                 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 
                 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="User">User</option>
              <option value="Researcher">Researcher</option>
              <option value="Contributor">Contributor</option>
              <option value="GovOfficial">Gov Official</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              State
            </label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-600 
                 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 
                 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Tripura">Tripura</option>
              <option value="Odisha">Odisha</option>
              <option value="Telangana">Telangana</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Submit Button spans both columns */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(16,185,129,0.3)" }}
            whileTap={{ scale: 0.95 }}
            disabled={isRegistering}
            className="col-span-1 md:col-span-2 w-full py-3 px-6 rounded-xl font-semibold text-lg 
               bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 text-white 
               shadow-lg hover:shadow-green-500/40 transition-all duration-300 
               disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isRegistering ? "Creating account..." : "Sign Up"}
          </motion.button>
        </form>


        <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
          Already have an account?{" "}
          <button
            type="button"
            onClick={switchToLogin}
            className="font-semibold text-green-600 hover:underline dark:text-green-400"
          >
            Log in
          </button>
        </p>
      </motion.div>
    </div>
  );
}
