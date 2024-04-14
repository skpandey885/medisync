import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { Hospital } from "../../models";
import Verifycard from "../../components/Verifycard";
import ServiceCard from "../../components/ServiceCard";

function BrowseHospitals() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "services"), (snapshot) => {
      const servicesData = [];
      snapshot.forEach((doc) => {
        servicesData.push({ id: doc.id, ...doc.data() });
      });
      setServices(servicesData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Hospitals</h2>
      <div className="flex flex-wrap gap-8 py-8  ">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}

export default BrowseHospitals;
