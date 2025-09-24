import { axiosInstance } from "../lib/axios";
import { create } from "zustand";
import { toast } from "react-toastify";

export const useProfileStore = create((set) => ({
  profile: null,
  isFetchingProfile: false, 
  isUpdatingProfile: false,

  // ✅ Get current user's profile
  getProfile: async () => {
    set({ isFetchingProfile: true });
    try {
      const res = await axiosInstance.get("/profile");
      set({ profile: res.data });
    } catch (error) {
      console.error("Error fetching profile:", error.response?.data?.error || error.message);
      toast.error(error.response?.data?.error || "Failed to fetch profile", { autoClose: 1000 });
    } finally {
      set({ isFetchingProfile: false });
    }
  },

  // ✅ Update user profile
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.patch("/profile/update", data);
      set({ profile: res.data.user }); // updated user returned
      toast.success("Profile updated successfully", { autoClose: 1000 });

      await new Promise((resolve) => setTimeout(resolve, 1000));
      return true;
    } catch (error) {
      console.error("Error updating profile:", error.response?.data?.error || error.message);
      toast.error(error.response?.data?.error || "Failed to update profile", { autoClose: 1000 });
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
