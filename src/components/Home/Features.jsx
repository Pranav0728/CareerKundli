import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Target, LineChart, FileText, TrendingUp, Map } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Resume Analysis",
    description: "Upload your resume and get instant AI-powered analysis of your skills, roles, education, and achievements.",
  },
  {
    icon: TrendingUp,
    title: "Growth Score & Next Roles",
    description: "Discover your career growth potential and personalized recommendations for your next career moves.",
  },
  {
    icon: Map,
    title: "Career Roadmap",
    description: "Get a detailed short, mid, and long-term roadmap with actionable steps to reach your career goals.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 px-4 ">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to navigate your professional journey
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-cosmic flex items-center justify-center mb-4 cosmic-glow">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
