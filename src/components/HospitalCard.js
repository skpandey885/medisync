import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase/firebase";

const HospitalCard = ({ hospital }) => {
  const [serviceNames, setServiceNames] = useState("");

  const [hospitalWithServices, setHospitalWithServices] = useState({});

  useEffect(() => {
    const fetchServiceNames = async () => {
      try {
        if (!hospital.services || hospital.services.length === 0) {
          setServiceNames("No services available");
          return;
        }

        const serviceNamesData = [];
        const serviceQuery = query(
          collection(db, "services"),
          where("id", "in", hospital.services)
        );
        const serviceSnapshot = await getDocs(serviceQuery);
        serviceSnapshot.forEach((doc) => {
          const serviceName = doc.data().serviceName;
          serviceNamesData.push(serviceName);
        });

        const serviceNamesString = serviceNamesData.join(", ");
        setServiceNames(serviceNamesString);
        setHospitalWithServices({ ...hospital, serviceNamesString });
      } catch (error) {
        console.error("Error fetching service names:", error);
        setServiceNames("Error fetching services");
      }
    };

    fetchServiceNames();
  }, [hospital.services]);

  return (
    <div className="p-5 ml-[40px] my-[10px] w-[400px] md:h-[670px] bg-white rounded-lg border shadow-md sm:p-8 flex flex-col justify-between">
      <div className="flex-grow">
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
              Beds:{" "}
              <span className="text-lg font-normal">{hospital?.beds}</span>
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
                {serviceNames}
              </span>
            </span>
          </li>
        </ul>
      </div>
      <div className="mt-auto mb-4">
        <Link
          state={hospitalWithServices}
          to={`/view/hospital/${hospital?.id}`}
        >
          <button
            type="button"
            className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center text-center"
          >
            View More Information
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HospitalCard;
