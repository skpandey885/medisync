import React, { useEffect } from "react";
import Popup from "reactjs-popup";
import "../reusable/MetamaskModal.css";

const MetamaskModal = ({ isOpen, closeModal }) => {
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
        <div className="metamask-modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header">Metamask Not Found</div>
          <div className="content">
            Please install Metamask to use this application.
          </div>
          <div className="actions">
            <button
              className="button"
              onClick={() =>
                window.open(
                  "https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?utm_source=google.com",
                  "_blank"
                )
              }
            >
              Go to Metamask Webstore
            </button>
            <button className="button" onClick={close}>
              Close
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default MetamaskModal;
