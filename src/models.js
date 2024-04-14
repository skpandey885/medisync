// models.js
export const Hospital = {
  id: "",
  name: "",
  address: "",
  beds: 0,
  nurses: 0,
  doctors: 0,
  contactNumber: "",
  services: [1, 4, 6, 8, 10, 16], // Array of service IDs
};

export const Service = {
  id: "",
  serviceName: "",
  description: "",
  department: "",
  booking: false,
  reviews: [],
};
