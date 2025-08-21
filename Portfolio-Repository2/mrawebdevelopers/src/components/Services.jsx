import React from "react";
import {
  Briefcase,
  User,
  Code,
  Palette,
  RefreshCw,
} from "lucide-react"; 

export default function Services() {
  const services = [
    {
      title: "Business Websites",
      description:
        "Custom websites for small businesses, shops, schools, and organizations to build their online presence.",
      icon: <Briefcase className="w-10 h-10 text-pink-500 mb-4 mx-auto" />, // pink
    },
    {
      title: "Personal Portfolio Websites",
      description:
        "Modern portfolio sites for professionals, freelancers, and students to showcase skills and achievements.",
      icon: <User className="w-10 h-10 text-green-500 mb-4 mx-auto" />, // green
    },
    {
      title: "Custom-Built Websites",
      description:
        "Tailored web solutions designed from scratch to meet your unique requirements and goals.",
      icon: <Code className="w-10 h-10 text-blue-500 mb-4 mx-auto" />, // blue
    },
    {
      title: "UI/UX Design",
      description:
        "Clean, engaging, and user-friendly designs to provide the best experience for your visitors.",
      icon: <Palette className="w-10 h-10 text-purple-500 mb-4 mx-auto" />, // purple
    },
    {
      title: "Website Redesign & Optimization",
      description:
        "Upgrade outdated websites with modern design, improved performance, responsiveness, and SEO.",
      icon: <RefreshCw className="w-10 h-10 text-orange-500 mb-4 mx-auto" />, // orange
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-white to-blue-500 py-16 px-6">
      <h2 className="text-4xl font-bold text-center text-gray-600 mb-12 mt-10">
        Our Services
      </h2>
      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white/20 backdrop-blur-md rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 text-center"
          >
            {service.icon}
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {service.title}
            </h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
