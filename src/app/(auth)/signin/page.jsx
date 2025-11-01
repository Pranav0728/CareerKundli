"use client";

import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";
import { useToast } from "@/components/Hooks/use-toast";

export default function SignIn() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (session) router.push("/");
  }, [session, router]);

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await signIn("email", { email, redirect: false });
      setLoading(false);
      if (res?.error) return setError(res.error);
      toast.success("Check your email for the magic link!");
    } catch {
      setLoading(false);
      setError("Something went wrong");
    }
  };

  const handleGoogle = async () => await signIn("google", { callbackUrl: "/" });
  const handleGithub = async () => await signIn("github", { callbackUrl: "/" });

  if (status === "loading") return <p className="text-center mt-10">Loading...</p>;

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left side image */}
      <div className="hidden lg:block relative">
        <Image
          src="/assets/hero-cosmic.jpg"
          alt="Career cosmic inspiration"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
      </div>

      {/* Right side login card */}
      <div className="flex items-center justify-center bg-background p-8">
        <Card className="w-full max-w-md glow-effect">
          <CardContent className="p-8">
            <div className="flex items-center justify-center gap-2 mb-8">
              <Sparkles className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-gradient-gold">
                Career Kundli
              </h1>
            </div>

            <h2 className="text-2xl font-bold text-center mb-2">
              Welcome Back
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              Sign in to unlock your career destiny
            </p>

            <form onSubmit={handleEmailSignIn} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="bg-background/50"
                  required
                />
              </div>

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <Button
                type="submit"
                variant="hero"
                className="w-full"
                size="lg"
                disabled={loading}
              >
                {loading ? "Sending link..." : "Send Magic Link"}
              </Button>
            </form>

            <div className="my-6 flex items-center">
              <div className="flex-1 h-px bg-border" />
              <span className="mx-3 text-xs text-muted-foreground">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button onClick={handleGoogle} variant="outline">
                Continue with Google
              </Button>
              <Button onClick={handleGithub} variant="outline">
                Continue with GitHub
              </Button>
            </div>

            <button
              onClick={() => router.push("/")}
              className="mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors w-full text-center"
            >
              ← Back to Home
            </button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
