"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles, Star, TrendingUp, FileText, Calendar, User } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

const Profile = () => {
  const [user, setUser] = useState({
    email: "",
    emailVerified: "",
    results: [],
    subscription: {
      isActive: false,
      plan: "free"
    }
  });

  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  console.log(session?.user?.image);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('/api/profile');
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        toast.error('Error loading profile data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="relative h-32 w-32">
          <div className="absolute inset-0 rounded-full border-2 border-primary/40 animate-spin-slow" />
          <div className="absolute inset-2 rounded-full border-2 border-primary/60 animate-spin-slower" />
          <Star className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-primary animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Cosmic Backdrop */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/assets/cosmic-hero.jpg" 
          alt="Cosmic background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      </div>

      {/* Floating stars */}
      <Star className="fixed top-20 left-10 w-6 h-6 text-primary/30 animate-float" />
      <Sparkles className="fixed top-40 right-20 w-5 h-5 text-primary/40 animate-pulse-glow" />
      <Star className="fixed bottom-32 left-1/4 w-4 h-4 text-primary/20 animate-float" />
      <Sparkles className="fixed bottom-20 right-1/3 w-6 h-6 text-primary/30 animate-pulse-glow" />

      <Navbar />
      
      <div className="relative z-10 container mx-auto px-4 py-24">
        {/* Hero Profile Card */}
        <Card className="max-w-4xl mx-auto mb-8 bg-card/90 backdrop-blur-lg border-primary/20 shadow-xl glow-gold">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Avatar className="w-24 h-24 border-2 border-primary/30 shadow-lg">
                  <AvatarImage src={session?.user?.image || user.email.charAt(0).toUpperCase()} alt="profile_pic" />
                  <AvatarFallback className="bg-gradient-cosmic text-4xl font-bold text-secondary-foreground">{session?.user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary-foreground animate-pulse-glow" />
                </div>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-gradient-gold flex items-center justify-center gap-2">
              <User className="w-7 h-7 text-primary" />
              {user.email.split('@')[0]}
            </CardTitle>
            <p className="text-muted-foreground mt-2">{user.email}</p>
            <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">
              {user.subscription.plan.charAt(0).toUpperCase() + user.subscription.plan.slice(1)} Plan
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Total Analyses */}
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-full bg-primary/20">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gradient-gold">{user.results ? user.results.length : 0}</p>
                    <p className="text-sm text-muted-foreground">Total Analyses</p>
                  </div>
                </div>
              </div>

              {/* Subscription Status */}
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-full bg-primary/20">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gradient-gold">
                      {user.subscription?.isActive ? "Active" : "Inactive"}
                    </p>
                    <p className="text-sm text-muted-foreground">Subscription Status</p>
                  </div>
                </div>
              </div>

              {/* Member Since */}
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-full bg-primary/20">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gradient-gold">
                      {user.emailVerified ? new Date(user.emailVerified).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "N/A"}
                    </p>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="space-y-3 bg-card/50 rounded-lg p-4 border border-border/50">
              <div className="flex justify-between items-center py-2 border-b border-border/30">
                <span className="text-sm font-medium text-muted-foreground">Email Address</span>
                <span className="text-sm font-semibold">{user.email || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/30">
                <span className="text-sm font-medium text-muted-foreground">Subscription Plan</span>
                <span className="text-sm font-semibold capitalize">
                  {user.subscription?.plan || "Free"}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm font-medium text-muted-foreground">Last Updated</span>
                <span className="text-sm font-semibold">
                  {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }) : "N/A"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <Link href="/" className="flex-1">
                <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                  New Analysis
                </button>
              </Link>
              <Link href="/history" className="flex-1">
                <button className="w-full bg-card border border-primary/30 text-foreground hover:bg-primary/10 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                  View History
                </button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Cosmic Achievement Badges */}
        <Card className="max-w-4xl mx-auto bg-card/90 backdrop-blur-lg border-primary/20 shadow-xl glow-purple">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary animate-pulse-glow" />
              Cosmic Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl mb-2">🌟</div>
                <p className="text-xs font-semibold">First Analysis</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl mb-2">✨</div>
                <p className="text-xs font-semibold">10 Analyses</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 hover:scale-105 transition-transform duration-300 opacity-50">
                <div className="text-3xl mb-2">🔮</div>
                <p className="text-xs font-semibold">50 Analyses</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 hover:scale-105 transition-transform duration-300 opacity-50">
                <div className="text-3xl mb-2">🌌</div>
                <p className="text-xs font-semibold">Career Master</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
