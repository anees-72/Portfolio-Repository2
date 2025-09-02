import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import VantaBackground from "../components/VantaBackground"; 

const Home = () => {
  return (
    <section className="w-full min-h-screen relative flex flex-col-reverse lg:flex-row justify-center items-center pt-24 px-6 overflow-hidden">
      <div className="absolute inset-0">
      <VantaBackground />
      </div>
      
      <div className="relative z-10 flex flex-col-reverse lg:flex-row justify-center items-center w-full">
          <div className="lg:w-1/2 flex flex-col justify-center items-center lg:items-start space-y-6 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
              Malik Anees
            </span>
            <br />
            <span className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-300">
              <Typewriter
                words={[
                  "UI/UX Designer",
                  "Freelancer",
                  "Full Stack Web Developer",
                  "Digital Artist",
                ]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={100}
                deleteSpeed={60}
                delaySpeed={2000}
              />
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed">
            I create stunning digital experiences that captivate and inspire. 
            Let's build something amazing together.
          </p>

          <div className="flex flex-col lg:flex-row gap-4 pt-4">
            <Link
              to="/projects"
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-400 text-black font-semibold rounded-2xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105"
            >
              View Projects
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border-2 border-emerald-500 text-emerald-400 rounded-2xl font-semibold hover:bg-emerald-500/10 transition-all duration-300 transform hover:scale-105"
            >
              Contact Me
            </Link>
          </div>
        </div>

        
        <div className="lg:w-1/2 flex justify-center mb-12 lg:mb-0">
          <div className="relative">
            <div className="absolute -inset-8 bg-gradient-to-r from-emerald-500/20 via-green-400/30 to-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400/15 to-green-300/15 rounded-2xl blur-2xl"></div>

            <img
              src="/aneesalistyled.png"
              alt="Portfolio"
              className="relative w-80 sm:w-96 lg:w-80 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
