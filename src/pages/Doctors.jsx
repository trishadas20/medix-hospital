import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import DataTable from '../components/DataTable'
import StatusBadge from '../components/StatusBadge'
import AddRecordModal from '../components/AddRecordModal'
import { useHospitalData } from '../hooks/useHospitalData'

export default function Doctors() {
  const [search, setSearch] = useState(''); const [open, setOpen] = useState(false)
  const { items: doctors, addItem } = useHospitalData('doctors')
  const rows = useMemo(() => doctors.filter(d => `${d.name} ${d.specialty} ${d.id}`.toLowerCase().includes(search.toLowerCase())), [search, doctors])
  const columns = [
    { key:'name', label:'Doctor', render:r=><div className="person-cell"><span className="avatar">{r.avatar}</span><div><strong>{r.name}</strong><small>{r.id}</small></div></div> },
    { key:'specialty', label:'Specialty' }, { key:'experience', label:'Experience' }, { key:'patients', label:'Patients' },
    { key:'status', label:'Status', render:r=><StatusBadge value={r.status}/> }
  ]
  const save = data => addItem({...data, id:`D-${Date.now().toString().slice(-4)}`, avatar:data.name.split(' ').filter(Boolean).slice(-2).map(n=>n[0]).join('').toUpperCase()})
  return <><PageHeader eyebrow="Medical team" title="Doctors" description="Manage doctors, specialties, availability, and patient load." action="Add Doctor" onAction={()=>setOpen(true)}/><DataTable columns={columns} rows={rows} search={search} onSearch={setSearch} placeholder="Search doctors..."/><AddRecordModal open={open} title="Doctor" onClose={()=>setOpen(false)} onSave={save} fields={[{name:'name',label:'Doctor Name'},{name:'specialty',label:'Specialty'},{name:'experience',label:'Experience',placeholder:'e.g. 8 yrs'},{name:'patients',label:'Patients',type:'number',defaultValue:0},{name:'status',label:'Status',options:['Available','In Surgery','On Leave']}]}/></>
}
