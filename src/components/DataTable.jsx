import { MoreHorizontal, Search } from 'lucide-react'

export default function DataTable({ columns, rows, search, onSearch, placeholder = 'Search records...' }) {
  return (
    <section className="table-card">
      <div className="table-toolbar">
        <div className="table-search"><Search size={17} /><input value={search} onChange={(e) => onSearch(e.target.value)} placeholder={placeholder} /></div>
        <button className="filter-button">All Records</button>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}<th>Action</th></tr></thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id || row.invoice || index}>
                {columns.map((column) => <td key={column.key}>{column.render ? column.render(row) : row[column.key]}</td>)}
                <td><button className="more-button" aria-label="More options"><MoreHorizontal size={19} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!rows.length && <div className="empty-state">No matching records found.</div>}
    </section>
  )
}
