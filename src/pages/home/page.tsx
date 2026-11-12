import Hero from "./components/Hero";
import TrackingWidget from "@/components/feature/TrackingWidget";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import WhyLslSection from "./components/WhyLslSection";
import StatsSection from "./components/StatsSection";
import GlobalMapSection from "./components/GlobalMapSection";
import ProcessSection from "./components/ProcessSection";
import QuoteSection from "./components/QuoteSection";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title =
      "LSL Logistics Network | Freight Forwarding & Supply Chain Solutions in India";
  }, []);

  return (
    <>
      <Hero />
      <TrackingWidget />
      <AboutSection />
      <ServicesSection />
      <WhyLslSection />
      <StatsSection />
      <GlobalMapSection />
      <ProcessSection />
      <QuoteSection />
    </>
  );
}