// src/app/dashboard/academy/page.tsx
'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { 
  BookOpen, Trophy, Zap, ChevronRight, Sparkles, Lock, 
  CheckCircle, Clock, Award, AlertTriangle, DollarSign 
} from 'lucide-react'

// ── Academy Data: Tracks with embedded Quests ───────────────────────────
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
      // More quests can be added later (keep to 3 max per track for MVP)
    ],
    progress: 45,
    level: 'Intermediate',
    unlocked: true,
  },
  {
    id: 2,
    title: 'Career Navigation',
    description: 'Discover your path with the Navigator\'s Journey.',
    icon: BookOpen,
    color: '#60A5FA',
    quests: [
      {
        id: 'q-navigator',
        title: 'The Navigator\'s Journey',
        description: 'Chart your destiny through Trinity and real-world exploration.',
        challenges: 5,
        rewards: ['Navigator Title', 'Personalized Career Map'],
        progress: 0,
        unlocked: true,
        trinityTip: 'Pisces-Rabbit-2: Gentle intuition guides you — trust small steps.',
        steps: [
          { id: 's1', title: 'Trinity Deep-Dive', type: 'reading', duration: '40 min', completed: false },
          { id: 's2', title: 'Industry Exploration: Tech', type: 'video', duration: '50 min', completed: false },
          { id: 's3', title: 'Industry Exploration: Sales', type: 'interactive', duration: '45 min', completed: false },
          { id: 's4', title: 'Skill Gap Analysis', type: 'reading', duration: '30 min', completed: false },
          { id: 's5', title: 'Build Your Map', type: 'interactive', duration: '60 min', completed: false },
        ]
      },
    ],
    progress: 0,
    level: 'Beginner',
    unlocked: true,
  },
  {
    id: 3,
    title: 'Project & Execution',
    description: 'Learn to deliver like a pro with the Builder\'s Way.',
    icon: Award,
    color: '#C084FC',
    quests: [
      {
        id: 'q-builder',
        title: 'The Builder\'s Way',
        description: 'From plan to delivery — master execution under pressure.',
        challenges: 5,
        rewards: ['Builder Badge', 'Priority Operations Roles'],
        progress: 0,
        unlocked: true,
        trinityTip: 'Virgo-Buffalo-4: Steady progress beats speed — checklist is your power.',
        steps: [
          { id: 's1', title: 'Planning Mastery', type: 'video', duration: '35 min', completed: false },
          { id: 's2', title: 'Resource Hunt', type: 'interactive', duration: '50 min', completed: false },
          { id: 's3', title: 'Execution Under Fire', type: 'video', duration: '45 min', completed: false },
          { id: 's4', title: 'Crisis Handling', type: 'interactive', duration: '55 min', completed: false },
          { id: 's5', title: 'Deliver & Reflect', type: 'reading', duration: '40 min', completed: false },
        ]
      },
    ],
    progress: 0,
    level: 'Intermediate',
    unlocked: true,
  },
  // Add 4 more tracks later (keep MVP to 3 for now)
]

// ── Progress Circle Component ───────────────────────────
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

// ── Quest Card ───────────────────────────
function QuestCard({ quest, onClick }: { quest: typeof academyTracks[0]['quests'][0]; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="p-5 rounded-2xl bg-slate-900/50 border border-slate-700 hover:border-teal-500/50 transition-all cursor-pointer space-y-3"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">{quest.title}</h3>
        <ChevronRight size={20} className="text-slate-500" />
      </div>
      <p className="text-sm text-slate-400">{quest.description}</p>
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="px-2 py-1 bg-teal-500/10 rounded-full flex items-center gap-1">
          <Zap size={12} /> {quest.challenges} Challenges
        </span>
        <span className="px-2 py-1 bg-yellow-500/10 rounded-full flex items-center gap-1">
          <Trophy size={12} /> {quest.rewards[0]}
        </span>
      </div>
      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-teal-500 rounded-full" style={{ width: `${quest.progress}%` }} />
      </div>
      <p className="text-xs text-slate-500 text-right">{quest.progress}% Complete</p>
      <p className="text-xs italic text-teal-300">{quest.trinityTip}</p>
    </div>
  )
}

