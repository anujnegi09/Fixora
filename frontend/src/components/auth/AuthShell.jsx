import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import fixoraLogo from "../../assets/fixora-logo.png";

const AuthShell = ({ eyebrow, title, description, children, footer }) => {
  const shellRef = useRef(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(".auth-card", { opacity: 0, y: 22, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" });
      gsap.fromTo(".auth-side-item", { opacity: 0, x: -18 }, { opacity: 1, x: 0, duration: 0.55, stagger: 0.1, delay: 0.2, ease: "power3.out" });
    }, shellRef);

    return () => context.revert();
  }, []);

  return (
    <main ref={shellRef} className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f3f0ea] px-4 py-10 text-slate-900 sm:px-6">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-cyan-100/60 blur-3xl" />
      <div className="auth-card relative grid w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/8 lg:grid-cols-[.82fr_1.18fr]">
        <aside className="relative hidden overflow-hidden bg-[#0d1b2a] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="relative auth-side-item">
            <Link to="/" aria-label="Fixora home"><img src={fixoraLogo} alt="Fixora" className="h-12 w-auto object-contain" /></Link>
            <p className="mt-14 text-sm font-bold uppercase tracking-[.2em] text-blue-300">{eyebrow}</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight">Local help starts with one good decision.</h2>
            <p className="mt-5 leading-7 text-slate-300">Connect with trusted professionals, manage bookings, and keep your everyday services moving.</p>
          </div>
          <div className="relative space-y-3 text-sm text-slate-300">
            {['Trusted local professionals', 'Simple, transparent booking', 'Everything in one place'].map((item) => <div key={item} className="auth-side-item flex items-center gap-2"><CheckCircle2 size={17} className="text-cyan-300" />{item}</div>)}
          </div>
        </aside>
        <section className="p-6 sm:p-10 lg:p-14">
          <div className="mx-auto max-w-xl">
            <div className="mb-8 lg:hidden"><Link to="/" aria-label="Fixora home"><img src={fixoraLogo} alt="Fixora" className="h-11 w-auto object-contain" /></Link></div>
            <p className="text-sm font-bold uppercase tracking-[.18em] text-blue-600">{eyebrow}</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
            <p className="mt-3 max-w-lg leading-7 text-slate-500">{description}</p>
            <div className="mt-8">{children}</div>
            {footer && <div className="mt-7 border-t border-slate-100 pt-6 text-sm text-slate-500">{footer}</div>}
            <Link to="/" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600">Back to home <ArrowUpRight size={15} /></Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AuthShell;
