import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Skills", to: "/skills" },
    { name: "Projects", to: "/projects" },
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
         
          <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
            <Link to="/">Malik Anees</Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 font-medium cursor-pointer"
              >
                <Link to={link.to}>{link.name}</Link>
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-400 text-black font-semibold rounded-xl shadow-lg flex gap-2 hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105">
              <FileText className="w-5 h-5 text-white" /><a href="/Resume.pdf" download >Download Resume</a>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-emerald-400 transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700/50">
            <div className="flex flex-col space-y-4 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-300 font-medium cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  <Link to={link.to}>{link.name}</Link>
                </a>
              ))}
              <button className="mt-4 px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-400 text-gray-300 font-semibold rounded-xl shadow-lg self-start">
                Download Resume
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;