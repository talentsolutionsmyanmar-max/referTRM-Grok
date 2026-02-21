// src/components/layout/bottom-nav.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils' // assume you have this utility (or create it)
import { 
  LayoutDashboard, Briefcase, BookOpen, Zap, TrendingUp 
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { href: '/dashboard/jobs', label: 'Jobs', icon: Briefcase },
  { href: '/dashboard/academy', label: 'Academy', icon: BookOpen },
  { href: '/dashboard/marketplace', label: 'Market', icon: Zap },
  { href: '/dashboard/ladder', label: 'Ladder', icon: TrendingUp },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-slate-800 bg-[#050D1A]/95 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto px-4 py-2">
        <div className="flex items-center justify-around">
          {navItems.map(item => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
                  isActive 
                    ? "text-teal-400" 
                    : "text-slate-500 hover:text-slate-300"
                )}
              >
                <item.icon size={24} className={isActive ? "text-teal-400" : ""} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
