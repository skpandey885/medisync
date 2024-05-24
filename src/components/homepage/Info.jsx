import React from "react";
import { GiMagnifyingGlass, GiMedicines } from "react-icons/gi";
import {
  MdIntegrationInstructions,
  MdLightbulb,
  MdMedicalServices,
  MdSchedule,
} from "react-icons/md";

const Info = () => {
  return (
    <section className="py-12 bg-white dark:bg-main-dark-bg">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight text-center md:text-4xl">
          Our Features
        </h2>
        <p className="mt-4 text-lg text-center text-gray-600">
          Unlock a world of streamlined healthcare access and transparency
          through our cutting-edge features
        </p>
        <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="flex flex-col items-center justify-center p-8 space-y-4 bg-gray-100 rounded-xl">
            <div className="p-3 text-white bg-blue-500 rounded-full">
              <GiMedicines size={40} />
            </div>
            <h4 className="text-xl font-medium text-center text-gray-700">
              Medicine Availability Tracking
            </h4>
            <p className="text-base text-center text-gray-500">
              Ensures up-to-date information on medicine availability through
              real-time tracking.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-8 space-y-4 bg-gray-100 rounded-xl">
            <div className="p-3 text-white bg-blue-500 rounded-full">
              <MdSchedule size={40} />
            </div>
            <h4 className="text-xl font-medium text-center text-gray-700">
              Doctor Scheduling and Appointment Booking
            </h4>
            <p className="text-base text-center text-gray-500">
              Facilitates seamless scheduling and booking of doctor appointments
              for efficient healthcare management.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-8 space-y-4 bg-gray-100 rounded-xl">
            <div className="p-3 text-white bg-blue-500 rounded-full">
              <GiMagnifyingGlass size={40} />
            </div>
            <h4 className="text-xl font-medium text-center text-gray-700">
              Transparent Billing System
            </h4>
            <p className="text-base text-center text-gray-500">
              Implements a transparent billing system to provide clarity and
              accountability in healthcare expenses.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-8 space-y-4 bg-gray-100 rounded-xl">
            <div className="p-3 text-white bg-blue-500 rounded-full">
              <MdMedicalServices size={40} />
            </div>
            <h4 className="text-xl font-medium text-center text-gray-700">
              Comprehensive Service Catalogue
            </h4>
            <p className="text-base text-center text-gray-500">
              Offers a comprehensive catalogue of healthcare services to meet
              diverse needs effectively.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-8 space-y-4 bg-gray-100 rounded-xl">
            <div className="p-3 text-white bg-blue-500 rounded-full">
              <MdLightbulb size={40} />
            </div>
            <h4 className="text-xl font-medium text-center text-gray-700">
              Tailored Healthcare Awareness Section
            </h4>
            <p className="text-base text-center text-gray-500">
              Provides a personalized healthcare awareness section to educate
              and empower users with relevant information.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-8 space-y-4 bg-gray-100 rounded-xl">
            <div className="p-3 text-white bg-blue-500 rounded-full">
              <MdIntegrationInstructions size={40} />
            </div>
            <h4 className="text-xl font-medium text-center text-gray-700">
              Telemedicine Integration
            </h4>
            <p className="text-base text-center text-gray-500">
              Integrates telemedicine services for convenient access to
              healthcare professionals remotely.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;
