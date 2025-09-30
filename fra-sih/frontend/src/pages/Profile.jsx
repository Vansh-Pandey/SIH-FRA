import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProfileStore } from "../store/useProfileStore";
import Boxes from "../components/ui/background-boxes";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { 
  User, 
  Edit3, 
  Save, 
  X, 
  MapPin, 
  Building, 
  Award, 
  Calendar,
  Shield,
  User2Icon
} from "lucide-react";

const Profile = () => {
  const { profile, getProfile, updateProfile, isFetchingProfile, isUpdatingProfile } =
    useProfileStore();

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  useEffect(() => {
    if (profile) setForm(profile);
  }, [profile]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    const success = await updateProfile(form);
    if (success) setEditMode(false);
  };

   

  if (isFetchingProfile) {
    return (
      <div className="relative w-screen min-h-screen overflow-hidden bg-black flex items-center justify-center">
        <Boxes className="absolute inset-0 z-0" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-20 text-center"
        >
          <div className="w-16 h-16 border-4 border-gray-600 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-lg font-semibold">Loading your profile...</p>
        </motion.div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="relative w-screen min-h-screen overflow-hidden bg-black flex items-center justify-center">
        <Boxes className="absolute inset-0 z-0" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-20 text-center text-white p-8"
        >
          <User className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <h2 className="text-2xl font-bold mb-2">Profile Not Found</h2>
          <p className="text-gray-600">We couldn't load your profile information.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative w-screen min-h-screen overflow-hidden bg-black">
      {/* Black Background */}
      <div className="absolute inset-0 bg-black z-0" />
      
      {/* Main Content */}
      <div className="relative z-20 pt-24 pb-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Profile Header Card */}
          <div className="bg-black border border-gray-800 rounded-2xl shadow-2xl overflow-hidden mb-8">
            <div className="relative h-32 bg-gradient-to-r from-gray-900 to-black">
              <div className="absolute -bottom-16 left-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative group"
                >
                  <img
                    src={"/default-avatar.png" }
                    alt={profile.fullName}
                    className="w-32 h-32 rounded-2xl border-4 border-black object-cover shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Edit3 className="w-6 h-6 text-white" />
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="pt-20 px-8 pb-8">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="flex-1">
                  {editMode ? (
                    <div className="space-y-4">
                      <Input
                        type="text"
                        name="fullName"
                        value={form.fullName || ""}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="bg-gray-900 border-gray-700 text-white text-xl font-bold"
                        disabled
                      />
                      <Input
                        type="text"
                        name="organization"
                        value={form.organization || ""}
                        onChange={handleChange}
                        placeholder="Organization"
                        className="bg-gray-900 border-gray-700 text-gray-300"
                      />
                      <Input
                        type="text"
                        name="bio"
                        value={form.bio || ""}
                        onChange={handleChange}
                        placeholder="Short Bio"
                        className="bg-gray-900 border-gray-700 text-gray-400"
                        multiline
                      />
                      <select
                        name="state"
                        value={form.state || "Other"}
                        onChange={handleChange}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                        disabled
                      >
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  ) : (
                    <div>
                      <h1 className="text-3xl font-bold text-white mb-2">{profile.fullName}</h1>
                      <p className="text-gray-300 text-lg flex items-center gap-2 mb-3">
                        <User2Icon className="w-5 h-5" />
                        {profile.fullName}
                      </p>
                      <p className="text-gray-300 text-lg flex items-center gap-2 mb-3">
                        <Shield className="w-5 h-5" />
                        {profile.role}
                      </p>
                      {/* <p className="text-gray-400 flex items-center gap-2 mb-2">
                        <Building className="w-4 h-4" />
                        {profile.organization}
                      </p> */}
                      <p className="text-gray-500 flex items-center gap-2 mb-3">
                        <MapPin className="w-4 h-4" />
                        {profile.state}
                      </p>
                      <p className="text-gray-400 mt-4">{profile.bio || "No bio provided."}</p>
                    </div>
                  )}
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  {editMode ? (
                    <div className="flex gap-3">
                      <Button
                        disabled={isUpdatingProfile}
                        onClick={handleUpdate}
                        className="bg-gray-800 hover:bg-gray-700 border border-gray-600 px-6 py-3 rounded-lg font-semibold"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {isUpdatingProfile ? "Saving..." : "Save Changes"}
                      </Button>
                      <Button
                        onClick={() => {
                          setForm(profile);
                          setEditMode(false);
                        }}
                        className="bg-gray-800 hover:bg-gray-700 border border-gray-600 px-6 py-3 rounded-lg font-semibold"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => setEditMode(true)}
                      className="bg-gray-800 hover:bg-gray-700 border border-gray-600 px-6 py-3 rounded-lg font-semibold"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </motion.div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
           
          {/* Content Tabs */}
          <div className="bg-black border border-gray-800 rounded-2xl overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-800">
              {["overview", "contributions", "activity", "settings"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-6 py-4 font-semibold transition-all duration-300 ${
                    activeTab === tab
                      ? "text-white border-b-2 border-white bg-gray-900"
                      : "text-gray-500 hover:text-gray-300 hover:bg-gray-900"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-bold text-white mb-4">Profile Overview</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-300">Personal Information</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between py-2 border-b border-gray-800">
                            <span className="text-gray-500">Full Name</span>
                            <span className="text-white">{profile.fullName || "Not provided"}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-800">
                            <span className="text-gray-500">Email</span>
                            <span className="text-white">{profile.email || "Not provided"}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-800">
                            <span className="text-gray-500">Phone</span>
                            <span className="text-white">{profile.phone || "Not provided"}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-800">
                            <span className="text-gray-500">Member since</span>
                            <span className="text-white">
                              {new Date(profile.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-300 mb-4">Recent Activity</h4>
                        <div className="space-y-3">
                          {profile.contributions?.slice(0, 3).map((contribution, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg">
                              <Award className="w-4 h-4 text-gray-400" />
                              <div>
                                <div className="text-white text-sm font-medium">{contribution.title}</div>
                                <div className="text-gray-500 text-xs">
                                  {new Date(contribution.date).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "contributions" && (
                  <motion.div
                    key="contributions"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-6">Your Contributions</h3>
                    <div className="space-y-4">
                      {profile.contributions && profile.contributions.length > 0 ? (
                        profile.contributions.map((contribution, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-600 transition-all duration-300 group"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <h4 className="text-lg font-semibold text-white group-hover:text-gray-300 transition-colors">
                                {contribution.title}
                              </h4>
                              <span className="px-3 py-1 bg-gray-800 text-gray-400 rounded-full text-sm font-medium">
                                {contribution.type || "Project"}
                              </span>
                            </div>
                            <p className="text-gray-400 mb-4">{contribution.description}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(contribution.date).toLocaleDateString()}
                                </span>
                                {contribution.location && (
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {contribution.location}
                                  </span>
                                )}
                              </div>
                              <span className="px-2 py-1 bg-gray-800 text-gray-400 rounded text-xs">
                                Completed
                              </span>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-center py-12">
                          <Award className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                          <h4 className="text-lg font-semibold text-gray-500 mb-2">No contributions yet</h4>
                          <p className="text-gray-600">Start contributing to see your achievements here.</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;