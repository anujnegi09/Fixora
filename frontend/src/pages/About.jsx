import React from "react";

const About = () => {
  return (
    <div className=" pt-15 min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">About Fixora</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Fixora connects users with trusted local service providers — from
          plumbers and electricians to tutors and beauticians. 
          <br /> <br />
          Our mission is to make it simple and safe to find skilled professionals
          nearby, book services instantly, and get your work done hassle-free.
        </p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">For Users</h2>
          <p className="text-gray-600">
            Search, compare, and book local services with confidence. View profiles,
            ratings, and contact providers directly via phone or WhatsApp.
          </p>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">For Service Providers</h2>
          <p className="text-gray-600">
            Showcase your skills, manage bookings, and grow your customer base online. 
            Build trust with reviews and ratings from satisfied clients.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
