import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { Hospital } from "../../models";
import Verifycard from "../../components/Verifycard";

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
      <h2>Hospitals</h2>
      <div className="flex flex-wrap gap-8 py-8  ">
        {hospitals.map((hospital) => (
          <Verifycard key={hospital.id} hospital={hospital} />
        ))}
      </div>
    </div>
  );
}

export default BrowseHospitals;
