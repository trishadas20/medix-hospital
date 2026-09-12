import {
  Activity,
  Ambulance,
  ArrowRight,
  CalendarCheck,
  CreditCard,
  FileText,
  HeartPulse,
  Microscope,
  Pill,
  Receipt,
  Stethoscope,
  Users,
  Wallet
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useHospitalData } from '../hooks/useHospitalData'

const services = [
  { icon: Stethoscope, title: 'Expert Consultation', text: 'Consult experienced specialists across major medical departments.' },
  { icon: Ambulance, title: '24×7 Emergency', text: 'Round-the-clock emergency response and critical care support.' },
  { icon: Microscope, title: 'Diagnostics & Lab', text: 'Accurate testing, imaging and digital reports under one roof.' },
  { icon: Pill, title: 'Hospital Pharmacy', text: 'Essential medicines and pharmacy support available every day.' },
]

export default function PublicHome() {
  const { items: doctors } = useHospitalData('doctors')
  const { items: patients } = useHospitalData('patients')
  const { items: appointments } = useHospitalData('appointments')
  const { items: billing = [] } = useHospitalData('billing')
  const { items: labReports = [] } = useHospitalData('labReports')

  const availableDoctors = doctors.filter(d => d.status === 'Available').length
  const todayAppointments = appointments.filter(a => a.date === '18 Jul 2026').length

  const totalBilling = billing.reduce(
    (sum, bill) => sum + Number(bill.amount || 0),
    0
  )

  const paidBilling = billing
    .filter(bill => bill.status?.toLowerCase() === 'paid')
    .reduce(
      (sum, bill) => sum + Number(bill.amount || 0),
      0
    )

  const pendingBilling = totalBilling - paidBilling

  return (
    <>
      <section className="hero-section">
        <div className="public-container hero-grid">
          <div className="hero-copy">
            <span className="hero-pill"><Activity size={15}/> Trusted healthcare, every day</span>
            <h1>Better care for a <em>healthier tomorrow.</em></h1>
            <p>Meet experienced doctors, view available appointments and access hospital services from one simple page.</p>
            <div className="hero-actions">
              <Link to="/our-doctors" className="public-primary">Find a Doctor <ArrowRight size={18}/></Link>
              <Link to="/appointments-list" className="public-secondary">View Appointments</Link>
            </div>
            <div className="trust-row"><span>✓ Qualified doctors</span><span>✓ Modern facilities</span><span>✓ 24×7 support</span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-circle"><HeartPulse size={86}/></div>
            <div className="floating-card doctor-available"><span className="live-dot"></span><div><strong>{availableDoctors} Doctors</strong><small>Available now</small></div></div>
            <div className="floating-card appointment-count"><CalendarCheck/><div><strong>{todayAppointments} Appointments</strong><small>Scheduled today</small></div></div>
          </div>
        </div>
      </section>

      <section className="public-stats">
        <div className="public-container public-stats-grid">
          <div><Users/><strong>{doctors.length}+</strong><span>Specialist Doctors</span></div>
          <div><HeartPulse/><strong>{patients.length}+</strong><span>Current Patients</span></div>
          <div><CalendarCheck/><strong>{appointments.length}+</strong><span>Appointments</span></div>
          <div><Activity/><strong>24×7</strong><span>Emergency Care</span></div>
        </div>
      </section>

      <section className="public-section" id="services">
        <div className="public-container">
          <div className="section-heading"><span>Our Services</span><h2>Complete healthcare support</h2><p>Everything patients need, from consultation to diagnostics and medicines.</p></div>
          <div className="service-grid">{services.map(({icon: Icon, title, text}) => <article className="service-card" key={title}><div><Icon/></div><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div>
      </section>

      <section className="public-section doctors-preview">
        <div className="public-container">
          <div className="section-heading row-heading"><div><span>Medical Team</span><h2>Meet our doctors</h2></div><Link to="/our-doctors">View all doctors <ArrowRight size={16}/></Link></div>
          <div className="public-doctor-grid">{doctors.slice(0,3).map(d => <article className="public-doctor-card" key={d.id}><div className="doctor-avatar">{d.avatar}</div><span className={`availability ${d.status.toLowerCase().replaceAll(' ','-')}`}>{d.status}</span><h3>{d.name}</h3><p>{d.specialty}</p><div className="doctor-meta"><span>{d.experience} experience</span><span>{d.patients} patients</span></div></article>)}</div>
        </div>
      </section>


      <section className="public-section patient-care-section">
  <div className="public-container">

    <div className="patient-care-header">
      <div className="section-heading">
        <span>Patient Care</span>
        <h2>Your healthcare journey, made simpler.</h2>
        <p>
          From your first visit to follow-up care, we make every step
          simple, comfortable and connected.
        </p>
      </div>

      <div className="patient-count-box">
        <HeartPulse size={25} />
        <div>
          <strong>{patients.length}+</strong>
          <span>Patients served</span>
        </div>
      </div>
    </div>

    <div className="patient-journey">

      <div className="journey-item">
        <div className="journey-number">01</div>

        <div className="journey-content">
          <span>STEP ONE</span>
          <h3>Register</h3>
          <p>
            Complete your patient registration and share your
            basic healthcare information.
          </p>
        </div>
      </div>

      <div className="journey-line"></div>

      <div className="journey-item">
        <div className="journey-number">02</div>

        <div className="journey-content">
          <span>STEP TWO</span>
          <h3>Consult</h3>
          <p>
            Connect with the right medical specialist based on
            your healthcare needs.
          </p>
        </div>
      </div>

      <div className="journey-line"></div>

      <div className="journey-item">
        <div className="journey-number">03</div>

        <div className="journey-content">
          <span>STEP THREE</span>
          <h3>Get Treatment</h3>
          <p>
            Receive personalised treatment, diagnostics and
            medication support.
          </p>
        </div>
      </div>

      <div className="journey-line"></div>

      <div className="journey-item">
        <div className="journey-number">04</div>

        <div className="journey-content">
          <span>STEP FOUR</span>
          <h3>Recover</h3>
          <p>
            Continue your recovery with follow-up care and
            ongoing medical support.
          </p>
        </div>
      </div>

    </div>

    <div className="patient-care-bottom">
      <div>
        <strong>Need help with your care?</strong>
        <span>Explore patient services and important information.</span>
      </div>

      <Link to="/patients" className="public-primary">
        Patient Information
        <ArrowRight size={18} />
      </Link>
    </div>

  </div>
</section>

<section className="public-section billing-section">
  <div className="public-container">

    <div className="billing-header">
      <div className="section-heading">
        <span>Billing & Payments</span>
        <h2>Stay on top of your healthcare expenses.</h2>
        <p>
          View your billing information, payment status and recent
          healthcare invoices in one place.
        </p>
      </div>

      <Link to="/billing" className="billing-view-btn">
        View Billing
        <ArrowRight size={17} />
      </Link>
    </div>

    <div className="billing-dashboard">

      {/* TOTAL BILL */}
      <div className="billing-main-card">
        <div className="billing-card-top">
          <div className="billing-icon-large">
            <Wallet size={25} />
          </div>

          <span className="billing-label">
            Total Billing
          </span>
        </div>

        <div className="billing-total">
          ₹{totalBilling.toLocaleString()}
        </div>

        <p>
          Total healthcare expenses recorded
        </p>

        <div className="billing-card-footer">
          <span>
            {billing.length} invoices
          </span>

          <Receipt size={18} />
        </div>
      </div>

      {/* PAID */}
      <div className="billing-small-card paid-card">
        <div className="billing-small-icon">
          <CreditCard size={21} />
        </div>

        <div>
          <span>Paid Amount</span>
          <strong>
            ₹{paidBilling.toLocaleString()}
          </strong>
        </div>

        <div className="billing-progress">
          <div
            style={{
              width: totalBilling
                ? `${(paidBilling / totalBilling) * 100}%`
                : '0%'
            }}
          ></div>
        </div>

        <small>
          Payments completed
        </small>
      </div>

      {/* PENDING */}
      <div className="billing-small-card pending-card">
        <div className="billing-small-icon">
          <Receipt size={21} />
        </div>

        <div>
          <span>Pending Amount</span>
          <strong>
            ₹{pendingBilling.toLocaleString()}
          </strong>
        </div>

        <div className="billing-progress">
          <div
            style={{
              width: totalBilling
                ? `${(pendingBilling / totalBilling) * 100}%`
                : '0%'
            }}
          ></div>
        </div>

        <small>
          Payment pending
        </small>
      </div>

    </div>

    {/* RECENT INVOICES */}
    <div className="recent-billing">

      <div className="recent-billing-heading">
        <div>
          <span>Recent Activity</span>
          <h3>Recent invoices</h3>
        </div>

        <Link to="/billing">
          See all
          <ArrowRight size={15} />
        </Link>
      </div>

      <div className="invoice-list">

        {billing.slice(0, 3).map((bill, index) => (
          <div
            className="invoice-item"
            key={bill.id || index}
          >

            <div className="invoice-left">
              <div className="invoice-icon">
                <Receipt size={18} />
              </div>

              <div>
                <strong>
                  {bill.invoice || `INV-${1000 + index}`}
                </strong>

                <span>
                  {bill.patientName ||
                    bill.patient ||
                    'Patient'}{' '}
                  • {bill.date || 'Recent'}
                </span>
              </div>
            </div>

            <div className="invoice-right">
              <strong>
                ₹{Number(bill.amount || 0).toLocaleString()}
              </strong>

              <span
                className={
                  bill.status?.toLowerCase() === 'paid'
                    ? 'invoice-status paid'
                    : 'invoice-status pending'
                }
              >
                {bill.status || 'Pending'}
              </span>
            </div>

          </div>
        ))}

        {billing.length === 0 && (
          <div className="no-invoices">
            No billing records available.
          </div>
        )}

      </div>

    </div>

  </div>
</section>


<section className="public-section lab-reports-section">
  <div className="public-container">

    <div className="lab-reports-header">

      <div className="section-heading">
        <span>Lab Reports</span>

        <h2>
          Your health reports, all in one place.
        </h2>

        <p>
          View your latest diagnostic reports, test results and
          laboratory updates whenever you need them.
        </p>
      </div>

      <Link
        to="/lab-reports"
        className="lab-view-all-btn"
      >
        View All Reports
        <ArrowRight size={17} />
      </Link>

    </div>


    {/* REPORT LIST */}

    <div className="lab-reports-card">

      <div className="lab-reports-top">

        <div>
          <span>Latest Results</span>
          <h3>Recent lab reports</h3>
        </div>

        <div className="lab-count">
          {labReports.length} Reports
        </div>

      </div>


      <div className="lab-report-list">

        {labReports.slice(0, 3).map((report, index) => (

          <div
            className="lab-report-item"
            key={report.id || index}
          >

            <div className="lab-report-left">

              <div className="lab-report-icon">
                <FileText size={20} />
              </div>

              <div className="lab-report-info">

                <strong>
                  {report.testName ||
                    report.test ||
                    report.name ||
                    'Laboratory Test'}
                </strong>

                <span>
                  {report.patientName ||
                    report.patient ||
                    'Patient'}
                  {' • '}
                  {report.date || 'Recent'}
                </span>

              </div>

            </div>


            <div className="lab-report-middle">

              <span className="lab-report-type">
                {report.category ||
                  report.department ||
                  'Diagnostic'}
              </span>

            </div>


            <div className="lab-report-right">

              <span
                className={`lab-report-status ${
                  report.status?.toLowerCase() === 'completed'
                    ? 'completed'
                    : 'pending'
                }`}
              >
                {report.status || 'Pending'}
              </span>

              <ArrowRight size={17} />

            </div>

          </div>

        ))}


        {labReports.length === 0 && (

          <div className="no-lab-reports">

            <div className="no-lab-icon">
              <Microscope size={25} />
            </div>

            <div>
              <strong>No lab reports available</strong>
              <span>
                Your diagnostic reports will appear here.
              </span>
            </div>

          </div>

        )}

      </div>

    </div>

  </div>
</section>
    </>
  )
}
