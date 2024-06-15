import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import UpdateMedicineCard from "./UpdateMedicineCard";
import { useWallet } from "../../../components/layout/WalletContext";
import { db } from "../../../firebase/firebase";

const UpdateMedicinePanel = ({ onUpdateMedicines, openModal }) => {
  const location = useLocation();
  const { hospital } = location.state || {};
  const { contract } = useWallet();
  const [medicines, setMedicines] = useState([]);
  const [updatedMedicinesList, setUpdatedMedicinesList] = useState([]);

  useEffect(() => {
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
        setMedicines(validMedicines);

        // Log the medicines with quantities to the console
        console.log("Fetched medicines for hospital:", validMedicines);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };

    fetchMedicines();
  }, [contract, hospital]);

  const handleCounterChange = (medicineId, counterValue) => {
    const updatedMedicines = medicines.map((medicine) =>
      medicine.id === medicineId
        ? { ...medicine, quantity: counterValue }
        : medicine
    );

    // Update the updatedMedicinesList with the changed medicine
    const foundIndex = updatedMedicinesList.findIndex(
      (medicine) => medicine.id === medicineId
    );

    if (foundIndex !== -1) {
      updatedMedicinesList[foundIndex].quantity = counterValue;
    } else {
      const updatedMedicine = {
        id: medicineId,
        name:
          updatedMedicines.find((medicine) => medicine.id === medicineId)
            ?.name || "", // Get the name from current medicines list
        quantity: counterValue,
      };
      setUpdatedMedicinesList([...updatedMedicinesList, updatedMedicine]);
    }

    setMedicines(updatedMedicines);
    onUpdateMedicines(updatedMedicines);
  };

  const handleSendChanges = () => {
    // Filter out medicines with unchanged quantities
    const updatedMedicines = updatedMedicinesList.filter(
      (medicine) => medicine.quantity !== 0
    );

    onUpdateMedicines(updatedMedicines);
    openModal();
  };

  if (!hospital) {
    return <div>No hospital selected.</div>;
  }

  return (
    <div className="p-4 rounded shadow-sm h-[600px] overflow-y-auto relative">
      <button
        onClick={handleSendChanges}
        className="absolute px-4 py-2 text-white bg-blue-500 rounded-md top-4 right-4 hover:bg-blue-600 focus:outline-none"
      >
        Send Changes
      </button>
      <h2 className="mb-4 text-2xl font-bold">Update Medicine Stock</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {medicines.length > 0 ? (
          medicines.map((medicine) => (
            <UpdateMedicineCard
              key={medicine.id}
              medicine={medicine}
              onCounterChange={handleCounterChange}
            />
          ))
        ) : (
          <p>No medicines found for this hospital.</p>
        )}
      </div>
    </div>
  );
};

export default UpdateMedicinePanel;
