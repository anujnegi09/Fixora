import { React, useState , useEffect, useRef } from 'react';



import { useNavigate , useLocation } from "react-router-dom";


import { gsap } from "gsap";

// Dummy services (later fetch from backend/ServicesContext)
const allServices = [
      {
        id: 1,
        title: "Plumbing Repair",
        description: "Fixing leaks and pipes ",
        location: "Delhi",
        phoneNumber: "9876543210",
        rating: 4.2,
      },
      {
        id: 2,
        title: "Electrician",
        description: "Home wiring & repairs",
        location: "Mumbai",
        phoneNumber: "9123456789",
        rating: 3.8,
      },
      {
        id: 3,
        title: "Tutor",
        description: "Math & Science tutoring",
        location: "Bangalore",
        phoneNumber: "9998887777",
        rating: 4.7,
      },
        {
        id: 3,
        title: "Tutor",
        description: "Math & Science tutoring",
        location: "Bangalore",
        phoneNumber: "9998887777",
        rating: 4.7,
      },
        {
        id: 3,
        title: "Tutor",
        description: "Math & Science tutoring",
        location: "Bangalore",
        phoneNumber: "9998887777",
        rating: 4.7,
      },
        {
        id: 3,
        title: "Tutor",
        description: "Math & Science tutoring",
        location: "Bangalore",
        phoneNumber: "9998887777",
        rating: 4.7,
      },
    ];
