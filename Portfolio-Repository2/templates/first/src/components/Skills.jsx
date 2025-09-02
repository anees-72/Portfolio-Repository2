import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiDjango,
  SiFlask,
  SiMongodb,
  SiMysql,
  SiGit,
  SiDocker,
  SiVercel,
} from "react-icons/si";

export default function Skills() {
  const skills = [
    // Frontend
    { name: "HTML5", level: "Advanced", icon: <SiHtml5 className="text-orange-500 w-6 h-6" /> },
    { name: "CSS3", level: "Advanced", icon: <SiCss3 className="text-blue-500 w-6 h-6" /> },
    { name: "JavaScript (ES6+)", level: "Advanced", icon: <SiJavascript className="text-yellow-400 w-6 h-6" /> },
    { name: "React.js", level: "Advanced", icon: <SiReact className="text-sky-400 w-6 h-6" /> },
    { name: "Tailwind CSS", level: "Advanced", icon: <SiTailwindcss className="text-cyan-400 w-6 h-6" /> },

    // Backend
    { name: "Node.js", level: "Intermediate", icon: <SiNodedotjs className="text-green-500 w-6 h-6" /> },
    { name: "Express.js", level: "Intermediate", icon: <SiExpress className="text-gray-400 w-6 h-6" /> },
    { name: "Django", level: "Intermediate", icon: <SiDjango className="text-green-700 w-6 h-6" /> },
    { name: "Flask", level: "Intermediate", icon: <SiFlask className="text-gray-300 w-6 h-6" /> },

    // Databases
    { name: "MongoDB", level: "Intermediate", icon: <SiMongodb className="text-green-400 w-6 h-6" /> },
    { name: "MySQL", level: "Basic", icon: <SiMysql className="text-blue-400 w-6 h-6" /> },

    // Tools & Others
    { name: "Git & GitHub", level: "Advanced", icon: <SiGit className="text-red-500 w-6 h-6" /> },
    { name: "Docker", level: "Basic", icon: <SiDocker className="text-blue-500 w-6 h-6" /> },
    { name: "Vercel", level: "Intermediate", icon: <SiVercel className="text-white w-6 h-6" /> },
  ];

  return (
    <section className="min-h-screen text-white flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-6xl w-full">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
          My <span className="text-emerald-400">Skills</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Here’s a quick overview of the technologies and tools I use to build
          modern, scalable, and user-friendly applications.
        </p>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-gray-800/50 border border-emerald-400 hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 flex items-center space-x-4"
            >
              {skill.icon}
              <div>
                <h3 className="text-lg font-semibold">{skill.name}</h3>
                <p className="text-sm text-gray-400">{skill.level}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
