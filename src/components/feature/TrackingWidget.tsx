import { useState, type FormEvent } from "react";
import { fetchShipmentByAwbNumber, sampleAwbNumber, type Shipment } from "@/lib/shipments";
import TrackingResult from "./TrackingResult";

export default function TrackingWidget() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Shipment | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const id = query.trim();
    if (!id) {
      setError("Please enter your AWB (Air Waybill) number to track your shipment.");
      setResult(null);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const found = await fetchShipmentByAwbNumber(id);
      if (!found) {
        setError(`No shipment found for AWB "${id}". Please check the AWB number and try again.`);
        setResult(null);
      } else {
        setResult(found);
      }
    } catch (err) {
      setError(`Unable to look up your shipment (${(err as Error).message}). Please try again.`);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-background-50 pt-8" aria-labelledby="tracking-heading">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="overflow-hidden rounded-lg border border-background-200 bg-background-100 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col justify-center p-6 md:p-10">
              <h2
                id="tracking-heading"
                className="font-heading text-2xl font-bold text-foreground-950 md:text-3xl"
              >
                Track Your Shipment
              </h2>
              <p className="mt-2 text-sm text-foreground-600 md:text-base">
                Enter your AWB (Air Waybill) number to get the latest shipment status. No login required.
              </p>
              <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row" noValidate>
                <div className="flex-1">
                  <label htmlFor="track-home-id" className="sr-only">
                    AWB Number
                  </label>
                  <input
                    id="track-home-id"
                    type="text"
                    placeholder="Enter AWB number e.g. 7745123390"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full rounded-md border border-background-300 bg-background-50 px-4 py-3.5 text-sm text-foreground-900 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-200"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary-600 px-6 py-3.5 text-sm font-semibold text-background-50 transition hover:bg-primary-700 disabled:opacity-60"
                >
                  {loading ? (
                    <i className="ri-loader-4-line animate-spin" aria-hidden />
                  ) : (
                    <i className="ri-search-line" aria-hidden />
                  )}
                  {loading ? "Tracking..." : "Track Shipment"}
                </button>
              </form>
              {error && (
                <div className="mt-3 flex items-start gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <i className="ri-error-warning-line mt-0.5" aria-hidden />
                  {error}
                </div>
              )}
              <button
                type="button"
                onClick={() => {
                  setQuery(sampleAwbNumber());
                  setError("");
                }}
                className="mt-3 w-fit text-xs font-medium text-primary-600 transition hover:text-primary-700"
              >
                Try sample AWB: {sampleAwbNumber()}
              </button>
            </div>

            <div className="hidden lg:block">
              <img
                src="https://readdy.ai/api/search-image?query=Modern%20logistics%20warehouse%20interior%20with%20digital%20tracking%20screens%20showing%20global%20routes%2C%20stylized%20dark%20blue%20premium%20corporate%20tone%2C%20clean%20minimal%2C%20high%20detail&width=800&height=600&seq=lsl-track-panel-1&orientation=landscape"
                alt="Digital shipment tracking control room"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {result && (
            <div className="border-t border-background-200 p-4 md:p-6">
              <TrackingResult shipment={result} loading={loading} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}