import { useState } from 'react'
import { X } from 'lucide-react'

export default function AddRecordModal({ open, title, fields, onClose, onSave }) {
  const [form, setForm] = useState({})
  if (!open) return null

  const submit = (e) => {
    e.preventDefault()
    const record = {}
    fields.forEach(field => {
      const value = form[field.name] ?? field.defaultValue ?? ''
      record[field.name] = field.type === 'number' ? Number(value) : value
    })
    onSave(record)
    setForm({})
    onClose()
  }

  return <div className="modal-backdrop" onMouseDown={onClose}>
    <div className="record-modal" onMouseDown={e => e.stopPropagation()}>
      <div className="modal-heading"><div><span className="eyebrow">Add new record</span><h2>{title}</h2></div><button type="button" className="modal-close" onClick={onClose}><X size={20}/></button></div>
      <form onSubmit={submit} className="record-form">
        {fields.map(field => <label key={field.name} className={field.full ? 'full-field' : ''}>
          <span>{field.label}</span>
          {field.options ? <select required={field.required !== false} value={form[field.name] ?? field.defaultValue ?? ''} onChange={e => setForm({...form,[field.name]:e.target.value})}>
            <option value="">Select {field.label}</option>{field.options.map(option => <option key={option}>{option}</option>)}
          </select> : <input required={field.required !== false} type={field.type || 'text'} placeholder={field.placeholder || ''} value={form[field.name] ?? field.defaultValue ?? ''} onChange={e => setForm({...form,[field.name]:e.target.value})}/>} 
        </label>)}
        <div className="modal-actions full-field"><button type="button" className="cancel-button" onClick={onClose}>Cancel</button><button type="submit" className="primary-button">Save Record</button></div>
      </form>
    </div>
  </div>
}
