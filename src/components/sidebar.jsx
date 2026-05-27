"use client";

import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "./providers";
import {
  LayoutDashboard,
  Users,
  Swords,
  GraduationCap,
  Award,
  Settings,
  Hammer,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/match", label: "Matchmaker", icon: Users },
  { href: "/duel", label: "Duels", icon: Swords },
  { href: "/mentor", label: "Mentor", icon: GraduationCap },
  { href: "/certificates", label: "Certificates", icon: Award },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 bg-surface border-r border-accent/10 flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-accent/10">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cta flex items-center justify-center">
            <Hammer className="w-4 h-4 text-bg" />
          </div>
          <span className="font-heading font-bold text-lg text-white">
            BuildX
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-accent/20 text-cta"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-accent/10 space-y-3">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-accent/30 flex items-center justify-center text-xs font-medium text-cta">
            {user?.avatar || "JD"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user?.name || "John Doe"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.college || "MIT Hackers"}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all w-full"
        >
          <LogOut className="w-4 h-4" />
          Log out
        </button>
      </div>
    </aside>
  );
}
