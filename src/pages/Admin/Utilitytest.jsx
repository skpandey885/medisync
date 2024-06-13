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
    try {
      for (const medicine of medicines) {
        await setDoc(doc(db, "medicines", medicine.id.toString()), {
          name: medicine.name,
          description: medicine.description,
          brands: medicine.brands,
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

const medicines = [
  {
    id: 1,
    name: "Aspirin",
    description:
      "Aspirin is a nonsteroidal anti-inflammatory drug (NSAID) used to treat pain, fever, and inflammation.",
    brands: "Bayer Aspirin, Ecotrin, Bufferin",
  },
  {
    id: 2,
    name: "Paracetamol",
    description:
      "Paracetamol is a pain reliever and fever reducer commonly used for mild to moderate pain.",
    brands: "Tylenol, Panadol, Calpol",
  },
  {
    id: 3,
    name: "Ibuprofen",
    description:
      "Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) used to treat pain, fever, and inflammation.",
    brands: "Advil, Motrin, Nurofen",
  },
  {
    id: 4,
    name: "Amoxicillin",
    description:
      "Amoxicillin is an antibiotic used to treat bacterial infections such as pneumonia, bronchitis, and infections of the ear, nose, throat, skin, or urinary tract.",
    brands: "Amoxil, Moxatag, Trimox",
  },
  {
    id: 5,
    name: "Ciprofloxacin",
    description:
      "Ciprofloxacin is an antibiotic used to treat a variety of bacterial infections including infections of the skin, lungs, airways, bones, and joints.",
    brands: "Cipro, Ciprobay, Ciproxin",
  },
  {
    id: 6,
    name: "Metformin",
    description:
      "Metformin is an oral diabetes medicine that helps control blood sugar levels.",
    brands: "Glucophage, Fortamet, Glumetza",
  },
  {
    id: 7,
    name: "Lisinopril",
    description:
      "Lisinopril is an ACE inhibitor used to treat high blood pressure (hypertension) and heart failure.",
    brands: "Prinivil, Zestril",
  },
  {
    id: 8,
    name: "Amlodipine",
    description:
      "Amlodipine is a calcium channel blocker used to treat high blood pressure (hypertension) and chest pain (angina).",
    brands: "Norvasc, Istin, Amlo",
  },
  {
    id: 9,
    name: "Omeprazole",
    description:
      "Omeprazole is a proton pump inhibitor (PPI) used to reduce stomach acid and treat conditions like acid reflux (GERD) and stomach ulcers.",
    brands: "Prilosec, Losec, Zegerid",
  },
  {
    id: 10,
    name: "Simvastatin",
    description: "Simvastatin is a statin used to lower cholesterol levels.",
    brands: "Zocor, Lipex, Simlup",
  },
  {
    id: 11,
    name: "Azithromycin",
    description:
      "Azithromycin is an antibiotic used to treat a wide variety of bacterial infections.",
    brands: "Zithromax, Azithrocin, Azee",
  },
  {
    id: 12,
    name: "Cetirizine",
    description:
      "Cetirizine is an antihistamine used to relieve allergy symptoms such as watery eyes, runny nose, itching eyes/nose, sneezing, hives, and itching.",
    brands: "Zyrtec, Reactine, Aller-Tec",
  },
  {
    id: 13,
    name: "Furosemide",
    description:
      "Furosemide is a loop diuretic (water pill) that prevents your body from absorbing too much salt, allowing the salt to instead be passed in your urine.",
    brands: "Lasix, Fusid",
  },
  {
    id: 14,
    name: "Warfarin",
    description:
      "Warfarin is an anticoagulant used to prevent heart attacks, strokes, and blood clots in veins and arteries.",
    brands: "Coumadin, Jantoven, Marevan",
  },
  {
    id: 15,
    name: "Atorvastatin",
    description:
      "Atorvastatin is a statin medication used to prevent cardiovascular disease and treat high cholesterol.",
    brands: "Lipitor, Sortis, Torvast",
  },
  {
    id: 16,
    name: "Diazepam",
    description:
      "Diazepam is a medication of the benzodiazepine family that acts as an anxiolytic.",
    brands: "Valium, Diastat, Diazemuls",
  },
  {
    id: 17,
    name: "Alprazolam",
    description:
      "Alprazolam is a benzodiazepine medication primarily used for the treatment of anxiety disorders.",
    brands: "Xanax, Alprazolam Intensol, Niravam",
  },
  {
    id: 18,
    name: "Metronidazole",
    description:
      "Metronidazole is an antibiotic and antiprotozoal medication used to treat infections caused by anaerobic bacteria and certain parasites.",
    brands: "Flagyl, MetroGel, Noritate",
  },
  {
    id: 19,
    name: "Levothyroxine",
    description:
      "Levothyroxine is a thyroid medicine used to treat hypothyroidism (low thyroid hormone).",
    brands: "Synthroid, Levoxyl, Euthyrox",
  },
  {
    id: 20,
    name: "Venlafaxine",
    description:
      "Venlafaxine is a serotonin-norepinephrine reuptake inhibitor (SNRI) used to treat depression and anxiety disorders.",
    brands: "Effexor, Venlor, Trevilor",
  },
  {
    id: 21,
    name: "Morphine",
    description:
      "Morphine is a potent opioid pain medication used to treat severe pain.",
    brands: "MS Contin, Kadian, Oramorph SR",
  },
  {
    id: 22,
    name: "Tramadol",
    description:
      "Tramadol is a synthetic opioid analgesic used to treat moderate to moderately severe pain.",
    brands: "Ultram, ConZip, Rybix ODT",
  },
  {
    id: 23,
    name: "Losartan",
    description:
      "Losartan is an angiotensin II receptor antagonist used to treat high blood pressure (hypertension) and to help protect the kidneys from damage due to diabetes.",
    brands: "Cozaar, Hyzaar",
  },
  {
    id: 24,
    name: "Metoprolol",
    description:
      "Metoprolol is a beta-blocker used to treat chest pain (angina), heart failure, and high blood pressure (hypertension).",
    brands: "Lopressor, Toprol XL, Betaloc",
  },
  {
    id: 25,
    name: "Fluoxetine",
    description:
      "Fluoxetine is a selective serotonin reuptake inhibitor (SSRI) used to treat major depressive disorder, obsessive-compulsive disorder (OCD), bulimia nervosa, panic disorder, and premenstrual dysphoric disorder (PMDD).",
    brands: "Prozac, Sarafem, Fontex",
  },
  {
    id: 26,
    name: "Gabapentin",
    description:
      "Gabapentin is an anticonvulsant medication used to treat epilepsy, restless legs syndrome, and certain types of nerve pain.",
    brands: "Neurontin, Gralise, Gabarone",
  },
  {
    id: 27,
    name: "Prednisone",
    description:
      "Prednisone is a corticosteroid used to treat a variety of inflammatory and autoimmune conditions such as asthma, rheumatoid arthritis, and lupus.",
    brands: "Deltasone, Rayos, Prednisol",
  },
  {
    id: 28,
    name: "Metformin",
    description:
      "Metformin is an oral diabetes medicine that helps control blood sugar levels.",
    brands: "Glucophage, Fortamet, Glumetza",
  },
  {
    id: 29,
    name: "Lorazepam",
    description:
      "Lorazepam is a benzodiazepine medication used to treat anxiety disorders, trouble sleeping, active seizures including status epilepticus, alcohol withdrawal, and chemotherapy-induced nausea and vomiting.",
    brands: "Ativan, Lorazepam Intensol",
  },
  {
    id: 30,
    name: "Metronidazole",
    description:
      "Metronidazole is an antibiotic and antiprotozoal medication used to treat infections caused by anaerobic bacteria and certain parasites.",
    brands: "Flagyl, MetroGel, Noritate",
  },
  {
    id: 31,
    name: "Levothyroxine",
    description:
      "Levothyroxine is a thyroid medicine used to treat hypothyroidism (low thyroid hormone).",
    brands: "Synthroid, Levoxyl, Euthyrox",
  },
  {
    id: 32,
    name: "Venlafaxine",
    description:
      "Venlafaxine is a serotonin-norepinephrine reuptake inhibitor (SNRI) used to treat depression and anxiety disorders.",
    brands: "Effexor, Venlor, Trevilor",
  },
  {
    id: 33,
    name: "Morphine",
    description:
      "Morphine is a potent opioid pain medication used to treat severe pain.",
    brands: "MS Contin, Kadian, Oramorph SR",
  },
  {
    id: 34,
    name: "Tramadol",
    description:
      "Tramadol is a synthetic opioid analgesic used to treat moderate to moderately severe pain.",
    brands: "Ultram, ConZip, Rybix ODT",
  },
  {
    id: 35,
    name: "Losartan",
    description:
      "Losartan is an angiotensin II receptor antagonist used to treat high blood pressure (hypertension) and to help protect the kidneys from damage due to diabetes.",
    brands: "Cozaar, Hyzaar",
  },
  {
    id: 36,
    name: "Metoprolol",
    description:
      "Metoprolol is a beta-blocker used to treat chest pain (angina), heart failure, and high blood pressure (hypertension).",
    brands: "Lopressor, Toprol XL, Betaloc",
  },
  {
    id: 37,
    name: "Fluoxetine",
    description:
      "Fluoxetine is a selective serotonin reuptake inhibitor (SSRI) used to treat major depressive disorder, obsessive-compulsive disorder (OCD), bulimia nervosa, panic disorder, and premenstrual dysphoric disorder (PMDD).",
    brands: "Prozac, Sarafem, Fontex",
  },
  {
    id: 38,
    name: "Gabapentin",
    description:
      "Gabapentin is an anticonvulsant medication used to treat epilepsy, restless legs syndrome, and certain types of nerve pain.",
    brands: "Neurontin, Gralise, Gabarone",
  },
  {
    id: 39,
    name: "Prednisone",
    description:
      "Prednisone is a corticosteroid used to treat a variety of inflammatory and autoimmune conditions such as asthma, rheumatoid arthritis, and lupus.",
    brands: "Deltasone, Rayos, Prednisol",
  },
  {
    id: 40,
    name: "Lorazepam",
    description:
      "Lorazepam is a benzodiazepine medication used to treat anxiety disorders, trouble sleeping, active seizures including status epilepticus, alcohol withdrawal, and chemotherapy-induced nausea and vomiting.",
    brands: "Ativan, Lorazepam Intensol",
  },
  {
    id: 41,
    name: "Doxycycline",
    description:
      "Doxycycline is an antibiotic used to treat bacterial infections including respiratory infections, skin infections, and sexually transmitted infections.",
    brands: "Vibramycin, Oracea, Adoxa",
  },
  {
    id: 42,
    name: "Cephalexin",
    description:
      "Cephalexin is an antibiotic used to treat bacterial infections including respiratory tract infections, ear infections, skin infections, and urinary tract infections.",
    brands: "Keflex, Rilexine",
  },
  {
    id: 43,
    name: "Hydrochlorothiazide",
    description:
      "Hydrochlorothiazide is a thiazide diuretic (water pill) used to treat high blood pressure (hypertension) and fluid retention (edema).",
    brands: "Microzide, HydroDIURIL",
  },
  {
    id: 44,
    name: "Escitalopram",
    description:
      "Escitalopram is a selective serotonin reuptake inhibitor (SSRI) used to treat depression and generalized anxiety disorder (GAD).",
    brands: "Lexapro, Cipralex",
  },
  {
    id: 45,
    name: "Sildenafil",
    description:
      "Sildenafil is a medication used to treat erectile dysfunction (impotence) and pulmonary arterial hypertension.",
    brands: "Viagra, Revatio",
  },
  {
    id: 46,
    name: "Tadalafil",
    description:
      "Tadalafil is a medication used to treat erectile dysfunction (impotence) and symptoms of benign prostatic hyperplasia (enlarged prostate).",
    brands: "Cialis, Adcirca",
  },
  {
    id: 47,
    name: "Ondansetron",
    description:
      "Ondansetron is a medication used to prevent nausea and vomiting caused by cancer chemotherapy, radiation therapy, and surgery.",
    brands: "Zofran, Zuplenz",
  },
  {
    id: 48,
    name: "Pantoprazole",
    description:
      "Pantoprazole is a proton pump inhibitor (PPI) used to reduce stomach acid and treat conditions like acid reflux (GERD) and stomach ulcers.",
    brands: "Protonix, Pantoloc",
  },
  {
    id: 49,
    name: "Clarithromycin",
    description:
      "Clarithromycin is an antibiotic used to treat a variety of bacterial infections including respiratory tract infections, skin infections, and Helicobacter pylori infections.",
    brands: "Biaxin, Klaricid",
  },
  {
    id: 50,
    name: "Citalopram",
    description:
      "Citalopram is a selective serotonin reuptake inhibitor (SSRI) used to treat depression and panic disorder.",
    brands: "Celexa, Cipramil",
  },
  {
    id: 51,
    name: "Allopurinol",
    description:
      "Allopurinol is a medication used to decrease high blood uric acid levels in conditions such as gout and certain types of kidney stones.",
    brands: "Zyloprim, Lopurin",
  },
  {
    id: 52,
    name: "Carvedilol",
    description:
      "Carvedilol is a beta-blocker used to treat heart failure and high blood pressure (hypertension).",
    brands: "Coreg, Eucardic",
  },
  {
    id: 53,
    name: "Bisoprolol",
    description:
      "Bisoprolol is a beta-blocker used to treat high blood pressure (hypertension) and heart failure.",
    brands: "Zebeta, Concor",
  },
  {
    id: 54,
    name: "Fentanyl",
    description:
      "Fentanyl is a potent opioid medication used to treat severe pain, such as breakthrough cancer pain.",
    brands: "Duragesic, Sublimaze",
  },
  {
    id: 55,
    name: "Aripiprazole",
    description:
      "Aripiprazole is an atypical antipsychotic used to treat schizophrenia, bipolar disorder, major depressive disorder, and irritability associated with autism.",
    brands: "Abilify, Aristada",
  },
  {
    id: 56,
    name: "Quetiapine",
    description:
      "Quetiapine is an atypical antipsychotic used to treat schizophrenia, bipolar disorder, and major depressive disorder.",
    brands: "Seroquel, Ketipinor",
  },
  {
    id: 57,
    name: "Amiodarone",
    description:
      "Amiodarone is an antiarrhythmic medication used to treat and prevent a number of types of irregular heartbeats.",
    brands: "Cordarone, Pacerone",
  },
  {
    id: 58,
    name: "Ranitidine",
    description:
      "Ranitidine is an H2 blocker used to reduce stomach acid and treat conditions like acid reflux (GERD) and stomach ulcers.",
    brands: "Zantac, Ranimax",
  },
];
