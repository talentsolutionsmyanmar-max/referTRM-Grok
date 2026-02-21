// src/app/dashboard/academy/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  BookOpen, Trophy, Zap, ChevronRight, Sparkles, Lock, 
  CheckCircle, Clock, AlertTriangle, DollarSign 
} from 'lucide-react'

// ── Academy Data (same as before) ───────────────────────────
const academyTracks = [
  {
    id: 1,
    title: 'Recruitment Mastery',
    description: 'Become a skilled referrer — start with the Hunter\'s Path.',
    icon: Zap,
    color: '#14B8A6',
    quests: [
      {
        id: 'q-hunter',
        title: 'The Hunter\'s Path',
        description: 'Master finding, pitching, and closing talent like a true hunter.',
        challenges: 7,
        rewards: ['Hunter Badge', '50% Commission Boost (30 days)'],
        progress: 45,
        unlocked: true,
        trinityTip: 'Leo-Tiger-8: Your confidence shines on power days (Sun/Mon).',
        steps: [
          { id: 's1', title: 'Cold Call Mastery', type: 'video', duration: '30 min', completed: true },
          { id: 's2', title: 'Discovery Hunt', type: 'interactive', duration: '45 min', completed: false },
          { id: 's3', title: 'The Perfect Pitch', type: 'video', duration: '40 min', completed: false },
          { id: 's4', title: 'Objection Crusher', type: 'interactive', duration: '50 min', completed: false },
          { id: 's5', title: 'Closing the Deal', type: 'video', duration: '35 min', completed: false },
          { id: 's6', title: 'Follow-up Mastery', type: 'reading', duration: '25 min', completed: false },
          { id: 's7', title: 'Referral Chain', type: 'interactive', duration: '60 min', completed: false },
        ]
      },
      // Add more quests later
    ],
    progress: 45,
    level: 'Intermediate',
    unlocked: true,
  },
  // Add more tracks as needed
]

// Progress Circle (unchanged)
function ProgressCircle({ progress }: { progress: number }) {
  const radius = 38
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg className="w-full h-full -rotate-90">
        <circle cx="40" cy="40" r={radius} fill="none" stroke="#334155" strokeWidth="8" />
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke="#14B8A6"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute text-xl font-bold">{progress}%</div>
    </div>
  )
}

