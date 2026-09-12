import { Plus } from 'lucide-react'

export default function PageHeader({ eyebrow, title, description, action = 'Add New', onAction }) {
  return (
    <div className="page-header">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action && <button className="primary-button" onClick={onAction}><Plus size={18} />{action}</button>}
    </div>
  )
}
