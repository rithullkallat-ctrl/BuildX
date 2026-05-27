"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/components/providers";
import { useToast } from "@/components/providers";
import { Hammer, ArrowLeft, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      addToast("Please fill in all fields", "info");
      return;
    }
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const success = login(email, password);
    if (success) {
      addToast("Welcome back to BuildX!", "success");
      navigate("/dashboard");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <Card className="p-8">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg bg-cta flex items-center justify-center">
              <Hammer className="w-5 h-5 text-bg" />
            </div>
            <span className="font-heading font-bold text-2xl text-white">
              BuildX
            </span>
          </div>

          <div className="text-center mb-8">
            <h1 className="font-heading text-2xl font-bold text-white mb-2">
              Welcome back
            </h1>
            <p className="text-sm text-gray-400">
              Sign in to your account to continue building
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Email address
              </label>
              <Input
                type="email"
                placeholder="you@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-accent/20 bg-bg text-cta focus:ring-cta/30"
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-cta hover:text-cta-hover transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-bg border-t-transparent rounded-full"
                />
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-cta hover:text-cta-hover font-medium transition-colors"
            >
              Sign up
            </Link>
          </div>

          <div className="mt-6 p-3 rounded-lg bg-accent/10 border border-accent/20">
            <p className="text-xs text-gray-400 text-center">
              Demo: Use any email and password to sign in
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
