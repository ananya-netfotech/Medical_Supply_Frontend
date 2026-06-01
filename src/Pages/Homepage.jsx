import Navbar from "../Components/Navbar";
import HeroSection from "../Components/Homepage/Hero";
import WhyPlatformSection from "../Components/Homepage/WhyPlatformSection";
import StakeholderSection from "../Components/Homepage/StakeholderSection";
import MedicineJourneySection from "../Components/Homepage/MedicineJourneySection";
import AyushmanSection from "../Components/Homepage/AyushmanSection";
import CapabilitiesSection from "../Components/Homepage/CapabilitiesSection";
import DashboardPreviewSection from "../Components/Homepage/DashboardPreviewSection";
import ArchitectureSection from "../Components/Homepage/ArchitectureSection";
import OutcomesSection from "../Components/Homepage/OutcomesSection";
import CTASection from "../Components/Homepage/CTASection";
import Footer from "../Components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <HeroSection />
      <WhyPlatformSection />
      <StakeholderSection />
      <MedicineJourneySection />
      <AyushmanSection />
      <CapabilitiesSection />
      <DashboardPreviewSection />
      <ArchitectureSection />
      <OutcomesSection />
      <CTASection />
      <Footer />
    </div>
  );
}