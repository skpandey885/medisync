import React, { useState, useEffect } from "react";
import { useWallet } from "../../components/layout/WalletContext"; // Adjust the path as needed
import { db } from "../../firebase/firebase"; // Ensure the path is correct
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import MetamaskConnectModal from "../../components/reusable/ConnectWalletModal"; // Ensure the path is correct

const SendMedicine = () => {
  const navigate = useNavigate(); // useNavigate hook for navigation
  const { contract, handleConnectWallet, accountAddress } = useWallet();
  const [hospitals, setHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        if (!contract || !accountAddress) {
          setShowModal(true); // Show modal if wallet is not connected
          return;
        }

        // Fetch hospital data from the smart contract
        const [hospitalIds, hospitalNames] = await contract.getHospitalsData();

        // Fetch additional details from Firebase for the first 5 hospitals
        const hospitalDetails = await Promise.all(
          hospitalIds.slice(0, 5).map(async (id) => {
            const docRef = doc(db, "hospitals", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              return { id, ...docSnap.data() };
            }
            return { id, name: hospitalNames[hospitalIds.indexOf(id)] }; // Fallback to smart contract name if not found in Firebase
          })
        );

        setHospitals(hospitalDetails);
      } catch (error) {
        console.error("Error fetching hospital data: ", error);
      }
    };

    fetchHospitalData();
  }, [contract, accountAddress]);

  const handleSearchFocus = () => {
    if (searchTerm.trim() === "") {
      setShowDropdown(true); // Show dropdown only if search term is empty
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setShowDropdown(true); // Always show dropdown when typing
  };

  const handleSelectHospital = (hospitalId) => {
    setSelectedHospital(hospitalId);
    setSearchTerm(""); // Clear search term after selecting hospital
    setShowDropdown(false); // Hide dropdown after selection
  };

  const handleConfirmHospital = () => {
    const hospital = hospitals.find(
      (hospital) => hospital.id === selectedHospital
    );
    if (hospital) {
      // Navigate to /admin/send-medicines/:id with hospital object in state
      navigate(`/admin/send-medicines/${selectedHospital}`, {
        state: { hospital },
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Send Medicine</h2>
        <form>
          <div className="mb-4 relative">
            <label
              htmlFor="hospitalSearch"
              className="block text-sm font-medium text-gray-700"
            >
              Search Hospital:
            </label>
            <input
              id="hospitalSearch"
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              placeholder="Search hospitals..."
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {showDropdown && searchTerm.trim() === "" && (
              <div className="absolute mt-1 w-full bg-white shadow-md rounded-md border border-gray-300 z-10">
                {hospitals.map((hospital) => (
                  <button
                    key={hospital.id}
                    type="button"
                    onClick={() => handleSelectHospital(hospital.id)}
                    className="block w-full p-2 text-left hover:bg-gray-100 focus:bg-gray-100"
                  >
                    {hospital.name}
                  </button>
                ))}
              </div>
            )}
            {showDropdown && searchTerm.trim() !== "" && (
              <div className="absolute mt-1 w-full bg-white shadow-md rounded-md border border-gray-300 z-10">
                {hospitals
                  .filter((hospital) =>
                    hospital.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((hospital) => (
                    <button
                      key={hospital.id}
                      type="button"
                      onClick={() => handleSelectHospital(hospital.id)}
                      className="block w-full p-2 text-left hover:bg-gray-100 focus:bg-gray-100"
                    >
                      {hospital.name}
                    </button>
                  ))}
                {hospitals.length === 0 && (
                  <p className="p-2 text-sm text-gray-500">
                    No hospitals found.
                  </p>
                )}
              </div>
            )}
          </div>
          {selectedHospital && (
            <div className="mt-2">
              <span className="font-medium">Selected Hospital:</span>{" "}
              {
                hospitals.find((hospital) => hospital.id === selectedHospital)
                  ?.name
              }
            </div>
          )}
          <button
            type="button"
            onClick={handleConfirmHospital}
            className={`w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              selectedHospital ? "" : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!selectedHospital}
          >
            Confirm Hospital
          </button>
        </form>
      </div>
      <MetamaskConnectModal
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        connectWallet={handleConnectWallet}
      />
    </div>
  );
};

export default SendMedicine;
