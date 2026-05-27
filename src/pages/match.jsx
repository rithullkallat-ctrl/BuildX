"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/providers";
import { teammates, filterTags } from "@/lib/mock-data";
import { Filter, UserPlus, Eye, Sparkles } from "lucide-react";

export default function MatchPage() {
  const [activeFilters, setActiveFilters] = useState([]);
  const [invitedIds, setInvitedIds] = useState([]);
  const { addToast } = useToast();

  const toggleFilter = (tag) => {
    setActiveFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredTeammates = activeFilters.length
    ? teammates.filter((t) =>
        activeFilters.some(
          (f) =>
            t.skills.includes(f) ||
            t.experience === f ||
            t.role.includes(f)
        )
      )
    : teammates;

  const handleInvite = (id, name) => {
    setInvitedIds((prev) => [...prev, id]);
    addToast(`Invitation sent to ${name}!`, "success");
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-heading text-3xl font-bold text-white mb-1">
          Matchmaker
        </h1>
        <p className="text-gray-400 text-sm">
          AI-powered teammate discovery for your next project.
        </p>
      </motion.div>

      {/* Info Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-5 bg-accent/10 border-accent/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cta" />
            </div>
            <div>
              <p className="text-white font-medium">
                We found {filteredTeammates.length} good matches for your next
                project
              </p>
              <p className="text-sm text-gray-400 mt-0.5">
                Based on your React, TypeScript, and Node.js skills.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Filter className="w-4 h-4" />
          <span>Filters:</span>
        </div>
        {filterTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleFilter(tag)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
              activeFilters.includes(tag)
                ? "bg-cta text-bg"
                : "bg-surface text-gray-400 border border-accent/20 hover:border-accent/40"
            }`}
          >
            {tag}
          </button>
        ))}
        {activeFilters.length > 0 && (
          <button
            onClick={() => setActiveFilters([])}
            className="text-xs text-gray-500 hover:text-white transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredTeammates.map((teammate, i) => (
            <motion.div
              key={teammate.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Card className="p-5 hover:border-accent/30 transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center font-heading font-bold text-cta text-sm">
                      {teammate.avatar}
                    </div>
                    <div>
                      <h3 className="font-medium text-white text-sm">
                        {teammate.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {teammate.college}
                      </p>
                    </div>
                  </div>
                  <Badge variant="cta" className="text-xs">
                    {teammate.match}% match
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {teammate.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-[10px]">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{teammate.role}</span>
                  <span>{teammate.experience}</span>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex-1 gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    className={`flex-1 gap-1.5 transition-all ${
                      invitedIds.includes(teammate.id)
                        ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                        : ""
                    }`}
                    onClick={() => handleInvite(teammate.id, teammate.name)}
                    disabled={invitedIds.includes(teammate.id)}
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    {invitedIds.includes(teammate.id) ? "Invited" : "Invite"}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredTeammates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-sm">
            No matches found with current filters.
          </p>
          <button
            onClick={() => setActiveFilters([])}
            className="text-cta text-sm mt-2 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
