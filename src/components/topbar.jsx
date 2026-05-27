"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Bell, Search } from "lucide-react";
import { clubs } from "@/lib/mock-data";

export default function Topbar() {
  const [selectedClub, setSelectedClub] = useState(clubs[0]);
  const [open, setOpen] = useState(false);

  return (
    <header className="h-16 bg-surface/50 border-b border-accent/10 flex items-center justify-between px-6 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg border border-accent/20 text-sm text-white hover:border-accent/40 transition-colors"
          >
            <span className="font-medium">{selectedClub.name}</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="absolute top-full left-0 mt-2 w-56 bg-surface border border-accent/20 rounded-lg shadow-xl overflow-hidden z-50"
              >
                {clubs.map((club) => (
                  <button
                    key={club.id}
                    onClick={() => {
                      setSelectedClub(club);
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <div className="font-medium">{club.name}</div>
                    <div className="text-xs text-gray-500">
                      {club.members} members
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg border border-accent/20 text-sm text-gray-400">
          <Search className="w-4 h-4" />
          <span className="text-xs">Search...</span>
        </div>
        <button className="relative p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cta rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-full bg-accent/30 flex items-center justify-center text-xs font-medium text-cta">
          JD
        </div>
      </div>
    </header>
  );
}
