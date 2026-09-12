import { Search, Stethoscope } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useHospitalData } from '../hooks/useHospitalData'

export default function PublicDoctors() {
  const [search, setSearch] = useState('')
  const { items: doctors } = useHospitalData('doctors')
  const visible = useMemo(() => doctors.filter(d => `${d.name} ${d.specialty}`.toLowerCase().includes(search.toLowerCase())), [search, doctors])

  return <section className="public-inner-page"><div className="public-container">
    <div className="inner-banner"><span><Stethoscope size={17}/> Medical Specialists</span><h1>Our Doctors</h1><p>Find the right specialist for your healthcare needs.</p></div>
    <div className="public-search"><Search size={19}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search doctor or specialty..." /></div>
    <div className="public-doctor-grid full">{visible.map(d => <article className="public-doctor-card" key={d.id}><div className="doctor-avatar">{d.avatar}</div><span className={`availability ${d.status.toLowerCase().replaceAll(' ','-')}`}>{d.status}</span><h3>{d.name}</h3><p>{d.specialty}</p><div className="doctor-meta"><span>{d.experience} experience</span><span>{d.patients} patients</span></div><button disabled={d.status !== 'Available'}>{d.status === 'Available' ? 'Book Appointment' : 'Currently Unavailable'}</button></article>)}</div>
    {!visible.length && <p className="public-empty">No doctors found.</p>}
  </div></section>
}
