import mongoose from "mongoose";
import User from "../models/user.model.js";

/**
 * Get the authenticated user's profile
 */
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID." });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      organization: user.organization,
      bio: user.bio,
      profilePicture: user.profilePicture,
      state: user.state,
      contributions: user.contributions,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
};

/**
 * Update user profile
 */
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, fullName, role, organization, bio, profilePicture, state } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID." });
    }

    // Check if username already exists (and isn’t current user’s)
    if (username) {
      const existingUser = await User.findOne({ username });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({ error: "Username already taken." });
      }
    }

    const updateData = {
      ...(username && { username }),
      ...(fullName && { fullName }),
      ...(role && { role }),
      ...(organization && { organization }),
      ...(bio && { bio }),
      ...(profilePicture && { profilePicture }),
      ...(state && { state }),
      updatedAt: Date.now(),
    };

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
    });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    return res.status(500).json({
      error: error.message || "Internal server error.",
    });
  }
};
