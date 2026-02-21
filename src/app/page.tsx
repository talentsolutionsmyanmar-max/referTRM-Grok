// src/app/page.tsx
'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles, Users, Trophy, Zap } from 'lucide-react'

// ── Magic burst button ───────────────────────────
function MagicButton({ href, children, big = false }: { href: string; children: React.ReactNode; big?: boolean }) {
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([])

  function handleClick(e: React.MouseEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()
    setBursts(b => [...b, { id, x, y }])
    setTimeout(() => setBursts(b => b.filter(b => b.id !== id)), 1000)
  }

  return (
    <Link 
      href={href} 
      onClick={handleClick}
      className={`group relative inline-flex items-center justify-center gap-2 font-black text-white rounded-2xl overflow-hidden transition-all duration-300 ${
        big ? 'px-12 py-5 text-xl' : 'px-8 py-4 text-base'
      }`}
      style={{ 
        background: 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)',
        boxShadow: '0 0 40px rgba(20,184,166,0.35), 0 8px 32px rgba(20,184,166,0.2)'
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)' }} />
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ boxShadow: '0 0 60px rgba(20,184,166,0.6), 0 0 120px rgba(6,182,212,0.3)' }} />
      {bursts.map(b => (
        <div key={b.id} className="absolute pointer-events-none" style={{ left: b.x, top: b.y }}>
          {[...Array(12)].map((_, i) => (
            <div key={i} className="absolute w-1.5 h-1.5 rounded-full" style={{
              background: i % 3 === 0 ? '#5EEAD4' : i % 3 === 1 ? '#FDE68A' : '#FFFFFF',
              animation: `burst-${i} 0.8s ease-out forwards`,
              transform: `rotate(${i * 30}deg)`,
            }} />
          ))}
        </div>
      ))}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      <style jsx>{`
        ${[...Array(12)].map((_, i) => `
          @keyframes burst-${i} {
            0%   { transform: rotate(${i * 30}deg) translateX(0) scale(1); opacity: 1; }
            100% { transform: rotate(${i * 30}deg) translateX(${40 + Math.random() * 30}px) scale(0); opacity: 0; }
          }
        `).join('\n')}
      `}</style>
    </Link>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050D1A] text-slate-100 font-sans relative overflow-hidden">
      {/* Particle Background (CSS only) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(20,184,166,0.08) 0%, transparent 50%)',
          animation: 'float 20s infinite linear'
        }} />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <img 
          src="/images/trm-logo.png" 
          alt="ReferTRM" 
          className="h-24 md:h-32 mb-8 animate-pulse" 
          style={{ filter: 'drop-shadow(0 0 20px rgba(20,184,166,0.6))' }}
        />

        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
          No one hustles alone.
        </h1>

        <p className="text-xl md:text-3xl text-slate-300 mb-12 max-w-3xl">
          Earn First, Pay Later, Know Yourself Forever.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <MagicButton href="/signup" big>
            Create Free Account <ArrowRight size={24} />
          </MagicButton>
          <MagicButton href="/login">
            Log In <ArrowRight size={20} />
          </MagicButton>
        </div>

        <p className="mt-8 text-sm text-slate-500">
          Free forever • Made with ❤️ in Myanmar • 2026
        </p>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 py-20 px-4 bg-gradient-to-b from-transparent to-slate-950">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
            <Users size={48} className="mx-auto mb-4 text-teal-400" />
            <div className="text-4xl font-black mb-2">10,000+</div>
            <p className="text-slate-400">Myanmar youth connected</p>
          </div>
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
            <Trophy size={48} className="mx-auto mb-4 text-yellow-400" />
            <div className="text-4xl font-black mb-2">500K+</div>
            <p className="text-slate-400">MMK earned so far</p>
          </div>
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
            <Zap size={48} className="mx-auto mb-4 text-teal-400" />
            <div className="text-4xl font-black mb-2">Free Forever</div>
            <p className="text-slate-400">Education & opportunity</p>
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="relative z-10 py-20 px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-black mb-8">
          Your journey starts with one step.
        </h2>
        <MagicButton href="/signup" big>
          Join ReferTRM Now <ArrowRight size={28} />
        </MagicButton>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  )
}
