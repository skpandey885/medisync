import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { Hospital } from "../../models";
import HospitalCard from "../../components/HospitalCard";
import Loader from "../../components/Loader";
function BrowseHospitals() {
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

  return (
    <div>
      <h2 className='flex items-center gap-2 text-2xl font-bold text-gray-700 m-[20px]'>
      /hospitals</h2>

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
