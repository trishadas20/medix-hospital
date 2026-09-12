import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'

import Dashboard from './pages/Dashboard'
import Doctors from './pages/Doctors'
import Patients from './pages/Patients'
import Appointments from './pages/Appointments'
import Billing from './pages/Billing'
import Pharmacy from './pages/Pharmacy'
import LabReports from './pages/LabReports'
import Services from './pages/Services'



import PublicLayout from './public/PublicLayout'
import PublicHome from './public/PublicHome'
import PublicDoctors from './public/PublicDoctors'
import PublicAppointments from './public/PublicAppointments'
import PublicServices from './public/PublicServices'
import PublicPatients from './public/PublicPatients'
import PublicBilling from './public/PublicBilling'
import PublicLabReports from './public/PublicLabReports'
import PublicPharmacy from './public/PublicPharmacy'

export default function App() {
  return (
    <Routes>

      {/* ================= PUBLIC WEBSITE ================= */}
      <Route element={<PublicLayout />}>
        <Route index element={<PublicHome />} />
        <Route path="our-doctors" element={<PublicDoctors />} />
        <Route path="appointments-list" element={<PublicAppointments />} />
        <Route path="services" element={<PublicServices />} />
        <Route path="patients" element={<PublicPatients />} />
        <Route path="lab-reports" element={<PublicLabReports />}/>
        <Route path="pharmacy" element={<PublicPharmacy />} />
      </Route>


      {/* ================= ADMIN PANEL ================= */}
      <Route path="admin" element={<Layout />}>

        <Route index element={<Dashboard />} />

        <Route path="doctors" element={<Doctors />} />

        {/* PATIENTS */}
        <Route path="patients" element={<Patients />} />

        <Route path="appointments" element={<Appointments />} />

        <Route path="billing" element={<Billing />} />

        <Route path="pharmacy" element={<Pharmacy />} />

        <Route path="lab-reports" element={<LabReports />} />

        <Route path="services" element={<Services />} />

        <Route path="pharmacy" element={<PublicPharmacy />} />

      </Route>


      {/* ================= 404 ================= */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  )
}