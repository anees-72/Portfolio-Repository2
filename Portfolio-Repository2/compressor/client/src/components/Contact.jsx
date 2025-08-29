import { Mail, Phone, Globe } from "lucide-react";
import {useState} from 'react';
import {sendContactForm} from '../api/contact'
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [response,setResponse] = useState("")
  const [loading,setLoading] = useState(false)
  const [showModel, setShowModel] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", message: ""})
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value})
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await sendContactForm(formData)
      if (data.success === true) {
        emailjs.send(
          import.meta.env.VITE_SERVICE_ID,
          import.meta.env.VITE_TEMPLATE_ID,
          formData,
          import.meta.env.VITE_PUBLIC_KEY
        )
      }
      setResponse("Your message has been recieved. We will get back to you shortly")
      setShowModel(true)
      setFormData({ name: "", email: "", message: ""})
    }
    catch(error){
      setResponse("Error sending message please try again later")
      setShowModel(true)
    }
    finally {
      setLoading(false)
    }
  }
  return (
    <main className="flex-1 bg-gray-50 px-6 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Contact Us</h2>
        <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
          Have a project idea, need a portfolio website, or want tools that 
          make professional life easier? Get in touch with{" "}
          <span className="font-semibold text-slate-800">MRA Web Developers</span>. 
          We’d love to hear from you!
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-6 text-left space-y-4">
          
          <div>
            <label className="block text-slate-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value= {formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-slate-700 font-medium mb-1">Message</label>
            <textarea
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message..."
              rows="4"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            ></textarea>
          </div>
          <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded text-white block mx-auto ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
          >
          {loading ? "Sending…" : "Send Message"}
          </button>
        </form>
        {showModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full text-center">
            <p className="text-lg font-semibold">{response}</p>
            <button
              onClick={() => setShowModel(false)}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center">
          <div className="bg-white shadow-md shadow-lg hover:shadow-indigo-300 transition-shadow rounded-xl p-6">
            <Mail className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
            <p className="text-slate-700 font-medium">Email</p>
            <p className="text-slate-500 text-sm">malikanees.developer@gmail.com</p>
          </div>
          <a href="https://wa.me/923102932433" rel="noopener noreferrer" target="_blank" className="bg-white shadow-md rounded-xl shadow-lg hover:shadow-indigo-300 transition-shadow p-6">
            <Phone className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
            <p  className="text-slate-700 font-medium">Whatsapp</p>
            <p className="text-slate-500 text-sm">+92 310 2932433</p>
          </a>
          <a rel="noreferrer noopener" target="_blank" href="https://mrawebdevelopers.vercel.app" className="bg-white shadow-md rounded-xl shadow-lg hover:shadow-indigo-300 transition-shadow p-6">
            <Globe className="w-6 h-6 text-indigo-600  mx-auto mb-2" />
            <p className="text-slate-700 font-medium">Webiste</p>
            <p className="text-slate-500 text-sm">MRA Web Developer</p>
          </a>
        </div>
      </div>
    </main>
  );
}
