import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Pill,
  Package
} from 'lucide-react'

import { useHospitalData } from '../hooks/useHospitalData'

export default function PublicPharmacy() {

  const {
    items: medicines = []
  } = useHospitalData('medicines')

  return (
    <section className="pharmacy-page">

      <div className="public-container">

        <Link
          to="/"
          className="pharmacy-back-link"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>


        <div className="pharmacy-page-header">

          <div className="pharmacy-heading">

            <span className="pharmacy-eyebrow">
              HOSPITAL PHARMACY
            </span>

            <h1>
              Medicines and pharmacy support,
              all in one place.
            </h1>

            <p>
              View available medicines, stock,
              expiry information and pharmacy details.
            </p>

          </div>


          <div className="pharmacy-count">

            <Pill size={28} />

            <div>
              <strong>
                {medicines.length}
              </strong>

              <span>
                Medicines
              </span>
            </div>

          </div>

        </div>


        {/* MEDICINE LIST */}

        <div className="pharmacy-list">

          {medicines.length > 0 ? (

            medicines.map((medicine, index) => {

              const isLowStock =
                Number(medicine.stock || 0) <=
                Number(medicine.reorder || 0)

              return (
                <div
                  className="pharmacy-item"
                  key={medicine.id || index}
                >

                  {/* ICON */}

                  <div className="pharmacy-item-icon">
                    <Pill size={22} />
                  </div>


                  {/* MEDICINE DETAILS */}

                  <div className="pharmacy-item-content">

                    <strong>
                      {medicine.name}
                    </strong>

                    <span>
                      {medicine.category}
                    </span>

                    <small>
                      Supplier: {medicine.supplier}
                    </small>

                  </div>


                  {/* STOCK */}

                  <div className="pharmacy-stock">

                    <strong>
                      {medicine.stock} units
                    </strong>

                    <small>
                      Stock
                    </small>

                  </div>


                  {/* EXPIRY */}

                  <div className="pharmacy-expiry">

                    <strong>
                      {medicine.expiry}
                    </strong>

                    <small>
                      Expiry
                    </small>

                  </div>


                  {/* STATUS */}

                  <span
                    className={
                      isLowStock
                        ? 'medicine-status'
                        : 'medicine-status available'
                    }
                  >
                    {isLowStock
                      ? 'Low Stock'
                      : 'In Stock'}
                  </span>

                </div>
              )
            })

          ) : (

            <div className="pharmacy-empty">

              <Package size={42} />

              <h3>
                No medicines available
              </h3>

              <p>
                Medicines added by the hospital
                pharmacy will appear here.
              </p>

            </div>

          )}

        </div>

      </div>

    </section>
  )
}