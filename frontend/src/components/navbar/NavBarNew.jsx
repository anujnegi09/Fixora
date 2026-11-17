import { useEffect, useLayoutEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Bell, CalendarDays, ChevronDown, Menu, UserRound, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../features/auth/authThunks.js";
import { getNewNotificationCount, getNotifications } from "../../features/notifications/notificationThunks";
import { selectAuthChecked, selectIsAuthenticated, selectUser } from "../../features/auth/authSelectors.js";
import { selectNewNotificationCount } from "../../features/notifications/notificationSelectors";
import gsap from "gsap";
import fixoraLogo from "../../assets/fixora-logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Find a service" },
  { to: "/become-provider", label: "For professionals" },
];

const NavBarNew = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const authChecked = useSelector(selectAuthChecked);
  const user = useSelector(selectUser);
  const notificationCount = useSelector(selectNewNotificationCount);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getNotifications());
      dispatch(getNewNotificationCount());
    }
  }, [dispatch, isAuthenticated]);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(".app-nav-logo", { opacity: 0, x: -18 }, { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" });
      gsap.fromTo(".app-nav-link", { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, delay: 0.08, ease: "power3.out" });
      gsap.fromTo(".app-nav-actions", { opacity: 0, x: 18 }, { opacity: 1, x: 0, duration: 0.6, delay: 0.12, ease: "power3.out" });
    });

    return () => context.revert();
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    setProfileOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#8d6548]/15 bg-[#fbfaf7]/65 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <NavLink to="/" className="app-nav-logo flex items-center gap-2.5" aria-label="Fixora home">
          <img src={fixoraLogo} alt="Fixora" className="h-14 w-auto object-contain md:h-16" />
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => <NavLink key={link.to} to={link.to} className={({ isActive }) => `app-nav-link rounded-xl px-4 py-2.5 text-sm font-semibold transition ${isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-blue-700"}`}>{link.label}</NavLink>)}
        </nav>

        <div className="app-nav-actions flex items-center gap-2">
          {!authChecked ? (
            <div className="h-10 w-28 animate-pulse rounded-xl bg-[#eadfd3]/60" aria-hidden="true" />
          ) : isAuthenticated ? (
            <>
              <button type="button" onClick={() => navigate("/notifications")} className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-blue-50 hover:text-blue-700" aria-label="Notifications">
                <Bell size={19} />
                {notificationCount > 0 && <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white">{notificationCount > 9 ? "9+" : notificationCount}</span>}
              </button>
              <div className="relative hidden sm:block">
                <button type="button" onClick={() => setProfileOpen((open) => !open)} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 pr-3 transition hover:border-blue-200 hover:shadow-sm" aria-expanded={profileOpen}>
                  {user?.avatar ? <img src={user.avatar} alt="Profile" className="h-8 w-8 rounded-lg object-cover" /> : <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-700"><UserRound size={17} /></span>}
                  <span className="max-w-24 truncate text-sm font-semibold text-slate-700">{user?.fullName?.split(" ")[0] || "Account"}</span><ChevronDown size={15} className="text-slate-400" />
                </button>
                {profileOpen && <div className="absolute right-0 top-14 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"><div className="border-b border-slate-100 px-3 py-3"><p className="truncate text-sm font-bold text-slate-900">{user?.fullName}</p><p className="truncate text-xs text-slate-500">{user?.email}</p></div><NavLink to="/profile" className="mt-1 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50"><UserRound size={16} /> Profile</NavLink><NavLink to="/bookings" className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50"><CalendarDays size={16} /> My bookings</NavLink><button type="button" onClick={handleLogout} className="mt-1 w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-rose-600 hover:bg-rose-50">Sign out</button></div>}
              </div>
            </>
          ) : (
            <div className="hidden items-center gap-2 sm:flex"><NavLink to="/login" className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Log in</NavLink><NavLink to="/register" className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">Get started</NavLink></div>
          )}
          <button type="button" onClick={() => setMobileOpen((open) => !open)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 md:hidden" aria-label={mobileOpen ? "Close menu" : "Open menu"}>{mobileOpen ? <X size={19} /> : <Menu size={19} />}</button>
        </div>
      </div>
      {mobileOpen && <div className="border-t border-slate-100 bg-white px-5 pb-5 pt-3 shadow-lg md:hidden"><nav className="flex flex-col gap-1">{links.map((link) => <NavLink key={link.to} to={link.to} className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700">{link.label}</NavLink>)}</nav>{authChecked && !isAuthenticated && <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3"><NavLink to="/login" className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-bold text-slate-700">Log in</NavLink><NavLink to="/register" className="rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-bold text-white">Get started</NavLink></div>}</div>}
    </header>
  );
};

export default NavBarNew;
