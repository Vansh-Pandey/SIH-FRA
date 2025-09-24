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
      role: user.role,
      avatar: user.avatar,
      bio: user.bio,
      socialLinks: user.socialLinks,
      stats: user.stats,
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
    const { username, role, avatar, bio, socialLinks, stats } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID." });
    }

    // Check if username already exists
    if (username) {
      const existingUser = await User.findOne({ username });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({ error: "Username already taken." });
      }
    }

    const updateData = {
      ...(username && { username }),
      ...(role && { role }),
      ...(avatar && { avatar }),
      ...(bio && { bio }),
      ...(socialLinks && { socialLinks }),
      ...(stats && { stats }),
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
