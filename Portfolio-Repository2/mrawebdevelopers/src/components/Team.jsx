import React from "react";
import { User } from "lucide-react";

export default function Team() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-white to-blue-500 flex flex-col items-center px-6 py-16">
      
      <h1  className="text-4xl font-bold text-gray-600 mb-12 mt-10">Meet Our Team</h1>

      
      <div className="relative flex flex-col items-center">
        <div className="bg-white/20 backdrop-blur-md shadow-lg rounded-2xl p-6 w-72 text-center">
          <User className="w-16 h-16 mx-auto text-blue-500" />
          <h2 className="text-xl font-semibold mt-4">Malik Anees</h2>
          <p className="text-gray-700">Founder & Lead Developer</p>
          <p className="text-gray-600 text-sm mt-2">
            Internationally trained developer passionate about empowering
            businesses with a strong online presence.
          </p>
        </div>

        
        <div className="w-1 h-12 bg-gray-400"></div>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        
        <div className="bg-white/20 backdrop-blur-md shadow-lg rounded-2xl p-6 w-64 text-center">
          <User className="w-12 h-12 mx-auto text-pink-500" />
          <h3 className="text-lg font-semibold mt-4">Shehryar Ali Khan</h3>
          <p className="text-gray-700">UI/UX Designer</p>
        </div>

        <div className="bg-white/20 backdrop-blur-md shadow-lg rounded-2xl p-6 w-64 text-center">
          <User className="w-12 h-12 mx-auto text-green-500" />
          <h3 className="text-lg font-semibold mt-4">Hassam Ali Mirza</h3>
          <p className="text-gray-700">Media Manager</p>
        </div>

       
        <div className="bg-white/20 backdrop-blur-md shadow-lg rounded-2xl p-6 w-64 text-center">
          <User className="w-12 h-12 mx-auto text-purple-500" />
          <h3 className="text-lg font-semibold mt-4">Hannan Abdullah</h3>
          <p className="text-gray-700">Front End Designer</p>
        </div>
      </div>
    </div>
  );
}
