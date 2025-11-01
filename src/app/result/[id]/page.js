import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Star, TrendingUp, ArrowLeft, Award, Briefcase, GraduationCap, Target, Zap } from "lucide-react";
import Link from "next/link";
import Report from "@/lib/models/Report";
import { connectDB } from "@/lib/db";

export default async function Result({ params }) {
  const { id } = await params;

  // Connect to DB and fetch report
  await connectDB();
  const report = await Report.findById(id).lean();

  if (!report) {
    return (
      <div className="relative min-h-screen bg-background overflow-hidden flex items-center justify-center">
        <div 
          className="fixed inset-0 opacity-30"
          style={{
            backgroundImage: `url("/assets/cosmic-hero.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(8px)",
          }}
        />
        <Card className="relative z-10 max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-destructive">Report Not Found</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Link href="/history">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to History
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const growth = Math.min(Math.max(report.prediction.growth_score, 0), 100);
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - growth / 100);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Background */}
      <div 
        className="fixed inset-0 opacity-30"
        style={{
          backgroundImage: `url("/assets/cosmic-hero.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
        }}
      />

      {/* Floating Stars */}
      <div className="fixed inset-0 pointer-events-none">
        <Star className="absolute top-20 left-[10%] w-4 h-4 text-primary/40 animate-pulse-glow" />
        <Star className="absolute top-40 right-[15%] w-3 h-3 text-accent/40 animate-float" />
        <Star className="absolute bottom-32 left-[20%] w-5 h-5 text-secondary/40 animate-pulse-glow" />
        <Sparkles className="absolute top-[60%] right-[25%] w-6 h-6 text-primary/30 animate-float" />
      </div>

      <Navbar />

      <div className="relative container mx-auto px-4 py-24 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/history">
            <Button variant="ghost" className="gap-2 mb-4 hover:glow-gold">
              <ArrowLeft className="w-4 h-4" />
              Back to History
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-2 flex items-center gap-3">
            <Sparkles className="w-10 h-10 text-primary animate-pulse-glow" />
            Your Career Kundali
          </h1>
          <p className="text-muted-foreground text-lg">
            Generated on{" "}
            {new Date(report.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Growth & Horoscope */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Growth Orbit */}
          <Card className="lg:col-span-1 glow-gold hover:glow-purple transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Growth Orbit
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative mb-6">
                <svg width="160" height="160" className="rotate-[-90deg]">
                  <defs>
                    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="hsl(var(--accent))" />
                    </linearGradient>
                  </defs>
                  <circle cx="80" cy="80" r={radius} stroke="hsl(var(--muted))" strokeWidth="12" fill="none" />
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    stroke="url(#goldGrad)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    fill="none"
                    className="drop-shadow-[0_0_8px_hsl(var(--primary))]"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gradient-gold">{growth}%</div>
                    <div className="text-xs text-muted-foreground">Growth Score</div>
                  </div>
                </div>
              </div>

              {/* Next Roles */}
              <div className="w-full mb-4">
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  Next Roles
                </h4>
                <div className="flex flex-wrap gap-2">
                  {report.prediction.next_roles.map((role, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Skill Gaps */}
              <div className="w-full">
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-destructive" />
                  Skill Gaps
                </h4>
                <div className="flex flex-wrap gap-2">
                  {report.prediction.skill_gaps.map((gap, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full bg-destructive/10 text-destructive text-sm font-medium">
                      {gap}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Horoscope */}
          <Card className="lg:col-span-2 glow-purple hover:glow-gold transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Career Horoscope
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative rounded-lg border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
                <p className="relative text-foreground leading-relaxed whitespace-pre-wrap">
                  {report.horoscope}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {[
            { title: "Skills", icon: <Sparkles className="w-5 h-5 text-primary" />, data: report.analysis.skills, bg: "bg-accent/20" },
            { title: "Roles", icon: <Briefcase className="w-5 h-5 text-primary" />, data: report.analysis.roles, bg: "bg-secondary/20" },
            { title: "Education", icon: <GraduationCap className="w-5 h-5 text-primary" />, data: report.analysis.education, bg: "bg-primary/10" },
            { title: "Achievements", icon: <Award className="w-5 h-5 text-primary" />, data: report.analysis.achievements, bg: "bg-primary/5 border border-primary/10" },
          ].map((section, i) => (
            <Card key={i} className="hover:scale-[1.02] transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  {section.icon}
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {section.data.map((item, j) => (
                    <span key={j} className={`px-3 py-1.5 rounded-md ${section.bg} text-sm font-medium`}>
                      {item}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
