import { CalendarDays, CreditCard, Stethoscope, Users } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import StatusBadge from '../components/StatusBadge'
import { useHospitalData } from '../hooks/useHospitalData'
import { useNavigate } from 'react-router-dom'

const bars = [42, 58, 49, 72, 64, 86, 78]

export default function Dashboard() {
  const navigate = useNavigate()
  const { items: appointments } = useHospitalData('appointments')
  const { items: patients } = useHospitalData('patients')
  return (
    <>
      <PageHeader eyebrow="Overview" title="Good afternoon, Trisha 👋" description="Here is what is happening at Medix Hospital today." action="New Appointment" onAction={() => navigate('/admin/appointments')} />
      <section className="stats-grid">
        <StatCard title="Total Patients" value="2,480" change="12.5%" icon={Users} tone="cyan" />
        <StatCard title="Active Doctors" value="86" change="8.2%" icon={Stethoscope} tone="violet" />
        <StatCard title="Appointments" value="164" change="10.4%" icon={CalendarDays} tone="orange" />
        <StatCard title="Monthly Revenue" value="₹8.42L" change="16.8%" icon={CreditCard} tone="green" />
      </section>

      <section className="dashboard-grid">
        <article className="panel revenue-panel">
          <div className="panel-heading"><div><span className="eyebrow">Performance</span><h2>Patient Overview</h2></div><select defaultValue="week"><option value="week">This week</option><option value="month">This month</option></select></div>
          <div className="chart-summary"><div><small>Total visits</small><strong>1,284</strong></div><span>+14.2% vs last week</span></div>
          <div className="bar-chart">
            {bars.map((height, index) => <div key={index} className="bar-column"><div className="bar-track"><span style={{ height: `${height}%` }} /></div><small>{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][index]}</small></div>)}
          </div>
        </article>
        <article className="panel occupancy-panel">
          <div className="panel-heading"><div><span className="eyebrow">Capacity</span><h2>Bed Occupancy</h2></div></div>
          <div className="donut" style={{ '--value': '76%' }}><div><strong>76%</strong><span>Occupied</span></div></div>
          <div className="occupancy-stats"><div><span className="dot occupied" />Occupied <strong>228</strong></div><div><span className="dot available" />Available <strong>72</strong></div></div>
        </article>
      </section>

      <section className="dashboard-grid lower">
        <article className="panel">
          <div className="panel-heading"><div><span className="eyebrow">Schedule</span><h2>Today's Appointments</h2></div><button className="text-button">View all</button></div>
          <div className="appointment-list">
            {appointments.slice(0,4).map((item) => <div className="appointment-item" key={item.id}><div className="time-box"><strong>{item.time.split(' ')[0]}</strong><small>{item.time.split(' ')[1]}</small></div><div className="appointment-copy"><strong>{item.patient}</strong><span>{item.doctor} • {item.department}</span></div><StatusBadge value={item.status} /></div>)}
          </div>
        </article>
        <article className="panel">
          <div className="panel-heading"><div><span className="eyebrow">Care status</span><h2>Recent Patients</h2></div><button className="text-button">View all</button></div>
          <div className="patient-list">
            {patients.slice(0,4).map((item) => <div className="patient-item" key={item.id}><div className="avatar soft">{item.name.split(' ').map(n => n[0]).join('')}</div><div><strong>{item.name}</strong><span>{item.condition} • {item.id}</span></div><StatusBadge value={item.status} /></div>)}
          </div>
        </article>
      </section>
    </>
  )
}
