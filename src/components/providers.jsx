"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ToastContext = createContext({
  addToast: () => {},
});

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(
    (message, type = "info") => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className={`px-4 py-3 rounded-lg shadow-lg text-sm font-medium pointer-events-auto ${
                toast.type === "success"
                  ? "bg-cta text-bg"
                  : "bg-surface text-white border border-accent/20"
              }`}
            >
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);

// ─── Auth Context ────────────────────────────────────────────────────
const AuthContext = createContext({
  user: null,
  login: () => {},
  signup: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("buildx_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((email, password) => {
    const mockUser = {
      id: "user_1",
      name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
      college: "MIT",
      avatar: "JD",
      bio: "Full-stack developer passionate about building things that matter.",
      skills: ["React", "TypeScript", "Node.js"],
      notifications: { email: true, push: false },
    };
    setUser(mockUser);
    localStorage.setItem("buildx_user", JSON.stringify(mockUser));
    return true;
  }, []);

  const signup = useCallback((name, email, password, college) => {
    const mockUser = {
      id: "user_" + Math.random().toString(36).slice(2, 8),
      name,
      email,
      college: college || "Unknown University",
      avatar: name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2),
      bio: "",
      skills: [],
      notifications: { email: true, push: false },
    };
    setUser(mockUser);
    localStorage.setItem("buildx_user", JSON.stringify(mockUser));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("buildx_user");
  }, []);

  const updateUser = useCallback((updates) => {
    setUser((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem("buildx_user", JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
