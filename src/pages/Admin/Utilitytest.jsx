import { ethers } from "ethers";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { contractABI, contractAddress } from "../../contract/blockchain"; // Ensure you have the address of your contract
import { db } from "../../firebase/firebase"; // Adjust the path according to your project structure

const Utilitytest = () => {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "hospitals"), (snapshot) => {
      const hospitalsData = [];
      snapshot.forEach((doc) => {
        hospitalsData.push({ id: doc.id, ...doc.data() });
      });
      setHospitals(hospitalsData);
    });

    return () => unsubscribe();
  }, []);

  const handleRegisterHospitals = async () => {
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

      // Collect hospital IDs and names into separate arrays
      const hospitalIds = hospitals.map((hospital) => hospital.id);
      const hospitalNames = hospitals.map((hospital) => hospital.name);

      // Call the registerMultipleHospitals function with the arrays
      const tx = await contract.registerMultipleHospitals(
        hospitalIds,
        hospitalNames
      );
      await tx.wait();
      console.log("Hospitals registered successfully");
    } catch (error) {
      console.error("Error registering hospitals:", error);
    }
  };

  const handlePopulateMedicines = async () => {
    const medicines = [
      { id: 1, name: "Aspirin" },
      { id: 2, name: "Paracetamol" },
      { id: 3, name: "Ibuprofen" },
      { id: 4, name: "Amoxicillin" },
      { id: 5, name: "Ciprofloxacin" },
      { id: 6, name: "Metformin" },
      { id: 7, name: "Lisinopril" },
      { id: 8, name: "Amlodipine" },
      { id: 9, name: "Omeprazole" },
      { id: 10, name: "Simvastatin" },
      { id: 11, name: "Azithromycin" },
      { id: 12, name: "Cetirizine" },
      { id: 13, name: "Furosemide" },
      { id: 14, name: "Warfarin" },
      { id: 15, name: "Atorvastatin" },
    ];

    try {
      for (const medicine of medicines) {
        await setDoc(doc(db, "medicines", medicine.id.toString()), {
          name: medicine.name,
        });
      }
      console.log("Medicines added to Firestore successfully");
    } catch (error) {
      console.error("Error adding medicines to Firestore:", error);
    }
  };

  const handlePopulateDoctors = async () => {
    const roles = [
      "Cardiologist",
      "Dermatologist",
      "Neurologist",
      "Orthopedic",
      "Pediatrician",
      "Anesthesiologist",
      "Radiologist",
      "Oncologist",
      "Pathologist",
      "Endocrinologist",
      "Gastroenterologist",
      "Hematologist",
      "Nephrologist",
      "Ophthalmologist",
      "Otolaryngologist",
      "Pulmonologist",
      "Rheumatologist",
      "Urologist",
      "Allergist",
      "Infectious Disease Specialist",
      "Psychiatrist",
      "Plastic Surgeon",
      "General Surgeon",
      "Emergency Medicine Physician",
      "Family Medicine Physician",
    ];
    const firstNames = [
      "Aarav",
      "Vivaan",
      "Aditya",
      "Vihaan",
      "Arjun",
      "Sai",
      "Ayaan",
      "Krishna",
      "Ishaan",
      "Rohan",
      "Karan",
      "Ravi",
      "Arnav",
      "Dev",
      "Manish",
      "Nikhil",
      "Rahul",
      "Siddharth",
      "Sanjay",
      "Rajesh",
      "Ananya",
      "Aarohi",
      "Saanvi",
      "Riya",
      "Diya",
      "Isha",
      "Mira",
      "Nidhi",
      "Pooja",
      "Sneha",
    ];

    const lastNames = [
      "Patel",
      "Singh",
      "Kumar",
      "Sharma",
      "Gupta",
      "Mehta",
      "Agarwal",
      "Joshi",
      "Nair",
      "Reddy",
      "Menon",
      "Chopra",
      "Malhotra",
      "Kapoor",
      "Bhatia",
      "Desai",
      "Verma",
      "Jain",
      "Iyer",
      "Pillai",
      "Basu",
      "Rao",
      "Thakur",
      "Mishra",
      "Naidu",
      "Shetty",
      "Bhatt",
      "Pandey",
      "Chatterjee",
      "Dubey",
    ];

    try {
      for (const hospital of hospitals) {
        const doctors = [];
        for (let i = 0; i < 10; i++) {
          const firstName =
            firstNames[Math.floor(Math.random() * firstNames.length)];
          const lastName =
            lastNames[Math.floor(Math.random() * lastNames.length)];
          doctors.push({
            id: i + 1,
            name: `${firstName} ${lastName}`,
            role: roles[Math.floor(Math.random() * roles.length)],
            checkedIn: Math.random() < 0.5,
          });
        }

        await updateDoc(doc(db, "hospitals", hospital.id), { doctors });
      }
      console.log("Doctors added to all hospitals successfully");
    } catch (error) {
      console.error("Error adding doctors to hospitals:", error);
    }
  };

  return (
    <div>
      <h1></h1>
      <button
        onClick={handleRegisterHospitals}
        className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Register Hospitals to Blockchain
      </button>
      <button
        onClick={handlePopulateMedicines}
        className="px-4 py-2 bg-green-500 text-white rounded-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 mt-4"
      >
        Populate Medicines
      </button>
      <button
        onClick={handlePopulateDoctors}
        className="px-4 py-2 bg-purple-500 text-white rounded-full shadow-sm hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 mt-4"
      >
        Populate Doctors
      </button>
    </div>
  );
};

export default Utilitytest;
