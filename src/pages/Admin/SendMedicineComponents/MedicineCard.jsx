import React from "react";

const MedicineCard = ({
  medicine,
  onCounterChange,
  removeFromStockToBeSent,
}) => {
  const handleIncrement = () => {
    onCounterChange(medicine.id, medicine.counter + 10);
  };

  const handleDecrement = () => {
    if (medicine.counter >= 10) {
      onCounterChange(medicine.id, medicine.counter - 10);
    }
  };

  const handleChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      onCounterChange(medicine.id, value);
    }
  };

  const handleRemove = () => {
    removeFromStockToBeSent(medicine.id);
  };

  return (
    <div className="py-8 px-3 mx-auto bg-white rounded-xl shadow-lg sm:flex sm:items-center sm:space-x-6">
      <div className="text-center sm:text-left">
        <div className="space-y-1">
          <p className="text-lg text-black font-semibold">{medicine.name}</p>
          <p className="text-slate-500 font-medium sm:max-w-xs overflow-hidden overflow-ellipsis">
            {medicine.description}
          </p>
        </div>
        <div className="mt-5">
          <p className="px-4 py-1 text-sm font-semibold rounded-full border border-gray-300">
            Brands: {medicine.brands}
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
              value={medicine.counter}
              onChange={handleChange}
              className="px-2 py-1 border border-gray-300 rounded-md w-16 text-center"
            />
            <button
              className="px-2 py-1 bg-gray-200 rounded-md"
              onClick={handleIncrement}
            >
              +
            </button>
            {medicine.counter > 0 && (
              <button className="px-2 py-1 text-red-600" onClick={handleRemove}>
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;
