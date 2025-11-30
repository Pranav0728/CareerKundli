"use client"
import { useState } from "react";
import { Sparkles, Star, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const Feedback = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Feedback sent! Thank you for helping us improve.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />

      {/* Cosmic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-30" />
        <Star className="absolute top-20 left-10 w-4 h-4 text-primary/30 animate-pulse" />
        <Star className="absolute top-40 right-20 w-3 h-3 text-primary/20 animate-pulse-glow" />
        <Sparkles className="absolute top-60 left-1/4 w-5 h-5 text-primary/25 animate-float" />
        <Star className="absolute bottom-40 right-1/3 w-4 h-4 text-primary/30 animate-pulse" />
        <Sparkles className="absolute bottom-20 left-1/2 w-3 h-3 text-primary/20 animate-float" />
      </div>

      <main className="container mx-auto px-4 py-24 max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 glow-gold mb-4">
            <MessageCircle className="w-8 h-8 text-primary animate-pulse-glow" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gradient-gold">Share Your Feedback</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your thoughts help us align the stars better. We'd love to hear from you.
          </p>
        </div>

        {/* Feedback Form Card */}
        <Card className="max-w-3xl mx-auto border-primary/20 bg-card/80 backdrop-blur-lg glow-purple hover:glow-gold transition-all duration-300">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl">Send Us Your Thoughts</CardTitle>
            <CardDescription className="text-base">
              We typically respond within 24–48 hours. Your feedback shapes our journey.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-6" onSubmit={onSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="Your name"
                    className="border-primary/20 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="you@example.com"
                    className="border-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={onChange}
                  placeholder="How can we help?"
                  className="border-primary/20 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  placeholder="Tell us more about your experience..."
                  className="min-h-[140px] border-primary/20 focus:border-primary resize-none"
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" size="lg" disabled={loading} className="gap-2 group">
                  {loading ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      Send Feedback
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 inline-block mr-1 text-primary" />
            Your feedback is the cosmic fuel that powers our evolution
          </p>
        </div>
      </main>
    </div>
  );
};

export default Feedback;
