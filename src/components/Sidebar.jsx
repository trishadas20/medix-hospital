import { NavLink } from "react-router-dom";

import {
  Activity,
  CalendarDays,
  CreditCard,
  FlaskConical,
  LayoutDashboard,
  Pill,
  Stethoscope,
  Users,
  X,
  BriefcaseMedical,
} from "lucide-react";

const links = [
  {
    to: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: "/admin/doctors",
    label: "Doctors",
    icon: Stethoscope,
  },
  {
    to: "/admin/patients",
    label: "Patients",
    icon: Users,
  },
  {
    to: "/admin/appointments",
    label: "Appointments",
    icon: CalendarDays,
  },
  {
    to: "/admin/billing",
    label: "Billing",
    icon: CreditCard,
  },
  {
    to: "/admin/pharmacy",
    label: "Pharmacy",
    icon: Pill,
  },
  {
    to: "/admin/lab-reports",
    label: "Lab Reports",
    icon: FlaskConical,
  },
  {
    to: "/admin/services",
    label: "Services",
    icon: BriefcaseMedical,
  },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="brand">
          <span className="brand-mark">
            <Activity size={22} />
          </span>

          <div>
            <strong>Medix</strong>
            <small>Hospital Admin</small>
          </div>

          <button
            type="button"
            className="icon-button mobile-close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="nav-list">
          <p className="nav-heading">Workspace</p>

          {links.map(
            ({
              to,
              label,
              icon: Icon,
              end,
            }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={onClose}
                className={({ isActive }) =>
                  `nav-item ${
                    isActive ? "active" : ""
                  }`
                }
              >
                <Icon size={19} />

                <span>{label}</span>
              </NavLink>
            )
          )}
        </nav>

        <div className="help-card">
          <span className="help-icon">
            <Activity size={22} />
          </span>

          <strong>Emergency Support</strong>

          <p>24/7 hospital assistance</p>

          <button type="button">
            Call +91 1800 123 456
          </button>
        </div>
      </aside>

      {open && (
        <button
          type="button"
          className="sidebar-overlay"
          aria-label="Close sidebar"
          onClick={onClose}
        />
      )}
    </>
  );
}