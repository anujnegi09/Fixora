import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin, Sparkles } from "lucide-react";

const FooterNew = () => (
  <footer className="app-footer bg-[#0d1b2a] px-5 pb-8 pt-14 text-slate-300 sm:px-8 lg:px-12">
    <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
      <div><Link to="/" className="flex items-center gap-2.5 text-xl font-black text-white"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600"><Sparkles size={18} /></span>fixora<span className="text-blue-400">.</span></Link><p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">A better way to find trusted local professionals and get everyday jobs done.</p></div>
      <div><h3 className="text-sm font-bold uppercase tracking-[.16em] text-white">Explore</h3><div className="mt-5 space-y-3 text-sm"><Link to="/services" className="block hover:text-white">Find a service</Link><Link to="/become-provider" className="block hover:text-white">Become a provider</Link><Link to="/about" className="block hover:text-white">About Fixora</Link></div></div>
      <div><h3 className="text-sm font-bold uppercase tracking-[.16em] text-white">Your account</h3><div className="mt-5 space-y-3 text-sm"><Link to="/login" className="block hover:text-white">Log in</Link><Link to="/register" className="block hover:text-white">Create an account</Link><Link to="/bookings" className="block hover:text-white">My bookings</Link></div></div>
      <div><h3 className="text-sm font-bold uppercase tracking-[.16em] text-white">Get in touch</h3><div className="mt-5 space-y-3 text-sm text-slate-400"><p className="flex items-center gap-3"><Mail size={16} className="text-blue-400" /> support@fixora.com</p><p className="flex items-center gap-3"><MapPin size={16} className="text-blue-400" /> Dehradun, Uttarakhand</p><Link to="/become-provider" className="mt-4 inline-flex items-center gap-2 font-semibold text-blue-300 hover:text-white">Join the community <ArrowUpRight size={16} /></Link></div></div>
    </div>
    <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Fixora. Built for local communities.</p><p>Trusted help, one booking away.</p></div>
  </footer>
);

export default FooterNew;
