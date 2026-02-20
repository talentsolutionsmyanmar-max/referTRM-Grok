'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { 
  DollarSign, Search, Filter, Star, CheckCircle, AlertTriangle, 
  ChevronRight, Users, Zap, Briefcase, MessageSquare 
} from 'lucide-react'

// ── Mock Marketplace Listings (expand with real data later) ───────────────────────────
const mockListings = [
  {
    id: 1,
    category: 'CV Help',
    title: 'Professional CV Review & Rewrite',
    seller: 'Ma Thida',
    price: '10,000 MMK',
    rating: 4.8,
    reviews: 23,
    trinity: 'Virgo-Buffalo-4',
    verified: true,
    description: 'Detailed review + rewrite to pass ATS & impress Myanmar recruiters',
  },
  {
    id: 2,
    category: 'Interview Prep',
    title: '1-Hour Mock Interview + Feedback',
    seller: 'Ko Min',
    price: '25,000 MMK',
    rating: 4.9,
    reviews: 45,
    trinity: 'Leo-Tiger-8',
    verified: true,
    description: 'Practice real questions from Yangon/Mandalay companies + tips',
  },
  {
    id: 3,
    category: 'English Practice',
    title: '30-Min English Conversation Coaching',
    seller: 'Daw Aye',
    price: '15,000 MMK',
    rating: 4.7,
    reviews: 18,
    trinity: 'Gemini-Garuda-5',
    verified: false,
    description: 'Improve business English & confidence for job interviews',
  },
  {
    id: 4,
    category: 'CV Help',
    title: 'CV Translation (English ↔ Burmese)',
    seller: 'Mg Zaw',
    price: '12,000 MMK',
    rating: 4.6,
    reviews: 12,
    trinity: 'Capricorn-Elephant-1',
    verified: true,
    description: 'Accurate translation + cultural adaptation for job apps',
  },
]

// ── Service Card Component ───────────────────────────
function ServiceCard({ listing }: { listing: typeof mockListings[0] }) {
  return (
    <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-teal-500/50 transition-all space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold">{listing.title}</h3>
          <div className="text-sm text-slate-400 flex items-center gap-2 mt-1">
            <Users size={14} />
            {listing.seller} ({listing.trinity})
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-emerald-400">{listing.price}</div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <Star size={16} className="text-yellow-400" />
        <span>{listing.rating} ({listing.reviews} reviews)</span>
        {listing.verified && <CheckCircle size={16} className="text-emerald-400 ml-2" />}
      </div>

      <p className="text-sm text-slate-300 line-clamp-2">
        {listing.description}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-slate-800">
        <span className="text-xs px-2 py-1 bg-slate-800 rounded-full">
          {listing.category}
        </span>
        <button className="px-6 py-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 font-medium hover:bg-teal-500/20 transition-all flex items-center gap-2">
          Buy Now
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

// ── Skill Marketplace Page ───────────────────────────
export default function MarketplacePage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories = ['All', ...new Set(mockListings.map(l => l.category))]

  const filteredListings = useMemo(() => {
    return mockListings.filter(listing => 
      (listing.title.toLowerCase().includes(search.toLowerCase()) ||
       listing.seller.toLowerCase().includes(search.toLowerCase())) &&
      (!activeCategory || activeCategory === 'All' || listing.category === activeCategory)
    )
  }, [search, activeCategory])

  return (
    <div className="min-h-screen bg-[#050D1A] text-slate-100 font-sans p-6 pb-20">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-3 mb-2">
            <Zap size={32} className="text-yellow-400" />
            <h1 className="text-4xl font-black">Skill Marketplace</h1>
          </div>
          <p className="text-xl text-slate-300 max-w-3xl">
            Turn your ReferTRM skills into quick income — or get help to level up faster.
          </p>
          <p className="text-sm text-slate-500 mt-2 flex items-center justify-center md:justify-start gap-2">
            <DollarSign size={16} className="text-emerald-400" />
            Safe escrow • Reputation protected • Start earning today
          </p>
        </div>

        {/* Search & Category Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search skills or sellers..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-5 py-4 bg-slate-900/60 border border-slate-700 rounded-2xl placeholder-slate-500 focus:border-teal-500 focus:outline-none pl-12"
            />
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat === 'All' ? null : cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  (cat === 'All' && !activeCategory) || activeCategory === cat
                    ? 'bg-teal-500 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Post Service CTA */}
        <div className="flex justify-center md:justify-end">
          <Link
            href="/dashboard/marketplace/post"
            className="px-6 py-3 bg-teal-600 hover:bg-teal-500 rounded-xl font-medium flex items-center gap-2 transition-all shadow-lg"
          >
            <Zap size={18} />
            Post Your Service
          </Link>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.length > 0 ? (
            filteredListings.map(listing => (
              <ServiceCard key={listing.id} listing={listing} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-slate-400">
              <AlertTriangle size={32} className="mx-auto mb-4 text-amber-400" />
              No services match right now. Try posting what you need!
            </div>
          )}
        </div>

        {/* Ladder Teaser */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900/20 to-teal-900/20 border border-emerald-500/30 text-center space-y-4">
          <h3 className="text-xl font-bold flex items-center justify-center gap-2">
            <TrendingUp size={24} className="text-emerald-400" />
            Turn Skills into Your Future
          </h3>
          <p className="text-slate-300">
            Sell 3 services this month? Unlock Learner stage + 50K–100K MMK potential.
          </p>
          <Link href="/dashboard/ladder" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 rounded-xl font-medium hover:brightness-110 transition-all">
            View Your Career Ladder <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  )
}
