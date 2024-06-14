import React, { useState } from "react";

const UpdateMedicineCard = ({ medicine, onCounterChange }) => {
  const [inputValue, setInputValue] = useState(medicine.quantity.toString());

  const handleDecrement = () => {
    if (parseInt(inputValue) > 0) {
      const newValue = parseInt(inputValue) - 1;
      setInputValue(newValue.toString());
      onCounterChange(medicine.id, newValue);
    }
  };

  const handleInputChange = (e) => {
    let value = e.target.value;

    // Update the input value in state without validation for free typing
    setInputValue(value);
  };

  const handleInputBlur = () => {
    // Ensure the input value is within the allowed range on blur
    let value = parseInt(inputValue);
    if (isNaN(value) || value < 0) {
      value = 0;
    } else if (value > medicine.quantity) {
      value = medicine.quantity;
    }
    setInputValue(value.toString()); // Update the input value in state
    onCounterChange(medicine.id, value); // Call onCounterChange with validated value
  };

  return (
    <div className="py-4 px-3 bg-white rounded-xl shadow-lg">
      <div className="text-center sm:text-left">
        <div className="space-y-1">
          <p className="text-lg text-black font-semibold">{medicine.name}</p>
          <p className="text-slate-500 font-medium sm:max-w-xs overflow-hidden overflow-ellipsis">
            {medicine.description}
          </p>
        </div>
        <div className="mt-3">
          <div className="flex items-center space-x-2">
            <button
              className="px-2 py-1 bg-gray-200 rounded-md"
              onClick={handleDecrement}
            >
              -
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className="px-2 py-1 border border-gray-300 rounded-md w-16 text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateMedicineCard;
