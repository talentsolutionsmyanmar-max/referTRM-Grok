'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Sparkles, Flame, Zap, DollarSign, Users, BookOpen, Briefcase, 
  ChevronRight, PlayCircle 
} from 'lucide-react'

// Mock user + drops (replace with real data later)
const mockUser = {
  name: 'Ma Thida',
  trinity: 'Pisces-Rabbit-2',
  streak: 7,
  xp: 245,
  earnings: 15000,
}

const mockDrops = [
  {
    id: 1,
    title: "The 3-word email that gets replies",
    duration: "45 sec",
    trinityTip: "Your Rabbit patience makes soft asks irresistible",
    type: "audio", // or "video"
  },
  {
    id: 2,
    title: "Sunday power tip for Pisces",
    duration: "60 sec",
    trinityTip: "Intuition peaks today — trust your first feeling",
    type: "audio",
  },
  {
    id: 3,
    title: "Quick objection handler",
    duration: "50 sec",
    trinityTip: "Rabbit energy: listen first, then gently redirect",
    type: "audio",
  },
]

export default function DashboardHome() {
  const [activeDrop, setActiveDrop] = useState(0)

  return (
    <div className="min-h-screen bg-[#050D1A] text-slate-100 font-sans p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Greeting + Trinity */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black">Welcome back, {mockUser.name}</h1>
            <p className="text-sm text-slate-400 flex items-center gap-2 mt-1">
              <Sparkles size={16} className="text-teal-400" />
              Your Trinity: {mockUser.trinity}
            </p>
          </div>
          <div className="flex items-center gap-4 bg-slate-900/50 px-4 py-2 rounded-xl border border-slate-800">
            <Flame size={20} className="text-orange-400" />
            <span className="font-bold">{mockUser.streak} day streak</span>
          </div>
        </div>

        {/* Daily Forecast (simplified) */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-900/20 to-slate-900 border border-teal-500/20">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Sparkles size={20} className="text-teal-400" />
            Today's Energy
          </h2>
          <p className="text-slate-300">
            Gentle flow – perfect for reflection & small actions. Trust your intuition today.
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Mission: Watch 1 Knowledge Drop + refer 1 friend → +50 XP
          </p>
        </div>

        {/* Knowledge Drops Feed */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <PlayCircle size={20} className="text-teal-400" />
            Knowledge Drops
          </h2>
          <div className="relative overflow-hidden rounded-2xl bg-slate-900/70 border border-slate-800">
            {/* Simple carousel – can upgrade to swipe later */}
            <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${activeDrop * 100}%)` }}>
              {mockDrops.map((drop) => (
                <div key={drop.id} className="min-w-full p-6">
                  <div className="aspect-video bg-black rounded-xl flex items-center justify-center mb-4">
                    <PlayCircle size={64} className="text-teal-400 opacity-70" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{drop.title}</h3>
                  <p className="text-sm text-slate-400 mb-2">{drop.duration}</p>
                  <p className="text-sm italic text-teal-300">{drop.trinityTip}</p>
                </div>
              ))}
            </div>
            {/* Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {mockDrops.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveDrop(i)}
                  className={`w-2 h-2 rounded-full ${
                    i === activeDrop ? 'bg-teal-400' : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats & Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-center">
            <DollarSign size={20} className="mx-auto mb-1 text-emerald-400" />
            <div className="text-xl font-bold">{mockUser.earnings.toLocaleString()} MMK</div>
            <div className="text-xs text-slate-500">Earnings</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-center">
            <Zap size={20} className="mx-auto mb-1 text-yellow-400" />
            <div className="text-xl font-bold">{mockUser.xp}</div>
            <div className="text-xs text-slate-500">XP</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/dashboard/jobs" className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-teal-500/50 transition-all flex items-center gap-4">
            <Briefcase size={24} className="text-teal-400" />
            <div>
              <div className="font-medium">Browse Jobs</div>
              <div className="text-sm text-slate-500">Find opportunities</div>
            </div>
            <ChevronRight className="ml-auto" />
          </Link>
          <Link href="/dashboard/academy" className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-teal-500/50 transition-all flex items-center gap-4">
            <BookOpen size={24} className="text-teal-400" />
            <div>
              <div className="font-medium">Study Today</div>
              <div className="text-sm text-slate-500">Build skills free</div>
            </div>
            <ChevronRight className="ml-auto" />
          </Link>
          <Link href="/dashboard/marketplace" className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-teal-500/50 transition-all flex items-center gap-4">
            <Zap size={24} className="text-yellow-400" />
            <div>
              <div className="font-medium">Sell Skills</div>
              <div className="text-sm text-slate-500">Earn from learning</div>
            </div>
            <ChevronRight className="ml-auto" />
          </Link>
        </div>
      </div>
    </div>
  )
}
