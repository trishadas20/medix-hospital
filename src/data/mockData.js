export const doctors = [
  { id: 'D-101', name: 'Dr. Olivia Martin', specialty: 'Cardiology', experience: '12 yrs', patients: 148, status: 'Available', avatar: 'OM' },
  { id: 'D-102', name: 'Dr. Ethan Wilson', specialty: 'Neurology', experience: '9 yrs', patients: 121, status: 'In Surgery', avatar: 'EW' },
  { id: 'D-103', name: 'Dr. Sophia Chen', specialty: 'Pediatrics', experience: '8 yrs', patients: 176, status: 'Available', avatar: 'SC' },
  { id: 'D-104', name: 'Dr. Noah Williams', specialty: 'Orthopedics', experience: '15 yrs', patients: 134, status: 'On Leave', avatar: 'NW' },
  { id: 'D-105', name: 'Dr. Emma Davis', specialty: 'Dermatology', experience: '7 yrs', patients: 98, status: 'Available', avatar: 'ED' },
]

export const patients = [
  { id: 'P-2081', name: 'Aarav Sharma', age: 34, gender: 'Male', condition: 'Hypertension', doctor: 'Dr. Olivia Martin', room: 'A-204', status: 'Admitted' },
  { id: 'P-2082', name: 'Isha Roy', age: 27, gender: 'Female', condition: 'Migraine', doctor: 'Dr. Ethan Wilson', room: '—', status: 'Outpatient' },
  { id: 'P-2083', name: 'Kabir Mehta', age: 8, gender: 'Male', condition: 'Viral Fever', doctor: 'Dr. Sophia Chen', room: 'B-112', status: 'Admitted' },
  { id: 'P-2084', name: 'Ananya Bose', age: 45, gender: 'Female', condition: 'Knee Injury', doctor: 'Dr. Noah Williams', room: 'C-308', status: 'Observation' },
  { id: 'P-2085', name: 'Rohan Gupta', age: 31, gender: 'Male', condition: 'Skin Allergy', doctor: 'Dr. Emma Davis', room: '—', status: 'Discharged' },
]

export const appointments = [
  { id: 'A-501', patient: 'Isha Roy', doctor: 'Dr. Ethan Wilson', department: 'Neurology', date: '18 Jul 2026', time: '10:00 AM', type: 'Consultation', status: 'Confirmed' },
  { id: 'A-502', patient: 'Rohan Gupta', doctor: 'Dr. Emma Davis', department: 'Dermatology', date: '18 Jul 2026', time: '11:30 AM', type: 'Follow-up', status: 'Waiting' },
  { id: 'A-503', patient: 'Meera Sen', doctor: 'Dr. Olivia Martin', department: 'Cardiology', date: '18 Jul 2026', time: '01:15 PM', type: 'Check-up', status: 'Confirmed' },
  { id: 'A-504', patient: 'Vihaan Das', doctor: 'Dr. Sophia Chen', department: 'Pediatrics', date: '18 Jul 2026', time: '03:00 PM', type: 'Consultation', status: 'Completed' },
  { id: 'A-505', patient: 'Arjun Kapoor', doctor: 'Dr. Noah Williams', department: 'Orthopedics', date: '19 Jul 2026', time: '09:30 AM', type: 'Review', status: 'Cancelled' },
]

export const bills = [
  { invoice: 'INV-3108', patient: 'Aarav Sharma', service: 'Cardiac Care', date: '18 Jul 2026', amount: 24500, method: 'Insurance', status: 'Paid' },
  { invoice: 'INV-3109', patient: 'Kabir Mehta', service: 'Pediatric Care', date: '18 Jul 2026', amount: 6800, method: 'UPI', status: 'Paid' },
  { invoice: 'INV-3110', patient: 'Ananya Bose', service: 'Orthopedic Tests', date: '17 Jul 2026', amount: 12900, method: 'Card', status: 'Pending' },
  { invoice: 'INV-3111', patient: 'Isha Roy', service: 'Neurology Consultation', date: '17 Jul 2026', amount: 2200, method: 'Cash', status: 'Paid' },
  { invoice: 'INV-3112', patient: 'Rohan Gupta', service: 'Dermatology', date: '16 Jul 2026', amount: 1850, method: 'UPI', status: 'Overdue' },
]

export const medicines = [
  { id: 'MED-101', name: 'Amoxicillin 500mg', category: 'Antibiotic', stock: 420, reorder: 100, expiry: 'Feb 2027', supplier: 'MedCore Pharma' },
  { id: 'MED-102', name: 'Paracetamol 650mg', category: 'Analgesic', stock: 78, reorder: 120, expiry: 'Nov 2026', supplier: 'Nova Health' },
  { id: 'MED-103', name: 'Amlodipine 5mg', category: 'Cardiac', stock: 210, reorder: 80, expiry: 'Jun 2027', supplier: 'LifeCare Labs' },
  { id: 'MED-104', name: 'Insulin Glargine', category: 'Diabetes', stock: 32, reorder: 40, expiry: 'Sep 2026', supplier: 'BioMedix' },
  { id: 'MED-105', name: 'Cetirizine 10mg', category: 'Antihistamine', stock: 355, reorder: 100, expiry: 'Mar 2027', supplier: 'Nova Health' },
]

export const labReports = [
  { id: 'LAB-801', patient: 'Aarav Sharma', test: 'Lipid Profile', requestedBy: 'Dr. Olivia Martin', date: '18 Jul 2026', priority: 'Routine', status: 'Ready' },
  { id: 'LAB-802', patient: 'Kabir Mehta', test: 'Complete Blood Count', requestedBy: 'Dr. Sophia Chen', date: '18 Jul 2026', priority: 'Urgent', status: 'Processing' },
  { id: 'LAB-803', patient: 'Ananya Bose', test: 'X-Ray Knee', requestedBy: 'Dr. Noah Williams', date: '17 Jul 2026', priority: 'Routine', status: 'Ready' },
  { id: 'LAB-804', patient: 'Isha Roy', test: 'MRI Brain', requestedBy: 'Dr. Ethan Wilson', date: '17 Jul 2026', priority: 'Urgent', status: 'Pending' },
  { id: 'LAB-805', patient: 'Rohan Gupta', test: 'Allergy Panel', requestedBy: 'Dr. Emma Davis', date: '16 Jul 2026', priority: 'Routine', status: 'Ready' },
]
