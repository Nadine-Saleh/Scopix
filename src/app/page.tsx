import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PricingSection from "@/components/PricingSection";
import ProblemSection from "@/components/ProblemSection";
import TrustSection from "@/components/TrustSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ProblemSection />
      <FeaturesSection />
      <TrustSection />
      <PricingSection />
      <Footer />
    </main>
  );
}
