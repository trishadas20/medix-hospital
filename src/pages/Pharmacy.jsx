import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import DataTable from '../components/DataTable'
import StatusBadge from '../components/StatusBadge'
import AddRecordModal from '../components/AddRecordModal'
import { useHospitalData } from '../hooks/useHospitalData'

export default function Pharmacy() {
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)

  // IMPORTANT:
  // Pharmacy data is stored under "medicines"
  const {
    items: medicines,
    addItem
  } = useHospitalData('medicines')

  // SEARCH
  const rows = useMemo(() => {
    const query = search.toLowerCase().trim()

    if (!query) {
      return medicines
    }

    return medicines.filter((medicine) =>
      Object.values(medicine)
        .join(' ')
        .toLowerCase()
        .includes(query)
    )
  }, [search, medicines])

  // TABLE COLUMNS
  const columns = [
    {
      key: 'name',
      label: 'Medicine',
      render: (row) => (
        <div>
          <strong>{row.name}</strong>
          <small className="block-small">
            {row.id}
          </small>
        </div>
      )
    },

    {
      key: 'category',
      label: 'Category'
    },

    {
      key: 'stock',
      label: 'Stock',
      render: (row) => (
        <div className="stock-cell">

          <strong>
            {Number(row.stock || 0)} units
          </strong>

          <div className="stock-bar">
            <span
              style={{
                width: `${Math.min(
                  Number(row.stock || 0) /
                    Math.max(Number(row.reorder || 100) * 2, 1) *
                    100,
                  100
                )}%`
              }}
            />
          </div>

        </div>
      )
    },

    {
      key: 'expiry',
      label: 'Expiry'
    },

    {
      key: 'supplier',
      label: 'Supplier'
    },

    {
      key: 'stockStatus',
      label: 'Status',

      render: (row) => (
        <StatusBadge
          value={
            Number(row.stock || 0) <=
            Number(row.reorder || 0)
              ? 'Low Stock'
              : 'In Stock'
          }
        />
      )
    }
  ]

  // ADD MEDICINE
  const handleAddMedicine = (data) => {
    const newMedicine = {
      ...data,

      id: `MED-${Date.now()
        .toString()
        .slice(-4)}`,

      stock: Number(data.stock || 0),

      reorder: Number(data.reorder || 0)
    }

    addItem(newMedicine)

    setOpen(false)
  }

  return (
    <>
      {/* PAGE HEADER */}

      <PageHeader
        eyebrow="Inventory"
        title="Pharmacy"
        description="Monitor medicine inventory, reorder levels, suppliers, and expiry dates."
        action="Add Medicine"
        onAction={() => setOpen(true)}
      />


      {/* MEDICINE TABLE */}

      <DataTable
        columns={columns}
        rows={rows}
        search={search}
        onSearch={setSearch}
        placeholder="Search medicines..."
      />


      {/* ADD MEDICINE MODAL */}

      <AddRecordModal
        open={open}
        title="Medicine"
        onClose={() => setOpen(false)}
        onSave={handleAddMedicine}

        fields={[
          {
            name: 'name',
            label: 'Medicine Name'
          },

          {
            name: 'category',
            label: 'Category'
          },

          {
            name: 'stock',
            label: 'Stock',
            type: 'number'
          },

          {
            name: 'reorder',
            label: 'Reorder Level',
            type: 'number'
          },

          {
            name: 'expiry',
            label: 'Expiry'
          },

          {
            name: 'supplier',
            label: 'Supplier'
          }
        ]}
      />
    </>
  )
}