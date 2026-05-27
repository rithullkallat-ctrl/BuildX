"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/providers";
import { mentors } from "@/lib/mock-data";
import { Search, GraduationCap, MessageSquare, CheckCircle2 } from "lucide-react";

export default function MentorPage() {
  const [search, setSearch] = useState("");
  const [requestedIds, setRequestedIds] = useState([]);
  const { addToast } = useToast();

  const filteredMentors = mentors.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.company.toLowerCase().includes(search.toLowerCase()) ||
      m.expertise.some((e) =>
        e.toLowerCase().includes(search.toLowerCase())
      )
  );

  const handleRequest = (id, name) => {
    setRequestedIds((prev) => [...prev, id]);
    addToast(`Mentorship request sent to ${name}!`, "success");
  };

  const availabilityColor = (status) => {
    switch (status) {
      case "Available": return "success";
      case "Limited": return "warning";
      case "Busy": return "danger";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-heading text-3xl font-bold text-white mb-1">
          Mentor Network
        </h1>
        <p className="text-gray-400 text-sm">
          Learn from industry leaders who've shipped at top companies.
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search by name, company, or expertise..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>
      </motion.div>

      {/* Mentors Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredMentors.map((mentor, i) => (
            <motion.div
              key={mentor.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Card className="p-5 hover:border-accent/30 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-accent/30 flex items-center justify-center font-heading font-bold text-cta text-lg">
                      {mentor.avatar}
                    </div>
                    <div>
                      <h3 className="font-medium text-white text-sm">
                        {mentor.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {mentor.role} @ {mentor.company}
                      </p>
                    </div>
                  </div>
                  <Badge variant={availabilityColor(mentor.availability)} className="text-xs">
                    {mentor.availability}
                  </Badge>
                </div>

                <p className="text-sm text-gray-400 mb-4 flex-1">
                  {mentor.bio}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {mentor.expertise.map((exp) => (
                    <Badge key={exp} variant="outline" className="text-[10px]">
                      {exp}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="flex-1 gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    Message
                  </Button>
                  <Button
                    size="sm"
                    className={`flex-1 gap-1.5 transition-all ${
                      requestedIds.includes(mentor.id)
                        ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                        : ""
                    }`}
                    onClick={() => handleRequest(mentor.id, mentor.name)}
                    disabled={requestedIds.includes(mentor.id)}
                  >
                    {requestedIds.includes(mentor.id) ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Requested
                      </>
                    ) : (
                      <>
                        <GraduationCap className="w-3.5 h-3.5" />
                        Request
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredMentors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-sm">
            No mentors found matching "{search}".
          </p>
          <button
            onClick={() => setSearch("")}
            className="text-cta text-sm mt-2 hover:underline"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
