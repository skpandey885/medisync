import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../../contract/blockchain";

// Create the context
const WalletContext = createContext();

// Create a provider component
export const WalletProvider = ({ children }) => {
  const [isBlockchainAdmin, setIsBlockchainAdmin] = useState(false);
  const [accountAddress, setAccountAddress] = useState("");
  const [contract, setContract] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const checkIfBlockchainAdmin = useCallback(async () => {
    try {
      if (contract && accountAddress) {
        const isAdmin = await contract.checkIfAdmin();
        console.log(isAdmin + " is blockchain admin log");
        setIsBlockchainAdmin(isAdmin);
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
    checkIfBlockchainAdmin();
  }, [checkIfBlockchainAdmin, accountAddress]);

  const handleConnectWallet = async () => {
    if (isConnecting) {
      console.log("Already processing eth_requestAccounts. Please wait.");
      return;
    }

    if (window.ethereum) {
      try {
        setIsConnecting(true);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length > 0) {
          setAccountAddress(accounts[0]);
        }
      } catch (err) {
        console.error("Failed to connect wallet:", err);
      } finally {
        setIsConnecting(false);
      }
    }
  };

  return (
    <WalletContext.Provider
      value={{
        isBlockchainAdmin,
        accountAddress,
        contract,
        handleConnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

// Create a hook to use the wallet context
export const useWallet = () => {
  return useContext(WalletContext);
};

// Utility function to shorten addresses
export const shortenAddress = (address) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};
