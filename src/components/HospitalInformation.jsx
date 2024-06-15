import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HospitalImage from "../assets/hospital.png";
import DoctorsList from "./Doctor/DoctorsList";
import MedicineCard from "./reusable/MedicineCard";
import { useWallet } from "./layout/WalletContext";
import { db } from "../firebase/firebase";

import { doc, getDoc } from "firebase/firestore";

const HospitalInformation = () => {
  const location = useLocation();
  const hospital = location?.state; // Access hospital from location state
  const serviceNames = location?.state.serviceNamesString; // Access serviceNames from hospital object

  const [view, setView] = useState("default"); // State to manage the view
  const [searchTerm, setSearchTerm] = useState("");

  const [medicines, setMedicines] = useState([]);

  const filteredMedicines = medicines.filter(
    (medicine) =>
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const { isBlockchainAdmin, contract, handleConnectWallet, accountAddress } =
    useWallet();

  useEffect(() => {
    fetchMedicines();
  }, [hospital]);

  const fetchMedicines = async () => {
    try {
      if (!contract || !hospital) {
        console.error("Contract or hospital not available.");
        return;
      }

      // Call the smart contract function to get medicine IDs, names, and quantities
      const res = await contract.getMedicinesAtHospital(hospital.id);

      const medicineIds = res[0];
      const quantities = res[2];

      // Fetch medicine details from Firebase based on the returned IDs
      const medicineDetails = await Promise.all(
        medicineIds.map(async (id, index) => {
          const docRef = doc(db, "medicines", id.toString());
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            return {
              id: id.toString(),
              name: docSnap.data().name, // Include name in medicine details
              ...docSnap.data(),
              quantity: quantities[index].toNumber(),
            };
          } else {
            console.warn(`Medicine with ID ${id} not found in Firebase.`);
            return null;
          }
        })
      );

      // Filter out any null values (medicines not found in Firebase)
      const validMedicines = medicineDetails.filter(
        (medicine) => medicine !== null
      );

      console.log(validMedicines);
      setMedicines(validMedicines);

      // Log the medicines with quantities to the console
      console.log("Fetched medicines for hospital:", validMedicines);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

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
            className="px-4 py-2 mr-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            View Doctors
          </button>
          <button
            onClick={handleViewMedicines}
            className="px-4 py-2 mt-5 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
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
          <div className="w-[70vw]">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 mb-4 border "
            />

            <div className="overflow-y-auto h-[90vh]">
              <div className="flex flex-wrap transition-opacity duration-500 ">
                {filteredMedicines.map((medicine, index) => (
                  <MedicineCard
                    key={index}
                    name={medicine.name}
                    description={medicine.description}
                    quantity={medicine.quantity}
                    brands={medicine.brands}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalInformation;
