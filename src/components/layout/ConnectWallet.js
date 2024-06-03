import { ethers } from "ethers";
import React, { useCallback, useEffect, useState } from "react";
import { HiCheckCircle } from "react-icons/hi";
import { contractABI, contractAddress } from "../../contract/blockchain";
import MetamaskModal from "../reusable/MetamaskModal";

export const shortenAddress = (address) => {
  return address.slice(0, 6) + "..." + address.slice(-5);
};

const ConnectWallet = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [accountAddress, setAccountAddress] = useState("");
  const [contract, setContract] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const checkIfAdmin = useCallback(async () => {
    try {
      if (contract && accountAddress) {
        const isAdmin = await contract.checkIfAdmin();
        console.log(isAdmin + " is admin log");
        setIsAdmin(isAdmin);
      }
    } catch (err) {
      console.error(err);
    }
  }, [contract, accountAddress]);

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      setContract(contract);

      window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
        if (accounts.length > 0) {
          setAccountAddress(accounts[0]);
        }
      });
    } else {
      console.error("No Ethereum provider found. Install Metamask.");
    }
  }, []);

  useEffect(() => {
    checkIfAdmin();
  }, [checkIfAdmin, accountAddress]); // Update checkIfAdmin when accountAddress changes

  const handleConnectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length > 0) {
          setAccountAddress(accounts[0]); // Update accountAddress after successful connection
        }
      } catch (err) {
        console.error("Failed to connect wallet:", err);
      }
    } else {
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (isAdmin) {
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
