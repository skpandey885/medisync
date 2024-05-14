import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./pages/App";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import About from "./pages/About";
import { createClient, WagmiConfig } from "wagmi";
import { Toaster } from "react-hot-toast";
import Contact from "./pages/Contact";
import Terms from "./components/Terms";

import FIP from "./pages/browse/VerifyStudents";
import HealthcareInitiatives from "./pages/others/HealthcareInitiatives";
import HealthcareConferences from "./pages/others/HealthcareConferences";
import BrowseHospitals from "./pages/browse/BrowseHospitals";
import BrowseServices from "./pages/browse/BrowseServices";

const root = ReactDOM.createRoot(document.getElementById("root"));
const client = createClient({
  autoConnect: true,
});

root.render(
  <>
    <WagmiConfig client={client}>
      <BrowserRouter>
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />

          <Route
            path="/availability/services-tracking"
            element={<BrowseServices />}
          />
          <Route path="/browse/hospitals" element={<BrowseHospitals />} />

          <Route path="/browse/doctors" element={<FIP/>} />
          <Route
            path="/availability/medicine-inventory"
            element={<FIP />}
          />

          <Route
            path="/others/healthcare/initiatives"
            element={<HealthcareInitiatives />}
          />
          <Route
            path="/others/healthcare/conferences"
            element={<HealthcareConferences />}
          />


          <Route path="/Terms" element={<Terms />} />

          <Route path="/Contact" element={<Contact />} />

          <Route path="/About" element={<About />} />
          {/* Pending : Individual pages to display single student or college */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </WagmiConfig>
  </>
);
