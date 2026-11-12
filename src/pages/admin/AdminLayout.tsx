import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import Logo from "@/components/feature/Logo";
import AdminLogin from "./Login";
import { adminLogout, isAdminAuthed } from "./auth";

const NAV = [
  { to: "/admin/dashboard", icon: "ri-dashboard-3-line", label: "Dashboard" },
  { to: "/admin/enquiries", icon: "ri-file-list-3-line", label: "Service Enquiries" },
  { to: "/admin/orders", icon: "ri-box-3-line", label: "Orders / Shipments" },
];

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  if (!isAdminAuthed()) {
    return <AdminLogin />;
  }

  const handleLogout = () => {
    adminLogout();
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen bg-background-100">
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-background-200 bg-background-50 transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center border-b border-background-200 px-6">
          <Logo dark />
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4" aria-label="Admin navigation">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "text-foreground-600 hover:bg-background-100 hover:text-primary-700"
                }`
              }
            >
              <i className={`${item.icon} text-lg`} aria-hidden />
              {item.label}
              {item.to === "/admin/enquiries" && <span className="ml-auto text-xs font-semibold text-primary-600">Manage</span>}
            </NavLink>
          ))}

          <div className="my-4 border-t border-background-200" />

          <Link
            to="/"
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-foreground-600 transition hover:bg-background-100 hover:text-primary-700"
          >
            <i className="ri-global-line text-lg" aria-hidden />
            View Website
          </Link>
        </nav>

        <div className="border-t border-background-200 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-foreground-600 transition hover:bg-red-50 hover:text-red-700"
          >
            <i className="ri-logout-box-r-line text-lg" aria-hidden />
            Log Out
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-background-200 bg-background-50 px-4 md:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-md text-foreground-700 hover:bg-background-100 lg:hidden"
              aria-label="Toggle menu"
            >
              <i className="ri-menu-line text-2xl" aria-hidden />
            </button>
            <div>
              <p className="font-heading text-sm font-bold text-foreground-950">Admin Panel</p>
              <p className="text-xs text-foreground-500">LSL Logistics Network</p>
            </div>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-background-300 px-3 py-1.5 text-xs font-medium text-foreground-700 transition hover:bg-background-100"
            >
              <i className="ri-global-line" aria-hidden />
              View Website
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-background-300 px-3 py-1.5 text-xs font-medium text-foreground-700 transition hover:bg-red-50 hover:text-red-700"
            >
              <i className="ri-logout-box-r-line" aria-hidden />
              Log Out
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}