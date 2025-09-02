import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Skills from "./components/Skills";
import About from "./components/About";
import Contact from "./components/Contact";
import Projects from "./components/Projects";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "./components/PageWrapper";


function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait"> 
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/skills" element={<PageWrapper><Skills /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <div className="relative font-sans min-h-screen overflow-hidden bg-gray-950">        
      <div className="relative z-10">
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </div>
    </div>
  );
}

export default App;
