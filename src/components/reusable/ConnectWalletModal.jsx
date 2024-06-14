import React, { useEffect } from "react";
import Popup from "reactjs-popup";

const MetamaskConnectModal = ({ isOpen, closeModal, connectWallet }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <Popup
      open={isOpen}
      closeOnDocumentClick
      onClose={closeModal}
      modal
      nested
      className="metamask-modal-overlay"
      overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
    >
      {(close) => (
        <div className="metamask-modal w-full max-w-md p-6 bg-white rounded shadow-lg">
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl"
            onClick={close}
          >
            &times;
          </button>
          <div className="header text-3xl font-bold mb-6">Connect Wallet</div>
          <div className="content text-lg mb-6">
            Please connect your wallet to use this application.
          </div>
          <div className="actions flex justify-end">
            <button
              className="px-6 py-3 bg-indigo-600 text-white text-lg rounded-md hover:bg-indigo-700 focus:outline-none"
              onClick={() => {
                connectWallet();
                close();
              }}
            >
              Connect Wallet
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default MetamaskConnectModal;
