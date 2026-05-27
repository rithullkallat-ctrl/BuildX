"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/providers";
import { certificates, duelHistory } from "@/lib/mock-data";
import {
  Swords,
  Users,
  Rocket,
  GraduationCap,
  Zap,
  Trophy,
  Download,
  Share2,
  Lock,
  FileText,
  X,
  CheckCircle2,
  Star,
  TrendingUp,
  Calendar,
  Award,
} from "lucide-react";

const iconMap = {
  Swords,
  Users,
  Rocket,
  GraduationCap,
  Zap,
  Trophy,
};

export default function CertificatesPage() {
  const { addToast } = useToast();
  const [showReport, setShowReport] = useState(false);
  const earned = certificates.filter((c) => c.earned);
  const inProgress = certificates.filter((c) => !c.earned);

  const handleShare = (title) => {
    addToast(`Shared "${title}" to your profile!`, "success");
  };

  const handleDownload = (title) => {
    addToast(`Downloaded "${title}" certificate!`, "success");
  };

  // Generate report data
  const totalDuels = duelHistory.length;
  const wins = duelHistory.filter((d) => d.result === "Win").length;
  const winRate = totalDuels > 0 ? Math.round((wins / totalDuels) * 100) : 0;
  const totalCertificates = earned.length;
  const inProgressCount = inProgress.length;
  const memberSince = "October 2025";
  const currentStreak = 5;
  const totalMatches = 12;

  const handleGenerateReport = () => {
    setShowReport(true);
    addToast("Achievement report generated!", "success");
  };

  const handleDownloadReport = () => {
    const reportData = {
      name: "BuildX Member",
      memberSince,
      currentStreak,
      totalDuels,
      wins,
      winRate,
      totalCertificates,
      inProgressCount,
      totalMatches,
      earnedCertificates: earned.map((c) => c.title),
      recentDuels: duelHistory,
      generatedAt: new Date().toLocaleString(),
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "buildx-achievement-report.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    addToast("Report downloaded as JSON!", "success");
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-bold text-white mb-1">
              Certificates
            </h1>
            <p className="text-gray-400 text-sm">
              Track your achievements and progress.
            </p>
          </div>
          <Button
            onClick={handleGenerateReport}
            className="gap-2"
            size="sm"
          >
            <FileText className="w-4 h-4" />
            Generate Achievement Report
          </Button>
        </div>
      </motion.div>

      {/* Achievement Report Modal */}
      <AnimatePresence>
        {showReport && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6 border-cta/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cta/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-cta" />
                  </div>
                  <div>
                    <h2 className="font-heading text-xl font-bold text-white">
                      Achievement Report
                    </h2>
                    <p className="text-xs text-gray-400">
                      Generated on {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="gap-1.5"
                    onClick={handleDownloadReport}
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </Button>
                  <button
                    onClick={() => setShowReport(false)}
                    className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-bg border border-accent/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-cta" />
                    <span className="text-xs text-gray-400">Member Since</span>
                  </div>
                  <p className="font-heading text-lg font-bold text-white">{memberSince}</p>
                </div>
                <div className="p-4 rounded-lg bg-bg border border-accent/10">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-gray-400">Win Rate</span>
                  </div>
                  <p className="font-heading text-lg font-bold text-white">{winRate}%</p>
                </div>
                <div className="p-4 rounded-lg bg-bg border border-accent/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs text-gray-400">Certificates</span>
                  </div>
                  <p className="font-heading text-lg font-bold text-white">{totalCertificates}</p>
                </div>
                <div className="p-4 rounded-lg bg-bg border border-accent/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-cta" />
                    <span className="text-xs text-gray-400">Streak</span>
                  </div>
                  <p className="font-heading text-lg font-bold text-white">{currentStreak} days</p>
                </div>
              </div>

              {/* Detailed Stats */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-bg border border-accent/10">
                  <h3 className="font-heading text-sm font-bold text-white mb-3">
                    Duel Performance
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Total Duels</span>
                      <span className="text-white font-medium">{totalDuels}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Wins</span>
                      <span className="text-green-400 font-medium">{wins}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Losses</span>
                      <span className="text-red-400 font-medium">{totalDuels - wins}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Best Score</span>
                      <span className="text-cta font-medium">1450</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-bg border border-accent/10">
                  <h3 className="font-heading text-sm font-bold text-white mb-3">
                    Community Impact
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Teammate Matches</span>
                      <span className="text-white font-medium">{totalMatches}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Certificates Earned</span>
                      <span className="text-green-400 font-medium">{totalCertificates}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">In Progress</span>
                      <span className="text-yellow-400 font-medium">{inProgressCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Mentor Sessions</span>
                      <span className="text-white font-medium">2</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Earned Certificates List */}
              <div className="p-4 rounded-lg bg-bg border border-accent/10 mb-6">
                <h3 className="font-heading text-sm font-bold text-white mb-3">
                  Earned Certificates
                </h3>
                <div className="space-y-2">
                  {earned.map((cert) => (
                    <div key={cert.id} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                      <span className="text-sm text-white">{cert.title}</span>
                      <span className="text-xs text-gray-500 ml-auto">{cert.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Duel History */}
              <div className="p-4 rounded-lg bg-bg border border-accent/10">
                <h3 className="font-heading text-sm font-bold text-white mb-3">
                  Recent Duel History
                </h3>
                <div className="space-y-2">
                  {duelHistory.map((duel) => (
                    <div key={duel.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={duel.result === "Win" ? "success" : "danger"}
                          className="text-[10px]"
                        >
                          {duel.result}
                        </Badge>
                        <span className="text-white">{duel.problem}</span>
                        <span className="text-gray-500">vs {duel.opponent}</span>
                      </div>
                      <span className="text-gray-500">{duel.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Earned Certificates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="font-heading text-lg font-bold text-white mb-4">
          Earned ({earned.length})
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {earned.map((cert, i) => {
            const Icon = iconMap[cert.icon] || Trophy;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-5 hover:border-accent/30 transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-cta/20 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-cta" />
                    </div>
                    <Badge variant="success" className="text-xs">
                      Earned
                    </Badge>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-white mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">
                    {cert.description}
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    Earned on {cert.date}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex-1 gap-1.5"
                      onClick={() => handleShare(cert.title)}
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      Share
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 gap-1.5"
                      onClick={() => handleDownload(cert.title)}
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* In Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="font-heading text-lg font-bold text-white mb-4">
          In Progress ({inProgress.length})
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {inProgress.map((cert, i) => {
            const Icon = iconMap[cert.icon] || Trophy;
            const progressPercent = (cert.progress / cert.total) * 100;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <Card className="p-5 opacity-75 hover:opacity-100 transition-opacity">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-gray-500" />
                    </div>
                    <Lock className="w-4 h-4 text-gray-500" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-white mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">
                    {cert.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Progress</span>
                      <span>
                        {cert.progress}/{cert.total}
                      </span>
                    </div>
                    <div className="h-2 bg-bg rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-cta rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
