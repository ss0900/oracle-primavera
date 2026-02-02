import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Loader from './components/Loader'
import Home from './pages/Home'
import Company from './pages/Company'
import TimeManagement from './pages/TimeManagement'
import PPM from './pages/PPM'
import EPPM from './pages/EPPM'
import OPC from './pages/OPC'
import Unifier from './pages/Unifier'
import Aconex from './pages/Aconex'
import Contact from './components/Contact'

import CompanyIntro from './pages/company/Intro'
import CompanyCEO from './pages/company/CEO'
import CompanyOrganization from './pages/company/Organization'
import CompanyHistory from './pages/company/History'
import CompanyPR from './pages/company/PR'

import TimeManagementOverview from './pages/time-management/Overview'
import TimeManagementFeatures from './pages/time-management/Features'
import TimeManagementCases from './pages/time-management/Cases'

import PPMOverview from './pages/ppm/Overview'
import PPMFeatures from './pages/ppm/Features'
import PPMBenefits from './pages/ppm/Benefits'

import EPPMOverview from './pages/eppm/Overview'
import EPPMSolution from './pages/eppm/Solution'
import EPPMCases from './pages/eppm/Cases'

import OPCOverview from './pages/opc/Overview'
import OPCCore from './pages/opc/Core'
import OPCApplication from './pages/opc/Application'

import UnifierOverview from './pages/unifier/Overview'
import UnifierModules from './pages/unifier/Modules'
import UnifierCustomers from './pages/unifier/Customers'

import AconexOverview from './pages/aconex/Overview'
import AconexFeatures from './pages/aconex/Features'
import AconexProjects from './pages/aconex/Projects'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Router>
      <Loader isLoading={isLoading} />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/company" element={<Company />} />
        <Route path="/company/intro" element={<CompanyIntro />} />
        <Route path="/company/ceo" element={<CompanyCEO />} />
        <Route path="/company/organization" element={<CompanyOrganization />} />
        <Route path="/company/history" element={<CompanyHistory />} />
        <Route path="/company/pr" element={<CompanyPR />} />

        <Route path="/time-management" element={<Navigate to="/time-management/overview" replace />} />
        <Route path="/time-management/overview" element={<TimeManagementOverview />} />
        <Route path="/time-management/features" element={<TimeManagementFeatures />} />
        <Route path="/time-management/cases" element={<TimeManagementCases />} />

        <Route path="/ppm" element={<Navigate to="/ppm/overview" replace />} />
        <Route path="/ppm/overview" element={<PPMOverview />} />
        <Route path="/ppm/features" element={<PPMFeatures />} />
        <Route path="/ppm/benefits" element={<PPMBenefits />} />

        <Route path="/eppm" element={<Navigate to="/eppm/overview" replace />} />
        <Route path="/eppm/overview" element={<EPPMOverview />} />
        <Route path="/eppm/solution" element={<EPPMSolution />} />
        <Route path="/eppm/cases" element={<EPPMCases />} />

        <Route path="/opc" element={<Navigate to="/opc/overview" replace />} />
        <Route path="/opc/overview" element={<OPCOverview />} />
        <Route path="/opc/core" element={<OPCCore />} />
        <Route path="/opc/application" element={<OPCApplication />} />

        <Route path="/unifier" element={<Navigate to="/unifier/overview" replace />} />
        <Route path="/unifier/overview" element={<UnifierOverview />} />
        <Route path="/unifier/modules" element={<UnifierModules />} />
        <Route path="/unifier/customers" element={<UnifierCustomers />} />

        <Route path="/aconex" element={<Navigate to="/aconex/overview" replace />} />
        <Route path="/aconex/overview" element={<AconexOverview />} />
        <Route path="/aconex/features" element={<AconexFeatures />} />
        <Route path="/aconex/projects" element={<AconexProjects />} />

        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </Router>
  )
}

export default App
