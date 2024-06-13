import React, { useState } from "react";
import Popup from "reactjs-popup";
import toast from "react-hot-toast"; // Import toast from react-hot-toast

const SelectedMedicinesModal = ({
  isOpen,
  closeModal,
  selectedMedicines,
  sendToContract,
}) => {
  const [processing, setProcessing] = useState(false);

  const handleSendToContract = async () => {
    try {
      setProcessing(true); // Start processing

      // Perform action to send selectedMedicines to blockchain
      await sendToContract();

      // Transaction completed successfully
      toast.success("Transaction successful!");
      closeModal(); // Close modal after successful transaction
    } catch (error) {
      console.error("Failed to send medicines to blockchain:", error);
      toast.error("Failed to send medicines to blockchain");
    } finally {
      setProcessing(false); // End processing
    }
  };

  return (
    <Popup
      open={isOpen}
      closeOnDocumentClick={!processing} // Close only if not processing
      onClose={closeModal}
      modal
      nested
      className="custom-modal"
      overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
    >
      {(close) => (
        <div className="w-full max-w-lg p-4 bg-white rounded shadow-lg">
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            onClick={close}
            disabled={processing} // Disable close button while processing
          >
            &times;
          </button>
          <h2 className="text-lg font-semibold mb-4">Selected Medicines</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Medicine Name
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  {/* Add more columns as needed */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {selectedMedicines.map((medicine, index) => (
                  <tr key={index}>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {medicine.name}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {medicine.counter}
                    </td>
                    {/* Render additional columns here */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className={`px-4 py-2 rounded-md focus:outline-none ${
                processing
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
              }`}
              onClick={handleSendToContract}
              disabled={processing} // Disable button while processing
            >
              {processing
                ? "Processing Transaction..."
                : "Send and push to blockchain"}
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default SelectedMedicinesModal;
