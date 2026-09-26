import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CompleteProfileModal from "../../components/profile/CompleteProfileModal";

import plumberImage from "../../assets/plumber.jpg";
import ac_repairImage from "../../assets/ac-repair.jpg";
import painterImage from "../../assets/painter.jpg";
import electricianImage from "../../assets/electrician.jpg";
import cleanerImage from "../../assets/cleaner.jpg";
import p1Image from "../../assets/ps1.png";
import p2Image from "../../assets/ps2.png";
import p3Image from "../../assets/ps3.png";
import p4Image from "../../assets/ps4.png";
import p5Image from "../../assets/ps5.png";
import p6Image from "../../assets/ps6.png";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import {
  MapPin,
  Star,
  Zap,
  MessageCircle,
  Bell,
  ShieldCheck,
} from "lucide-react";

const whyChooseFixora = [
  {
    icon: MapPin,
    title: "Local Professionals",
    description:
      "Find skilled service providers near your location and get help from professionals in your area.",
  },
  {
    icon: Star,
    title: "Ratings & Reviews",
    description:
      "Make better decisions by checking ratings and reviews from customers who have used the service.",
  },
  {
    icon: Zap,
    title: "Quick Booking",
    description:
      "Book a service instantly or schedule it for a time that works best for you.",
  },
  {
    icon: MessageCircle,
    title: "Direct Communication",
    description:
      "Chat directly with your service provider to discuss your requirements and service details.",
  },
  {
    icon: Bell,
    title: "Real-Time Updates",
    description:
      "Stay informed with real-time notifications about your bookings and service requests.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description:
      "Make payments securely and conveniently through our trusted payment system.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Find a Service",
    description:
      "Search for the service you need and discover professionals available near your location.",
    icon: "🔍",
  },
  {
    step: "02",
    title: "Choose a Professional",
    description:
      "Compare providers based on ratings, reviews, pricing, and location before making your choice.",
    icon: "👤",
  },
  {
    step: "03",
    title: "Book Your Service",
    description:
      "Book instantly or schedule a service for a time that works best for you.",
    icon: "📅",
  },
  {
    step: "04",
    title: "Get It Done",
    description:
      "Connect with your service provider, get the job completed, and share your experience.",
    icon: "✅",
  },
];

const popularServices = [
  { name: "carpainter", image: p1Image },
  { name: "ac-repair", image: p2Image },
  { name: "home cleaning", image: p3Image },
  { name: "painter", image: p4Image },
  { name: "plumber", image: p5Image },
  { name: "electrician", image: p6Image },
];