// ── Main Academy Page with Full Navigation ───────────────────────────
export default function AcademyPage() {
  const [activeTrackId, setActiveTrackId] = useState<number | null>(null)

  const activeTrack = academyTracks.find(t => t.id === activeTrackId)

  const handleBack = () => {
    setActiveTrackId(null)
  }

  return (
    <div className="min-h-screen bg-[#050D1A] text-slate-100 font-sans p-6 pb-20">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-3 mb-2">
            <BookOpen size={32} className="text-teal-400" />
            <h1 className="text-4xl font-black">Academy Quest Hub</h1>
          </div>
          <p className="text-xl text-slate-300 max-w-3xl">
            Free forever quests for Myanmar youth — learn by adventure, earn from skills.
          </p>
        </div>

        {/* Breadcrumbs */}
        {activeTrackId && (
          <div className="flex items-center gap-2 text-sm text-teal-400">
            <button onClick={handleBack} className="hover:underline flex items-center gap-1">
              <ChevronRight size={14} className="rotate-180" /> Back
            </button>
            <ChevronRight size={14} />
            <span>{activeTrack?.title}</span>
          </div>
        )}

        {/* View Switcher */}
        {!activeTrackId ? (
          // Tracks Grid – clickable to quests list
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {academyTracks.map(track => (
              <button
                key={track.id}
                onClick={() => setActiveTrackId(track.id)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer group text-left ${
                  track.unlocked
                    ? 'bg-slate-900/50 border-slate-700 hover:border-teal-500/50'
                    : 'bg-slate-950/70 border-slate-800 opacity-70 cursor-not-allowed'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl" style={{ background: `${track.color}15` }}>
                    <track.icon size={28} style={{ color: track.color }} />
                  </div>
                  <ProgressCircle progress={track.progress} />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-teal-300 transition-colors">
                  {track.title}
                </h3>
                <p className="text-sm text-slate-400 mb-4">{track.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Trophy size={16} className="text-yellow-400" />
                    <span>{track.quests.length} Quests</span>
                  </div>
                  <span className="text-slate-500">{track.level}</span>
                </div>
                {!track.unlocked && (
                  <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-amber-400 flex items-center gap-2">
                    <Lock size={14} />
                    Unlock later
                  </div>
                )}
              </button>
            ))}
          </div>
        ) : (
          // Quests & Steps List with direct links to player
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-xl" style={{ background: `${activeTrack?.color}20` }}>
                  <activeTrack?.icon size={40} style={{ color: activeTrack?.color }} />
                </div>
                <div>
                  <h2 className="text-3xl font-black">{activeTrack?.title}</h2>
                  <p className="text-slate-300 mt-1">{activeTrack?.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex-1 min-w-[200px]">
                  <div className="text-sm text-slate-400 mb-1">Track Progress</div>
                  <ProgressCircle progress={activeTrack?.progress || 0} />
                </div>
                <div className="flex-1 min-w-[200px] grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                    <div className="text-sm text-slate-400">Quests</div>
                    <div className="text-2xl font-bold">{activeTrack?.quests.length}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                    <div className="text-sm text-slate-400">Est. Time</div>
                    <div className="text-2xl font-bold">~12 hours</div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Trophy size={20} className="text-yellow-400" />
                  Quests in this track
                </h3>

                {activeTrack?.quests.map(quest => (
                  <div key={quest.id} className="space-y-4">
                    {/* Quest Header (clickable to expand if you want, but for MVP we show steps directly) */}
                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-bold">{quest.title}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-1 bg-teal-500/10 rounded-full">
                            {quest.progress}% Complete
                          </span>
                          <ChevronRight size={18} className="text-slate-500" />
                        </div>
                      </div>
                      <p className="text-sm text-slate-400 mb-3">{quest.description}</p>
                      <p className="text-xs italic text-teal-300 mb-4">{quest.trinityTip}</p>
                    </div>

                    {/* Steps – direct links to player */}
                    <div className="pl-6 space-y-3">
                      {quest.steps.map(step => (
                        <Link
                          key={step.id}
                          href={`/dashboard/academy/quest/${quest.id}/step/${step.id}`}
                          className="block p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/30 transition-all flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-4">
                            {step.type === 'video' && <PlayCircle size={24} className="text-teal-400" />}
                            {step.type === 'interactive' && <Zap size={24} className="text-yellow-400" />}
                            {step.type === 'reading' && <BookOpen size={24} className="text-blue-400" />}
                            <div>
                              <div className="font-medium group-hover:text-teal-300 transition-colors">
                                {step.title}
                              </div>
                              <div className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                                <Clock size={14} />
                                {step.duration}
                              </div>
                            </div>
                          </div>
                          {step.completed ? (
                            <CheckCircle size={20} className="text-emerald-400" />
                          ) : (
                            <ChevronRight size={20} className="text-slate-500 group-hover:text-teal-300" />
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Marketplace Teaser */}
            {activeTrack?.progress > 30 && (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900/20 to-teal-900/20 border border-emerald-500/30 text-center space-y-4">
                <h3 className="text-xl font-bold flex items-center justify-center gap-2">
                  <DollarSign size={24} className="text-emerald-400" />
                  Skills Unlocked → Earn Now
                </h3>
                <p className="text-slate-300">
                  Complete more quests → list your new skill in the Marketplace (CV reviews start at 5K MMK)
                </p>
                <Link href="/dashboard/marketplace" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 rounded-xl font-medium hover:brightness-110 transition-all">
                  Go to Marketplace <ChevronRight size={18} />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
