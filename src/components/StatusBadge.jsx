export default function StatusBadge({ value }) {
  const key = value.toLowerCase().replaceAll(' ', '-')
  return <span className={`status-badge ${key}`}>{value}</span>
}
