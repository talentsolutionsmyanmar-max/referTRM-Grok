// src/app/dashboard/ladder/page.tsx
'use client'

import Link from 'next/link'
import { 
  TrendingUp, ChevronRight, Zap, Trophy, Star, Flame, DollarSign, 
  Users, AlertTriangle, Sparkles, ArrowRight 
} from 'lucide-react'

// Mock user progression (replace with real data later)
const userProgress = {
  stage: 3, // 1=Explorer, 2=Learner, 3=Hunter, 4=Builder, 5=Architect
  title: 'Hunter',
  income: 180000,
  reputation: 340,
  placements: 3,
  trinity: 'Pisces-Rabbit-2',
  nextMilestone: 'Builder stage in ~2 months (2 more placements + Diplomat\'s Road quest)',
  projected: {
    yourPace: { months: 12, income: '600K–1.2M MMK', risk: 'Low' },
  }
}

const stages = [
  { num: 1, title: 'Explorer', req: 'Onboarding + First Knowledge Drop', income: '20K–50K MMK', icon: Users },
  { num: 2, title: 'Learner', req: '3 Quests + 500 XP', income: '50K–100K MMK', icon: BookOpen },
  { num: 3, title: 'Hunter', req: '1 Placement + 300 Reputation', income: '100K–300K MMK', icon: Zap },
  { num: 4, title: 'Builder', req: '5 Placements + 600 Reputation', income: '300K–800K MMK', icon: Trophy },
  { num: 5, title: 'Architect', req: '20 Placements + Elder Status', income: '800K–2M+ MMK', icon: Star },
]

export default function CareerLadderPage() {
  const current = stages.find(s => s.num === userProgress.stage) || stages[2]

  return (
    <div className="min-h-screen bg-[#050D1A] text-slate-100 font-sans p-6">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <TrendingUp size={36} className="text-teal-400" />
            <h1 className="text-4xl md:text-5xl font-black">Your Career Ladder</h1>
          </div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            From Explorer to Architect — every rung is real income, real skills, real ownership.
          </p>
        </div>

        {/* Current Position Highlight */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-teal-500/30 shadow-xl shadow-teal-900/20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center text-5xl font-black z-10 shadow-lg bg-teal-500 text-white border-4 border-teal-300`}>
                {current.num}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                {current.title}
              </div>
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <h2 className="text-3xl font-black">You are a {current.title}</h2>
              <div className="text-lg text-slate-300">
                Current monthly potential: <span className="text-emerald-400 font-bold">
                  {userProgress.income.toLocaleString()} MMK
                </span>
              </div>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="px-4 py-2 bg-slate-800 rounded-full text-sm flex items-center gap-2">
                  <Flame size={16} className="text-orange-400" />
                  Reputation: {userProgress.reputation}
                </div>
                <div className="px-4 py-2 bg-slate-800 rounded-full text-sm flex items-center gap-2">
                  <Trophy size={16} className="text-yellow-400" />
                  Placements: {userProgress.placements}
                </div>
                <div className="px-4 py-2 bg-slate-800 rounded-full text-sm flex items-center gap-2">
                  <Sparkles size={16} className="text-teal-400" />
                  {userProgress.trinity}
                </div>
              </div>
              <p className="text-slate-400 italic">
                {userProgress.nextMilestone}
              </p>
            </div>
          </div>
        </div>

        {/* Full Ladder Visualization */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Zap size={24} className="text-yellow-400" />
            The Path Ahead
          </h2>

          <div className="relative">
            {/* Vertical ladder line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-700 transform -translate-x-1/2 hidden md:block" />

            <div className="space-y-12 md:space-y-16">
              {stages.map((stage, index) => {
                const isCurrent = stage.num === userProgress.stage
                const isUnlocked = stage.num <= userProgress.stage
                return (
                  <div 
                    key={stage.num}
                    className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-12 ${isCurrent ? 'scale-105' : ''}`}
                  >
                    {/* Step number circle */}
                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl font-black z-10 shadow-lg ${
                      isCurrent 
                        ? 'bg-teal-500 text-white border-4 border-teal-300' 
                        : isUnlocked 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-slate-800 text-slate-500 border-2 border-slate-700'
                    }`}>
                      {stage.num}
                    </div>

                    {/* Card */}
                    <div className={`flex-1 p-6 rounded-2xl border ${
                      isCurrent 
                        ? 'bg-teal-900/20 border-teal-500/50 shadow-xl shadow-teal-900/30' 
                        : isUnlocked 
                          ? 'bg-slate-900/70 border-emerald-500/30' 
                          : 'bg-slate-950/70 border-slate-800 opacity-70'
                    }`}>
                      <div className="flex items-center gap-4 mb-4">
                        <stage.icon size={32} className={isCurrent ? 'text-teal-400' : isUnlocked ? 'text-emerald-400' : 'text-slate-600'} />
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold">{stage.title}</h3>
                          <div className="text-sm md:text-base text-emerald-400 font-medium">
                            {stage.income}
                          </div>
                        </div>
                      </div>

                      <p className="text-slate-300 mb-4">
                        {stage.req}
                      </p>

                      {isCurrent && (
                        <div className="mt-4 pt-4 border-t border-teal-500/30">
                          <p className="text-teal-300 font-medium flex items-center gap-2">
                            <Flame size={18} className="text-orange-400" />
                            Next milestone: {userProgress.nextMilestone}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Connector line (mobile hidden) */}
                    {index < stages.length - 1 && (
                      <div className="hidden md:block absolute left-1/2 top-full h-12 w-1 bg-slate-700 transform -translate-x-1/2 -translate-y-6" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-10">
          <Link 
            href="/dashboard/academy"
            className="inline-flex items-center gap-3 px-8 py-5 bg-gradient-to-r from-teal-600 to-teal-500 rounded-2xl text-xl font-black shadow-xl shadow-teal-900/30 hover:brightness-110 transition-all"
          >
            <Zap size={28} />
            Start Your Next Quest Now
            <ArrowRight size={28} />
          </Link>
        </div>
      </div>
    </div>
  )
}
