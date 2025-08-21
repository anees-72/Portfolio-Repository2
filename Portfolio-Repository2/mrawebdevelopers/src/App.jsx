import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "./components/PageWrapper";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import Team from "./components/Team";
import About from "./components/About"; 
import Services from "./components/Services";  
import ParticlesBackground from "./components/ParticlesBackground";
import Shapes from "./components/Shapes";


function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Hero /></PageWrapper>} />
        <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/team" element={<PageWrapper><Team /></PageWrapper>}></Route>
      </Routes>
    </AnimatePresence>
  )
}
export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-gradient-to-br pb-16 md:pb-0 from-pink-500 via-white to-blue-500 overflow-hidden [perspective:1000px]">
        <ParticlesBackground />
        <Shapes />
        <Navbar />
        <AnimatedRoutes />
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 text-center text-lg text-black-500 mt-10 py-2 bg-transparent">
            © 2025 MRA Web Developers. All rights reserved.
        </div>
      </div>
    </Router>
  );
}
