"use client";
import { Button } from "@/components/ui/button";
import { Sparkles, Upload } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";

const Hero = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const router = useRouter();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      toast.success("Resume uploaded!", {
        description: "Click 'Generate Destiny' to continue",
      });
    }
  };

  const handleGenerateDestiny = () => {
    if (!selectedFile) {
      toast.error("Please upload your resume", {
        description: "We need your resume to analyze your career destiny",
      });
      return;
    }
    router.push("/signin");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/hero-cosmic.jpg"
            alt="Cosmic destiny"
            fill
            className="object-cover opacity-60"
          />

          {/* <div className="absolute inset-0 bg-linear-to-b from-background/80 via-background/60 to-background" /> */}
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Floating Cosmic Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-3 h-3 bg-primary rounded-full animate-glow-pulse" />
        <div
          className="absolute top-40 right-20 w-2 h-2 bg-accent rounded-full animate-glow-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-40 left-1/4 w-2.5 h-2.5 bg-secondary rounded-full animate-glow-pulse"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute top-1/3 right-1/3 w-2 h-2 bg-primary rounded-full animate-glow-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in-up">
        <div className="flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2 px-4  mb-8 animate-float">
            <a
              href="https://www.producthunt.com/products/careerkundli?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-careerkundli"
              target="_blank"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1047305&theme=dark&t=1765174588002"
                alt="CareerKundli - AI-Powered Career Astrology for the Modern World | Product Hunt"
                style={{ width: "250px", height: "54px" }}
                width="250"
                height="54"
              />
            </a>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-float">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              AI-Powered Career Astrology
            </span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Discover Your <br />
          <span className="text-gradient-gold">Career Destiny ✨</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Blend of AI & Astrology to guide your professional journey
        </p>

        {/* Demo Upload Section */}
        <div className="max-w-md mx-auto mb-6 space-y-4">
          <div className="relative">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
              id="resume-upload"
            />
            <label
              htmlFor="resume-upload"
              className="flex items-center justify-center gap-3 px-6 py-4 bg-background/50 border-2 border-dashed border-primary/30 rounded-lg cursor-pointer hover:border-primary/50 hover:bg-background/70 transition-all"
            >
              <Upload className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">
                {selectedFile ? selectedFile.name : "Upload Your Resume (Demo)"}
              </span>
            </label>
          </div>

          <Button
            size="lg"
            variant="hero"
            className="text-lg h-14 px-8 w-full"
            onClick={handleGenerateDestiny}
          >
            Generate Your Destiny ✨
          </Button>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          ✨ Join 10,000+ professionals who found their path
        </p>
      </div>
    </section>
  );
};

export default Hero;
