import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
        <Route path="/time-management" element={<TimeManagement />} />
        <Route path="/ppm" element={<PPM />} />
        <Route path="/eppm" element={<EPPM />} />
        <Route path="/opc" element={<OPC />} />
        <Route path="/unifier" element={<Unifier />} />
        <Route path="/aconex" element={<Aconex />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </Router>
  )
}

export default App
