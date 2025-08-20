import React from "react";
import {useNavigate} from "react-router-dom";
export default function Hero() {
  const navigate =useNavigate();
  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-center px-6">
      <h2 className="text-5xl md:text-6xl mb-2 font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
        Building Your Digital Presence 
      </h2>
      <p className="mt-4 text-lg md:text-xl text-gray max-w-2xl">
        Building modern, responsive, and engaging websites for businesses,individuals,
        schools, and startups. 🚀
      </p>
      <button onClick= {()=> navigate("/contact")} className="cursor-pointer mt-6 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
        Get Started
      </button>
    </section>
  );
}
