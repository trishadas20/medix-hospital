import { useMemo, useState } from 'react'
import { Search, Plus, Receipt, CreditCard, Clock } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { useHospitalData } from '../hooks/useHospitalData'

export default function Billing() {
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

  const totalAmount = bills.reduce(
    (sum, bill) => sum + Number(bill.amount || 0),
    0
  )

  const paidAmount = bills
    .filter((bill) => bill.status?.toLowerCase() === 'paid')
    .reduce((sum, bill) => sum + Number(bill.amount || 0), 0)

  const pendingAmount = totalAmount - paidAmount

  return (
    <div>
      <PageHeader
        eyebrow="Financial Management"
        title="Billing"
        description="Manage patient invoices, payments and outstanding bills."
        action="Add Bill"
        onAction={() => alert('Add Bill clicked')}
      />

      {/* Summary Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Receipt size={22} />
          </div>
          <div>
            <span>Total Billing</span>
            <h3>₹{totalAmount.toLocaleString()}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <CreditCard size={22} />
          </div>
          <div>
            <span>Paid Amount</span>
            <h3>₹{paidAmount.toLocaleString()}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={22} />
          </div>
          <div>
            <span>Pending Amount</span>
            <h3>₹{pendingAmount.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      {/* Billing Table */}
      <div className="content-card">
        <div className="table-header">
          <div>
            <h2>Billing Records</h2>
            <p>View and manage patient billing information.</p>
          </div>

          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search bills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Patient</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredBills.length > 0 ? (
                filteredBills.map((bill, index) => (
                  <tr key={bill.id || index}>
                    <td>{bill.invoice || `INV-${1000 + index}`}</td>
                    <td>{bill.patientName || bill.patient || 'Unknown'}</td>
                    <td>{bill.date || '-'}</td>
                    <td>₹{Number(bill.amount || 0).toLocaleString()}</td>
                    <td>
                      <span
                        className={`status ${
                          bill.status?.toLowerCase() === 'paid'
                            ? 'status-paid'
                            : 'status-pending'
                        }`}
                      >
                        {bill.status || 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-state">
                    No billing records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}