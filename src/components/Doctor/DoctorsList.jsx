import React from "react";
import DoctorCard from "./DoctorCard"; // Make sure to adjust the import path if needed

const DoctorsList = ({ doctors }) => {
  // Filter doctors based on their availability status
  const checkedInDoctors = doctors.filter((doctor) => doctor.checkedIn);
  const notAvailableDoctors = doctors.filter((doctor) => !doctor.checkedIn);

  return (
    <div className="mt-5">
      <div className="overflow-auto p-5" style={{ maxHeight: "900px" }}>
        {/* Checked In Doctors */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Checked In Doctors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {checkedInDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>

        {/* Not Available Doctors */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-3">Not Available Doctors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notAvailableDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsList;
