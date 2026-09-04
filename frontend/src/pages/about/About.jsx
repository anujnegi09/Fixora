import React from "react";
import {
  FaMapMarkerAlt,
  FaStar,
  FaBolt,
  FaUsers,
  FaShieldAlt,
  FaSearch,
  FaCalendarCheck,
  FaComments,
  FaCheckCircle,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const About = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white text-slate-800 mt-10">

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-br from-violet-50 via-white to-blue-50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">

            <span className="inline-flex items-center rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
              <FaMapMarkerAlt className="mr-2" />
              Your Local Service Platform
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Making Local Services
              <span className="block text-violet-600">
                Simple & Reliable
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Fixora connects you with trusted local service providers,
              making it easier to discover, compare, and book the services
              you need — all in one place.
            </p>
          </div>
        </div>
      </section>


      {/* ================= OUR STORY ================= */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          <div>
            <p className="font-semibold uppercase tracking-wider text-violet-600">
              Our Story
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Connecting skills with people who need them.
            </h2>

            <p className="mt-6 leading-7 text-slate-600">
              Finding a reliable person for everyday services shouldn't be
              difficult. At the same time, skilled local professionals often
              struggle to reach customers who need their expertise.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Fixora was created to bridge this gap by bringing customers and
              local service providers together on one simple platform.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Our goal is simple: make local services easier to find, easier
              to book, and easier to trust.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="rounded-2xl bg-violet-50 p-6">
              <FaUsers className="text-3xl text-violet-600" />
              <h3 className="mt-4 text-xl font-bold text-slate-900">
                For Everyone
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Helping customers and service providers connect easily.
              </p>
            </div>

            <div className="rounded-2xl bg-blue-50 p-6">
              <FaMapMarkerAlt className="text-3xl text-blue-600" />
              <h3 className="mt-4 text-xl font-bold text-slate-900">
                Local
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Discover services and professionals around you.
              </p>
            </div>

            <div className="rounded-2xl bg-amber-50 p-6">
              <FaStar className="text-3xl text-amber-500" />
              <h3 className="mt-4 text-xl font-bold text-slate-900">
                Trusted
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Ratings and reviews help users make better decisions.
              </p>
            </div>

            <div className="rounded-2xl bg-green-50 p-6">
              <FaBolt className="text-3xl text-green-600" />
              <h3 className="mt-4 text-xl font-bold text-slate-900">
                Convenient
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Find and book services without unnecessary hassle.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* ================= WHAT WE SOLVE ================= */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">
            <p className="font-semibold uppercase tracking-wider text-violet-600">
              What We Solve
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Making local services easier for everyone
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                <FaSearch />
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Find the Right Service
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Discover different local services without searching through
                multiple platforms.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <FaMapMarkerAlt />
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Connect Locally
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Find service providers around your location and connect with
                local professionals.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
                <FaCalendarCheck />
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Easy Booking
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Book a service instantly or schedule it for a time that works
                for you.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                <FaUsers />
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Help Providers Grow
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Give local professionals a platform to showcase their skills
                and reach more customers.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* ================= MISSION ================= */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="rounded-3xl bg-violet-600 px-8 py-16 text-center text-white sm:px-16">

          <p className="font-semibold uppercase tracking-wider text-violet-200">
            Our Mission
          </p>

          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold sm:text-4xl">
            Empower Local Skills. Simplify Everyday Life.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-7 text-violet-100">
            We are building a trusted local service ecosystem where customers
            can easily find the help they need and service providers can grow
            their opportunities.
          </p>

        </div>
      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <div className="text-center">
            <p className="font-semibold uppercase tracking-wider text-violet-600">
              How Fixora Works
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              From discovery to completion
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-5">

            {[
              {
                icon: <FaSearch />,
                title: "Discover",
                text: "Search for services and providers near you.",
              },
              {
                icon: <FaStar />,
                title: "Choose",
                text: "Compare details, ratings, pricing and availability.",
              },
              {
                icon: <FaCalendarCheck />,
                title: "Book",
                text: "Choose an instant or scheduled booking.",
              },
              {
                icon: <FaComments />,
                title: "Connect",
                text: "Communicate with your service provider.",
              },
              {
                icon: <FaCheckCircle />,
                title: "Get It Done",
                text: "Complete your service and share your experience.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="relative rounded-2xl bg-white pt-3 px-5 pb-5 shadow-sm"
              >
                <span className="text-sm font-bold text-violet-500">
                  {step.number}
                </span>

                <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                  {step.icon}
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {step.text}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>


      {/* ================= FOR USERS & PROVIDERS ================= */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        <div className="grid gap-8 lg:grid-cols-2">

          {/* Customers */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
              <FaUsers size={22} />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-900">
              Built for Customers
            </h2>

            <p className="mt-3 text-slate-600">
              Everything you need to find and book the right local service.
            </p>

            <ul className="mt-7 space-y-4">
              {[
                "Discover nearby services",
                "Compare service providers",
                "View ratings and reviews",
                "Book services easily",
                "Choose instant or scheduled bookings",
                "Communicate with providers",
                "Track your bookings",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-slate-700"
                >
                  <FaCheckCircle className="shrink-0 text-green-500" />
                  {item}
                </li>
              ))}
            </ul>

          </div>


          {/* Providers */}
          <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-sm sm:p-10">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/20 text-violet-400">
              <FaBolt size={22} />
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              Built for Service Providers
            </h2>

            <p className="mt-3 text-slate-300">
              Turn your skills into opportunities and reach customers around
              you.
            </p>

            <ul className="mt-7 space-y-4">
              {[
                "Create your own service",
                "Showcase your skills",
                "Reach local customers",
                "Manage bookings",
                "Communicate with customers",
                "Build your reputation",
                "Grow your opportunities",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-slate-300"
                >
                  <FaCheckCircle className="shrink-0 text-green-400" />
                  {item}
                </li>
              ))}
            </ul>

          </div>

        </div>
      </section>


      {/* ================= WHY FIXORA ================= */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">
            <p className="font-semibold uppercase tracking-wider text-violet-600">
              Why Fixora
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Designed around your needs
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {[
              {
                icon: <FaMapMarkerAlt />,
                title: "Local",
                text: "Find services and professionals around your location.",
              },
              {
                icon: <FaStar />,
                title: "Trust",
                text: "Use ratings and reviews to make better decisions.",
              },
              {
                icon: <FaBolt />,
                title: "Convenient",
                text: "Discover and book services without unnecessary hassle.",
              },
              {
                icon: <FaShieldAlt />,
                title: "Reliable",
                text: "A platform designed to make local service connections easier.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white p-7 text-center shadow-sm"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                  {item.icon}
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>


      {/* ================= FAQ PREVIEW ================= */}
      <section className="mx-auto max-w-4xl px-6 py-20">

        <div className="text-center">
          <p className="font-semibold uppercase tracking-wider text-violet-600">
            FAQ
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-10 space-y-4">

          {[
            {
              question: "What is Fixora?",
              answer:
                "Fixora is a local service platform that connects customers with service providers in their area.",
            },
            {
              question: "Can I book a service through Fixora?",
              answer:
                "Yes. You can discover a service, select a provider, and create a booking through the platform.",
            },
            {
              question: "Can I become a service provider?",
              answer:
                "Yes. Skilled individuals can create and offer their services on Fixora.",
            },
            {
              question: "Can I schedule a service for later?",
              answer:
                "Yes. Depending on the service, you can choose between an instant booking and a scheduled booking.",
            },
          ].map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <h3 className="font-bold text-slate-900">
                {faq.question}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {faq.answer}
              </p>
            </div>
          ))}

        </div>

        <div className="mt-8 text-center">
          <button className="font-semibold text-violet-600 hover:text-violet-700">
            View All FAQs →
          </button>
        </div>

      </section>


      {/* ================= CONTACT ================= */}
      <section className="bg-violet-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            <div>
              <p className="font-semibold uppercase tracking-wider text-violet-600">
                Contact & Support
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                Have a question?
              </h2>

              <p className="mt-5 max-w-lg leading-7 text-slate-600">
                Whether you have a question about a booking, need help using
                Fixora, or simply want to know more about our platform, we're
                here to help.
              </p>

              <button className="mt-7 flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700">
                Contact Support
                <FaArrowRight size={14} />
              </button>
            </div>


            <div className="grid gap-5 sm:grid-cols-2">

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                  <FaPhoneAlt />
                </div>

                <h3 className="mt-5 font-bold text-slate-900">
                  Phone
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  +91 XXXXX XXXXX
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Support during business hours
                </p>
              </div>


              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <FaEnvelope />
                </div>

                <h3 className="mt-5 font-bold text-slate-900">
                  Email
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  support@fixora.com
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  For questions and support
                </p>
              </div>


              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">
                  <FaMapMarkerAlt />
                </div>

                <h3 className="mt-5 font-bold text-slate-900">
                  Location
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  India
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Serving local communities
                </p>
              </div>


              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <FaClock />
                </div>

                <h3 className="mt-5 font-bold text-slate-900">
                  Support Hours
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  Mon – Sat
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  9:00 AM – 6:00 PM IST
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* ================= FINAL CTA ================= */}
      <section className="bg-[#FFFFFF] m-20">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">

          <h2 className="text-3xl font-bold text-black sm:text-4xl">
            Let's make local services better.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-600">
            Find the right service. Connect with the right person. Get it
            done.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
               onClick={() => navigate("/services")}>
                Find a Service
                <FaArrowRight size={14} />
              </button>

              <button className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-violet-400 hover:text-violet-600"
              onClick={() => navigate("/become-provider")}>
                Become a Provider
              </button>
            </div>

        </div>
      </section>
    </div>
  );
};

export default About;