import {
  ArrowLeft,
  FileText,
  Microscope
} from 'lucide-react'

import { Link } from 'react-router-dom'
import { useHospitalData } from '../hooks/useHospitalData'


export default function PublicLabReports() {

  const { items: labReports = [] } =
    useHospitalData('labReports')


  return (
    <section className="lab-reports-page">

      <div className="public-container">

        {/* BACK BUTTON */}
        <Link
          to="/"
          className="lab-back-link"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>


        {/* PAGE HEADER */}
        <div className="lab-page-header">

          <div>

            <span>
              DIAGNOSTIC CENTER
            </span>

            <h1>
              Laboratory Reports
            </h1>

            <p>
              View your diagnostic tests, laboratory
              results and recent medical reports.
            </p>

          </div>


          <div className="lab-page-count">

            <strong>
              {labReports.length}
            </strong>

            <span>
              Total Reports
            </span>

          </div>

        </div>


        {/* REPORTS */}

        <div className="all-lab-reports">

          {labReports.length > 0 ? (

            labReports.map((report, index) => (

              <div
                className="full-lab-report"
                key={report.id || index}
              >

                <div className="full-report-icon">
                  <FileText size={22} />
                </div>


                <div className="full-report-content">

                  <strong>
                    {report.testName ||
                      report.test ||
                      report.name ||
                      'Laboratory Test'}
                  </strong>

                  <span>
                    Patient:{' '}
                    {report.patientName ||
                      report.patient ||
                      'Patient'}
                  </span>

                  <small>
                    {report.date || 'Recent'}
                  </small>

                </div>


                <div className="full-report-category">

                  {report.category ||
                    report.department ||
                    'Diagnostic'}

                </div>


                <span
                  className={`lab-report-status ${
                    report.status?.toLowerCase() === 'completed'
                      ? 'completed'
                      : 'pending'
                  }`}
                >
                  {report.status || 'Pending'}
                </span>

              </div>

            ))

          ) : (

            <div className="empty-lab-page">

              <Microscope size={40} />

              <h3>
                No lab reports available
              </h3>

              <p>
                Lab reports added by the admin
                will appear here.
              </p>

            </div>

          )}

        </div>

      </div>

    </section>
  )
}
