import { useEffect, useState } from 'react'
import * as defaults from '../data/mockData'

const keys = {
  doctors: 'medix_doctors', patients: 'medix_patients', appointments: 'medix_appointments',
  bills: 'medix_bills', medicines: 'medix_medicines', labReports: 'medix_labReports'
}

function readData(type) {
  try {
    const saved = localStorage.getItem(keys[type])
    return saved ? JSON.parse(saved) : defaults[type]
  } catch {
    return defaults[type]
  }
}

export function useHospitalData(type) {
  const [items, setItems] = useState(() => readData(type))

  useEffect(() => {
    const refresh = () => setItems(readData(type))
    window.addEventListener('storage', refresh)
    window.addEventListener('medix-data-change', refresh)
    return () => {
      window.removeEventListener('storage', refresh)
      window.removeEventListener('medix-data-change', refresh)
    }
  }, [type])

  const save = (next) => {
    localStorage.setItem(keys[type], JSON.stringify(next))
    setItems(next)
    window.dispatchEvent(new CustomEvent('medix-data-change', { detail: { type } }))
  }

  return {
    items,
    addItem: (item) => save([item, ...items]),
    resetItems: () => save(defaults[type])
  }
}
