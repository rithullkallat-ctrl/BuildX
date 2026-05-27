"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Users,
  Zap,
  Trophy,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const Background3D = lazy(() => import("@/components/background-3d"));

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-bg">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-6">
              <Sparkles className="w-3 h-3 mr-1" />
              Now open for Fall 2026
            </Badge>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
              Build. <br />
              <span className="text-cta">Compete.</span> <br />
              Grow.
            </h1>
            <p className="text-lg text-gray-400 mb-8 max-w-md leading-relaxed">
              The matchmaking platform for college makers. Find teammates, duel on
              code challenges, and ship projects together.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/signup">
                <Button size="lg" className="gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" size="lg">
                  Open BuildX
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <Suspense
              fallback={
                <div className="w-full h-[400px] bg-surface/50 rounded-xl animate-pulse" />
              }
            >
              <Background3D />
            </Suspense>
          </motion.div>
        </div>
      </section>

      {/* Why BuildX */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" {...fadeInUp}>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Why BuildX?
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Everything you need to go from solo hacker to team builder.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Users,
              title: "AI Matchmaking",
              desc: "Get paired with complementary teammates based on skills, experience, and project interests.",
            },
            {
              icon: Zap,
              title: "Live Duels",
              desc: "Face off in real-time coding challenges. Climb the leaderboard and sharpen your skills.",
            },
            {
              icon: Trophy,
              title: "Mentor Network",
              desc: "Connect with alumni and industry mentors who've shipped products at top companies.",
            },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              {...fadeInUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full p-6 hover:border-accent/30 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
                  <feature.icon className="w-5 h-5 text-cta" />
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" {...fadeInUp}>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            How it works
          </h2>
          <p className="text-gray-400">Three steps to your next big project.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[16.666%] right-[16.666%] h-px bg-accent/20" />

          {[
            {
              step: "01",
              title: "Create Profile",
              desc: "Add your skills, past projects, and what you're looking to build next.",
            },
            {
              step: "02",
              title: "Find Teammates",
              desc: "Browse AI-curated matches or search by tech stack and experience level.",
            },
            {
              step: "03",
              title: "Start Building",
              desc: "Join a club, enter duels, earn certificates, and ship together.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              className="text-center relative"
              {...fadeInUp}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="w-12 h-12 rounded-full bg-surface border border-accent/20 flex items-center justify-center mx-auto mb-6 relative z-10">
                <span className="font-heading font-bold text-cta">
                  {item.step}
                </span>
              </div>
              <h3 className="font-heading text-lg font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm max-w-xs mx-auto">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Auth CTA Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div
          {...fadeInUp}
          className="relative overflow-hidden rounded-2xl bg-surface border border-accent/10 p-8 md:p-12"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-cta/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
                Ready to start building?
              </h2>
              <p className="text-gray-400 max-w-md">
                Join thousands of college makers already shipping projects on BuildX.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/signup">
                <Button size="lg" className="gap-2">
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" size="lg">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Screenshots */}
      <section id="screens" className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" {...fadeInUp}>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Screens from the app
          </h2>
          <p className="text-gray-400">
            Clean, focused interfaces designed for builders.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Dashboard",
              content: (
                <div className="space-y-3">
                  <div className="h-2 w-24 bg-accent/20 rounded" />
                  <div className="grid grid-cols-2 gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-16 bg-bg rounded-lg border border-accent/10"
                      />
                    ))}
                  </div>
                </div>
              ),
            },
            {
              title: "Matchmaker",
              content: (
                <div className="space-y-2">
                  <div className="flex gap-2 mb-3">
                    <div className="h-6 w-16 bg-accent/20 rounded-full" />
                    <div className="h-6 w-16 bg-accent/20 rounded-full" />
                  </div>
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-2 bg-bg rounded-lg border border-accent/10"
                    >
                      <div className="w-8 h-8 rounded-full bg-accent/30" />
                      <div className="flex-1 space-y-1">
                        <div className="h-2 w-20 bg-accent/20 rounded" />
                        <div className="h-2 w-12 bg-accent/10 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ),
            },
            {
              title: "Live Duel",
              content: (
                <div className="space-y-2">
                  <div className="flex justify-between items-center mb-2">
                    <div className="h-3 w-12 bg-accent/20 rounded" />
                    <div className="h-3 w-8 bg-cta/30 rounded" />
                    <div className="h-3 w-12 bg-accent/20 rounded" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-20 bg-bg rounded border border-accent/10 p-2">
                      <div className="h-1.5 w-full bg-accent/10 rounded mb-1" />
                      <div className="h-1.5 w-3/4 bg-accent/10 rounded" />
                    </div>
                    <div className="h-20 bg-bg rounded border border-accent/10 p-2">
                      <div className="h-1.5 w-full bg-accent/10 rounded mb-1" />
                      <div className="h-1.5 w-2/3 bg-accent/10 rounded" />
                    </div>
                  </div>
                </div>
              ),
            },
          ].map((screen, i) => (
            <motion.div key={screen.title} {...fadeInUp} transition={{ delay: i * 0.1 }}>
              <Card className="p-0 overflow-hidden">
                <div className="px-4 py-3 border-b border-accent/10 bg-bg/50 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                  </div>
                  <span className="text-xs text-gray-500 ml-2">
                    {screen.title}
                  </span>
                </div>
                <div className="p-4 bg-surface/50">{screen.content}</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-accent/10 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-cta flex items-center justify-center">
              <CheckCircle2 className="w-3 h-3 text-bg" />
            </div>
            <span className="font-heading font-bold text-white">BuildX</span>
          </div>
          <p className="text-sm text-gray-500">
            Built for college makers everywhere.
          </p>
        </div>
      </footer>
    </main>
  );
}
