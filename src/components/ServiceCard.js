import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  console.log(service);
  console.log(service.serviceName);
  return (
    <div>
      <Link state={service} to={`/browse/verify/${service?._id} `}>
        <div className="p-5 ml-[40px] my-[10px]  w-[400px] bg-white rounded-lg border shadow-md sm:p-8  ">
          <div className="flex items-baseline text-gray-900 ">
            <span className="text-3xl font-extrabold tracking-tight">
              {service?.serviceName}
            </span>
          </div>
          {/* List */}
          <ul role="list" className="space-y-5 my-7">
            <li className="flex space-x-3">
              {/* Icon */}

              <span className="text-xl font-bold leading-tight text-blue ">
                Service Identifier :{" "}
                <span className="text-lg font-normal">{service?.id}</span>
                {/* {data._id} */}
              </span>
            </li>
            <li className="flex space-x-3">
              {/* Icon */}

              <span className="text-xl font-bold leading-tight text-blue ">
                Department :{" "}
                <span className="text-lg font-normal ">
                  {service?.department}
                </span>
              </span>
            </li>
            <li className="flex space-x-3">
              {/* Icon */}

              <span className="text-xl font-bold leading-tight text-blue ">
                Description :{" "}
                <span className="text-lg font-normal ">
                  {service?.description}
                </span>
              </span>
            </li>

            <li className="flex space-x-3">
              <span className="text-xl font-bold leading-tight text-blue ">
                Reviews :{" "}
                <span className="text-lg font-normal ">{service?.reviews}</span>
              </span>
            </li>
          </ul>
          <button
            type="button"
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
          >
            Verify Student
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ServiceCard;
