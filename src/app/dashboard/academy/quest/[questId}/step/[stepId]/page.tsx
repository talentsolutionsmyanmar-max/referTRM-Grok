// src/app/dashboard/academy/quest/[questId]/step/[stepId]/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { 
  ArrowLeft, PlayCircle, PauseCircle, Volume2, VolumeX, 
  CheckCircle, Clock, Zap, Sparkles, BookOpen, FileText, 
  AlertTriangle 
} from 'lucide-react'

// ── Mock step data (expand with real DB later) ───────────────────────────
const mockSteps = {
  'q-hunter': {
    title: 'The Hunter\'s Path',
    steps: [
      {
        id: 's1',
        title: 'Cold Call Mastery',
        type: 'video',
        duration: '30 min',
        content: 'https://example.com/video/cold-call.mp4', // placeholder
        description: 'Learn how to open conversations with confidence and get past gatekeepers.',
        trinityTip: 'Leo-Tiger-8: Your charisma is your weapon — use it boldly today.',
        completed: true,
      },
      {
        id: 's2',
        title: 'Discovery Hunt',
        type: 'interactive',
        duration: '45 min',
        content: 'Quiz + role-play: Ask discovery questions to uncover real needs.',
        description: 'Practice identifying pain points and motivations.',
        trinityTip: 'Pisces-Rabbit-2: Your intuition helps you read between the lines.',
        completed: false,
      },
      // ... more steps
    ]
  },
  // Add other quests later
}

// ── Simple Video/Audio Player ───────────────────────────
function MediaPlayer({ type, src }: { type: 'video' | 'audio'; src: string }) {
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null)

  const togglePlay = () => {
    if (mediaRef.current) {
      playing ? mediaRef.current.pause() : mediaRef.current.play()
      setPlaying(!playing)
    }
  }

  return (
    <div className="relative rounded-2xl overflow-hidden bg-black border border-slate-700">
      {type === 'video' ? (
        <video
          ref={mediaRef as any}
          src={src}
          className="w-full aspect-video"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          muted={muted}
          controls={false}
        />
      ) : (
        <audio
          ref={mediaRef as any}
          src={src}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          muted={muted}
        />
      )}

      {/* Custom Controls */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/70 via-transparent to-black/30 opacity-0 hover:opacity-100 transition-opacity">
        <div className="flex justify-end">
          <button onClick={() => setMuted(!muted)} className="p-2 rounded-full bg-black/40">
            {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>

        <div className="flex justify-center">
          <button 
            onClick={togglePlay}
            className="p-6 rounded-full bg-teal-500/80 hover:bg-teal-500 transition-all transform hover:scale-110"
          >
            {playing ? <PauseCircle size={48} /> : <PlayCircle size={48} />}
          </button>
        </div>

        <div className="text-center text-sm text-slate-300">
          {playing ? 'Playing' : 'Paused'} • Duration: placeholder
        </div>
      </div>
    </div>
  )
}

// ── Step Player Page ───────────────────────────
export default function QuestStepPlayer() {
  const params = useParams()
  const router = useRouter()
  const { questId, stepId } = params as { questId: string; stepId: string }

  // Find the step (stub – real version uses DB or context)
  const quest = mockSteps[questId as keyof typeof mockSteps]
  const step = quest?.steps.find(s => s.id === stepId)

  if (!step) {
    return (
      <div className="min-h-screen bg-[#050D1A] flex items-center justify-center p-6">
        <div className="text-center">
          <AlertTriangle size={48} className="mx-auto mb-6 text-amber-400" />
          <h2 className="text-2xl font-bold mb-2">Step not found</h2>
          <p className="text-slate-400 mb-6">This quest step doesn't exist or has been moved.</p>
          <Link 
            href={`/dashboard/academy/quest/${questId}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500/20 border border-teal-500/40 rounded-xl text-teal-300 hover:bg-teal-500/30 transition-all"
          >
            <ArrowLeft size={18} />
            Back to Quest
          </Link>
        </div>
      </div>
    )
  }

  const handleComplete = () => {
    // Stub: In real app → update progress, award XP, unlock next
    alert(`Step complete! +50 XP earned. Great job!`)
    // Redirect to next step or quest overview
    router.push(`/dashboard/academy/quest/${questId}`)
  }

  return (
    <div className="min-h-screen bg-[#050D1A] text-slate-100 font-sans">
      {/* Top Bar */}
      <div className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/dashboard/academy/quest/${questId}`} className="p-2 rounded-lg hover:bg-slate-800 transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <div>
              <div className="text-sm text-slate-400">{quest?.title}</div>
              <h1 className="text-xl md:text-2xl font-bold">{step.title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 bg-teal-500/10 rounded-full text-sm font-medium text-teal-300 border border-teal-500/20">
              +50 XP
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {/* Media Player */}
        {(step.type === 'video' || step.type === 'audio') && (
          <MediaPlayer type={step.type} src={step.content} />
        )}

        {/* Description & Tip */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <BookOpen size={24} className="text-teal-400" />
              What You'll Learn
            </h2>
            <p className="text-slate-300 leading-relaxed">{step.description}</p>
          </div>

          <div className="p-5 rounded-2xl bg-teal-500/10 border border-teal-500/20">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles size={20} className="text-teal-400" />
              <span className="font-medium text-teal-300">Trinity Tip</span>
            </div>
            <p className="text-teal-200">{step.trinityTip}</p>
          </div>
        </div>

        {/* Mark Complete */}
        {!step.completed ? (
          <button
            onClick={handleComplete}
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-teal-600 to-teal-500 font-bold text-lg shadow-lg shadow-teal-900/30 hover:brightness-110 transition-all flex items-center justify-center gap-3"
          >
            <CheckCircle size={24} />
            Mark Step Complete
          </button>
        ) : (
          <div className="w-full py-5 rounded-2xl bg-emerald-900/30 border border-emerald-700 text-center font-medium text-emerald-300 flex items-center justify-center gap-3">
            <Trophy size={24} />
            Step Completed – Great job!
          </div>
        )}

        {/* Next Step Teaser */}
        <div className="text-center text-sm text-slate-500 pt-4">
          Next step unlocks after completion. Keep going!
        </div>
      </div>
    </div>
  )
}
