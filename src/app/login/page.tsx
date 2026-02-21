// src/app/login/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Eye, EyeOff, Sparkles, Mail } from 'lucide-react'

// ── Magic burst button component ───────────────────────────
function MagicButton({ onClick, children, disabled = false }: { onClick: () => void; children: React.ReactNode; disabled?: boolean }) {
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([])

  function handleClick(e: React.MouseEvent) {
    if (disabled) return
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()
    setBursts(b => [...b, { id, x, y }])
    setTimeout(() => setBursts(b => b.filter(b => b.id !== id)), 1000)
    onClick()
  }

  return (
    <button 
      onClick={handleClick} 
      disabled={disabled}
      className={`group relative inline-flex items-center justify-center gap-2 font-black text-white rounded-2xl overflow-hidden transition-all duration-300 px-12 py-5 text-xl w-full ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={{ background: 'linear-gradient(135deg, #14B8A6 0%, #06B6D4 100%)', boxShadow: '0 0 40px rgba(20,184,166,0.35), 0 8px 32px rgba(20,184,166,0.2)' }}>
      {/* Hover shimmer */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)' }} />
      {/* Glow pulse */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ boxShadow: '0 0 60px rgba(20,184,166,0.6), 0 0 120px rgba(6,182,212,0.3)' }} />
      {/* Burst particles */}
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
    </button>
  )
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const isFormComplete = email.trim() && password.trim()

  const handleSubmit = () => {
    // Stub: In real app, authenticate with backend
    console.log({ email, password })
    alert('Login submitted! (UI stub – welcome back to ReferTRM)')
    // Redirect to /dashboard in real version
  }

  return (
    <div className="min-h-screen bg-[#050D1A] text-slate-100 font-sans flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <img src="/images/trm-logo.png" alt="ReferTRM" className="h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-black">Welcome Back</h2>
          <p className="text-slate-400 mt-2 flex items-center justify-center gap-2">
            <Sparkles size={16} className="text-teal-400" />
            Continue with your Trinity
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-2xl placeholder-slate-500 focus:border-teal-500 focus:outline-none pr-10"
            />
            <Mail size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" />
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-2xl placeholder-slate-500 focus:border-teal-500 focus:outline-none pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <Link href="/forgot-password" className="text-sm text-teal-400 hover:underline">
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <MagicButton onClick={handleSubmit} disabled={!isFormComplete}>
          Log In <ArrowRight size={22} />
        </MagicButton>

        <p className="text-center text-sm text-slate-500">
          New to ReferTRM? <Link href="/signup" className="text-teal-400 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
