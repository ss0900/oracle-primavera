import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Company from "./pages/Company";
import TimeManagementPage from "./pages/TimeManagementPage";
import PPM from "./pages/PPM";
import EPPM from "./pages/EPPM";
import OPC from "./pages/OPC";
import Unifier from "./pages/Unifier";
import Aconex from "./pages/Aconex";
import Contact from "./components/Contact";

import CompanyIntro from "./pages/company/Intro";
import CompanyCEO from "./pages/company/CEO";
import CompanyOrganization from "./pages/company/Organization";
import CompanyHistory from "./pages/company/History";
import CompanyPR from "./pages/company/PR";


import PPMPage from "./pages/PPMPage";

import EPPMPage from "./pages/EPPMPage";

import OPCPage from "./pages/OPCPage";

import UnifierPage from "./pages/UnifierPage";

import AconexPage from "./pages/AconexPage";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Loader isLoading={isLoading} />
      <ScrollToTop />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/company" element={<Company />} />
        <Route path="/company/intro" element={<CompanyIntro />} />
        <Route path="/company/ceo" element={<CompanyCEO />} />
        <Route path="/company/organization" element={<CompanyOrganization />} />
        <Route path="/company/history" element={<CompanyHistory />} />
        <Route path="/company/pr" element={<CompanyPR />} />

        <Route path="/time-management" element={<TimeManagementPage />} />
        <Route path="/time-management/:sectionId" element={<TimeManagementPage />} />
        <Route path="/time-management/:sectionId/:subId" element={<TimeManagementPage />} />

        <Route path="/ppm" element={<PPMPage />} />
        <Route path="/ppm/:sectionId" element={<PPMPage />} />
        <Route path="/ppm/:sectionId/:subId" element={<PPMPage />} />

        <Route path="/eppm" element={<EPPMPage />} />
        <Route path="/eppm/:sectionId" element={<EPPMPage />} />
        <Route path="/eppm/:sectionId/:subId" element={<EPPMPage />} />

        <Route path="/opc" element={<OPCPage />} />
        <Route path="/opc/:sectionId" element={<OPCPage />} />
        <Route path="/opc/:sectionId/:subId" element={<OPCPage />} />

        <Route path="/unifier" element={<UnifierPage />} />
        <Route
          path="/unifier/modules"
          element={<Navigate to="/unifier/functions/1" replace />}
        />
        <Route path="/unifier/:sectionId" element={<UnifierPage />} />
        <Route path="/unifier/:sectionId/:subId" element={<UnifierPage />} />

        <Route path="/aconex" element={<AconexPage />} />
        <Route
          path="/aconex/features"
          element={<Navigate to="/aconex/functions/1" replace />}
        />
        <Route path="/aconex/:sectionId" element={<AconexPage />} />
        <Route path="/aconex/:sectionId/:subId" element={<AconexPage />} />

        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
