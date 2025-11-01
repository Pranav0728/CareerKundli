import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";
// import { ModeToggle } from "../ui/ModeToggle";

const LandingNavbar = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-gradient-gold">Career Kundli</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              How it Works
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Testimonials
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Pricing
            </button>
          </div>
          {/* Mode Toggle */}
          {/* <ModeToggle /> */}



          {/* CTA Button */}
          <Link href="/signin" passHref>
          <Button variant="hero" size="sm">
            Get Started
          </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
