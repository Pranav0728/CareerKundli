"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Star, TrendingUp, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";



const History = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    async function run() {
      try {
        const res = await fetch("/api/reports");
        const data = await res.json();
        setReports(Array.isArray(data.reports) ? data.reports : []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    run();
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Cosmic Backdrop */}
      <div
        className="fixed inset-0 opacity-30"
        style={{
          backgroundImage: `url(/assets/cosmic-hero.jpg)`,
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

      <div className="relative container mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-4 flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-primary animate-pulse-glow" />
            Your Cosmic Journey
          </h1>
          <p className="text-muted-foreground text-lg">
            Review your past career readings and track your professional evolution
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative h-28 w-28 mb-6">
              <div className="absolute inset-0 rounded-full border-2 border-primary/40 animate-spin-slow" />
              <div className="absolute inset-2 rounded-full border-2 border-primary/60 animate-spin-slower" />
              <div className="absolute inset-6 rounded-full bg-primary/30 blur-xl" />
              <Star className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-primary animate-pulse" />
            </div>
            <p className="text-muted-foreground">Retrieving your cosmic records...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && reports.length === 0 && (
          <Card className="max-w-2xl mx-auto glow-gold">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="text-2xl">No Readings Yet</CardTitle>
              <CardDescription className="text-base">
                Your cosmic journey awaits! Upload your resume to unveil your career destiny.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-8">
              <Link href="/">
                <Button size="lg" className="gap-2">
                  <Sparkles className="w-4 h-4" />
                  Get Your First Reading
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Reports Grid */}
        {!loading && reports.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {reports.map((report, index) => (
              <Card
                key={report._id}
                className="group hover:glow-purple transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Star className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          Career Reading #{reports.length - index}
                        </CardTitle>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(report.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-primary">
                        {report.prediction.growth_score}%
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Skills */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-muted-foreground">
                      Detected Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {report.analysis.skills.slice(0, 4).map((skill, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded-md bg-accent/20 text-accent-foreground text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                      {report.analysis.skills.length > 4 && (
                        <span className="px-2 py-1 rounded-md bg-muted text-muted-foreground text-xs">
                          +{report.analysis.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Next Roles */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-muted-foreground">
                      Predicted Roles
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {report.prediction.next_roles.map((role, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Link href={`/result/${report._id}`}>
                    <Button variant="ghost" className="w-full gap-2 group-hover:bg-primary/10 group-hover:text-primary">
                      View Full Reading
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
