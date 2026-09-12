import {
  ArrowLeft,
  HeartPulse,
  Search,
  UserRound
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { useHospitalData } from '../hooks/useHospitalData'

export default function PublicPatients() {
  const { items: patients } = useHospitalData('patients')
  const [search, setSearch] = useState('')

  const filteredPatients = useMemo(() => {
    const value = search.toLowerCase().trim()

    if (!value) return patients

    return patients.filter((patient) =>
      [
        patient.name,
        patient.id,
        patient.phone,
        patient.gender,
        patient.status
      ]
        .filter(Boolean)
        .some((item) =>
          String(item).toLowerCase().includes(value)
        )
    )
  }, [patients, search])

  return (
    <main className="public-patients-page">

      {/* Header */}
      <section className="patients-page-hero">
        <div className="public-container">

          <Link to="/" className="back-link">
            <ArrowLeft size={17} />
            Back to Home
          </Link>

          <div className="patients-hero-content">
            <div>
              <span className="hero-pill">
                <HeartPulse size={15} />
                Patient Care
              </span>

              <h1>Our Patients</h1>

              <p>
                View patient information and access essential
                healthcare details from one convenient place.
              </p>
            </div>

            <div className="patients-total-card">
              <UserRound size={28} />
              <div>
                <strong>{patients.length}</strong>
                <span>Total Patients</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Patients */}
      <section className="public-section">
        <div className="public-container">

          <div className="patients-toolbar">
            <div>
              <span>Patient Directory</span>
              <h2>Patient Information</h2>
            </div>

            <div className="patient-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search patients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {filteredPatients.length > 0 ? (
            <div className="public-patients-grid">
              {filteredPatients.map((patient) => (
                <article
                  className="public-patient-card"
                  key={patient.id}
                >
                  <div className="public-patient-card-top">

                    <div className="public-patient-avatar">
                      {patient.avatar || (
                        <UserRound size={28} />
                      )}
                    </div>

                    <span
                      className={`patient-status-badge ${
                        patient.status
                          ?.toLowerCase()
                          .replaceAll(' ', '-')
                      }`}
                    >
                      {patient.status || 'Active'}
                    </span>

                  </div>

                  <h3>{patient.name}</h3>

                  <p className="patient-id">
                    Patient ID: #{patient.id}
                  </p>

                  <div className="patient-details">

                    <div>
                      <span>Age</span>
                      <strong>
                        {patient.age || 'N/A'}
                      </strong>
                    </div>

                    <div>
                      <span>Gender</span>
                      <strong>
                        {patient.gender || 'N/A'}
                      </strong>
                    </div>

                    <div>
                      <span>Phone</span>
                      <strong>
                        {patient.phone || 'N/A'}
                      </strong>
                    </div>

                    <div>
                      <span>Blood Group</span>
                      <strong>
                        {patient.bloodGroup || 'N/A'}
                      </strong>
                    </div>

                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="no-patients">
              <UserRound size={40} />
              <h3>No patients found</h3>
              <p>
                Try searching with a different patient name or ID.
              </p>
            </div>
          )}

        </div>
      </section>

    </main>
  )
}