import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";

import Loader from "../../components/Loader";
import ServiceCard from "../../components/ServiceCard";

function BrowseServices() {
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);
  
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

  useEffect(() => {
    const filteredData = services.filter((service) =>
      service.department?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredServices(filteredData);
  }, [searchQuery, services]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="my-4 text-2xl font-semibold">Services</h2>
      <div className="relative w-full max-w-md mb-8">
        <input
          type="text"
          placeholder="Search services"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex flex-wrap justify-between gap-4">
        {filteredServices.map((service) => (
          <ServiceCard key={service.id} service={service} className="w-full sm:w-1/2 md:w-1/3" />
        ))}
      </div>
      {filteredServices.length ? null : <Loader />}
    </div>
  );
}

export default BrowseServices;