// ── Main Academy Page ───────────────────────────
export default function AcademyPage() {
  const [activeTrackId, setActiveTrackId] = useState<number | null>(null)
  const [activeQuestId, setActiveQuestId] = useState<string | null>(null)

  const activeTrack = academyTracks.find(t => t.id === activeTrackId)
  const activeQuest = activeTrack?.quests.find(q => q.id === activeQuestId)

  const handleTrackClick = (trackId: number) => {
    setActiveTrackId(trackId)
    setActiveQuestId(null) // Reset quest when changing track
  }

  const handleQuestClick = (questId: string) => {
    setActiveQuestId(questId)
  }

  const handleBack = () => {
    if (activeQuestId) {
      setActiveQuestId(null)
    } else if (activeTrackId) {
      setActiveTrackId(null)
    }
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
          <p className="text-sm text-slate-500 mt-2 flex items-center justify-center md:justify-start gap-2">
            <Sparkles size={16} className="text-yellow-400" />
            3 starter quests • Narrative learning • Real rewards
          </p>
        </div>

        {/* Breadcrumbs Navigation */}
        {(activeTrackId || activeQuestId) && (
          <div className="flex items-center gap-2 text-sm text-teal-400">
            <button onClick={handleBack} className="hover:underline flex items-center gap-1">
              <ChevronRight size={14} className="rotate-180" /> Back
            </button>
            {activeTrackId && activeTrack && (
              <>
                <ChevronRight size={14} />
                <button onClick={() => handleTrackClick(activeTrackId)} className="hover:underline">
                  {activeTrack.title}
                </button>
              </>
            )}
            {activeQuestId && activeQuest && (
              <>
                <ChevronRight size={14} />
                <span>{activeQuest.title}</span>
              </>
            )}
          </div>
        )}

        {/* View Switcher */}
        {!activeTrackId ? (
          // Tracks Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {academyTracks.map(track => (
              <div
                key={track.id}
                onClick={() => handleTrackClick(track.id)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer group ${
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
              </div>
            ))}
          </div>
        ) : !activeQuestId ? (
          // Quests List
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
                  <p className="text-sm text-slate-500 mt-2">
                    {activeTrack?.progress}% Complete • Keep going
                  </p>
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

              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Trophy size={20} className="text-yellow-400" />
                  Available Quests
                </h3>
                <div className="space-y-3">
                  {activeTrack?.quests.map(quest => (
                    <QuestCard key={quest.id} quest={quest} onClick={() => handleQuestClick(quest.id)} />
                  ))}
                </div>
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
        ) : (
          // Active Quest Steps View
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-xl bg-yellow-500/10">
                  <Trophy size={40} className="text-yellow-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-black">{activeQuest?.title}</h2>
                  <p className="text-slate-300 mt-1">{activeQuest?.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex-1 min-w-[200px]">
                  <div className="text-sm text-slate-400 mb-1">Quest Progress</div>
                  <ProgressCircle progress={activeQuest?.progress || 0} />
                </div>
                <div className="flex-1 min-w-[200px] grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                    <div className="text-sm text-slate-400">Challenges</div>
                    <div className="text-2xl font-bold">{activeQuest?.challenges}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                    <div className="text-sm text-slate-400">Rewards</div>
                    <div className="text-lg font-bold text-yellow-300">{activeQuest?.rewards[0]}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Zap size={20} className="text-teal-400" />
                  Challenges
                </h3>
                <div className="space-y-3">
                  {activeQuest?.steps.map(step => (
                    <div
                      key={step.id}
                      className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/30 transition-all flex items-center justify-between group"
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
                        <Link
                          href={`/dashboard/academy/quest/${activeQuest?.id}/step/${step.id}`}
                          className="px-5 py-2 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm font-medium hover:bg-teal-500/20 transition-all flex items-center gap-2"
                        >
                          Start
                          <ChevronRight size={16} />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
