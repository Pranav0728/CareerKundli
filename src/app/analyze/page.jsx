"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Sparkles, Star, Orbit, Zap, TrendingUp } from "lucide-react";
import { useToast } from "@/components/Hooks/use-toast";
import Navbar from "@/components/Navbar";

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
        toast({
          title: "Resume uploaded successfully!",
          variant: "default",
        });
      } else {
        toast({
          title: "Please upload a PDF file",
          variant: "destructive",
        });
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        toast({
          title: "Resume uploaded successfully!",
          variant: "default",
        });
      } else {
        toast({
          title: "Please upload a PDF file",
          variant: "destructive",
        });
      }
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast({
        title: "Please upload your resume first!",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      // Create FormData to send the file
      const formData = new FormData();
      formData.append("file", file);

      // Call the analyze API
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      // The API returns { id, result } where result contains the analysis
      setResult(data.result);
      toast({
        title: "Career Kundali generated!",
        variant: "default",
      });
      
      // Optional: Store the report ID for future reference
      if (data.id) {
        console.log("Report saved with ID:", data.id);
      }
    } catch (err) {
      console.error("Analysis error:", err);
      toast({
        title: err.message || "Something went wrong. Please try again!",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const growthScore = result?.prediction?.growth_score ?? 0;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - growthScore / 100);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navbar/>
      {/* Cosmic Background */}
      <div className="fixed inset-0 z-0">
        <img
          src="/assets/cosmic-hero.jpg"
          alt="Cosmic background"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/50 via-background/80 to-background" />
      </div>

      {/* Floating Stars */}
      {/* <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse-glow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            <Sparkles className="w-4 h-4 text-primary/60" />
          </div>
        ))}
      </div> */}

      <div className="relative z-10 container mx-auto px-4 py-12 mt-16">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-float">
          <div className="inline-block mb-6">
            <img
              src="/assets/zodiac-wheel-rbg.png"
              alt="Zodiac"
              className="w-14 h-14 animate-spin-slow opacity-80"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-gradient-gold">
            Career Kundali
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Unveil your professional destiny through cosmic intelligence
          </p>
        </div>

        {/* Upload Section */}
        {!result && (
          <Card className="max-w-2xl mx-auto p-8 bg-card/80 backdrop-blur-xl border-primary/20 glow-gold">
            <div className="text-center mb-6">
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Begin Your Journey</h2>
              <p className="text-muted-foreground">
                Upload your resume and let the cosmos reveal your career path
              </p>
            </div>

            <div
              className={`relative border-2 border-dashed rounded-xl p-12 transition-all ${
                dragActive
                  ? "border-primary bg-primary/10 glow-gold"
                  : "border-primary/30 hover:border-primary/60"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <div className="text-center">
                <Upload className="w-16 h-16 text-primary mx-auto mb-4" />
                {file ? (
                  <div>
                    <p className="text-lg font-semibold text-primary mb-2">
                      {file.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Ready for cosmic analysis
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg mb-2">
                      Drop your resume here or click to browse
                    </p>
                    <p className="text-sm text-muted-foreground">
                      PDF format only
                    </p>
                  </div>
                )}
              </div>
            </div>

            {file && (
              <Button
                onClick={handleAnalyze}
                disabled={loading}
                size="lg"
                className="w-full mt-6 bg-gradient-to-r from-primary via-yellow-400 to-primary text-primary-foreground font-semibold text-lg py-6 hover:opacity-90 transition-opacity"
              >
                {loading ? (
                  <>
                    <Orbit className="w-5 h-5 mr-2 animate-spin" />
                    Reading the Stars...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Career Kundali
                  </>
                )}
              </Button>
            )}
          </Card>
        )}

        {/* Loading State */}
        {loading && (
          <Card className="max-w-3xl mx-auto p-12 bg-card/80 backdrop-blur-xl border-primary/20 glow-purple">
            <div className="flex flex-col items-center text-center gap-6">
              <div className="relative h-32 w-32">
                <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-spin-slow" />
                <div className="absolute inset-3 rounded-full border-4 border-secondary/40 animate-spin-slower" />
                <div className="absolute inset-6 rounded-full border-4 border-accent/50 animate-spin" />
                <div className="absolute inset-10 rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 blur-xl animate-pulse-glow" />
                <Star className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-primary animate-pulse" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-gradient-gold">
                  Aligning the Cosmic Threads
                </h3>
                <p className="text-lg text-muted-foreground">
                  The universe is mapping your skills to the celestial patterns...
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Results */}
        {result && !loading && (
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gradient-gold">
                Your Cosmic Career Blueprint
              </h2>
              <Button
                onClick={() => {
                  setResult(null);
                  setFile(null);
                }}
                variant="outline"
                className="border-primary/30 hover:bg-primary/10"
              >
                Analyze Another Resume
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Career Horoscope */}
              <Card className="p-6 bg-card/80 backdrop-blur-xl border-primary/20 hover:glow-gold transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold">Career Horoscope</h3>
                </div>
                <div className="relative rounded-lg border-2 border-primary/30 p-5 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <div className="absolute -top-2 -left-2 w-12 h-12 rounded-full bg-primary/20 blur-xl" />
                  <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-secondary/20 blur-xl" />
                  <p className="relative leading-relaxed text-foreground/90">
                    {result.horoscope}
                  </p>
                </div>
              </Card>

              {/* Growth Orbit */}
              <Card className="p-6 bg-card/80 backdrop-blur-xl border-secondary/20 hover:glow-purple transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <Orbit className="w-6 h-6 text-secondary" />
                  <h3 className="text-xl font-bold">Growth Orbit</h3>
                </div>

                <div className="flex items-center justify-center py-6">
                  <div className="relative">
                    <svg width="160" height="160" className="rotate-[-90deg]">
                      <defs>
                        <linearGradient
                          id="goldGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop
                            offset="0%"
                            stopColor="hsl(45, 95%, 58%)"
                          />
                          <stop
                            offset="100%"
                            stopColor="hsl(38, 92%, 50%)"
                          />
                        </linearGradient>
                      </defs>
                      <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        stroke="hsl(240, 15%, 20%)"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        stroke="url(#goldGradient)"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        fill="none"
                        className="drop-shadow-[0_0_10px_hsl(45,95%,58%)]"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-gradient-gold">
                          {growthScore}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Growth
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mt-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Next Roles
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {result.prediction.next_roles.map((role, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm border border-primary/30"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Skill Gaps
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {result.prediction.skill_gaps.map((gap, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-destructive/20 text-destructive text-sm border border-destructive/30"
                        >
                          {gap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Constellation Analysis */}
              <Card className="p-6 bg-card/80 backdrop-blur-xl border-accent/20 hover:glow-purple transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="w-6 h-6 text-accent" />
                  <h3 className="text-xl font-bold">Constellation Map</h3>
                </div>

                <div className="space-y-5">
                  <div>
                    <h4 className="font-semibold mb-2 text-primary">✦ Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.analysis.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-md bg-accent/10 text-accent-foreground text-sm border border-accent/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-secondary">✦ Roles</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.analysis.roles.map((role, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-md bg-secondary/10 text-secondary-foreground text-sm border border-secondary/20"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-primary">✦ Education</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.analysis.education.map((edu, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-md bg-primary/10 text-secondary-foreground text-sm border border-primary/20"
                        >
                          {edu}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-green-400">
                      ✦ Achievements
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {result.analysis.achievements.map((achievement, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-md bg-green-500/10 text-green-400 text-sm border border-green-500/20"
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
