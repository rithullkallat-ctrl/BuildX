import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Coins, Gift, Flame, Crown, Zap } from 'lucide-react';

const rewards = [
  { title: 'Gaming Keyboard', cost: 5000, rarity: 'Legendary' },
  { title: 'GitHub Pro', cost: 2500, rarity: 'Epic' },
  { title: 'Hackathon Pass', cost: 1800, rarity: 'Rare' },
  { title: 'BuildX Hoodie', cost: 1200, rarity: 'Rare' },
  { title: 'Sticker Pack', cost: 400, rarity: 'Common' },
  { title: 'Steam Gift Card', cost: 3200, rarity: 'Epic' },
];

const leaderboard = [
  ['rk', 12450],
  ['Jordan', 11320],
  ['Nova', 10110],
  ['Cipher', 9850],
];

export default function RewardsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}>
        <h1 className="text-4xl font-bold text-white mb-2">Rewards Arena</h1>
        <p className="text-gray-400">Win duels. Earn coins. Unlock jackpot rewards.</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-8 relative overflow-hidden bg-gradient-to-br from-yellow-500/20 to-orange-500/10 border-yellow-400/20">
          <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-400/10 blur-3xl rounded-full" />
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="text-yellow-300" />
            <Badge variant="cta">LIVE JACKPOT</Badge>
          </div>
          <h2 className="text-6xl font-black text-white mb-2">₹50,000</h2>
          <p className="text-gray-300 max-w-xl">Weekly jackpot inspired by Hack Club reward systems. Top duel winners and streak grinders enter the spin automatically.</p>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-black/20 rounded-xl p-4">
              <Coins className="mb-2 text-yellow-200" />
              <p className="text-2xl font-bold text-white">12,450</p>
              <p className="text-xs text-gray-400">Your Coins</p>
            </div>
            <div className="bg-black/20 rounded-xl p-4">
              <Flame className="mb-2 text-orange-300" />
              <p className="text-2xl font-bold text-white">18</p>
              <p className="text-xs text-gray-400">Win Streak</p>
            </div>
            <div className="bg-black/20 rounded-xl p-4">
              <Zap className="mb-2 text-cyan-300" />
              <p className="text-2xl font-bold text-white">Diamond</p>
              <p className="text-xs text-gray-400">Current Rank</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Crown className="text-yellow-300" />
            <h3 className="text-xl font-bold text-white">Leaderboard</h3>
          </div>

          <div className="space-y-3">
            {leaderboard.map((user, index) => (
              <div key={user[0]} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <div>
                  <p className="text-white font-medium">#{index + 1} {user[0]}</p>
                  <p className="text-xs text-gray-400">Elite Duelist</p>
                </div>
                <Badge>{user[1]} XP</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Reward Marketplace</h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {rewards.map((reward) => (
            <motion.div whileHover={{y:-5}} key={reward.title}>
              <Card className="p-5 h-full bg-gradient-to-b from-white/5 to-transparent border border-white/10">
                <div className="flex items-center justify-between mb-5">
                  <Gift className="text-cta" />
                  <Badge variant="outline">{reward.rarity}</Badge>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{reward.title}</h3>
                <p className="text-3xl font-black text-yellow-300">{reward.cost}</p>
                <p className="text-xs text-gray-400 mt-1">coins required</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
