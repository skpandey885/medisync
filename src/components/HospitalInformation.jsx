import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import HospitalImage from "../assets/hospital.png";
import DoctorsList from "./Doctor/DoctorsList";

const HospitalInformation = () => {
  const location = useLocation();
  const hospital = location?.state; // Access hospital from location state
  const serviceNames = location?.state.serviceNamesString; // Access serviceNames from hospital object

  const [view, setView] = useState("default"); // State to manage the view

  const handleViewDoctors = () => setView("doctors");
  const handleViewMedicines = () => setView("medicines");
  console.log(hospital);
  return (
    <div className="flex p-5 pb-20">
      <div className="p-5 pb-8 ml-[40px] my-[10px] w-[400px] bg-white rounded-lg border shadow-md sm:p-8">
        <div className="flex items-baseline text-gray-900">
          <span className="text-3xl font-extrabold tracking-tight">
            {hospital?.name}
          </span>
        </div>
        <ul role="list" className="space-y-5 my-7">
          <li className="flex space-x-3">
            <span className="text-xl font-bold leading-tight text-blue">
              Address:{" "}
              <span className="text-lg font-normal">{hospital?.address}</span>
            </span>
          </li>
          <li className="flex space-x-3">
            <span className="text-xl font-bold leading-tight text-blue">
              Contact:{" "}
              <span className="text-lg font-normal">{hospital?.contact}</span>
            </span>
          </li>
          {hospital?.doctors && (
            <li className="flex space-x-3">
              <span className="text-xl font-bold leading-tight text-blue">
                Doctors:{" "}
              </span>
              <span className="text-lg font-normal">
                {hospital.doctors.length}
              </span>
            </li>
          )}
          <li className="flex space-x-3">
            <span className="text-xl font-bold leading-tight text-blue">
              Beds:{" "}
              <span className="text-lg font-normal">{hospital?.beds}</span>
            </span>
          </li>
          <li className="flex space-x-3">
            <span className="text-xl font-bold leading-tight text-blue">
              Nurses:{" "}
              <span className="text-lg font-normal">{hospital?.nurses}</span>
            </span>
          </li>
          <li className="flex space-x-3">
            <span className="text-xl font-bold leading-tight text-blue">
              Services:{" "}
              <span className="text-lg font-normal">{serviceNames}</span>
            </span>
          </li>
        </ul>

        <div className="mt-8">
          <button
            onClick={handleViewDoctors}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          >
            View Doctors
          </button>
          <button
            onClick={handleViewMedicines}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            View Medicines
          </button>
        </div>
      </div>

      <div className="ml-10">
        {view === "default" && (
          <img
            src={HospitalImage}
            alt="Hospital"
            className="w-[800px] h-auto"
          />
        )}

        {view === "doctors" && (
          <div className="transition-opacity duration-500">
            <DoctorsList doctors={hospital.doctors} />
          </div>
        )}

        {view === "medicines" && (
          <div className="transition-opacity duration-500">
            <h2>Medicines List</h2>
            <p>Aspirin</p>
            <p>Ibuprofen</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalInformation;
