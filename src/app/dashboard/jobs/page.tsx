// src/app/dashboard/jobs/page.tsx
'use client'

import { useState, useMemo } from 'react'
import { Briefcase, MapPin, DollarSign, Star, CheckCircle, TrendingUp, Search, Filter, Building2, Clock, Zap, AlertTriangle } from 'lucide-react'

// ── Mock 26 Real Myanmar Jobs ───────────────────────────
const jobs = [
  { id: 1, title: 'Junior Accountant', company: 'KBZ Bank', location: 'Yangon', salary: '300,000 - 450,000 MMK', reward: '50,000 MMK', level: 'Beginner', verified: true, posted: '2 hours ago' },
  { id: 2, title: 'Loan Officer', company: 'AYA Bank', location: 'Mandalay', salary: '400,000 - 600,000 MMK', reward: '75,000 MMK', level: 'Certified', verified: true, posted: '1 day ago' },
  { id: 3, title: 'Financial Analyst', company: 'UAB Bank', location: 'Yangon', salary: '500,000 - 750,000 MMK', reward: '100,000 MMK', level: 'Pro', verified: false, posted: '3 days ago' },
  { id: 4, title: 'Web Developer', company: 'Wave Money', location: 'Yangon', salary: '600,000 - 900,000 MMK', reward: '80,000 MMK', level: 'Certified', verified: true, posted: '4 hours ago' },
  { id: 5, title: 'Mobile App Developer', company: 'Ooredoo Myanmar', location: 'Yangon', salary: '700,000 - 1,000,000 MMK', reward: '120,000 MMK', level: 'Pro', verified: true, posted: '2 days ago' },
  { id: 6, title: 'IT Support Specialist', company: 'MPT', location: 'Naypyidaw', salary: '350,000 - 500,000 MMK', reward: '60,000 MMK', level: 'Beginner', verified: false, posted: '5 days ago' },
  { id: 7, title: 'Hotel Receptionist', company: 'Chatrium Hotel', location: 'Yangon', salary: '250,000 - 400,000 MMK', reward: '40,000 MMK', level: 'Beginner', verified: true, posted: '1 hour ago' },
  { id: 8, title: 'Restaurant Manager', company: 'Shangri-La Hotel', location: 'Yangon', salary: '500,000 - 700,000 MMK', reward: '90,000 MMK', level: 'Certified', verified: true, posted: '3 days ago' },
  { id: 9, title: 'Tour Guide', company: 'Balloon Over Bagan', location: 'Bagan', salary: '300,000 - 450,000 MMK', reward: '50,000 MMK', level: 'Beginner', verified: false, posted: '4 days ago' },
  { id: 10, title: 'Production Supervisor', company: 'Unilever Myanmar', location: 'Yangon', salary: '450,000 - 650,000 MMK', reward: '70,000 MMK', level: 'Certified', verified: true, posted: '6 hours ago' },
  { id: 11, title: 'Quality Control Inspector', company: 'Coca-Cola Myanmar', location: 'Mandalay', salary: '350,000 - 500,000 MMK', reward: '55,000 MMK', level: 'Beginner', verified: true, posted: '2 days ago' },
  { id: 12, title: 'Machine Operator', company: 'Heineken Myanmar', location: 'Yangon', salary: '300,000 - 450,000 MMK', reward: '45,000 MMK', level: 'Beginner', verified: false, posted: '5 days ago' },
  { id: 13, title: 'Nurse', company: 'Pun Hlaing Hospital', location: 'Yangon', salary: '400,000 - 600,000 MMK', reward: '65,000 MMK', level: 'Certified', verified: true, posted: '3 hours ago' },
  { id: 14, title: 'Pharmacist', company: 'City Mart Holdings', location: 'Yangon', salary: '450,000 - 650,000 MMK', reward: '75,000 MMK', level: 'Certified', verified: true, posted: '1 day ago' },
  { id: 15, title: 'Medical Sales Rep', company: 'DKSH Myanmar', location: 'Mandalay', salary: '500,000 - 700,000 MMK', reward: '85,000 MMK', level: 'Pro', verified: false, posted: '4 days ago' },
  { id: 16, title: 'English Teacher', company: 'British Council Myanmar', location: 'Yangon', salary: '600,000 - 800,000 MMK', reward: '90,000 MMK', level: 'Certified', verified: true, posted: '5 hours ago' },
  { id: 17, title: 'School Administrator', company: 'International School Yangon', location: 'Yangon', salary: '500,000 - 700,000 MMK', reward: '80,000 MMK', level: 'Pro', verified: true, posted: '2 days ago' },
  { id: 18, title: 'Tutor', company: 'EduLink Myanmar', location: 'Remote', salary: '200,000 - 350,000 MMK', reward: '30,000 MMK', level: 'Beginner', verified: false, posted: '6 days ago' },
  { id: 19, title: 'Sales Associate', company: 'City Mart', location: 'Yangon', salary: '250,000 - 400,000 MMK', reward: '40,000 MMK', level: 'Beginner', verified: true, posted: '4 hours ago' },
  { id: 20, title: 'Store Manager', company: 'Ocean Supercenter', location: 'Mandalay', salary: '450,000 - 650,000 MMK', reward: '70,000 MMK', level: 'Certified', verified: true, posted: '3 days ago' },
  { id: 21, title: 'Cashier', company: 'GrabMart', location: 'Yangon', salary: '200,000 - 300,000 MMK', reward: '25,000 MMK', level: 'Beginner', verified: false, posted: '5 days ago' },
  { id: 22, title: 'Logistics Coordinator', company: 'DHL Myanmar', location: 'Yangon', salary: '400,000 - 600,000 MMK', reward: '60,000 MMK', level: 'Certified', verified: true, posted: '7 hours ago' },
  { id: 23, title: 'Warehouse Supervisor', company: 'FedEx Myanmar', location: 'Yangon', salary: '350,000 - 500,000 MMK', reward: '50,000 MMK', level: 'Beginner', verified: true, posted: '1 day ago' },
  { id: 24, title: 'Delivery Driver', company: 'Bee Logistics', location: 'Mandalay', salary: '300,000 - 450,000 MMK', reward: '40,000 MMK', level: 'Beginner', verified: false, posted: '4 days ago' },
  { id: 25, title: 'Project Coordinator', company: 'Save the Children Myanmar', location: 'Yangon', salary: '500,000 - 700,000 MMK', reward: '80,000 MMK', level: 'Pro', verified: true, posted: '2 hours ago' },
  { id: 26, title: 'Community Outreach Officer', company: 'World Vision Myanmar', location: 'Remote', salary: '400,000 - 600,000 MMK', reward: '65,000 MMK', level: 'Certified', verified: true, posted: '3 days ago' },
]

