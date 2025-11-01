import { Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-12 px-4 bg-gradient-cosmic  overflow-hidden">
      {/* Celestial Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-glow-pulse" />
        <div className="absolute top-20 right-1/3 w-1.5 h-1.5 bg-white/30 rounded-full animate-glow-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-10 left-1/3 w-2.5 h-2.5 bg-white/30 rounded-full animate-glow-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 right-1/4 w-1.5 h-1.5 bg-white/30 rounded-full animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative container mx-auto max-w-6xl">
        <div className="text-center border-t border-white/20 pt-12">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center glow-effect">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-white">Career Kundli</span>
          </div>
          
          {/* Description */}
          <p className="text-white/80 mb-8 max-w-md mx-auto">
            Discover your career destiny through the perfect blend of AI and Astrology
          </p>
          
          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
            <a href="#" className="text-white/70 hover:text-white transition-colors">About</a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">Features</a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">Contact</a>
          </div>
          
          {/* Copyright */}
          <p className="text-white/60 text-sm">
            © 2024 Career Kundli. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
