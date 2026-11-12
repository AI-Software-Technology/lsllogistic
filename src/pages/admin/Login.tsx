import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { adminLogin, ADMIN_HINT } from "./auth";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!adminLogin(password)) {
      setError("Incorrect admin password. Please try again.");
      return;
    }
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background-100 px-4">
      <div className="w-full max-w-sm rounded-lg border border-background-200 bg-background-50 p-8 shadow-card md:p-10">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-100">
            <i className="ri-lock-2-line text-2xl text-primary-700" aria-hidden />
          </span>
          <h1 className="mt-5 font-heading text-2xl font-bold text-foreground-950">Admin Panel</h1>
          <p className="mt-2 text-sm text-foreground-600">
            LSL Logistics Network — secure operations console.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8" noValidate>
          <label htmlFor="admin-password" className="mb-1.5 block text-xs font-semibold text-foreground-700">
            Admin Password
          </label>
          <div className="relative">
            <input
              id="admin-password"
              name="password"
              type={show ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full rounded-md border border-background-300 bg-background-50 px-4 py-3 pr-12 text-sm text-foreground-900 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-200"
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-400 transition hover:text-foreground-700"
              aria-label={show ? "Hide password" : "Show password"}
            >
              <i className={show ? "ri-eye-off-line text-lg" : "ri-eye-line text-lg"} aria-hidden />
            </button>
          </div>

          {error && (
            <div className="mt-3 flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <i className="ri-error-warning-line mt-0.5" aria-hidden />
              {error}
            </div>
          )}

          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-background-50 transition hover:bg-primary-700"
          >
            <i className="ri-login-box-line" aria-hidden />
            Sign In
          </button>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-foreground-500">
            <i className="ri-information-line" aria-hidden />
            Demo password: <span className="font-semibold text-foreground-700">{ADMIN_HINT}</span>
          </p>
        </form>

        <div className="mt-6 border-t border-background-200 pt-5 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-600 transition hover:text-primary-700"
          >
            <i className="ri-arrow-left-line" aria-hidden />
            Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}