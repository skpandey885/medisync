import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase/firebase";

const HospitalCard = ({ hospital }) => {
  const [serviceNames, setServiceNames] = useState("");
  // console.log("HOSTPIAL INFO ");
  // console.log(hospital?.id);

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
    <div>
      <Link state={hospitalWithServices} to={`/view/hospital/${hospital?.id}`}>
        <div className="p-5 ml-[40px] my-[10px] w-[400px] bg-white rounded-lg border shadow-md sm:p-8">
          <div className="flex items-baseline text-gray-900">
            <span className="text-3xl font-extrabold tracking-tight">
              {hospital?.name}
            </span>
          </div>
          <ul role="list" className="space-y-5 my-7">
            <li className="flex space-x-3">
              <span className="text-xl font-bold leading-tight text-blue">
                Address:{" "}
                <span className="text-lg font-normal">{hospital?.address}</span>
              </span>
            </li>
            <li className="flex space-x-3">
              <span className="text-xl font-bold leading-tight text-blue">
                Contact:{" "}
                <span className="text-lg font-normal">{hospital?.contact}</span>
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
                <span className="text-lg font-normal">{serviceNames}</span>
              </span>
            </li>
          </ul>
        </div>
      </Link>
    </div>
  );
};

export default HospitalCard;
