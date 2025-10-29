import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero px-4">
      <Card className="w-full max-w-md glow-effect">
        <CardContent className="p-8">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-gradient-gold">Career Kundli</h1>
          </div>

          <h2 className="text-2xl font-bold text-center mb-2">Welcome Back</h2>
          <p className="text-center text-muted-foreground mb-8">
            Sign in to unlock your career destiny
          </p>

          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com"
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••"
                className="bg-background/50"
              />
            </div>

            <Button variant="hero" className="w-full" size="lg">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button className="text-primary font-medium hover:underline">
                Sign Up
              </button>
            </p>
          </div>

          <button 
            onClick={() => navigate('/')}
            className="mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors w-full text-center"
          >
            ← Back to Home
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
