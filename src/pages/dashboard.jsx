"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/providers";
import {
  Users,
  Calendar,
  Handshake,
  Swords,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Plus,
  Edit3,
  X,
  Check,
  Hammer,
  Globe,
  MapPin,
} from "lucide-react";

const stats = [
  {
    label: "Total Members",
    value: "142",
    change: "+12%",
    trend: "up",
    icon: Users,
  },
  {
    label: "Events This Month",
    value: "8",
    change: "+3",
    trend: "up",
    icon: Calendar,
  },
  {
    label: "Matches Found",
    value: "34",
    change: "+5",
    trend: "up",
    icon: Handshake,
  },
  {
    label: "Duels Played",
    value: "127",
    change: "-2%",
    trend: "down",
    icon: Swords,
  },
];

const activities = [
  { action: "New match with Alex Chen", time: "2 min ago", type: "match" },
  { action: "Completed duel: Two Sum", time: "15 min ago", type: "duel" },
  { action: "Joined MIT Hackers club", time: "1 hr ago", type: "club" },
  { action: "Earned 'First Blood' badge", time: "3 hr ago", type: "badge" },
];

const activityBars = [40, 65, 30, 80, 55, 90, 45, 70, 35, 60, 85, 50];

export default function DashboardPage() {
  const { addToast } = useToast();

  // Club management state
  const [userClubs, setUserClubs] = useState(() => {
    const saved = localStorage.getItem("buildx_clubs");
    return saved ? JSON.parse(saved) : [];
  });
  const [showFormClub, setShowFormClub] = useState(false);
  const [showManageClub, setShowManageClub] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);

  // Form fields
  const [clubName, setClubName] = useState("");
  const [clubDescription, setClubDescription] = useState("");
  const [clubLocation, setClubLocation] = useState("");
  const [clubWebsite, setClubWebsite] = useState("");

  // Manage fields
  const [manageName, setManageName] = useState("");
  const [manageDescription, setManageDescription] = useState("");
  const [manageLocation, setManageLocation] = useState("");
  const [manageWebsite, setManageWebsite] = useState("");

  const saveClubs = (newClubs) => {
    setUserClubs(newClubs);
    localStorage.setItem("buildx_clubs", JSON.stringify(newClubs));
  };

  const handleCreateClub = (e) => {
    e.preventDefault();
    if (!clubName.trim()) {
      addToast("Club name is required", "info");
      return;
    }
    const newClub = {
      id: Date.now(),
      name: clubName.trim(),
      description: clubDescription.trim(),
      location: clubLocation.trim(),
      website: clubWebsite.trim(),
      members: 1,
      events: 0,
      matches: 0,
      createdAt: new Date().toLocaleDateString(),
    };
    saveClubs([...userClubs, newClub]);
    addToast(`Club "${newClub.name}" created successfully!`, "success");
    setClubName("");
    setClubDescription("");
    setClubLocation("");
    setClubWebsite("");
    setShowFormClub(false);
  };

  const handleOpenManage = (club) => {
    setSelectedClub(club);
    setManageName(club.name);
    setManageDescription(club.description || "");
    setManageLocation(club.location || "");
    setManageWebsite(club.website || "");
    setShowManageClub(true);
    setShowFormClub(false);
  };

  const handleSaveManage = (e) => {
    e.preventDefault();
    if (!manageName.trim()) {
      addToast("Club name is required", "info");
      return;
    }
    const updated = userClubs.map((c) =>
      c.id === selectedClub.id
        ? {
            ...c,
            name: manageName.trim(),
            description: manageDescription.trim(),
            location: manageLocation.trim(),
            website: manageWebsite.trim(),
          }
        : c
    );
    saveClubs(updated);
    addToast(`Club "${manageName.trim()}" updated successfully!`, "success");
    setShowManageClub(false);
    setSelectedClub(null);
  };

  const handleDeleteClub = (clubId) => {
    const updated = userClubs.filter((c) => c.id !== clubId);
    saveClubs(updated);
    addToast("Club deleted", "info");
    setShowManageClub(false);
    setSelectedClub(null);
  };

  const hasClubs = userClubs.length > 0;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-heading text-3xl font-bold text-white mb-1">
          Overview
        </h1>
        <p className="text-gray-400 text-sm">
          Here's what's happening in your club.
        </p>
      </motion.div>

      {/* Club Action Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Hammer className="w-5 h-5 text-cta" />
              </div>
              <div>
                <p className="text-white font-medium">
                  {hasClubs ? `You manage ${userClubs.length} club${userClubs.length > 1 ? "s" : ""}` : "No clubs yet"}
                </p>
                <p className="text-xs text-gray-400">
                  {hasClubs
                    ? "Select a club to manage or create a new one"
                    : "Start by forming your first club"}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              {hasClubs && (
                <div className="flex gap-2">
                  {userClubs.map((club) => (
                    <button
                      key={club.id}
                      onClick={() => handleOpenManage(club)}
                      className="px-3 py-1.5 rounded-lg bg-accent/20 text-cta text-xs font-medium hover:bg-accent/30 transition-colors flex items-center gap-1.5"
                    >
                      <Edit3 className="w-3 h-3" />
                      {club.name}
                    </button>
                  ))}
                </div>
              )}
              <Button
                size="sm"
                className="gap-1.5"
                onClick={() => {
                  setShowFormClub(!showFormClub);
                  setShowManageClub(false);
                }}
              >
                <Plus className="w-3.5 h-3.5" />
                {showFormClub ? "Cancel" : "Form a Club"}
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Form a Club Panel */}
      <AnimatePresence>
        {showFormClub && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-lg font-bold text-white">
                  Form a New Club
                </h2>
                <button
                  onClick={() => setShowFormClub(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={handleCreateClub} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Club Name *
                    </label>
                    <Input
                      value={clubName}
                      onChange={(e) => setClubName(e.target.value)}
                      placeholder="e.g., MIT Hackers"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input
                        value={clubLocation}
                        onChange={(e) => setClubLocation(e.target.value)}
                        placeholder="Cambridge, MA"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Description
                  </label>
                  <textarea
                    value={clubDescription}
                    onChange={(e) => setClubDescription(e.target.value)}
                    placeholder="What is your club about? What projects do you build?"
                    rows={3}
                    className="flex w-full rounded-lg border border-accent/20 bg-bg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cta/30 focus:border-cta/50 transition-colors resize-y"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Website
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                      value={clubWebsite}
                      onChange={(e) => setClubWebsite(e.target.value)}
                      placeholder="https://your-club.edu"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button type="submit" className="gap-2">
                    <Check className="w-4 h-4" />
                    Create Club
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setShowFormClub(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manage Club Panel */}
      <AnimatePresence>
        {showManageClub && selectedClub && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-lg font-bold text-white">
                  Manage: {selectedClub.name}
                </h2>
                <button
                  onClick={() => setShowManageClub(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={handleSaveManage} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Club Name *
                    </label>
                    <Input
                      value={manageName}
                      onChange={(e) => setManageName(e.target.value)}
                      placeholder="e.g., MIT Hackers"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input
                        value={manageLocation}
                        onChange={(e) => setManageLocation(e.target.value)}
                        placeholder="Cambridge, MA"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Description
                  </label>
                  <textarea
                    value={manageDescription}
                    onChange={(e) => setManageDescription(e.target.value)}
                    placeholder="What is your club about?"
                    rows={3}
                    className="flex w-full rounded-lg border border-accent/20 bg-bg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cta/30 focus:border-cta/50 transition-colors resize-y"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Website
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                      value={manageWebsite}
                      onChange={(e) => setManageWebsite(e.target.value)}
                      placeholder="https://your-club.edu"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button type="submit" className="gap-2">
                    <Check className="w-4 h-4" />
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setShowManageClub(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="danger"
                    className="gap-2 ml-auto"
                    onClick={() => handleDeleteClub(selectedClub.id)}
                  >
                    <X className="w-4 h-4" />
                    Delete Club
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* My Clubs List */}
      {hasClubs && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-heading text-lg font-bold text-white mb-4">
            My Clubs
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userClubs.map((club, i) => (
              <motion.div
                key={club.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-5 hover:border-accent/30 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                      <Hammer className="w-5 h-5 text-cta" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {club.members} members
                    </Badge>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-white mb-1">
                    {club.name}
                  </h3>
                  {club.description && (
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                      {club.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    {club.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {club.location}
                      </span>
                    )}
                    <span>Created {club.createdAt}</span>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full gap-1.5"
                    onClick={() => handleOpenManage(club)}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Manage Club
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="w-9 h-9 rounded-lg bg-accent/20 flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-cta" />
                </div>
                <Badge
                  variant={stat.trend === "up" ? "default" : "outline"}
                  className="text-xs"
                >
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {stat.change}
                </Badge>
              </div>
              <div className="font-heading text-2xl font-bold text-white mb-0.5">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-heading text-lg font-bold text-white">
                  Activity
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Duel submissions over the last 12 weeks
                </p>
              </div>
              <button className="text-xs text-cta hover:text-cta-hover flex items-center gap-1 transition-colors">
                View all <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
            <div className="flex items-end gap-3 h-40">
              {activityBars.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    className="w-full bg-accent/30 rounded-t-sm hover:bg-cta/40 transition-colors"
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.8, delay: i * 0.05 }}
                  />
                  <span className="text-[10px] text-gray-600">
                    W{i + 1}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6 h-full">
            <h3 className="font-heading text-lg font-bold text-white mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {activities.map((activity, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 pb-4 last:pb-0 last:border-0 border-b border-accent/10"
                >
                  <div className="w-2 h-2 rounded-full bg-cta mt-1.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-300 leading-snug">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
