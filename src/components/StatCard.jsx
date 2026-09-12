import { ArrowUpRight } from 'lucide-react'

export default function StatCard({ title, value, change, icon: Icon, tone = 'cyan' }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${tone}`}><Icon size={22} /></div>
      <div className="stat-copy"><span>{title}</span><strong>{value}</strong><small><ArrowUpRight size={13} />{change} this month</small></div>
    </article>
  )
}