const Homepage = () => {

  const navigate = useNavigate();
       const location = useLocation();
    
      // const { user, handleLogout } = useContext(UserContext);
      const [search, setSearch] = useState("");
      const [ratings, setRatings] = useState({}); // store user ratings per service
    
      const filteredServices = allServices.filter(
        (service) =>
          service.title.toLowerCase().includes(search.toLowerCase()) ||
          service.description.toLowerCase().includes(search.toLowerCase()) ||
          service.location.toLowerCase().includes(search.toLowerCase())
      );
    
      // Handle rating click
      const handleRating = (serviceId, star) => {
        setRatings((prev) => ({ ...prev, [serviceId]: star }));
      };
  return (
    <>
    {/* hero section */}
    <div className='pt-15 bg-gray-100'>
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center justify-center  ">
      <h1 className="font-bold text-6xl text-gray-600 ">Connecting You with </h1>
      <h1 className="font-bold text-6xl text-gray-600 mt-2">Trusted Local Skills.</h1>
      <h1 className="font-bold text-6xl  bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent  mt-2">Anytime, Anywhere </h1>
      <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto text-center font-light">
  Discover reliable professionals near you — electricians, tutors, beauticians, plumbers, and more. Whether you’re looking to book a service or grow your business, Local Skill Hub has you covered.
    </p>
  <button
  className="px-6 py-3 rounded-lg 
  bg-black/70 backdrop-blur-md 
  text-white border border-white/50 
  shadow-lg mt-8 relative z-10"
>
  Start for Free
</button>

   

</div>



     {/* Main Content */}
<div className="flex flex-col items-center w-full min-h-screen bg-gray-100 p-6 mt-20">
  <div className="w-[90%] bg-white shadow-lg rounded-2xl p-6 space-y-5">
    <h2 className="text-2xl font-bold text-center">Browse Services</h2>

    {/* Search */}
    <input
      name='search'
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search services by title, description, or location..."
      className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    {/* Services List */}
    <div className="flex flex-wrap gap-6 justify-center">
      {filteredServices.length === 0 ? (
        <p className="text-gray-500 text-center w-full">
          No matching services found.
        </p>
      ) : (
        filteredServices.map((service) => (
          <div
            key={service.id}
            className="w-[300px] border rounded-lg p-4 shadow-sm bg-white hover:shadow-lg hover:-translate-y-1 transition"
          >
            <h3 className="font-semibold text-lg">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
            <p className="text-sm text-gray-500">📍 {service.location}</p>
            <p className="text-sm text-gray-500">📞 {service.phoneNumber}</p>

            {/* WhatsApp Contact */}
            <a
              href={`https://wa.me/${service.phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600"
            >
              Contact via WhatsApp
            </a>

            {/* Rating System */}
            <div className="mt-3 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(service.id, star)}
                  className={`text-xl ${
                    ratings[service.id] >= star
                      ? "text-yellow-400"
                      : "text-gray-400"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
    <div className='flex items-center justify-center'>
      <button className=' mt-5 text-xl' onClick={()=>navigate('/Services')}>Explore All</button>
    </div>
    
  </div>
  
</div>
</div>
    </>
  )
}

export default Homepage















// import React, { useContext, useState } from "react";
// import NavBar  from "../components/NavBar";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import About from "./About";
// import Services from "./Services";
// import Homepage from "./Homepage";
// import Footer from "../components/Footer";
// import ServiceProviderPage from "./ServiceProviderPage";
// import ScrollToTop from "../components/ScrollToTop";
// import LoginPage from "./LoginPage";


// // Dummy services (later fetch from backend/ServicesContext)
// const allServices = [
//   {
//     id: 1,
//     title: "Plumbing Repair",
//     description: "Fixing leaks and pipes ",
//     location: "Delhi",
//     phoneNumber: "9876543210",
//     rating: 4.2,
//   },
//   {
//     id: 2,
//     title: "Electrician",
//     description: "Home wiring & repairs",
//     location: "Mumbai",
//     phoneNumber: "9123456789",
//     rating: 3.8,
//   },
//   {
//     id: 3,
//     title: "Tutor",
//     description: "Math & Science tutoring",
//     location: "Bangalore",
//     phoneNumber: "9998887777",
//     rating: 4.7,
//   },
//     {
//     id: 3,
//     title: "Tutor",
//     description: "Math & Science tutoring",
//     location: "Bangalore",
//     phoneNumber: "9998887777",
//     rating: 4.7,
//   },
//     {
//     id: 3,
//     title: "Tutor",
//     description: "Math & Science tutoring",
//     location: "Bangalore",
//     phoneNumber: "9998887777",
//     rating: 4.7,
//   },
//     {
//     id: 3,
//     title: "Tutor",
//     description: "Math & Science tutoring",
//     location: "Bangalore",
//     phoneNumber: "9998887777",
//     rating: 4.7,
//   },
// ];

// const UserPage = () => {
//   // const { user, handleLogout } = useContext(UserContext);
//   const [search, setSearch] = useState("");
//   const [ratings, setRatings] = useState({}); // store user ratings per service

//   const filteredServices = allServices.filter(
//     (service) =>
//       service.title.toLowerCase().includes(search.toLowerCase()) ||
//       service.description.toLowerCase().includes(search.toLowerCase()) ||
//       service.location.toLowerCase().includes(search.toLowerCase())
//   );

//   // Handle rating click
//   const handleRating = (serviceId, star) => {
//     setRatings((prev) => ({ ...prev, [serviceId]: star }));
//   };
//   // hide footer on these routes
//   const hideFooterRoutes = ["/LoginPage"];

  

//   return (
//     <>
    
//     <Router>
//     <ScrollToTop /> 
//     <NavBar />
    
//     <Routes>
//       <Route path="/" element={<Homepage />} />
//       <Route path="/about" element={<About />} />
//       <Route path="/services" element={<Services />} />
//       <Route path="/ServiceProviderPage" element={<ServiceProviderPage />} />
//       <Route path="/LoginPage" element={<LoginPage />} />
//       </Routes>
//       {!hideFooterRoutes.includes(location.pathname) && <Footer />}
//     </Router>

//     {/* <div className="w-full h-150 bg-gray-100 flex flex-col items-center justify-center  ">
//       <h1 className="font-bold text-6xl text-gray-600 ">Connecting You with </h1>
//       <h1 className="font-bold text-6xl text-gray-600 mt-2">Trusted Local Skills.</h1>
//       <h1 className="font-bold text-6xl  bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent  mt-2">Anytime, Anywhere </h1>
//       <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto text-center font-light">
//   Discover reliable professionals near you — electricians, tutors, beauticians, plumbers, and more. Whether you’re looking to book a service or grow your business, Local Skill Hub has you covered.
//     </p>
//    <button className="px-2 py-1 rounded-lg 
//   bg-black/55 backdrop-blur-md 
//   text-white border border-white/50 
//   shadow-lg mt-4">
//    Start for Free
// </button>


//     </div> */}

  

//     </>
//   );
// };

// export default UserPage;

