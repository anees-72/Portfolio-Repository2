import React, { useRef, useState, useEffect } from "react";
import { Phone, Facebook, Globe } from "lucide-react";
import emailjs from "emailjs-com";

export default function Contact() {
  const form = useRef();
  const [notification, setNotification] = useState(null);

  
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_PUBLIC_KEY
      )
      .then(
        () => {
          setNotification({
            type: "success",
            message: "Message sent successfully! We will respond shortly.",
          });
          form.current.reset();
        },
        () => {
          setNotification({
            type: "error",
            message: "Failed to send message. Please try again later.",
          });
        }
      );
  };

  
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-white to-blue-500 flex items-center justify-center px-6 py-16">
      <div className="max-w-5xl w-full">
        
        
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Get In Touch!
        </h1>

       
        {notification && (
          <div
            className={`mb-8 mx-auto max-w-lg p-4 rounded-2xl shadow-lg backdrop-blur-md bg-white/30 border ${
              notification.type === "success"
                ? "border-green-400 text-green-700"
                : "border-red-400 text-red-700"
            } text-center font-medium`}
          >
            {notification.message}
          </div>
        )}

       
        <div className="grid md:grid-cols-2 gap-10">
          
         
          <div className="bg-white/20 backdrop-blur-md shadow-lg rounded-2xl p-8 text-gray">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form ref={form} onSubmit={sendEmail} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full p-3 rounded-lg bg-white/30 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full p-3 rounded-lg bg-white/30 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                required
                className="w-full p-3 rounded-lg bg-white/30 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
              >
                Send Message
              </button>
            </form>
          </div>

         
          <div className="bg-white/20 backdrop-blur-md shadow-lg rounded-2xl p-8 text-gray h-fit">
            <h2 className="text-2xl font-bold mb-6">Reference Links</h2>
            <ul className="space-y-6">
              <li className="flex items-center space-x-4">
                <a
                  href="https://wa.me/923102932433"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 hover:underline cursor-pointer"
                >
                  <Phone className="text-green-400" />
                  <span>WhatsApp: MRA Web Developers</span>
                </a>
              </li>
              <li className="flex items-center space-x-4">
                <Facebook className="text-blue-500" />
                <a
                  href="https://web.facebook.com/profile.php?id=61579605622019"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  MRA Web Developers
                </a>
              </li>
              <li className="flex items-center space-x-4">
                <Globe className="text-pink-400" />
                <a
                  href="https://aneesali-beta.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Malik Anees
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
