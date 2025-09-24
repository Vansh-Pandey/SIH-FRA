import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

// @desc    Register new user
// @route   POST /api/auth/signup 
// @access  Public
export const signup = async (req, res) => { 
  try {
    const { username, email, password, fullName, role, organization, bio, state } = req.body;

    // Validate inputs
    if (!username || !email || !password || !fullName) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long." });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered." });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      fullName,
      role ,
      organization:"",
      bio:"",
      state,
    });

    await newUser.save();

    // Generate JWT token in cookie
    generateToken(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      fullName: newUser.fullName,
      role: newUser.role,
      organization: newUser.organization,
      bio: newUser.bio,
      state: newUser.state,
      profilePicture: newUser.profilePicture,
    });
  } catch (error) {
    console.error("Error in signup controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "Invalid email or password." });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password." });

    // Generate JWT token
    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      organization: user.organization,
      bio: user.bio,
      state: user.state,
      profilePicture: user.profilePicture,
      contributions: user.contributions,
    });
  } catch (error) {
    console.error("Error in login controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    console.error("Error in logout controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { fullName, organization, bio, state, profilePicture } = req.body;

    let uploadUrl;

    // Upload profile picture to Cloudinary if provided
    if (profilePicture) {
      const uploadResponse = await cloudinary.uploader.upload(profilePicture, {
        folder: "fra_users",
        public_id: `profile_${userId}`,
        overwrite: true,
      });
      uploadUrl = uploadResponse.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullName,
        organization,
        bio,
        state,
        profilePicture: uploadUrl || undefined,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in updateProfile controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc    Check auth and return user data
// @route   GET /api/auth/check
// @access  Private
export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in checkAuth controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
