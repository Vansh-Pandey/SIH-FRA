import { axiosInstance } from "../lib/axios";
import { create } from "zustand";
import { toast } from "react-toastify";

export const useAuthStore = create((set) => ({
  authUser: null,
  isRegistering: false,
  isLogging: false,
  isCheckingAuth: true,

  // ✅ Check authentication status
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.error("Error in checkAuth:", error.response?.data?.message || error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // ✅ Signup
  signup: async (data) => {
    set({ isRegistering: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully", { autoClose: 1000 });

      await new Promise((resolve) => setTimeout(resolve, 1000));
      return true;
    } catch (error) {
      console.error("Signup Error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Signup failed", { autoClose: 1000 });
    } finally {
      set({ isRegistering: false });
    }
  },

  // ✅ Login
  login: async (userData) => {
    set({ isLogging: true });
    try {
      const res = await axiosInstance.post("/auth/login", userData);
      set({ authUser: res.data });
      toast.success("Logged in successfully", { autoClose: 1000 });

      await new Promise((resolve) => setTimeout(resolve, 1000));
      return true;
    } catch (error) {
      console.error("Login Error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Login failed", { autoClose: 1000 });
    } finally {
      set({ isLogging: false });
    }
  },

  // ✅ Logout
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully", { autoClose: 1000 });
    } catch (error) {
      console.error("Logout Error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Logout failed", { autoClose: 1000 });
    }
  },
}));
