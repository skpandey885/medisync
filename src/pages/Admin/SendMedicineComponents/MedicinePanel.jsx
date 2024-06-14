import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import toast from "react-hot-toast";

import MedicineCard from "./MedicineCard";
import { db } from "../../../firebase/firebase";

const MedicinePanel = ({ onUpdateMedicines, handleStockUpdate, openModal }) => {
  const [medicines, setMedicines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of items to display per page
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [stockToBeSent, setStockToBeSent] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const medicineCollection = collection(db, "medicines");
        const medicineSnapshot = await getDocs(medicineCollection);
        const medicineList = medicineSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          counter: 0, // Initialize counter to 0 for all medicines
        }));
        setMedicines(medicineList);
        setFilteredMedicines(medicineList); // Initialize filtered medicines with all medicines
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };

    fetchMedicines();
  }, []);

  // Logic to paginate medicines
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMedicines = filteredMedicines.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Logic to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Logic to handle search
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    setCurrentPage(1); // Reset to first page when searching

    // Filter medicines based on search term
    const filteredResults = medicines.filter((medicine) =>
      medicine.name.toLowerCase().includes(searchTerm)
    );
    setFilteredMedicines(filteredResults);
  };

  // Handle counter change from MedicineCard
  const handleCounterChange = (medicineId, counterValue) => {
    const updatedFilteredMedicines = filteredMedicines.map((medicine) =>
      medicine.id === medicineId
        ? { ...medicine, counter: counterValue }
        : medicine
    );
    setFilteredMedicines(updatedFilteredMedicines);

    const updatedMedicines = medicines.map((medicine) =>
      medicine.id === medicineId
        ? { ...medicine, counter: counterValue }
        : medicine
    );
    setMedicines(updatedMedicines);

    onUpdateMedicines(updatedMedicines); // Notify MainScreen of updated medicines
  };

  // Remove from Stock To Be Sent
  const removeFromStockToBeSent = (medicineId) => {
    const updatedMedicines = stockToBeSent.filter(
      (medicine) => medicine.id !== medicineId
    );
    setStockToBeSent(updatedMedicines);

    const updatedFilteredMedicines = filteredMedicines.map((medicine) =>
      medicine.id === medicineId ? { ...medicine, counter: 0 } : medicine
    );
    setFilteredMedicines(updatedFilteredMedicines);
  };

  // Update stock to be sent
  useEffect(() => {
    const stockToSend = filteredMedicines.filter(
      (medicine) => medicine.counter > 0
    );
    setStockToBeSent(stockToSend);
  }, [filteredMedicines]);

  // Function to handle sending medicines to hospital
  const sendMedicinesToHospital = () => {
    // Check if filteredMedicines has items with counters greater than 0
    const stockToSend = filteredMedicines.filter(
      (medicine) => medicine.counter > 0
    );

    // Check if stockToSend has items
    if (stockToSend.length === 0) {
      toast.error("Please select at least one medicine to send.");
      return;
    }

    // Logic to send medicines to hospital
    console.log("Sending medicines to hospital...");
    handleStockUpdate(stockToSend); // Notify MainScreen of medicines to be sent
    openModal(); // Open modal in MainScreen

    // Reset counters in filteredMedicines
    const updatedFilteredMedicines = filteredMedicines.map((medicine) => ({
      ...medicine,
      counter: 0,
    }));
    setFilteredMedicines(updatedFilteredMedicines);

    // Reset counters in medicines
    const updatedMedicines = medicines.map((medicine) => ({
      ...medicine,
      counter: 0,
    }));
    setMedicines(updatedMedicines);
  };

  return (
    <div className="ml-10 mt-5">
      <h2 className="text-2xl font-bold mb-3">Medicine Panel</h2>

      <div className="flex items-center mb-3 space-x-2">
        {/* Search input */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search medicines..."
          className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />

        {/* Send Medicines to Hospital button */}
        <button
          onClick={sendMedicinesToHospital}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Send Medicines
        </button>
      </div>

      {/* Stock To Be Sent section */}
      {stockToBeSent.length > 0 && (
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-1">Stock To Be Sent</h3>
          <div
            className="flex overflow-y-auto"
            style={{ maxHeight: "300px", padding: "0 1rem" }} // Adjust max height as needed
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {stockToBeSent.map((medicine, index) => (
                <MedicineCard
                  key={index}
                  medicine={medicine}
                  onCounterChange={handleCounterChange}
                  removeFromStockToBeSent={removeFromStockToBeSent}
                />
              ))}
            </div>
          </div>
          <hr className="my-4 border-gray-300" />
        </div>
      )}

      {/* Medicine cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentMedicines.map((medicine, index) => (
          <MedicineCard
            key={index}
            medicine={medicine}
            onCounterChange={handleCounterChange}
            removeFromStockToBeSent={removeFromStockToBeSent}
          />
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          className={`mr-2 px-4 py-2 border border-gray-300 rounded-md ${
            currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : ""
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          className={`ml-2 px-4 py-2 border border-gray-300 rounded-md ${
            currentMedicines.length < itemsPerPage
              ? "bg-gray-200 cursor-not-allowed"
              : ""
          }`}
          disabled={currentMedicines.length < itemsPerPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MedicinePanel;
