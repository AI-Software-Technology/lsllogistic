import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { servicesNav } from "@/mocks/services";

const mainLinks = [
  { to: "/", label: "Home" },
  { to: "/about-us", label: "About Us" },
  { to: "/track-order", label: "Shipment Tracking" },
  { to: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setDesktopServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const desktopCompact = scrolled ? "h-16" : "h-20";
  const servicesActive = location.pathname.startsWith("/services");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background-50/95 shadow-card backdrop-blur"
          : "bg-background-50/70 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-6">
        <div className={desktopCompact}>
          <Logo />
        </div>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/about-us">About Us</NavItem>

          <div
            className="relative"
            onMouseEnter={() => setDesktopServicesOpen(true)}
            onMouseLeave={() => setDesktopServicesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setDesktopServicesOpen((v) => !v)}
              className={`flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition ${
                servicesActive
                  ? "text-primary-700"
                  : "text-foreground-700 hover:text-primary-700"
              }`}
              aria-expanded={desktopServicesOpen}
            >
              Services
              <i className="ri-arrow-down-s-line text-base" aria-hidden />
            </button>
            <div
              className={`absolute left-0 top-full w-72 pt-2 transition-all duration-200 ${
                desktopServicesOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-1 opacity-0"
              }`}
            >
              <div className="overflow-hidden rounded-lg border border-background-200 bg-background-50 p-2 shadow-soft">
                <div className="grid grid-cols-1 gap-0.5">
                  {servicesNav.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/services/${s.slug}`}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground-700 transition hover:bg-primary-50 hover:text-primary-700"
                    >
                      <i className="ri-arrow-right-s-line text-primary-500" aria-hidden />
                      {s.label}
                    </Link>
                  ))}
                </div>
                <Link
                  to="/services"
                  className="mt-1 flex items-center justify-center gap-1 rounded-md bg-primary-50 px-3 py-2 text-sm font-semibold text-primary-700 transition hover:bg-primary-100"
                >
                  View All Services
                  <i className="ri-arrow-right-line" aria-hidden />
                </Link>
              </div>
            </div>
          </div>

          <NavItem to="/track-order">Shipment Tracking</NavItem>
          <NavItem to="/contact">Contact Us</NavItem>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className="hidden whitespace-nowrap rounded-md bg-primary-600 px-5 py-2.5 text-sm font-semibold text-background-50 transition hover:bg-primary-700 md:inline-flex"
          >
            Get a Quote
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-md text-foreground-800 hover:bg-background-100 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <i className={mobileOpen ? "ri-close-line text-2xl" : "ri-menu-line text-2xl"} aria-hidden />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 top-16 z-40 overflow-y-auto bg-background-50 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 pb-16 pt-4" aria-label="Mobile navigation">
            <Link to="/" className="rounded-md px-3 py-3 text-base font-medium text-foreground-800 hover:bg-background-100">
              Home
            </Link>
            <Link to="/about-us" className="rounded-md px-3 py-3 text-base font-medium text-foreground-800 hover:bg-background-100">
              About Us
            </Link>
            <button
              type="button"
              onClick={() => setMobileServicesOpen((v) => !v)}
              className="flex items-center justify-between rounded-md px-3 py-3 text-base font-medium text-foreground-800 hover:bg-background-100"
              aria-expanded={mobileServicesOpen}
            >
              Services
              <i className={mobileServicesOpen ? "ri-arrow-up-s-line text-xl" : "ri-arrow-down-s-line text-xl"} aria-hidden />
            </button>
            {mobileServicesOpen && (
              <div className="ml-3 border-l border-background-200 pl-3">
                {servicesNav.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    className="block rounded-md px-3 py-2.5 text-sm text-foreground-700 hover:bg-primary-50 hover:text-primary-700"
                  >
                    {s.label}
                  </Link>
                ))}
                <Link
                  to="/services"
                  className="block rounded-md px-3 py-2.5 text-sm font-semibold text-primary-700 hover:bg-primary-50"
                >
                  View All Services
                </Link>
              </div>
            )}
            <Link to="/track-order" className="rounded-md px-3 py-3 text-base font-medium text-foreground-800 hover:bg-background-100">
              Order Tracking
            </Link>
            <Link to="/contact" className="rounded-md px-3 py-3 text-base font-medium text-foreground-800 hover:bg-background-100">
              Contact Us
            </Link>
            <Link
              to="/contact"
              className="mt-3 rounded-md bg-primary-600 px-5 py-3 text-center text-base font-semibold text-background-50"
            >
              Get a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition ${
          isActive ? "text-primary-700" : "text-foreground-700 hover:text-primary-700"
        }`
      }
    >
      {children}
    </NavLink>
  );
}