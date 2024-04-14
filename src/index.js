import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./pages/App";
import BrowseCollegesPage from "./pages/browse/BrowseHospitals";
import BrowseStudentPage from "./pages/browse/BrowseStudentPage";
import VerifyStudents from "./pages/browse/VerifyStudents";
import RegisterCollegePage from "./pages/register/RegisterCollegePage";
import RegisterStudentPage from "./pages/register/RegisterStudentPage";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import About from "./pages/About";
import { createClient, WagmiConfig } from "wagmi";
import { Toaster } from "react-hot-toast";

import VerifyStudentDetail from "./pages/VerifyStudentDetail";
import StudentDetail from "./pages/StudentDetail";
import Contact from "./pages/Contact";
import Terms from "./components/Terms";
import Verifycard from "./components/Verifycard";

import AddAdminPage from "./pages/browse/AddAdminPage";
import UpdateStudentDetail from "./pages/UpdateStudentDetail";
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
          <Route path="/browse/doctors" element={<BrowseStudentPage />} />
          <Route
            path="/availability/services-tracking"
            element={<BrowseServices />}
          />
          <Route path="/browse/hospitals" element={<BrowseHospitals />} />
          <Route
            path="/availability/medicine-inventory"
            element={<VerifyStudents />}
          />
          <Route path="/register/student" element={<RegisterStudentPage />} />
          <Route path="/register/college" element={<RegisterCollegePage />} />
          <Route path="/register/college" element={<RegisterCollegePage />} />
          <Route
            path="/others/healthcare/initiatives"
            element={<HealthcareInitiatives />}
          />
          <Route
            path="/others/healthcare/conferences"
            element={<HealthcareConferences />}
          />

          <Route path="/browse/add-admin" element={<AddAdminPage />} />

          <Route path="/Terms" element={<Terms />} />

          <Route path="/Contact" element={<Contact />} />
          <Route path="/browse/students/:id" element={<StudentDetail />} />
          <Route path="/browse/verify/:id" element={<VerifyStudentDetail />} />
          <Route path="/update/:id" element={<UpdateStudentDetail />} />
          <Route path="/About" element={<About />} />
          {/* Pending : Individual pages to display single student or college */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </WagmiConfig>
  </>
);
