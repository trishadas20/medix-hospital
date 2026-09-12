import { useCallback, useEffect, useState } from "react";

import {
  Activity,
  Ambulance,
  ArrowUpRight,
  Brain,
  HeartPulse,
  Microscope,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import { getServices } from "../data/servicesStore";

const iconMap = {
  HeartPulse,
  Brain,
  Stethoscope,
  Microscope,
  Ambulance,
  Activity,
};

export default function PublicServices() {
  const [services, setServices] = useState([]);

  const loadServices = useCallback(() => {
    const savedServices = getServices();

    const activeServices = savedServices
      .filter(
        (service) =>
          String(service.status).toLowerCase() === "active"
      )
      .map((service, index) => ({
        ...service,
        number: String(index + 1).padStart(2, "0"),
      }));

    setServices(activeServices);
  }, []);

  useEffect(() => {
    loadServices();

    window.addEventListener(
      "servicesUpdated",
      loadServices
    );

    window.addEventListener(
      "storage",
      loadServices
    );

    window.addEventListener(
      "focus",
      loadServices
    );

    return () => {
      window.removeEventListener(
        "servicesUpdated",
        loadServices
      );

      window.removeEventListener(
        "storage",
        loadServices
      );

      window.removeEventListener(
        "focus",
        loadServices
      );
    };
  }, [loadServices]);

  return (
    <main className="services-page">
      <section className="services-hero">
        <div className="public-container services-hero-grid">
          <div className="services-hero-content">
            <div className="services-eyebrow">
              <ShieldCheck size={18} />
              Trusted Medical Care
            </div>

            <h1>
              Complete healthcare services for a healthier life.
            </h1>

            <p>
              From regular health checkups to specialist treatments,
              our medical team provides dependable and patient-focused
              care.
            </p>

            <div className="services-hero-actions">
              <a
                href="/appointments-list"
                className="services-primary-btn"
              >
                Book an appointment
                <ArrowUpRight size={18} />
              </a>

              <a
                href="/our-doctors"
                className="services-secondary-btn"
              >
                View our doctors
              </a>
            </div>

            <div className="services-highlights">
              <div>
                <strong>24/7</strong>
                <span>Emergency support</span>
              </div>

              <div>
                <strong>20+</strong>
                <span>Medical specialists</span>
              </div>

              <div>
                <strong>10K+</strong>
                <span>Patients supported</span>
              </div>
            </div>
          </div>

          <div className="services-feature-panel">
            <div className="services-feature-top">
              <div className="feature-icon-box">
                <Stethoscope size={36} />
              </div>

              <span>Medix Hospital</span>
            </div>

            <h2>Care you can trust</h2>

            <p>
              Professional medical care supported by experienced
              doctors, modern facilities and a patient-first approach.
            </p>

            <ul>
              <li>
                <span>✓</span>
                Experienced medical team
              </li>

              <li>
                <span>✓</span>
                Modern diagnostic facilities
              </li>

              <li>
                <span>✓</span>
                Easy appointment booking
              </li>
            </ul>

            <div className="feature-decoration feature-decoration-one" />
            <div className="feature-decoration feature-decoration-two" />
          </div>
        </div>
      </section>

      <section className="services-list-section">
        <div className="public-container">
          <div className="services-section-heading">
            <div>
              <span>Our Specialities</span>

              <h2>
                Medical services designed around your needs
              </h2>
            </div>

            <p>
              Receive personalised care across a wide range of medical
              departments under one trusted healthcare system.
            </p>
          </div>

          {services.length > 0 ? (
            <div className="services-modern-grid">
              {services.map((service) => {
                const Icon =
                  iconMap[service.icon] || Stethoscope;

                return (
                  <article
                    className="modern-service-card"
                    key={service.id}
                  >
                    <div className="service-card-top">
                      <div className="modern-service-icon">
                        <Icon size={28} />
                      </div>

                      <span className="service-number">
                        {service.number}
                      </span>
                    </div>

                    <h3>{service.title}</h3>

                    <p>{service.description}</p>

                    <button
                      className="service-link"
                      type="button"
                    >
                      Explore service
                      <ArrowUpRight size={17} />
                    </button>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="services-empty-message">
              No active services are available.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}