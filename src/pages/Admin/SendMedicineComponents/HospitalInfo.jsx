import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase"; // Adjust the path as needed

const HospitalInfoCard = ({ hospital }) => {
  const [serviceNames, setServiceNames] = useState([]);

  useEffect(() => {
    const fetchServiceNames = async () => {
      try {
        if (!hospital.services || hospital.services.length === 0) {
          setServiceNames(["No services available"]);
          return;
        }

        const serviceNamesData = [];
        const promises = hospital.services.map(async (serviceId) => {
          const serviceQuery = query(
            collection(db, "services"),
            where("id", "==", serviceId)
          );
          const serviceSnapshot = await getDocs(serviceQuery);
          serviceSnapshot.forEach((doc) => {
            const serviceName = doc.data().serviceName;
            serviceNamesData.push(serviceName);
          });
        });

        await Promise.all(promises);

        if (serviceNamesData.length === 0) {
          setServiceNames(["No services found"]);
        } else {
          setServiceNames(serviceNamesData);
        }
      } catch (error) {
        console.error("Error fetching service names:", error);
        setServiceNames(["Error fetching services"]);
      }
    };

    fetchServiceNames();
  }, [hospital.services]);

  return (
    <div className="p-5 pb-8 ml-5 my-10 w-96 bg-white rounded-lg border shadow-md sm:p-8">
      <div className="flex items-baseline text-gray-900">
        <span className="text-3xl font-extrabold tracking-tight">
          {hospital?.name}
        </span>
      </div>
      <ul role="list" className="space-y-5 my-7">
        <li className="flex space-x-3">
          <span className="text-xl font-bold leading-tight text-blue">
            Address:{" "}
            <span className="text-lg font-normal break-words">
              {hospital?.address}
            </span>
          </span>
        </li>
        <li className="flex space-x-3">
          <span className="text-xl font-bold leading-tight text-blue">
            Contact:{" "}
            <span className="text-lg font-normal break-words">
              {hospital?.contact}
            </span>
          </span>
        </li>
        {hospital?.doctors && (
          <li className="flex space-x-3">
            <span className="text-xl font-bold leading-tight text-blue">
              Doctors:{" "}
            </span>
            <span className="text-lg font-normal">
              {hospital.doctors.length}
            </span>
          </li>
        )}
        <li className="flex space-x-3">
          <span className="text-xl font-bold leading-tight text-blue">
            Beds: <span className="text-lg font-normal">{hospital?.beds}</span>
          </span>
        </li>
        <li className="flex space-x-3">
          <span className="text-xl font-bold leading-tight text-blue">
            Nurses:{" "}
            <span className="text-lg font-normal">{hospital?.nurses}</span>
          </span>
        </li>
        <li className="flex space-x-3">
          <span className="text-xl font-bold leading-tight text-blue">
            Services:{" "}
            <span className="text-lg font-normal break-words">
              {serviceNames.join(", ")}
            </span>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default HospitalInfoCard;
