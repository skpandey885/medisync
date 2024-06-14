import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../../../components/Loader";
import HospitalInfoCard from "./HospitalInfo"; // Adjust path as needed
import MedicinePanel from "./MedicinePanel"; // Import MedicinePanel component
import SelectedMedicinesModal from "../../../components/Medicines/SelectedMedicineModal"; // Import SelectedMedicinesModal component
import { useWallet } from "../../../components/layout/WalletContext"; // Adjust path as needed
import toast from "react-hot-toast"; // Import toast from react-hot-toast

const MainScreen = () => {
  const location = useLocation();
  const hospital = location.state?.hospital;
  const [medicinesToSend, setMedicinesToSend] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Accessing user details and contract instance from WalletContext using useWallet hook
  const { accountAddress, contract } = useWallet();

  // Function to send medicines to hospital via blockchain
  const sendMedicinesToHospital = async (medicines) => {
    if (!contract || !accountAddress) {
      console.error("Contract or account address not available.");
      return;
    }

    try {
      // Convert medicines array to appropriate format for contract function
      const medicineIds = medicines.map((medicine) => medicine.id);
      const quantities = medicines.map((medicine) => medicine.counter);

      // Call the contract function to send medicines to hospital
      const tx = await contract.sendMedicineToHospital(
        hospital.id,
        medicineIds,
        quantities
      );
      await tx.wait();
      console.log("Transaction successful:", tx);

      // Perform any other actions after successful transaction if needed
      handleStockUpdate(medicines); // Update stock in MainScreen
      openModal(); // Open modal after sending
    } catch (error) {
      console.error("Failed to send medicines to hospital:", error);
    }
  };

  // Show loader if hospital object is not yet received
  if (!hospital) {
    return <Loader />;
  }

  // Function to handle updating medicines to send
  const handleMedicinesUpdate = (updatedMedicines) => {
    // Ensure updatedMedicines is different from current medicinesToSend
    setMedicinesToSend(updatedMedicines);
  };

  // Function to open modal
  const openModal = () => {
    setShowModal(true);
  };

  // Function to close modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Function to handle stock update in MainScreen
  const handleStockUpdate = (updatedMedicines) => {
    console.log("Updating stock in MainScreen:", updatedMedicines);
    setMedicinesToSend(updatedMedicines);
    // Implement logic to update stock state in MainScreen here
  };

  return (
    <div className="flex p-5 pb-20">
      {/* Render HospitalInfoCard on the left */}
      <div className="">
        <HospitalInfoCard hospital={hospital} />
      </div>

      {/* Render MedicinePanel and modal on the right */}
      <div className="main-screen ml-5 flex-1">
        <MedicinePanel
          onUpdateMedicines={handleMedicinesUpdate}
          sendMedicinesToHospital={sendMedicinesToHospital}
          handleStockUpdate={handleStockUpdate}
          openModal={openModal}
        />

        {/* Modal for Selected Medicines */}
        <SelectedMedicinesModal
          isOpen={showModal}
          closeModal={closeModal}
          selectedMedicines={medicinesToSend}
          sendToContract={() => sendMedicinesToHospital(medicinesToSend)}
        />
      </div>
    </div>
  );
};

export default MainScreen;
