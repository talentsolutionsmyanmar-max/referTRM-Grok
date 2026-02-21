// src/app/dashboard/layout.tsx
import { BottomNav } from '@/components/layout/bottom-nav'
import { Sidebar } from '@/components/layout/sidebar' // if you have it

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar for desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 md:ml-72 bg-[#050D1A]">
        {children}
      </main>

      {/* Bottom nav for mobile */}
      <BottomNav />
    </div>
  )
}
