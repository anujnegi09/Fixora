import React from 'react'
import { useNavigate , useLocation } from "react-router-dom";

const Footer = () => {
      const navigate = useNavigate();
      const location = useLocation();


  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
  <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

    {/* Brand Section */}
    <div>
      <h2 className="text-2xl font-bold text-white">Fixora</h2>
      <p className="mt-3 text-gray-400 text-sm">
        Connecting you with trusted local professionals anytime, anywhere.
      </p>
      <div className="flex gap-4 mt-4 text-xl">
        <span className="cursor-pointer hover:text-white">🐦</span>
        <span className="cursor-pointer hover:text-white">📘</span>
        <span className="cursor-pointer hover:text-white">✉️</span>
        <span className="cursor-pointer hover:text-white">💬</span>
      </div>
    </div>

    {/* Example Links */}
    <div>
      <h3 className="text-lg font-semibold text-white">Quick Links</h3>
      <ul className="mt-3 space-y-2">

        <li onClick={()=>navigate('/Services')}
       className="hover:text-white cursor-pointer">Services</li>


        <li onClick={()=>navigate('/About')} 
        className="hover:text-white cursor-pointer">About</li>
      </ul>
    </div>

    {/* Example Support */}
    <div>
      <h3 className="text-lg font-semibold text-white">Support</h3>
      <ul className="mt-3 space-y-2">
        <li className="hover:text-white cursor-pointer">Help Center</li>
        <li className="hover:text-white cursor-pointer">FAQs</li>
        <li className="hover:text-white cursor-pointer">Terms & Policy</li>
      </ul>
    </div>

    {/* Contact Example */}
    <div>
      <h3 className="text-lg font-semibold text-white">Contact</h3>
      <ul className="mt-3 space-y-2 text-sm">
        <li>📧 Fixora@gmail.com</li>
        <li>📞 +91 8267055378</li>
        <li>📍 Dehradun, Uttarakhand</li>
      </ul>
    </div>

  </div>

  {/* Bottom Bar */}
  <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-500 text-sm">
    © {new Date().getFullYear()} Fixora. All rights reserved.
  </div>
</footer>
    
  )
}

export default Footer

