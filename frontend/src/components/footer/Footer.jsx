import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            Fixora
          </h2>

          <p className="mt-3 text-gray-400 text-sm">
            Connecting you with trusted local professionals anytime, anywhere.
          </p>

          <div className="flex gap-4 mt-4 text-xl">

            <FaFacebookF
              className="cursor-pointer hover:text-white"
            />

            <FaInstagram
              className="cursor-pointer hover:text-white"
            />

            <FaLinkedinIn
              className="cursor-pointer hover:text-white"
            />

            <FaGithub
              className="cursor-pointer hover:text-white"
            />

          </div>
        </div>

        {/* Quick Links */}
        <div>

          <h3 className="text-lg font-semibold text-white">
            Quick Links
          </h3>

          <ul className="mt-3 space-y-2">

  <li>
    <NavLink
      to="/"
      className={({ isActive }) =>
    isActive
      ? "text-white font-semibold"
      : "hover:text-white"
  }
    >
      Home
    </NavLink>
  </li>

  <li>
    <NavLink
      to="/services"
     className={({ isActive }) =>
    isActive
      ? "text-white font-semibold"
      : "hover:text-white"
  }
    >
      Services
    </NavLink>
  </li>

  <li>
    <NavLink
      to="/about"
      className={({ isActive }) =>
    isActive
      ? "text-white font-semibold"
      : "hover:text-white"
  }
    >
      About
    </NavLink>
  </li>

  <li>
    <NavLink
      to="/contact"
      className={({ isActive }) =>
    isActive
      ? "text-white font-semibold"
      : "hover:text-white"
  }
    >
      Contact
    </NavLink>
  </li>

</ul>

        </div>

        {/* Support */}
        <div>

          <h3 className="text-lg font-semibold text-white">
            Support
          </h3>

          <ul className="mt-3 space-y-2">

  <li>
    <NavLink
      to="/help-center"
      className={({ isActive }) =>
    isActive
      ? "text-white font-semibold"
      : "hover:text-white"
  }
    >
      Help Center
    </NavLink>
  </li>

  <li>
    <NavLink
      to="/faqs"
      className={({ isActive }) =>
    isActive
      ? "text-white font-semibold"
      : "hover:text-white"
  }
    >
      FAQs
    </NavLink>
  </li>

  <li>
    <NavLink
      to="/privacy-policy"
      className={({ isActive }) =>
    isActive
      ? "text-white font-semibold"
      : "hover:text-white"
  }
    >
      Privacy Policy
    </NavLink>
  </li>

  <li>
    <NavLink
      to="/become-provider"
      className={({ isActive }) =>
    isActive
      ? "text-white font-semibold"
      : "hover:text-white"
  }
    >
      Become a Provider
    </NavLink>
  </li>

</ul>

        </div>

        {/* Contact */}
        <div>

          <h3 className="text-lg font-semibold text-white">
            Contact
          </h3>

          <ul className="mt-3 space-y-3 text-sm">

            <li className="flex items-center gap-2">
              <FaEnvelope />
              support@fixora.com
            </li>

            <li className="flex items-center gap-2">
              <FaPhoneAlt />
              +91 8267055378
            </li>

            <li className="flex items-center gap-2">
              <FaMapMarkerAlt />
              Dehradun, Uttarakhand
            </li>

          </ul>

        </div>

      </div>

      {/* Bottom Bar */}

      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-500 text-sm">

        © {new Date().getFullYear()} Fixora. All rights reserved.

      </div>
    </footer>
  );
};

export default Footer;





// import React from 'react'
// import { useNavigate , useLocation } from "react-router-dom";

// const Footer = () => {
//       const navigate = useNavigate();
//       const location = useLocation();


//   return (
//     <footer className="bg-gray-900 text-gray-300 py-10">
//   <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

//     {/* Brand Section */}
//     <div>
//       <h2 className="text-2xl font-bold text-white">Fixora</h2>
//       <p className="mt-3 text-gray-400 text-sm">
//         Connecting you with trusted local professionals anytime, anywhere.
//       </p>
//       <div className="flex gap-4 mt-4 text-xl">
//         <span className="cursor-pointer hover:text-white">🐦</span>
//         <span className="cursor-pointer hover:text-white">📘</span>
//         <span className="cursor-pointer hover:text-white">✉️</span>
//         <span className="cursor-pointer hover:text-white">💬</span>
//       </div>
//     </div>

//     {/* Example Links */}
//     <div>
//       <h3 className="text-lg font-semibold text-white">Quick Links</h3>
//       <ul className="mt-3 space-y-2">

//         <li onClick={()=>navigate('/Services')}
//        className="hover:text-white cursor-pointer">Services</li>


//         <li onClick={()=>navigate('/About')} 
//         className="hover:text-white cursor-pointer">About</li>
//       </ul>
//     </div>

//     {/* Example Support */}
//     <div>
//       <h3 className="text-lg font-semibold text-white">Support</h3>
//       <ul className="mt-3 space-y-2">
//         <li className="hover:text-white cursor-pointer">Help Center</li>
//         <li className="hover:text-white cursor-pointer">FAQs</li>
//         <li className="hover:text-white cursor-pointer">Terms & Policy</li>
//       </ul>
//     </div>

//     {/* Contact Example */}
//     <div>
//       <h3 className="text-lg font-semibold text-white">Contact</h3>
//       <ul className="mt-3 space-y-2 text-sm">
//         <li>📧 Fixora@gmail.com</li>
//         <li>📞 +91 8267055378</li>
//         <li>📍 Dehradun, Uttarakhand</li>
//       </ul>
//     </div>

//   </div>

//   {/* Bottom Bar */}
//   <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-500 text-sm">
//     © {new Date().getFullYear()} Fixora. All rights reserved.
//   </div>
// </footer>
    
//   )
// }

// export default Footer

