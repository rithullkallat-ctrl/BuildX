"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { initialMessages, yourCode, opponentCode, duelHistory } from "@/lib/mock-data";
import { Play, Send, Swords, Clock, RotateCcw, Trophy } from "lucide-react";

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function SyntaxBlock({ code, lang }) {
  const lines = code.split("\n");
  const keywords = [
    "function", "const", "let", "var", "return", "if", "for", "def",
    "import", "from", "class", "new", "this", "else", "while", "try",
    "catch", "async", "await", "yield",
  ];
  const builtins = ["true", "false", "null", "undefined", "None", "self"];

  return (
    <div className="bg-bg rounded-lg border border-accent/10 overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-accent/10 bg-surface/50">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
        </div>
        <span className="text-[10px] text-gray-500 font-mono ml-2">{lang}</span>
      </div>
      <pre className="p-4 text-xs font-mono leading-relaxed overflow-x-auto">
        <code>
          {lines.map((line, i) => {
            let html = line
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;");
            keywords.forEach((kw) => {
              const re = new RegExp(`\\b${kw}\\b`, "g");
              html = html.replace(re, `<span class="text-cta">${kw}</span>`);
            });
            builtins.forEach((bi) => {
              const re = new RegExp(`\\b${bi}\\b`, "g");
              html = html.replace(re, `<span class="text-accent">${bi}</span>`);
            });
            html = html.replace(
              /('.*?'|".*?"|`.*?`)/g,
              '<span class="text-green-400/70">$1</span>'
            );
            html = html.replace(
              /(\d+)/g,
              '<span class="text-orange-300/70">$1</span>'
            );
            html = html.replace(
              /(\/\/.*$)/gm,
              '<span class="text-gray-600">$1</span>'
            );
            return (
              <div key={i} className="table-row">
                <span className="table-cell text-gray-600 select-none pr-4 text-right w-8">
                  {i + 1}
                </span>
                <span
                  className="table-cell text-gray-300 whitespace-pre"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </div>
            );
          })}
        </code>
      </pre>
    </div>
  );
}

