"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/providers";
import { useAuth } from "@/components/providers";
import {
  User,
  Bell,
  Shield,
  Trash2,
  X,
  Plus,
  Save,
  AlertTriangle,
} from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "account", label: "Account", icon: Shield },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { user, updateUser, logout } = useAuth();
  const { addToast } = useToast();

  // Profile state
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [college, setCollege] = useState(user?.college || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [skills, setSkills] = useState(user?.skills || []);
  const [newSkill, setNewSkill] = useState("");

  // Notifications state
  const [emailNotif, setEmailNotif] = useState(
    user?.notifications?.email ?? true
  );
  const [pushNotif, setPushNotif] = useState(
    user?.notifications?.push ?? false
  );

  // Account state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSaveProfile = () => {
    updateUser({ name, email, college, bio, skills });
    addToast("Profile updated successfully!", "success");
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (skills.includes(newSkill.trim())) {
      addToast("Skill already exists", "info");
      return;
    }
    setSkills((prev) => [...prev, newSkill.trim()]);
    setNewSkill("");
  };

  const handleRemoveSkill = (skill) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleSaveNotifications = () => {
    updateUser({
      notifications: { email: emailNotif, push: pushNotif },
    });
    addToast("Notification preferences saved!", "success");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      addToast("Passwords do not match", "info");
      return;
    }
    if (newPassword.length < 6) {
      addToast("Password must be at least 6 characters", "info");
      return;
    }
    addToast("Password changed successfully!", "success");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const handleDeleteAccount = () => {
    addToast("Account deleted. We're sorry to see you go.", "info");
    logout();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-heading text-3xl font-bold text-white mb-1">
          Settings
        </h1>
        <p className="text-gray-400 text-sm">
          Manage your profile, notifications, and account.
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="md:w-48 shrink-0"
        >
          <Card className="p-2">
            <div className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-accent/20 text-cta"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Card className="p-6">
                  <h2 className="font-heading text-lg font-bold text-white mb-6">
                    Profile Information
                  </h2>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Full name
                      </label>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Email address
                      </label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@university.edu"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        College / University
                      </label>
                      <Input
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                        placeholder="MIT, Stanford, etc."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Bio
                      </label>
                      <Textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell us about yourself..."
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Skills
                      </label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {skills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent/20 text-cta text-xs"
                          >
                            {skill}
                            <button
                              onClick={() => handleRemoveSkill(skill)}
                              className="hover:text-white transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <form
                        onSubmit={handleAddSkill}
                        className="flex gap-2"
                      >
                        <Input
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          placeholder="Add a skill..."
                          className="flex-1"
                        />
                        <Button type="submit" size="sm" className="gap-1.5">
                          <Plus className="w-3.5 h-3.5" />
                          Add
                        </Button>
                      </form>
                    </div>
                    <Button
                      onClick={handleSaveProfile}
                      className="gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Card className="p-6">
                  <h2 className="font-heading text-lg font-bold text-white mb-6">
                    Notification Preferences
                  </h2>
                  <div className="space-y-6">
                    <Switch
                      label="Email Notifications"
                      description="Receive updates about matches, duels, and mentor requests via email."
                      checked={emailNotif}
                      onCheckedChange={setEmailNotif}
                    />
                    <div className="h-px bg-accent/10" />
                    <Switch
                      label="Push Notifications"
                      description="Get real-time browser notifications for important events."
                      checked={pushNotif}
                      onCheckedChange={setPushNotif}
                    />
                    <div className="h-px bg-accent/10" />
                    <Button
                      onClick={handleSaveNotifications}
                      className="gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save Preferences
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Account Tab */}
            {activeTab === "account" && (
              <motion.div
                key="account"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <Card className="p-6">
                  <h2 className="font-heading text-lg font-bold text-white mb-6">
                    Change Password
                  </h2>
                  <form onSubmit={handleChangePassword} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Current password
                      </label>
                      <Input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        New password
                      </label>
                      <Input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Min 6 characters"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Confirm new password
                      </label>
                      <Input
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        placeholder="Repeat new password"
                      />
                    </div>
                    <Button type="submit" className="gap-2">
                      <Save className="w-4 h-4" />
                      Update Password
                    </Button>
                  </form>
                </Card>

                <Card className="p-6 border-red-500/20">
                  <h2 className="font-heading text-lg font-bold text-red-400 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Danger Zone
                  </h2>
                  <p className="text-sm text-gray-400 mb-4">
                    Once you delete your account, there is no going back. This
                    action cannot be undone.
                  </p>
                  {!showDeleteConfirm ? (
                    <Button
                      variant="danger"
                      onClick={() => setShowDeleteConfirm(true)}
                      className="gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Account
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm text-red-400">
                        Are you sure? This will permanently delete your account
                        and all associated data.
                      </p>
                      <div className="flex gap-3">
                        <Button
                          variant="secondary"
                          onClick={() => setShowDeleteConfirm(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="danger"
                          onClick={handleDeleteAccount}
                          className="gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Yes, delete my account
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
