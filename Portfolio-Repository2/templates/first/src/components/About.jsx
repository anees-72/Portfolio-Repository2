import { Code2, Briefcase, Clock, Layers } from "lucide-react";
import CountUp from "react-countup";


export default function About() {
  const stats = [
    { id: 1, icon: Briefcase, label: "Projects Completed", value: 10, suffix: "+" },
    { id: 2, icon: Clock, label: "Years Experience", value: 2, suffix: "+" },
    { id: 3, icon: Layers, label: "Technologies Used", value: 15, suffix: "+" },
    { id: 4, icon: Code2, label: "Lines of Code", value: 10000, suffix: "+" },
  ];

  return (
    <section className="relative z-10 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-emerald-400 mb-6 mt-5">
          About <span class="text-white">Me</span>
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed mb-6">
          I’m a passionate full-stack web developer with a strong background in
          modern web technologies. My journey started with rigorous online
          courses including <span className="text-emerald-400 font-semibold">Harvard CS50x</span>,
          <span className="text-emerald-400 font-semibold"> CS50 Web</span>, 
          <span className="text-emerald-400 font-semibold"> FreeCodeCamp Responsive Web Design</span>, 
          and <span className="text-emerald-400 font-semibold">Full Stack Open by University of Helsinki</span>.  
        </p>
        <p className="text-lg text-gray-300 leading-relaxed mb-6">
          To apply my knowledge, I founded <span className="text-emerald-400 font-semibold">MRA Web Developers</span>,
          a small web development agency where I’ve taken charge of the entire
          development process. My focus has always been on delivering quality,
          security, and modern design in every project.  
        </p>
        <p className="text-lg text-gray-300 leading-relaxed">
          Some of my notable projects include the
          <span className="text-emerald-400 font-semibold"> MRA Compressor</span>, a secure client-side
          image & PDF compression tool; the official
          <span className="text-emerald-400 font-semibold"> MRA Website</span> built on the MERN stack; 
          and a <span className="text-emerald-400 font-semibold">Resume Builder in Django</span>. 
          Each project has helped me refine my skills, build scalable solutions,
          and better understand user needs.
        </p>
      </div>

      {/* Stats Section */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="flex flex-col items-center justify-center p-6 border-2 border-emerald-400 rounded-2xl shadow-lg hover:border-yellow-400 transition-all duration-300 bg-gray-900/60 backdrop-blur"
          >
            <stat.icon className="w-10 h-10 text-emerald-400 mb-4" />
            <h3 className="text-3xl font-bold text-white">
              <CountUp end={stat.value} duration={7} suffix={stat.suffix} />
            </h3>
            <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

