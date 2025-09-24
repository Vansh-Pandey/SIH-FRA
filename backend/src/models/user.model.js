import mongoose from "mongoose";

// Define the schema for a User
const userSchema = new mongoose.Schema(
  {
    // Basic Authentication Info
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // don’t fetch password by default
    },

    // Profile Information
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["Admin", "Researcher", "GovOfficial", "Contributor", "User"],
      default: "User",
    },
    organization: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      maxlength: 300,
    },
    profilePicture: {
      type: String, // URL to image
      default: "none",
    },

    // FRA Atlas specific fields
    state: {
      type: String,
      enum: ["Madhya Pradesh", "Tripura", "Odisha", "Telangana", "Other"],
      default: "Other",
    },
    contributions: [
      {
        title: String, // e.g., "Digitized Claim Data"
        description: String,
        date: { type: Date, default: Date.now },
      },
    ],

    // User Stats / Activity
    lastLogin: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // auto-manages createdAt & updatedAt
);

// Export the User model
const User = mongoose.model("User", userSchema);
export default User;
