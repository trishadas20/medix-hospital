import { CalendarDays, Clock3 } from 'lucide-react'
import { useHospitalData } from '../hooks/useHospitalData'

export default function PublicAppointments() {
  const { items: appointments } = useHospitalData('appointments')
  return <section className="public-inner-page"><div className="public-container">
    <div className="inner-banner"><span><CalendarDays size={17}/> Appointment Schedule</span><h1>Upcoming Appointments</h1><p>Public view of scheduled hospital appointments.</p></div>
    <div className="appointment-public-list">{appointments.map(a => <article key={a.id}>
      <div className="appointment-date"><CalendarDays/><strong>{a.date}</strong><span>{a.time}</span></div>
      <div className="appointment-public-info"><small>{a.id} · {a.department}</small><h3>{a.patient}</h3><p>With {a.doctor} · {a.type}</p></div>
      <span className={`appointment-status ${a.status.toLowerCase()}`}>{a.status}</span>
      <div className="appointment-time-mobile"><Clock3 size={15}/>{a.time}</div>
    </article>)}</div>
  </div></section>
}
