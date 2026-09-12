import { CalendarDays, HeartPulse, Menu, ShieldCheck, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

export default function PublicLayout() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <div className="public-site">
      <header className="public-header">
        <div className="public-container public-nav">
          <Link to="/" className="public-brand" onClick={close}>
            <span><HeartPulse size={25} /></span>
            <div><strong>Medix Hospital</strong><small>Care you can trust</small></div>
          </Link>

          <button className="public-menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X /> : <Menu />}
          </button>

          <nav className={open ? 'public-links open' : 'public-links'}>
            <NavLink to="/" end onClick={close}>Home</NavLink>
            <NavLink to="/our-doctors" onClick={close}>Doctors</NavLink>
            <NavLink to="/appointments-list" onClick={close}>Appointments</NavLink>
            <NavLink to="/services" onClick={close}>Services</NavLink>
            <Link to="/pharmacy">Pharmacy</Link>
            
          </nav>
        </div>
      </header>

      <main><Outlet /></main>

      <footer className="public-footer">
        <div className="public-container footer-grid">
          <div><div className="footer-brand"><HeartPulse size={22}/> Medix Hospital</div><p>Modern healthcare with experienced doctors, advanced facilities and patient-first care.</p></div>
          <div><strong>Emergency</strong><p>24×7 Helpline<br/><a href="tel:+911800123456">1800 123 456</a></p></div>
          <div><strong>Appointment</strong><p><CalendarDays size={15}/> Mon–Sat, 8 AM–8 PM</p></div>
        </div>
      </footer>
    </div>
  )
}