// ── Level Badge ───────────────────────────
function LevelBadge({ level }: { level: string }) {
  const config = {
    Beginner: { color: 'bg-blue-500/10 border-blue-500/30 text-blue-400', icon: <CheckCircle size={14} /> },
    Certified: { color: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400', icon: <Star size={14} /> },
    Pro: { color: 'bg-purple-500/10 border-purple-500/30 text-purple-400', icon: <Trophy size={14} /> },
  }[level as keyof typeof config] || { color: '', icon: null }

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.icon}
      {level}
    </span>
  )
}

// ── Job Card ───────────────────────────
function JobCard({ job }: { job: typeof jobs[0] }) {
  return (
    <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-teal-500/50 transition-all space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold">{job.title}</h3>
          <div className="text-sm text-slate-400 flex items-center gap-2 mt-1">
            <Building2 size={14} />
            {job.company}
          </div>
        </div>
        <LevelBadge level={job.level} />
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-slate-300">
        <div className="flex items-center gap-1">
          <MapPin size={14} />
          {job.location}
        </div>
        <div className="flex items-center gap-1">
          <DollarSign size={14} />
          {job.salary}
        </div>
        <div className="flex items-center gap-1">
          <Clock size={14} />
          {job.posted}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-teal-400 font-medium flex items-center gap-2">
          <Zap size={16} />
          Referral Reward: {job.reward}
        </div>
        {job.verified ? (
          <CheckCircle size={16} className="text-emerald-400" />
        ) : (
          <AlertTriangle size={16} className="text-amber-400" />
        )}
      </div>

      <button className="w-full py-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 font-medium hover:bg-teal-500/20 transition-all">
        Refer Now
      </button>
    </div>
  )
}

// ── Jobs Board Page ───────────────────────────
export default function JobsBoardPage() {
  const [search, setSearch] = useState('')
  const [filterLevel, setFilterLevel] = useState<string | null>(null)
  const [filterLocation, setFilterLocation] = useState<string | null>(null)

  const locations = [...new Set(jobs.map(j => j.location))]

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => 
      (job.title.toLowerCase().includes(search.toLowerCase()) || 
       job.company.toLowerCase().includes(search.toLowerCase())) &&
      (!filterLevel || job.level === filterLevel) &&
      (!filterLocation || job.location === filterLocation)
    )
  }, [search, filterLevel, filterLocation])

  return (
    <div className="min-h-screen bg-[#050D1A] text-slate-100 font-sans p-6 pb-20">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-3xl font-black">Jobs Board</h1>
          <p className="text-sm text-slate-400">
            {filteredJobs.length} opportunities available
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search jobs or companies..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-2xl placeholder-slate-500 focus:border-teal-500 focus:outline-none pl-10"
            />
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          </div>

          <select
            value={filterLevel || ''}
            onChange={e => setFilterLevel(e.target.value || null)}
            className="px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-2xl focus:border-teal-500 focus:outline-none"
          >
            <option value="">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Certified">Certified</option>
            <option value="Pro">Pro</option>
          </select>

          <select
            value={filterLocation || ''}
            onChange={e => setFilterLocation(e.target.value || null)}
            className="px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-2xl focus:border-teal-500 focus:outline-none"
          >
            <option value="">All Locations</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-slate-400">
              <AlertTriangle size={32} className="mx-auto mb-4 text-amber-400" />
              No jobs match your search. Try adjusting filters.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