const Home = () => {
  const navigate = useNavigate();
  const [popularStart, setPopularStart] = useState(0);
  const user = useSelector((state) => state.auth.user);

  const showCompleteProfile =
    user?.authProvider === "google" && !user?.phoneNumber;

  const nextPopularService = () => {
    setPopularStart((prev) =>
      prev + 1 >= popularServices.length ? 0 : prev + 1,
    );
  };
  const heroRef = useRef(null);

  // for hero section
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Left side
      gsap.from(
        [
          ".hero-tagline",
          ".hero-title",
          ".hero-description",
          ".hero-buttons",
          ".hero-features",
        ],
        {
          x: -50,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
        },
      );

      // Right side
      gsap.from(".hero-image", {
        x: 80,
        opacity: 0,
        scale: 0.95,
        duration: 0.9,
        ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // for feature section
  const trendingTitleRef = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".trending-title", {
        x: -50,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: trendingTitleRef.current,
          start: "top 80%",
        },
      });
      gsap.from(".trending-card", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: trendingTitleRef.current,
          start: "top 75%",
        },
      });
    }, trendingTitleRef);

    return () => ctx.revert();
  }, []);

  //for how works section
  const howSectionRef = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".how-title", {
        y: 50,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: howSectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(
        ".how-description",
        {
          y: 50,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: howSectionRef.current,
            start: "top 80%",
          },
        },
        0.9,
      );

      gsap.from(
        ".how-card",
        {
          y: 50,
          opacity: 0,
          duration: 0.9,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: howSectionRef.current,
            start: "top 65%",
          },
        },
        0.8,
      );
    }, howSectionRef);

    return () => ctx.revert();
  }, []);

  //for why choose fixora section
  const whyChooseRef = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".why-title", {
        y: 50,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: whyChooseRef.current,
          start: "top 80%",
        },
      });

      gsap.from(
        ".why-description",
        {
          y: 50,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: whyChooseRef.current,
            start: "top 80%",
          },
        },
        0.9,
      );
      gsap.from(
        ".why-card",
        {
          y: 50,
          opacity: 0,
          duration: 0.9,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: whyChooseRef.current,
            start: "top 50%",
          },
        },
        0.8,
      );
    }, whyChooseRef);

    return () => ctx.revert();
  }, []);

  // For stats / trust section
  const statsSectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stats-title", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statsSectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".stat-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statsSectionRef.current,
          start: "top 75%",
        },
      });

      // Number counter animation
      gsap.utils.toArray(".stat-number").forEach((element) => {
        const target = Number(element.dataset.value);

        gsap.fromTo(
          element,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: statsSectionRef.current,
              start: "top 75%",
              once: true,
            },
            onUpdate: function () {
              element.innerText = Math.floor(
                Number(element.innerText),
              ).toLocaleString();
            },
          },
        );
      });
    }, statsSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <main className="pt-20">
        <section
          ref={heroRef}
          className="min-h-[calc(100vh-80px)] flex items-center px-6 md:px-12 lg:px-20 py-12"
        >
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="max-w-xl">
                <p className="hero-tagline text-[#2563EB] font-semibold text-sm md:text-base mb-4 tracking-wide">
                  LOCAL SERVICES. MADE SIMPLE.
                </p>

                <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1]">
                  Find trusted
                  <span className="text-[#2563EB]"> local professionals </span>
                  near you.
                </h1>

                <p className="hero-description mt-6 text-slate-600 text-base md:text-lg leading-7 max-w-lg">
                  Connect with skilled local service providers for your everyday
                  needs. From repairs to home services, find the right person
                  for the job.
                </p>

                <div className="hero-buttons mt-8 flex flex-wrap gap-4">
                  <button
                    onClick={() => navigate("/services")}
                    className="bg-[#2563EB] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1D4ED8] transition-all duration-200 shadow-sm"
                  >
                    Find a Service
                  </button>

                  <button
                    onClick={() => navigate("/become-provider")}
                    className="border border-slate-300 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:border-[#2563EB] hover:text-[#2563EB] transition-all duration-200"
                  >
                    Become a Provider
                  </button>
                </div>

                <div className="hero-features mt-10 flex flex-wrap gap-6 text-sm text-slate-500">
                  {[
                    "Local Professionals",
                    "Easy Booking",
                    "Nearby Services",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#2563EB] rounded-full" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="hero-image w-full">
                <div className="grid grid-cols-2 gap-3 h-[500px]">
                  <div className="row-span-2 overflow-hidden rounded-2xl">
                    <img
                      src={electricianImage}
                      alt="Local electrician providing service"
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                  </div>

                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src={ac_repairImage}
                      alt="Local AC service professional"
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                  </div>

                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src={painterImage}
                      alt="Local painter providing service"
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-3">
                  <div className="hero-image w-1/2 h-32 overflow-hidden rounded-2xl">
                    <img
                      src={plumberImage}
                      alt="Local plumber professional"
                      className="w-full h-full object-cover object-[center_20%] transition-transform duration-500"
                    />
                  </div>

                  <div className="hero-image w-1/2 h-32 overflow-hidden rounded-2xl">
                    <img
                      src={cleanerImage}
                      alt="Local cleaning professional"
                      className="w-full h-full object-cover object-[center_30%] transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* What’s trending section */}
        <section
          ref={trendingTitleRef}
          className="px-6 md:px-12 lg:px-20 py-16 my-20"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="trending-title text-3xl md:text-4xl font-bold text-slate-900">
                  What’s trending
                </h2>

                <p className="trending-title mt-2 text-slate-500 text-base md:text-lg">
                  See what’s in demand and find the right professional.
                </p>
              </div>

              <button
                type="button"
                onClick={nextPopularService}
                className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-slate-300 bg-white text-slate-800 hover:border-[#2563EB] hover:text-[#2563EB] hover:shadow-md transition-all duration-200"
                aria-label="Next popular services"
              >
                →
              </button>
            </div>

            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex gap-5 transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${popularStart * 33.3333}%)`,
                  }}
                >
                  {popularServices.map((service, index) => (
                    <div
                      key={`${service.name}-${index}`}
                      onClick={() =>
                        navigate(
                          `/services?category=${encodeURIComponent(
                            service.name,
                          )}`,
                        )
                      }
                      className="trending-card relative flex-shrink-0 w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] h-[222px] rounded-xl overflow-hidden cursor-pointer group bg-slate-100"
                    >
                      <img
                        src={service.image}
                        alt={service.name}
                        className=" absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-95"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={nextPopularService}
                className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-white border border-slate-200 shadow-lg text-slate-800 text-xl hover:text-[#2563EB] transition-all duration-200"
                aria-label="Next popular services"
              >
                →
              </button>
            </div>
          </div>
        </section>

        {/* Trust & Stats Section */}
        <section
          ref={statsSectionRef}
          className="bg-slate-50 px-6 py-20 md:px-12 lg:px-20 pb-32"
        >
          <div className="mx-auto max-w-7xl">
            {/* Heading */}
            <div className="stats-title mx-auto max-w-2xl text-center">
              <span className="inline-flex rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-600">
                Growing Together
              </span>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Trusted by people in their local communities
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
                More people are discovering reliable professionals and getting
                everyday services done through Fixora.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {/* Users */}
              <div className="stat-card rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm">
                <div
                  className="stat-number text-4xl font-bold text-blue-600"
                  data-value="1250"
                >
                  0
                </div>

                <h3 className="mt-2 text-lg font-semibold text-slate-900">
                  Users
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  People using Fixora
                </p>
              </div>

              {/* Professionals */}
              <div className="stat-card rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm">
                <div
                  className="stat-number text-4xl font-bold text-blue-600"
                  data-value="350"
                >
                  0
                </div>

                <h3 className="mt-2 text-lg font-semibold text-slate-900">
                  Professionals
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Local service providers
                </p>
              </div>

              {/* Services */}
              <div className="stat-card rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm">
                <div
                  className="stat-number text-4xl font-bold text-blue-600"
                  data-value="1800"
                >
                  0
                </div>

                <h3 className="mt-2 text-lg font-semibold text-slate-900">
                  Services
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Services completed
                </p>
              </div>

              {/* Cities */}
              <div className="stat-card rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm">
                <div
                  className="stat-number text-4xl font-bold text-blue-600"
                  data-value="25"
                >
                  0
                </div>

                <h3 className="mt-2 text-lg font-semibold text-slate-900">
                  Areas
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Communities reached
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* how its works */}
        <section ref={howSectionRef} className="bg-white py-20 pb-48">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="how-title inline-flex rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-600">
                Simple & Easy
              </span>

              <h2 className="how-title mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                How Fixora Works
              </h2>

              <p className="how-description mt-4 text-base leading-7 text-slate-600 sm:text-lg">
                From finding the right professional to getting the job done,
                Fixora makes booking local services simple.
              </p>
            </div>

            <div className="relative mt-16">
              <div className="absolute left-[12.5%] right-[12.5%] top-10 hidden h-px bg-slate-200 lg:block" />

              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                {howItWorks.map((item) => (
                  <div
                    key={item.step}
                    className="how-card relative text-center"
                  >
                    <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-200 bg-white text-3xl shadow-sm">
                      {item.icon}
                    </div>

                    <div className="mt-6 text-sm font-semibold text-blue-600">
                      STEP {item.step}
                    </div>

                    <h3 className="mt-2 text-xl font-semibold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* why choose fixora  */}
        <section ref={whyChooseRef} className="bg-white py-20 pb-48">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="why-title inline-flex rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-600">
                Why Fixora?
              </span>

              <h2 className="why-title mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Why Choose Fixora?
              </h2>

              <p className="why-description mt-4 text-base leading-7 text-slate-600 sm:text-lg">
                Everything you need to find, book, and manage local services
                with confidence.
              </p>
            </div>

            <div className="why-card mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {whyChooseFixora.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-lg"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                      <Icon size={24} strokeWidth={1.8} />
                    </div>

                    <h3 className="mt-5 text-lg font-semibold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {showCompleteProfile && <CompleteProfileModal />}
    </>
  );
};

export default Home;
