import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./pages/App";

import { Toaster } from "react-hot-toast";
import { createClient, WagmiConfig } from "wagmi";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Terms from "./components/Terms";
import { AuthProvider } from "./contexts/authContext";
import About from "./pages/About";
import Dashboard from "./pages/Admin/Dashboard";
import { default as Utilitytest } from "./pages/Admin/Utilitytest";
import BrowseHospitals from "./pages/browse/BrowseHospitals";
import BrowseServices from "./pages/browse/BrowseServices";
import FIP from "./pages/browse/VerifyStudents";
import Contact from "./pages/Contact";
import HealthcareConferences from "./pages/others/HealthcareConferences";
import HealthcareInitiatives from "./pages/others/HealthcareInitiatives";
import NotAuthorized from "./utils/NotAuthorized";
import ProtectedRoute from "./utils/ProtectedRoute";
import HospitalInformation from "./components/HospitalInformation";
const root = ReactDOM.createRoot(document.getElementById("root"));
const client = createClient({
  autoConnect: true,
});

root.render(
  <>
    <WagmiConfig client={client}>
      <AuthProvider>
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
            <Route
              path="/view/hospital/:id"
              element={<HospitalInformation />}
            ></Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/browse/doctors" element={<FIP />} />
            <Route path="/availability/medicine-inventory" element={<FIP />} />

            <Route
              path="/others/healthcare/initiatives"
              element={<HealthcareInitiatives />}
            />
            <Route
              path="/others/healthcare/conferences"
              element={<HealthcareConferences />}
            />

            <Route path="/not-authorized" element={<NotAuthorized />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/admin/utils" element={<Utilitytest />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
            </Route>

            <Route path="/Terms" element={<Terms />} />

            <Route path="/Contact" element={<Contact />} />

            <Route path="/About" element={<About />} />
            {/* Pending : Individual pages to display single student or college */}
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </WagmiConfig>
  </>
);
