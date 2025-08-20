import React from "react";
import { User, Target } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br bg-gradient-to-br from-pink-500 via-white to-blue-500

 py-16 px-6">
      <div className="max-w-5xl mx-auto space-y-16">
        <h2 className="text-4xl font-bold text-center text-gray-600 mb-12 mt-10">
        Founder and Mission
      </h2>
        
        <section className="bg-white/20 backdrop-blur-md rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8 text-white">
          <div className="flex-shrink-0 flex flex-col items-center">
            <img
              src="/malik.PNG"
              alt="Founder"
              className="w-35 h-40 rounded-full shadow-md mb-4"
            />
            <User className="text-blue-600" size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              About the Founder
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Hi, I’m <span className="font-semibold">Malik Anees</span>, the
              founder of <span className="font-semibold">MRA Web Developers</span>. 
              As an <span className="font-semibold">internationally trained</span> 
              web developer, I bring a blend of global best practices and 
              hands-on experience to deliver high-quality digital solutions.  
              My passion lies in helping individuals, startups, and businesses 
              establish their digital presence with modern, responsive, and 
              user-friendly websites. I believe that professional design and 
              technology should be accessible to everyone, no matter their size 
              or budget.
            </p>
          </div>
        </section>

       
        <section className="bg-white/20 backdrop-blur-md rounded-2xl shadow-lg p-8 flex  flex-col items-center gap-8 text-white">
          <Target className="text-pink-600 mx-auto mb-4" size={36} />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
            At <span className="font-semibold">MRA Web Developers</span>, our 
            mission is clear: to empower every individual and business — whether 
            small, medium, or large — with a strong and professional online 
            presence. We specialize in crafting custom-built websites that are 
            not only visually appealing but also highly functional and scalable.  
            We believe the internet should be a welcoming and professional space 
            for everyone, and we are committed to making that vision a reality by 
            combining creativity, technical expertise, and customer-focused values.
          </p>
        </section>
      </div>
    </div>
  );
}
