import Hero from "@/components/Home/Hero";
import HowItWorks from "@/components/Home/HowItWorks";
import Features from "@/components/Home/Features";
import Testimonials from "@/components/Home/Testimonials";
import Footer from "@/components/Home/Footer";
import Navbar from "./Navbar";
import Pricing from "./Pricing";

const LandingPage = () => {
  return (
    <main className="min-h-screen">
        <Navbar />
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
