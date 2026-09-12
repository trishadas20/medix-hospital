import { useEffect, useMemo, useState } from "react";

import {
  Activity,
  Ambulance,
  Brain,
  HeartPulse,
  Microscope,
  Stethoscope,
} from "lucide-react";

import {
  getServices,
  saveServices,
} from "../data/servicesStore";

const iconOptions = [
  {
    value: "HeartPulse",
    label: "Cardiology",
    icon: HeartPulse,
  },
  {
    value: "Brain",
    label: "Neurology",
    icon: Brain,
  },
  {
    value: "Stethoscope",
    label: "General Medicine",
    icon: Stethoscope,
  },
  {
    value: "Microscope",
    label: "Laboratory Tests",
    icon: Microscope,
  },
  {
    value: "Ambulance",
    label: "Emergency Care",
    icon: Ambulance,
  },
  {
    value: "Activity",
    label: "Health Checkups",
    icon: Activity,
  },
];

const iconMap = {
  HeartPulse,
  Brain,
  Stethoscope,
  Microscope,
  Ambulance,
  Activity,
};

const emptyForm = {
  title: "",
  description: "",
  icon: "Stethoscope",
  status: "Active",
};

export default function Services() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    setServices(getServices());
  }, []);

  const filteredServices = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    if (!searchText) {
      return services;
    }

    return services.filter((service) => {
      return (
        service.title.toLowerCase().includes(searchText) ||
        service.description
          .toLowerCase()
          .includes(searchText)
      );
    });
  }, [services, search]);

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
  };

  const openAddModal = () => {
    resetForm();
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    resetForm();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.description.trim()
    ) {
      alert(
        "Please enter service name and description."
      );

      return;
    }

    let updatedServices = [];

    if (editingId !== null) {
      updatedServices = services.map((service) => {
        if (service.id !== editingId) {
          return service;
        }

        return {
          ...service,
          title: formData.title.trim(),
          description: formData.description.trim(),
          icon: formData.icon,
          status: formData.status,
        };
      });
    } else {
      const newService = {
        id: Date.now(),
        title: formData.title.trim(),
        description: formData.description.trim(),
        icon: formData.icon,
        status: formData.status,
      };

      updatedServices = [
        newService,
        ...services,
      ];
    }

    setServices(updatedServices);
    saveServices(updatedServices);
    closeModal();
  };

  const handleEdit = (service) => {
    setEditingId(service.id);

    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      status: service.status,
    });

    setOpenModal(true);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmed) {
      return;
    }

    const updatedServices = services.filter(
      (service) => service.id !== id
    );

    setServices(updatedServices);
    saveServices(updatedServices);
  };

  const toggleStatus = (id) => {
    const updatedServices = services.map(
      (service) => {
        if (service.id !== id) {
          return service;
        }

        return {
          ...service,
          status:
            service.status === "Active"
              ? "Inactive"
              : "Active",
        };
      }
    );

    setServices(updatedServices);
    saveServices(updatedServices);
  };

  return (
    <div className="services-admin-page">

      {/* Page Header */}
      <div className="services-page-header">
        <div>
          <span className="services-eyebrow">
            MANAGEMENT
          </span>

          <h1>Services</h1>

          <p>
            Add and manage hospital services displayed on
            the public website.
          </p>
        </div>
      </div>

      {/* Search + Add Service */}
      <div className="services-admin-top">

        <div className="services-search-box">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        <button
          type="button"
          className="service-add-button"
          onClick={openAddModal}
        >
          <span>＋</span>
          Add Service
        </button>

      </div>

      {/* Services Table */}
      <div className="services-table-wrapper">

        <table className="services-table">

          <thead>
            <tr>
              <th>Service</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredServices.length > 0 ? (

              filteredServices.map((service) => {

                const Icon =
                  iconMap[service.icon] ||
                  Stethoscope;

                return (
                  <tr key={service.id}>

                    <td>
                      <div className="service-name-cell">

                        <div className="service-icon-small">
                          <Icon size={20} />
                        </div>

                        <strong>
                          {service.title}
                        </strong>

                      </div>
                    </td>

                    <td>
                      <p>
                        {service.description}
                      </p>
                    </td>

                    <td>

                      <button
                        type="button"
                        className={`service-status ${
                          service.status === "Active"
                            ? "active"
                            : "inactive"
                        }`}
                        onClick={() =>
                          toggleStatus(service.id)
                        }
                      >
                        {service.status}
                      </button>

                    </td>

                    <td>

                      <div className="service-actions">

                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(service)
                          }
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="delete"
                          onClick={() =>
                            handleDelete(service.id)
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>
                );

              })

            ) : (

              <tr>
                <td
                  colSpan="4"
                  className="services-empty"
                >
                  No services found.
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* Add / Edit Service Modal */}
      {openModal && (

        <div
          className="service-modal-overlay"
          onMouseDown={closeModal}
        >

          <div
            className="service-modal"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >

            <div className="service-modal-header">

              <div>

                <span>
                  SERVICE DETAILS
                </span>

                <h2>
                  {editingId !== null
                    ? "Edit Service"
                    : "Add New Service"}
                </h2>

              </div>

              <button
                type="button"
                onClick={closeModal}
              >
                ×
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              {/* Service Name */}
              <div className="service-form-group">

                <label htmlFor="serviceTitle">
                  Service Name
                </label>

                <input
                  id="serviceTitle"
                  type="text"
                  name="title"
                  placeholder="Example: Cardiology"
                  value={formData.title}
                  onChange={handleChange}
                />

              </div>

              {/* Service Icon */}
              <div className="service-form-group">

                <label htmlFor="serviceIcon">
                  Service Icon
                </label>

                <select
                  id="serviceIcon"
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                >

                  {iconOptions.map((option) => (

                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>

                  ))}

                </select>

              </div>

              {/* Description */}
              <div className="service-form-group">

                <label htmlFor="serviceDescription">
                  Description
                </label>

                <textarea
                  id="serviceDescription"
                  name="description"
                  rows="4"
                  placeholder="Write service description..."
                  value={formData.description}
                  onChange={handleChange}
                />

              </div>

              {/* Status */}
              <div className="service-form-group">

                <label htmlFor="serviceStatus">
                  Status
                </label>

                <select
                  id="serviceStatus"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >

                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>

                </select>

              </div>

              {/* Modal Actions */}
              <div className="service-modal-actions">

                <button
                  type="button"
                  className="service-cancel-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="service-save-button"
                >
                  {editingId !== null
                    ? "Update Service"
                    : "Save Service"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}