import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Trophy, Terminal, Coins } from 'lucide-react';

const starter = `function twoSum(nums, target) {
  const map = new Map();

  for(let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];

    if(map.has(diff)) {
      return [map.get(diff), i];
    }

    map.set(nums[i], i);
  }
}`

export default function DuelPage(){
  const [timeLeft, setTimeLeft] = useState(900)
  const [running, setRunning] = useState(false)
  const [code, setCode] = useState(starter)
  const [output, setOutput] = useState('// Click run to execute your solution')
  const [yourScore, setYourScore] = useState(1200)
  const [enemyScore, setEnemyScore] = useState(1180)
  const [winner, setWinner] = useState(null)

  useEffect(() => {
    if(!running) return
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if(prev <= 1){
          clearInterval(timer)
          setRunning(false)
          setWinner(yourScore >= enemyScore ? 'You' : 'Jordan')
          return 0
        }
        return prev - 1
      })

      setEnemyScore(prev => prev + Math.floor(Math.random() * 8))
    }, 1000)

    return () => clearInterval(timer)
  }, [running, yourScore, enemyScore])

  const runCode = () => {
    setOutput('Running test cases...\n✓ Test Case 1 Passed\n✓ Test Case 2 Passed\n✓ Performance Accepted')
    setYourScore(prev => prev + 40)
  }

  const submitCode = () => {
    setYourScore(prev => prev + 120)
    setWinner('You')
    setRunning(false)
    setOutput('Submission Accepted! +120 XP\n+350 Coins added to your account.')
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Code Duel Arena</h1>
          <p className="text-gray-400">Real-time coding battles with rewards.</p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="cta">LIVE MATCH</Badge>
          <Button onClick={() => setRunning(true)} className="gap-2">
            <Play className="w-4 h-4" /> Start Duel
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="p-5">
          <p className="text-gray-400 text-sm mb-2">Your Score</p>
          <h2 className="text-5xl font-black text-white">{yourScore}</h2>
        </Card>

        <Card className="p-5">
          <p className="text-gray-400 text-sm mb-2">Opponent</p>
          <h2 className="text-5xl font-black text-white">{enemyScore}</h2>
        </Card>

        <Card className="p-5">
          <p className="text-gray-400 text-sm mb-2">Time Left</p>
          <h2 className="text-5xl font-black text-yellow-300">{Math.floor(timeLeft/60)}:{String(timeLeft%60).padStart(2,'0')}</h2>
        </Card>
      </div>

      {winner && (
        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1,y:0}}>
          <Card className="p-6 border-yellow-400/20 bg-yellow-500/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="text-yellow-300" />
              <div>
                <h2 className="text-2xl font-bold text-white">{winner} won the duel!</h2>
                <p className="text-gray-300">Rewards credited successfully.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-yellow-300 font-bold text-xl">
              <Coins /> +350
            </div>
          </Card>
        </motion.div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Problem</h2>
            <Badge>Easy</Badge>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Two Sum</h3>
            <p className="text-gray-400 leading-relaxed">
              Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
            </p>
          </div>

          <div className="bg-black/30 rounded-xl p-4 font-mono text-sm text-gray-300">
            Input: nums = [2,7,11,15], target = 9
            <br />
            Output: [0,1]
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-sm text-gray-400">Rewards</p>
            <div className="flex gap-6 mt-3">
              <div>
                <p className="text-2xl font-bold text-yellow-300">350</p>
                <p className="text-xs text-gray-500">Coins</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-cyan-300">120 XP</p>
                <p className="text-xs text-gray-500">Experience</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-0 overflow-hidden">
          <div className="border-b border-white/10 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <Terminal className="w-4 h-4" /> Playground
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={runCode}>Run</Button>
              <Button size="sm" onClick={submitCode}>Submit</Button>
            </div>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-[420px] bg-[#0d1117] text-green-300 p-5 font-mono outline-none resize-none"
          />

          <div className="border-t border-white/10 p-4 bg-black/40">
            <p className="text-xs text-gray-500 mb-2">Console Output</p>
            <pre className="text-sm text-gray-300 whitespace-pre-wrap">{output}</pre>
          </div>
        </Card>
      </div>
    </div>
  )
}
