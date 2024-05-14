import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useState, useEffect } from "react";

import { db } from "../firebase";
const HospitalCard = ({ hospital }) => {
  const [serviceNames, setServiceNames] = useState("");

  useEffect(() => {
    const fetchServiceNames = async () => {
      try {
        const serviceNamesData = [];
        for (const serviceId of hospital.services) {
          const serviceQuery = query(
            collection(db, "services"),
            where("id", "==", serviceId)
          );
          const serviceSnapshot = await getDocs(serviceQuery);
          serviceSnapshot.forEach((doc) => {
            const serviceName = doc.data().serviceName;
            serviceNamesData.push(serviceName);
          });
        }
        const serviceNamesString = serviceNamesData.join(", ");
        setServiceNames(serviceNamesString);
      } catch (error) {
        console.error("Error fetching service names:", error);
      }
    };

    fetchServiceNames();
  }, [hospital.services]);

  return (
    <div>
      <Link state={hospital} to={`/browse/verify/${hospital?._id} `}>
        <div className="p-5 ml-[40px] my-[10px]  w-[400px] bg-white rounded-lg border shadow-md sm:p-8  ">
          <div className="flex items-baseline text-gray-900 ">
            <span className="text-3xl font-extrabold tracking-tight">
              {hospital?.name}
            </span>
          </div>
          {/* List */}
          <ul role="list" className="space-y-5 my-7">
            <li className="flex space-x-3">
              {/* Icon */}

              <span className="text-xl font-bold leading-tight text-blue ">
                Address :{" "}
                <span className="text-lg font-normal">{hospital?.address}</span>
                {/* {data._id} */}
              </span>
            </li>
            <li className="flex space-x-3">
              {/* Icon */}

              <span className="text-xl font-bold leading-tight text-blue ">
                Contact :{" "}
                <span className="text-lg font-normal ">
                  {hospital?.contact}
                </span>
                {/* {data.course} */}
              </span>
            </li>
            <li className="flex space-x-3">
              {/* Icon */}

              <span className="text-xl font-bold leading-tight text-blue ">
                Doctors :{" "}
                <span className="text-lg font-normal ">
                  {hospital?.doctors}
                </span>
                {/* {data.dob} */}
              </span>
            </li>

            <li className="flex space-x-3">
              {/* Icon */}

              <span className="text-xl font-bold leading-tight text-blue ">
                Beds :{" "}
                <span className="text-lg font-normal ">{hospital?.beds}</span>
                {/* {data.mobile} */}
              </span>
            </li>
            <li className="flex space-x-3">
              {/* Icon */}

              <span className="text-xl font-bold leading-tight text-blue ">
                Nurses :{" "}
                <span className="text-lg font-normal ">{hospital?.nurses}</span>
                {/* {data.email} */}
              </span>
            </li>
            <li className="flex space-x-3">
              <span className="text-xl font-bold leading-tight text-blue">
                Services:{" "}
                <span className="text-lg font-normal">{serviceNames}</span>
              </span>
            </li>
          </ul>
          {/* <button
            type="button"
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
          >
   
          </button> */}
        </div>
      </Link>
    </div>
  );
};

export default HospitalCard;
