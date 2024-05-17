import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { Hospital } from "../../models";
import HospitalCard from "../../components/HospitalCard";
import Loader from "../../components/Loader";
function BrowseHospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredHospitals, setFilteredHospitals] = useState([]);

  useEffect(() => {
    const filteredData = hospitals.filter((hospital) =>
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredHospitals(filteredData);
  }, [searchQuery, hospitals]);
  
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

  return (
    <div className="flex flex-col items-center">
      <h2 className="my-4 text-2xl font-semibold">Hospitals</h2>
      <div className="relative w-full max-w-md mb-8">
        <input
          type="text"
          placeholder="Search hospitals"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
     

    {hospitals.length ?
    <div className="flex flex-wrap gap-8 py-8 ">
     {hospitals.map((hospital) => (
     <HospitalCard key={hospital.id} hospital={hospital} />
       ))}
   </div> : <Loader/>}
    </div>
     
  
  );
}

export default BrowseHospitals;
