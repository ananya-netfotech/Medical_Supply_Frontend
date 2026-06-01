import Navbar from "../Components/Homepage/Navbar";
import HeroSection from "../Components/Homepage/Hero";
import StatsSection from "../Components/Homepage/StatsSection";
import FeaturesSection from "../Components/Homepage/FeaturesSection";
import Footer from "../Components/Homepage/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
}