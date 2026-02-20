// src/app/signup/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, User, Users, Building2, Sparkles, Eye, EyeOff } from 'lucide-react'

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

// ── Zodiac & Myanmar Animal & Numerology Functions ───────────────────────────
function getZodiac(month: number, day: number): string {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries'
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus'
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini'
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer'
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo'
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo'
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra'
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio'
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius'
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn'
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius'
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Pisces'
  return ''
}

function getMyanmarAnimal(year: number, month: number, day: number): string {
  const date = new Date(year, month - 1, day)
  const dayOfWeek = date.getDay() // 0=Sunday
  const animals = [
    'Garuda', 'Tiger', 'Lion', 'Elephant', 'Rat', 'Guinea Pig', 'Dragon', 'Buffalo'
  ]
  let animal = animals[dayOfWeek]
  if (dayOfWeek === 3) { // Wednesday split
    animal += ' (Tusked or Tuskless depending on time)'
  }
  return animal
}

function getLifePath(year: number, month: number, day: number): number {
  const reduce = (n: number): number => {
    while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
      n = String(n).split('').reduce((a, b) => a + Number(b), 0)
    }
    return n
  }
  return reduce(reduce(day) + reduce(month) + reduce(year))
}

export default function SignupPage() {
  const [role, setRole] = useState<'seeker' | 'referrer' | 'company' | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [day, setDay] = useState<number | ''>('')
  const [month, setMonth] = useState<number | ''>('')
  const [year, setYear] = useState<number | ''>('')
  const [trinityPreview, setTrinityPreview] = useState('')

  useEffect(() => {
    if (day && month && year) {
      const zodiac = getZodiac(month, day)
      const animal = getMyanmarAnimal(year, month, day)
      const lifePath = getLifePath(year, month, day)
      setTrinityPreview(`You might be a ${zodiac}-${animal}-${lifePath}`)
    } else {
      setTrinityPreview('')
    }
  }, [day, month, year])

  const isFormComplete = role && name.trim() && email.trim() && phone.trim() && password.trim() && day && month && year

  const handleSubmit = () => {
    // Stub: In real app, send to backend
    console.log({ role, name, email, phone, password, birth: { day, month, year } })
    alert('Signup submitted! (UI stub – welcome to ReferTRM)')
  }

  return (
    <div className="min-h-screen bg-[#050D1A] text-slate-100 font-sans flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <img src="/images/trm-logo.png" alt="ReferTRM" className="h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-black">Join ReferTRM</h2>
          <p className="text-slate-400 mt-2">Start your journey today</p>
        </div>

        {/* Role Selector */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: 'seeker', label: 'Job Seeker', icon: User },
            { value: 'referrer', label: 'Referrer', icon: Users },
            { value: 'company', label: 'Company', icon: Building2 },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => setRole(opt.value as any)}
              className={`p-4 rounded-2xl border transition-all ${
                role === opt.value 
                  ? 'border-teal-500 bg-teal-500/10' 
                  : 'border-slate-700 hover:border-slate-600'
              }`}
            >
              <opt.icon size={24} className="mx-auto mb-2" />
              <span className="block text-sm font-medium">{opt.label}</span>
            </button>
          ))}
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder={role === 'company' ? 'Company Name' : 'Full Name'}
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-2xl placeholder-slate-500 focus:border-teal-500 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-2xl placeholder-slate-500 focus:border-teal-500 focus:outline-none"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-2xl placeholder-slate-500 focus:border-teal-500 focus:outline-none"
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-2xl placeholder-slate-500 focus:border-teal-500 focus:outline-none"
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

        {/* Birth Date */}
        <div className="space-y-4">
          <p className="text-sm text-slate-300">Birth Date (for Trinity profile)</p>
          <div className="grid grid-cols-3 gap-4">
            <select
              value={day}
              onChange={e => setDay(e.target.value ? Number(e.target.value) : '')}
              className="px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-2xl focus:border-teal-500 focus:outline-none"
            >
              <option value="">Day</option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <select
              value={month}
              onChange={e => setMonth(e.target.value ? Number(e.target.value) : '')}
              className="px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-2xl focus:border-teal-500 focus:outline-none"
            >
              <option value="">Month</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <select
              value={year}
              onChange={e => setYear(e.target.value ? Number(e.target.value) : '')}
              className="px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-2xl focus:border-teal-500 focus:outline-none"
            >
              <option value="">Year</option>
              {Array.from({ length: 100 }, (_, i) => 2025 - i).map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          {trinityPreview && (
            <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-300 text-sm flex items-center gap-2">
              <Sparkles size={16} />
              {trinityPreview}
            </div>
          )}
        </div>

        {/* Submit */}
        <MagicButton onClick={handleSubmit} disabled={!isFormComplete}>
          Create Account <ArrowRight size={22} />
        </MagicButton>

        <p className="text-center text-sm text-slate-500">
          Already have an account? <Link href="/login" className="text-teal-400 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  )
}
