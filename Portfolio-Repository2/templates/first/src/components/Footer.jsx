import { Linkedin, Facebook, Mail, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
const socialLinks = [
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "Facebook", href: "#", icon: Facebook },
    { name: "Gmail", href: "#", icon: Mail },
    { name: "WhatsApp", href: "#", icon: MessageCircle }
  ];
  return (
      <div className="w-full bg-transparent backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between items-center">
      
      {/* Left Side - Social Media */}
      <div className="flex items-center space-x-4 sm:space-x-6">
        <a href="https://linkedin.com/in/malikanees-dev" target="_blank" noreferrer noopener className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 cursor-pointer group">
          <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
        </a>
        <a href="https://web.facebook.com/profile.php?id=61578253004545" target="_blank" noreferrer noopener className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 cursor-pointer group">
          <Facebook className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
        </a>
        <a href="mailto:malikanees.developer@gmail.com" target="_blank" noreferrer noopener className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 cursor-pointer group">
          <Mail className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
        </a>
        <a href="https://wa.me/923028860515"  target="_blank" noreferrer noopener className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 cursor-pointer group">
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
        </a>
      </div>

      {/* Right Side - Copyright & CTA */}
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
        <span className="text-sm text-gray-500">© 2025 Malik Anees</span>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-400 text-black font-medium rounded-lg hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105">
          <Link to="/skills"><span className="text-sm">View Skills</span></Link>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</div>)};