import Hero from "@/components/Home/Hero";
import HowItWorks from "@/components/Home/HowItWorks";
import Features from "@/components/Home/Features";
import Testimonials from "@/components/Home/Testimonials";
import Footer from "@/components/Home/Footer";
import LandingNavbar from "@/components/Home/LandingNavbar";
import Pricing from "./Pricing";

const LandingPage = () => {
  return (
    <main className="min-h-screen">
      <LandingNavbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
      <Footer />
    </main>
  );
};

export default LandingPage;
