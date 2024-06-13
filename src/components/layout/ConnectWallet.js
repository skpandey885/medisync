import React, { useState } from "react";
import { HiCheckCircle } from "react-icons/hi";
import { useWallet, shortenAddress } from "./WalletContext";
import MetamaskModal from "../reusable/MetamaskModal";

const ConnectWallet = () => {
  const { isBlockchainAdmin, accountAddress, handleConnectWallet } =
    useWallet();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (isBlockchainAdmin) {
    return (
      <div className="bg-green-50 inline-flex items-center gap-1 text-green-500 font-medium px-4 py-2 rounded cursor-pointer">
        {shortenAddress(accountAddress)}{" "}
        <span>
          <HiCheckCircle className="h-5 w-5" />
        </span>
      </div>
    );
  }

  if (accountAddress) {
    return (
      <div className="bg-blue-50 text-blue-500 font-medium px-4 py-2 rounded cursor-pointer">
        {shortenAddress(accountAddress)}
      </div>
    );
  }

  return (
    <>
      <button onClick={handleConnectWallet} className="primary-btn">
        Connect Wallet
      </button>
      <MetamaskModal isOpen={modalIsOpen} closeModal={closeModal} />
    </>
  );
};

export default ConnectWallet;
