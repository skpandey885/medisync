import { ethers } from "ethers";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddAdmin from "../../assets/addAdmin.png";
import SendMedicineImage from "../../assets/sendMedicines.png";
import UpdateMedicineImage from "../../assets/updateMedicine.png";
import { useAuth } from "../../contexts/authContext";
import { contractABI, contractAddress } from "../../contract/blockchain";
import AdminCard from "./AdminCard";

const Dashboard = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleAddAdmin = async (adminAddress) => {
    if (!window.ethereum) {
      console.error("MetaMask is not installed!");
      return;
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const tx = await contract.addAdmin(adminAddress);
      await tx.wait();
      console.log("New admin added successfully");

      // Show success toast notification
      toast.success("New admin added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error adding new admin:", error);
      toast.error("Error adding new admin. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleCardClick = (path) => {
    navigate(path);
  };

  if (!isAdmin) {
    return <p>You do not have permission to access this page.</p>;
  }

  return (
    <div className="container mx-auto mt-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AdminCard
          imageSrc={UpdateMedicineImage}
          title="Send Medicines To Hospital"
          description="Click here to send medicines to hospitals."
          buttonText="Go"
          onClick={() => handleCardClick("/send-medicines")}
          imageSize="h-64"
        />

        <AdminCard
          imageSrc={SendMedicineImage}
          title="Update Medicine Data For Hospital"
          description="Click here to update medicine data for hospitals."
          buttonText="Go"
          onClick={() => handleCardClick("/update-medicine-data")}
          imageSize="h-64"
        />

        {isAdmin && (
          <AdminCard
            imageSrc={AddAdmin}
            title="Add New Admin"
            buttonText="Add Admin"
            onClick={handleAddAdmin} // Pass handleAddAdmin directly to onClick
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
