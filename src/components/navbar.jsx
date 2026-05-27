"use client";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Hammer } from "lucide-react";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-accent/10 bg-bg/80 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-cta flex items-center justify-center">
            <Hammer className="w-4 h-4 text-bg" />
          </div>
          <span className="font-heading font-bold text-xl text-white group-hover:text-cta transition-colors">
            BuildX
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#how" className="hover:text-white transition-colors">
            How it Works
          </a>
          <a href="#screens" className="hover:text-white transition-colors">
            Screens
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
