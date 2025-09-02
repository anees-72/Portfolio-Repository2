import { ExternalLink } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "MRA Compressor",
      description:
        "A secure and fast client-side image & PDF compression tool designed to preserve quality while reducing size.",
      image: "/compressor1.PNG",
      tech: ["React", "Tailwind", "Express.js","Node.js"],
      link: "https://mracompressor.vercel.app",
    },
    {
      id: 2,
      title: "MRA Website",
      description:
        "Official website for MRA Web Developers showcasing services, portfolio, and a modern responsive design.",
      image: "/site1.PNG",
      tech: ["MERN", "Tailwind", "Framer Motion"],
      link: "https://mrawebdevelopers.vercel.app",
    },
    {
      id: 3,
      title: "Resume Builder",
      description:
        "A Django-based web app that allows users to build and download professional resumes instantly.",
      image: "/resumebuilder.PNG",
      tech: ["Django", "Bootstrap", "SQLite"],
      link: "https://resumebuilder-lake-beta.vercel.app",
    },
    {
        id: 4,
        title: "Task Manager",
        description:
            "A full-stack task management app to organize, prioritize, and track daily tasks efficiently.",
        image: "/images/project4.jpg",
        tech: ["HTML", "CSS", "Flask"],
        link: "https://taskmanager-tau-eight.vercel.app",
    }
  ];

  return (
    <section className="relative bg-gray-950 text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl mt-5 sm:text-5xl font-bold text-emerald-400 mb-6">
          <span class="text-white">Featured</span> Projects
        </h2>
        <p className="text-lg text-gray-400">
          A collection of projects that showcase my skills in full-stack
          development, problem-solving, and delivering real-world solutions.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group bg-gray-900 border-2 border-emerald-400 rounded-xl overflow-hidden shadow-lg hover:border-yellow-400 transition-all duration-300"
          >
            {/* Project Image */}
            <div className="overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Project Details */}
            <div className="p-6 flex flex-col justify-between h-56">
              <h3 className="text-xl font-semibold text-white mb-2">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 bg-gray-800 text-emerald-300 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* View Project */}
              <a
                href={project.link}
                className="inline-flex items-center text-sm text-emerald-400 hover:text-yellow-400 transition-colors"
              >
                View Project <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
