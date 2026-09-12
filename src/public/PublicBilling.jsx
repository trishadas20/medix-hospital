import {
  ArrowLeft,
  CreditCard,
  Search
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { useHospitalData } from '../hooks/useHospitalData'

export default function PublicBilling() {
  const { items: bills = [] } = useHospitalData('billing')
  const [search, setSearch] = useState('')

  const filteredBills = useMemo(() => {
    const term = search.toLowerCase()

    return bills.filter((bill) =>
      `${bill.patientName || ''} ${bill.invoice || ''} ${bill.status || ''}`
        .toLowerCase()
        .includes(term)
    )
  }, [bills, search])

  return (
    <div className="public-page">
      <div className="public-page-header">
        <Link to="/" className="back-button">
          <ArrowLeft size={18} />
          Back
        </Link>

        <div>
          <span className="eyebrow">Hospital Billing</span>
          <h1>Billing Information</h1>
          <p>View your billing and payment information.</p>
        </div>
      </div>

      <div className="public-search">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search invoice or patient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="public-billing-grid">
        {filteredBills.length > 0 ? (
          filteredBills.map((bill, index) => (
            <div className="billing-card" key={bill.id || index}>
              <div className="billing-icon">
                <CreditCard size={22} />
              </div>

              <div>
                <h3>
                  {bill.invoice || `INV-${1000 + index}`}
                </h3>

                <p>
                  Patient: {bill.patientName || bill.patient || '-'}
                </p>

                <p>
                  Date: {bill.date || '-'}
                </p>

                <strong>
                  ₹{Number(bill.amount || 0).toLocaleString()}
                </strong>
              </div>

              <span
                className={
                  bill.status?.toLowerCase() === 'paid'
                    ? 'status status-paid'
                    : 'status status-pending'
                }
              >
                {bill.status || 'Pending'}
              </span>
            </div>
          ))
        ) : (
          <p>No billing records found.</p>
        )}
      </div>
    </div>
  )
}