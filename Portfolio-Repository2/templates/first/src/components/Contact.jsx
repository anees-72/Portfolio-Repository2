import { Mail, Phone, MapPin, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useRef,useState } from "react";

export default function Contact() {
  const form = useRef();
  const [message, setMessage] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, form.current, import.meta.env.VITE_PUBLIC_KEY)
      .then((result) => {
        console.log(result.text);
        form.current.reset();
        setMessage("You message has been received. I will get back to you soon. Thank you!" )
        setTimeout(() => {
          setMessage("");
        },4000)
      })
      .catch((error) => {
        console.log(error.text);
        setMessage("An error occurred, please try again later.")
        form.current.reset();
        setTimeout(() => {
          setMessage("");
        }, 4000)
      })
  }
  return (
    <section className="relative bg-gray-950 text-white py-20 px-6">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-emerald-400 mb-6">
          Get in Touch
        </h2>
        <p className="text-lg text-gray-400">
          Have a project idea, collaboration opportunity, or just want to say hi?  
          Fill out the form below or reach me directly through the provided channels.
        </p>
      </div>

      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        
        <form ref={form} onSubmit={handleSubmit} className="bg-gray-900 rounded-xl shadow-lg p-8 border-2 border-emerald-400 hover:border-yellow-400 transition-colors duration-300 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
            <textarea
              rows="4"
              name="message"
              placeholder="Write your message..."
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white font-semibold rounded-lg hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105"
          >
            <span>Send Message</span>
            <Send className="w-4 h-4" />
          </button>
        </form>

        
        <div className="flex flex-col justify-center space-y-8">
          <div className="flex items-center space-x-4 bg-gray-900 p-5 rounded-lg border border-gray-800 hover:border-emerald-400 transition">
            <Mail className="w-6 h-6 text-emerald-400" />
            <div>
              <h4 className="text-lg font-semibold">Email</h4>
              <p className="text-gray-400">malikanees.developer@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-gray-900 p-5 rounded-lg border border-gray-800 hover:border-emerald-400 transition">
            <Phone className="w-6 h-6 text-emerald-400" />
            <div>
              <h4 className="text-lg font-semibold">Whatsapp</h4>
              <p className="text-gray-400">+92 302 8860515</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-gray-900 p-5 rounded-lg border border-gray-800 hover:border-emerald-400 transition">
            <MapPin className="w-6 h-6 text-emerald-400" />
            <div>
              <h4 className="text-lg font-semibold">Location</h4>
              <p className="text-gray-400">Wah, Pakistan</p>
            </div>
          </div>
        </div>
      </div>
      {message && (
      <div className="absolute inset-0 flex items-center justify-center bg-gray/50 backdrop-blur-md">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg border border-emerald-400 transition hover:border-yellow-300">
      <h1 className="text-xl font-bold">{message}</h1>
      </div>
      </div>
       )}
    </section>
    
  );
}
