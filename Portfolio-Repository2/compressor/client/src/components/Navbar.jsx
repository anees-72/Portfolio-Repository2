import { useState } from "react";
import { Menu, X , Shrink} from "lucide-react";
import {Link} from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-gray-50/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold tracking-tight text-indigo-600">
          <Shrink className="inline w-7 h-7 mr-2 text-indigo-600" />
          MRA <span className="text-slate-800">Compressor</span>
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-slate-700 font-medium">
          <Link to="/features" className="hover:text-indigo-600 transition-colors">
            Features
          </Link>
          <Link to="/about" className="hover:text-indigo-600 transition-colors">
            About
          </Link>
          <Link to="/contact" className="hover:text-indigo-600 transition-colors">
            Contact
          </Link>
        </nav>

        {/* CTA Desktop */}
        <div className="hidden md:block">
          <Link to="/">
          <button className="ml-6 px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition">
            Get Started
          </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-200 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6 text-slate-800" /> : <Menu className="w-6 h-6 text-slate-800" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-inner px-6 py-4 space-y-4 text-slate-700 font-medium">
          <Link to="/features" className="block hover:text-indigo-600 transition-colors">
            Features
          </Link>
          <Link to="/about" className="block hover:text-indigo-600 transition-colors">
            About
          </Link>
          <Link to="/contact" className="block hover:text-indigo-600 transition-colors">
            Contact
          </Link>
          <Link to ="/">
          <button className="w-full px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition">
            Get Started
          </button>
          </Link>
        </div>
      )}
    </header>
  );
}
