import { Image, FileText, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function Features() {
  const features = [
    {
      icon: <Image className="w-8 h-8 text-indigo-600" />,
      title: "Image Compression",
      desc: "Reduce image file sizes (JPG, PNG, WebP) without losing quality.",
    },
    {
      icon: <FileText className="w-8 h-8 text-indigo-600" />,
      title: "PDF Compression",
      desc: "Compress PDFs for faster sharing while keeping formatting intact.",
    },
    {
      icon: <Shield className="w-8 h-8 text-indigo-600" />,
      title: "Secure & Private",
      desc: "Files are processed securely and never stored permanently.",
    },
    {
      icon: <Zap className="w-8 h-8 text-indigo-600" />,
      title: "Fast & Free",
      desc: "Quick compression at no cost — always available online.",
    },
  ];

  return (
    <main className="flex-1 bg-gray-50 px-6 py-12">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Powerful Features at Your Fingertips
        </h2>
        <p className="text-slate-600 mb-12 max-w-2xl mx-auto">
          Our compression tools are designed to save you time, storage, and bandwidth — 
          without sacrificing quality.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-6 bg-white shadow-md rounded-2xl hover:shadow-lg transition"
            >
              {f.icon}
              <h3 className="text-xl font-semibold text-slate-800 mt-4">{f.title}</h3>
              <p className="text-slate-600 mt-2">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-12">
          <Link
            to="/"
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
          >
            Start Compressing
          </Link>
        </div>
      </div>
    </main>
  );
}
