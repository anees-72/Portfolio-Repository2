import { Target, Eye } from "lucide-react";
import {Link} from "react-router-dom";

export default function About() {
  return (
    <main className="flex-1 bg-gray-50 px-6 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          About MRA Web Developers
        </h2>
        <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
          Founded by <span className="font-semibold text-slate-800">Malik Anees</span>, 
          MRA Web Developers is  dedicated to building impactful 
          digital solutions. We focus on creating portfolio websites that help 
          individuals and businesses showcase their presence online, and powerful tools 
          that make the lives of business and working professionals simpler and more efficient.
        </p>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Mission */}
          <div className="relative bg-white shadow-lg rounded-2xl p-6 animate-pulse hover:animate-none hover:shadow-indigo-300 transition-shadow">
            <Target className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800">Our Mission</h3>
            <p className="text-slate-600 mt-2">
              To empower individuals and businesses with modern websites and tools 
              that enhance their online identity and improve daily productivity. 
              Whether it’s a personal portfolio or a professional tool, we design with purpose.
            </p>
          </div>

          {/* Vision */}
          <div className="relative bg-white shadow-lg rounded-2xl p-6 animate-pulse hover:animate-none hover:shadow-indigo-300 transition-shadow">
            <Eye className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800">Our Vision</h3>
            <p className="text-slate-600 mt-2">
              To build a community-driven digital ecosystem where creativity meets 
              professionalism — making it easier for entrepreneurs, businesses, 
              and professionals to thrive in the modern web era.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12">
          <Link
            to="/features"
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
          >
            Explore Our Features
          </Link>
        </div>
      </div>
    </main>
  );
}
