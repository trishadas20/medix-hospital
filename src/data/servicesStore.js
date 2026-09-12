export const defaultServices = [
  {
    id: 1,
    title: "Cardiology",
    description:
      "Complete heart care with advanced diagnosis, regular monitoring and specialist consultation.",
    icon: "HeartPulse",
    status: "Active",
  },
  {
    id: 2,
    title: "Neurology",
    description:
      "Expert care for brain, spine and nervous system-related health conditions.",
    icon: "Brain",
    status: "Active",
  },
  {
    id: 3,
    title: "General Medicine",
    description:
      "Primary healthcare and treatment for common illnesses and general medical concerns.",
    icon: "Stethoscope",
    status: "Active",
  },
  {
    id: 4,
    title: "Laboratory Tests",
    description:
      "Accurate diagnostic testing and quick health reports using modern laboratory equipment.",
    icon: "Microscope",
    status: "Active",
  },
  {
    id: 5,
    title: "Emergency Care",
    description:
      "Immediate medical attention and emergency support available throughout the day.",
    icon: "Ambulance",
    status: "Active",
  },
  {
    id: 6,
    title: "Health Checkups",
    description:
      "Preventive health packages designed to help you monitor and maintain your wellbeing.",
    icon: "Activity",
    status: "Active",
  },
];

const STORAGE_KEY = "medix_services";

export const getServices = () => {
  try {
    const storedServices = localStorage.getItem(STORAGE_KEY);

    if (!storedServices) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(defaultServices)
      );

      return defaultServices;
    }

    return JSON.parse(storedServices);
  } catch (error) {
    console.error("Unable to load services:", error);
    return defaultServices;
  }
};

export const saveServices = (services) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(services)
    );

    window.dispatchEvent(
      new CustomEvent("servicesUpdated")
    );
  } catch (error) {
    console.error("Unable to save services:", error);
  }
};