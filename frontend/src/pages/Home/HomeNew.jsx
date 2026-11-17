import { useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock3,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Wrench,
} from "lucide-react";

import CompleteProfileModal from "../../components/profile/CompleteProfileModal";
import electricianImage from "../../assets/electrician.jpg";
import plumberImage from "../../assets/plumber.jpg";
import cleanerImage from "../../assets/cleaner.jpg";
import painterImage from "../../assets/painter.jpg";
import acRepairImage from "../../assets/ac-repair.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { label: "Electrician", image: electricianImage },
  { label: "Plumber", image: plumberImage },
  { label: "Home cleaning", image: cleanerImage },
  { label: "Painter", image: painterImage },
  { label: "AC repair", image: acRepairImage },
];

const benefits = [
  { icon: ShieldCheck, title: "People you can trust", text: "Compare profiles, ratings, and reviews before you book." },
  { icon: Clock3, title: "Booking on your time", text: "Choose an instant visit or schedule a time that works for you." },
  { icon: MapPin, title: "Close to home", text: "Discover skilled professionals serving your neighborhood." },
];

const HomeNew = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const landingRef = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const showCompleteProfile = user?.authProvider === "google" && !user?.phoneNumber;

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(".landing-eyebrow", { opacity: 0, y: 18, duration: 0.55 })
        .from(".landing-title", { opacity: 0, y: 24, duration: 0.7 }, "-=0.25")
        .from(".landing-copy", { opacity: 0, y: 18, duration: 0.55 }, "-=0.35")
        .from(".landing-search", { opacity: 0, y: 18, scale: 0.98, duration: 0.55 }, "-=0.3")
        .from(".landing-proof", { opacity: 0, y: 14, duration: 0.45 }, "-=0.25")
        .from(".landing-visual", { opacity: 0, x: 36, scale: 0.96, duration: 0.8 }, "-=0.55");

      gsap.from(".landing-category", { scrollTrigger: { trigger: ".landing-categories", start: "top 78%", once: true }, opacity: 0, y: 28, scale: 0.97, duration: 0.6, stagger: 0.09, ease: "power3.out" });
      gsap.from(".landing-benefit", { scrollTrigger: { trigger: ".landing-benefits", start: "top 78%", once: true }, opacity: 0, y: 24, duration: 0.6, stagger: 0.14, ease: "power3.out" });
      gsap.from(".landing-cta", { scrollTrigger: { trigger: ".landing-cta", start: "top 86%", once: true }, opacity: 0, y: 24, scale: 0.98, duration: 0.7, ease: "power3.out" });
    }, landingRef);

    return () => context.revert();
  }, []);

  const searchServices = (event) => {
    event.preventDefault();
    const query = search.trim();
    navigate(query ? `/services?search=${encodeURIComponent(query)}` : "/services");
  };

  const browseCategory = (category) => {
    navigate(`/services?category=${encodeURIComponent(category)}`);
  };

  return (
    <>
      <main ref={landingRef} className="overflow-hidden bg-[#f3f0ea] pt-16 text-slate-900">
        <section className="relative flex min-h-[calc(82vh-4rem)] items-center bg-[#d8c2aa] px-5 py-14 text-[#2f2118] sm:px-8 lg:px-12 lg:py-16">
          <div className="absolute -right-32 -top-40 h-96 w-96 rounded-full bg-white/25 blur-3xl" />
          <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-[#8d6548]/10 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <div className="landing-eyebrow mb-6 inline-flex items-center gap-2 rounded-lg border border-[#2f2118]/15 bg-white/25 px-3 py-1.5 text-xs font-semibold uppercase tracking-[.14em] text-[#4a3427]">
                Your neighborhood, made easier
              </div>
              <h1 className="landing-title max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">The right help for every job at home.</h1>
              <p className="landing-copy mt-6 max-w-xl text-base leading-7 text-[#4a3427] sm:text-lg">Find reliable local professionals, compare your options, and book help without the usual guesswork.</p>
              <form onSubmit={searchServices} className="landing-search mt-9 flex max-w-2xl flex-col gap-2 rounded-xl bg-white p-2 shadow-xl sm:flex-row">
                <div className="flex flex-1 items-center gap-3 px-3 text-slate-400">
                  <Search size={20} />
                  <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="What service do you need?" className="w-full bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:text-base" />
                </div>
                <button type="submit" className="rounded-lg bg-[#2f2118] px-6 py-3 font-semibold text-white transition hover:bg-[#21160f]">Search services</button>
              </form>
              <div className="landing-proof mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#4a3427]">
                {["Verified profiles", "Clear pricing", "Easy booking"].map((item) => <span key={item} className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#5f3f2a]" />{item}</span>)}
              </div>
            </div>
            <div className="landing-visual relative mx-auto w-full max-w-lg">
              <div className="absolute -left-5 top-10 z-10 rounded-xl border border-white/20 bg-white p-4 text-slate-900 shadow-lg sm:-left-8">
                <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600"><Star size={20} fill="currentColor" /></div><div><p className="text-sm font-bold">4.9 / 5 rating</p><p className="text-xs text-slate-500">from local customers</p></div></div>
              </div>
              <div className="grid grid-cols-5 grid-rows-5 gap-3">
              <img src={electricianImage} alt="Electrician working" className="col-span-3 row-span-5 h-[380px] w-full rounded-2xl object-cover shadow-xl sm:h-[440px]" />
                <img src={plumberImage} alt="Plumber working" className="col-span-2 row-span-3 h-full w-full rounded-2xl object-cover shadow-lg" />
                <div className="col-span-2 row-span-2 flex flex-col justify-between rounded-[2rem] bg-[#8a6548] p-5 shadow-xl"><Wrench size={28} /><div><p className="text-3xl font-bold">2k+</p><p className="mt-1 text-sm text-[#f3e8dc]">local pros ready to help</p></div></div>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-categories px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-sm font-bold uppercase tracking-[.2em] text-[#7a583e]">Explore services</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Start with what you need</h2></div><button type="button" onClick={() => navigate("/services")} className="group flex items-center gap-2 font-semibold text-[#7a583e]">View all services <ArrowRight size={18} className="transition group-hover:translate-x-1" /></button></div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {categories.map((category) => <button key={category.label} type="button" onClick={() => browseCategory(category.label)} className="landing-category group relative h-56 overflow-hidden rounded-3xl text-left shadow-sm"><img src={category.image} alt={category.label} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" /><span className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/10 to-transparent" /><span className="absolute bottom-5 left-5 right-4 flex items-center justify-between text-lg font-bold text-white">{category.label}<ChevronRight size={20} /></span></button>)}
            </div>
          </div>
        </section>

        <section className="landing-benefits border-y border-slate-200 bg-white px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-7xl"><div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[.2em] text-[#7a583e]">Why Fixora</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">A simpler way to get things done.</h2><p className="mt-4 leading-7 text-slate-600">Everything is designed to help you make a confident choice and keep the whole service journey in one place.</p></div><div className="mt-12 grid gap-5 md:grid-cols-3">{benefits.map((benefit) => { const Icon = benefit.icon; return <div key={benefit.title} className="landing-benefit rounded-3xl bg-[#f7f9fc] p-7"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eadfd3] text-[#7a583e]"><Icon size={24} /></div><h3 className="mt-6 text-xl font-bold">{benefit.title}</h3><p className="mt-3 leading-7 text-slate-600">{benefit.text}</p></div>; })}</div></div>
        </section>

        <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24"><div className="landing-cta mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-[2rem] bg-[#6f4f38] px-7 py-10 text-white sm:px-12 lg:flex-row lg:items-center"><div><p className="text-sm font-bold uppercase tracking-[.2em] text-[#f3e8dc]">Have a skill to share?</p><h2 className="mt-3 max-w-xl text-3xl font-bold sm:text-4xl">Turn your expertise into a local business.</h2><p className="mt-4 max-w-xl leading-7 text-[#f3e8dc]">Create your provider profile, showcase your services, and meet customers who need your help.</p></div><button type="button" onClick={() => navigate("/become-provider")} className="flex shrink-0 items-center gap-2 rounded-xl bg-[#f3e8dc] px-6 py-3 font-bold text-[#4d3525] transition hover:bg-white">Become a provider <ArrowRight size={18} /></button></div></section>
      </main>
      {showCompleteProfile && <CompleteProfileModal />}
    </>
  );
};

export default HomeNew;
