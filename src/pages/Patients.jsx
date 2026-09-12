import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import AddRecordModal from "../components/AddRecordModal";
import { useHospitalData } from "../hooks/useHospitalData";
export default function Patients() {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const { items: patients, addItem } = useHospitalData("patients");
    const rows = useMemo(
        () => patients.filter((p) => Object.values(p).join(" ").toLowerCase().includes(search.toLowerCase())),
        [search, patients]
    );
    const columns = [
        {
            key: "name",
            label: "Patient",
            render: (r) => (
                <div className="person-cell">
                    <span className="avatar soft">
                        {r.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                    </span>
                    <div>
                        <strong>{r.name}</strong>
                        <small>{r.id}</small>
                    </div>
                </div>
            ),
        },
        { key: "age", label: "Age" },
        { key: "condition", label: "Condition" },
        { key: "doctor", label: "Assigned Doctor" },
        { key: "room", label: "Room" },
        { key: "status", label: "Status", render: (r) => <StatusBadge value={r.status} /> },
    ];
    return (
        <>
            <PageHeader
                eyebrow="Patient care"
                title="Patients"
                description="View patient profiles, admissions, diagnoses, and care status."
                action="Add Patient"
                onAction={() => setOpen(true)}
            />
            <DataTable
                columns={columns}
                rows={rows}
                search={search}
                onSearch={setSearch}
                placeholder="Search patients..."
            />
            <AddRecordModal
                open={open}
                title="Patient"
                onClose={() => setOpen(false)}
                onSave={(d) => addItem({ ...d, id: `P-${Date.now().toString().slice(-4)}` })}
                fields={[
                    { name: "name", label: "Patient Name" },
                    { name: "age", label: "Age", type: "number" },
                    { name: "gender", label: "Gender", options: ["Male", "Female", "Other"] },
                    { name: "condition", label: "Condition" },
                    { name: "doctor", label: "Assigned Doctor" },
                    { name: "room", label: "Room", defaultValue: "—" },
                    {
                        name: "status",
                        label: "Status",
                        options: ["Admitted", "Outpatient", "Observation", "Discharged"],
                    },
                ]}
            />
        </>
    );
}