export default function DuelPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [yourScore, setYourScore] = useState(1180);
  const [oppScore, setOppScore] = useState(1250);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [duelResult, setDuelResult] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          setDuelResult(yourScore > oppScore ? "win" : "loss");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startDuel = () => {
    setIsRunning(true);
    setTimeLeft(600);
    setDuelResult(null);
    setYourScore(1180);
    setOppScore(1250);
    setTimeout(() => {
      setYourScore(1240);
      setOppScore(1280);
    }, 2000);
    setTimeout(() => {
      setYourScore(1310);
      setOppScore(1290);
    }, 5000);
    setTimeout(() => {
      setYourScore(1380);
      setOppScore(1340);
    }, 8000);
  };

  const forfeitDuel = () => {
    setIsRunning(false);
    setDuelResult("forfeit");
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMsg = {
      id: Date.now(),
      user: "You",
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    setTimeout(() => {
      const replies = [
        "Nice approach!",
        "Wait, that edge case though...",
        "I'm almost done.",
        "Speed run! 🏃",
        "That optimization is clever!",
        "Mind if I borrow that logic?",
      ];
      const reply = {
        id: Date.now() + 1,
        user: "Jordan",
        text: replies[Math.floor(Math.random() * replies.length)],
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, reply]);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto h-[calc(100vh-7rem)] flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between shrink-0"
      >
        <div>
          <h1 className="font-heading text-3xl font-bold text-white mb-1">
            Live Duel
          </h1>
          <p className="text-gray-400 text-sm">
            Real-time algorithm showdown.
          </p>
        </div>
        <div className="flex gap-3">
          {!isRunning && !duelResult && (
            <Button onClick={startDuel} className="gap-2" size="lg">
              <Play className="w-4 h-4" />
              Start Demo Duel
            </Button>
          )}
          {isRunning && (
            <Button
              onClick={forfeitDuel}
              variant="danger"
              className="gap-2"
              size="lg"
            >
              <RotateCcw className="w-4 h-4" />
              Forfeit
            </Button>
          )}
          {duelResult && (
            <Button onClick={startDuel} className="gap-2" size="lg">
              <RotateCcw className="w-4 h-4" />
              Rematch
            </Button>
          )}
        </div>
      </motion.div>

      {/* Timer & Status */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="shrink-0"
      >
        <Card className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-cta" />
              <span
                className={`font-heading text-3xl font-bold tabular-nums ${
                  timeLeft < 60 ? "text-red-400" : "text-white"
                }`}
              >
                {formatTime(timeLeft)}
              </span>
            </div>
            <div className="h-8 w-px bg-accent/20" />
            <Badge
              variant={isRunning ? "cta" : duelResult ? (duelResult === "win" ? "success" : "danger") : "outline"}
              className="text-xs"
            >
              {isRunning ? "● Live" : duelResult ? (duelResult === "win" ? "Victory" : duelResult === "forfeit" ? "Forfeited" : "Defeat") : "Waiting"}
            </Badge>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="text-gray-400">
              Problem: <span className="text-white font-medium">Two Sum</span>
            </div>
            <div className="text-gray-400">
              Difficulty: <span className="text-green-400">Easy</span>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Duel Arena */}
      <div className="grid lg:grid-cols-2 gap-4 flex-1 min-h-0">
        {/* You */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col min-h-0"
        >
          <Card className="flex-1 flex flex-col overflow-hidden p-0">
            <div className="p-4 border-b border-accent/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cta/20 flex items-center justify-center text-xs font-bold text-cta">
                  JD
                </div>
                <div>
                  <p className="text-sm font-medium text-white">You</p>
                  <p className="text-xs text-gray-500">Full-stack</p>
                </div>
              </div>
              <motion.div
                className="font-heading text-2xl font-bold text-cta"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.3 }}
                key={yourScore}
              >
                {yourScore}
              </motion.div>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <SyntaxBlock code={yourCode} lang="javascript" />
            </div>
          </Card>
        </motion.div>

        {/* VS Divider */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <div className="w-10 h-10 rounded-full bg-surface border border-accent/20 flex items-center justify-center shadow-lg">
            <Swords className="w-4 h-4 text-cta" />
          </div>
        </div>

        {/* Opponent */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col min-h-0"
        >
          <Card className="flex-1 flex flex-col overflow-hidden p-0">
            <div className="p-4 border-b border-accent/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/30 flex items-center justify-center text-xs font-bold text-cta">
                  JL
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Jordan Lee</p>
                  <p className="text-xs text-gray-500">ML Engineer</p>
                </div>
              </div>
              <motion.div
                className="font-heading text-2xl font-bold text-white"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.3 }}
                key={oppScore}
              >
                {oppScore}
              </motion.div>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <SyntaxBlock code={opponentCode} lang="python" />
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Chat */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="shrink-0"
      >
        <Card className="p-0 overflow-hidden">
          <div className="p-3 border-b border-accent/10 bg-surface/50 flex items-center justify-between">
            <p className="text-xs font-medium text-gray-400">Duel Chat</p>
            {duelResult && (
              <Badge variant={duelResult === "win" ? "success" : "danger"}>
                {duelResult === "win" ? (
                  <><Trophy className="w-3 h-3 mr-1" /> You won!</>
                ) : (
                  "Duel ended"
                )}
              </Badge>
            )}
          </div>
          <div className="h-40 overflow-y-auto p-4 space-y-3">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${
                    msg.user === "You" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                      msg.user === "You"
                        ? "bg-cta text-bg"
                        : "bg-surface text-gray-300 border border-accent/10"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p
                      className={`text-[10px] mt-1 ${
                        msg.user === "You"
                          ? "text-bg/60"
                          : "text-gray-500"
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={chatEndRef} />
          </div>
          <form
            onSubmit={sendMessage}
            className="p-3 border-t border-accent/10 bg-surface/30 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-bg border border-accent/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent/40 transition-colors"
            />
            <Button type="submit" size="sm" className="gap-1.5">
              <Send className="w-3.5 h-3.5" />
            </Button>
          </form>
        </Card>
      </motion.div>

      {/* Duel History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="shrink-0"
      >
        <Card className="p-6">
          <h3 className="font-heading text-lg font-bold text-white mb-4">
            Recent Duels
          </h3>
          <div className="space-y-3">
            {duelHistory.map((duel) => (
              <div
                key={duel.id}
                className="flex items-center justify-between p-3 rounded-lg bg-bg border border-accent/10"
              >
                <div className="flex items-center gap-3">
                  <Badge
                    variant={duel.result === "Win" ? "success" : "danger"}
                    className="text-xs"
                  >
                    {duel.result}
                  </Badge>
                  <div>
                    <p className="text-sm text-white">{duel.problem}</p>
                    <p className="text-xs text-gray-500">
                      vs {duel.opponent} · {duel.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{duel.score}</p>
                  <p className="text-xs text-gray-500">{duel.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
