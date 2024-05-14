import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";

import ServiceCard from "../../components/ServiceCard";
import Loader from "../../components/Loader";

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
      <h2 className='flex items-center gap-2 text-2xl font-bold text-gray-700 m-[20px]'>
      /services</h2>

      {services.length ?
      <div className="flex flex-wrap gap-8 py-8 ">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
: <Loader/>}
    </div>
  );
}

export default BrowseHospitals;
