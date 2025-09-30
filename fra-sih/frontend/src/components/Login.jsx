"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react"; // nice clean close icon
import { useAuthStore } from "../store/useAuthStore";

export default function LoginForm({ onClose, switchToSignup }) {
  const { login, isLogging } = useAuthStore();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success= await login(formData);
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
                       bg-gradient-to-r from-blue-600 to-indigo-600">
          Welcome Back
        </h2>
        <p className="text-center text-neutral-600 dark:text-neutral-400">
          Sign in to access FRA Atlas
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-600 
                         bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-600 
                         bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59,130,246,0.3)" }}
            whileTap={{ scale: 0.95 }}
            disabled={isLogging}
            className="w-full py-3 px-6 rounded-xl font-semibold text-lg 
                       bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white 
                       shadow-lg hover:shadow-blue-500/40 transition-all duration-300 
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLogging ? "Signing in..." : "Sign In"}
          </motion.button>
        </form>

        <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
          Don’t have an account?{" "}
          <button 
            type="button"
            onClick={switchToSignup}
            
            className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            Sign up
          </button>
        </p>
      </motion.div>
    </div>
  );
}
