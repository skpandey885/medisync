import React from "react";
import DoctorImage from "../../assets/doctor.png";

const DoctorCard = ({ doctor }) => {
  // Determine the availability status
  const availabilityStatus = doctor.checkedIn ? "Checked In" : "Not Available";
  // Determine the color based on availability
  const statusColor = doctor.checkedIn ? "text-green-600" : "text-red-600";

  return (
    <div className="py-8 px-3 mx-auto bg-white rounded-xl shadow-lg sm:flex sm:items-center sm:space-x-6">
      <img
        className="block h-20 w-20 rounded-full sm:mx-0 sm:shrink-0 sm:mr-4"
        src={DoctorImage}
        alt={doctor.name}
      />
      <div className="text-center sm:text-left">
        <div className="space-y-1">
          <p className="text-lg text-black font-semibold">{doctor.name}</p>
          <p className="text-slate-500 font-medium sm:max-w-xs overflow-hidden overflow-ellipsis">
            {doctor.role}
          </p>
        </div>
        {/* Replace button with text element */}
        <p
          className={`px-4 mt-5 py-1 text-sm font-semibold rounded-full border ${statusColor}`}
        >
          {availabilityStatus}
        </p>
      </div>
    </div>
  );
};

export default DoctorCard;
