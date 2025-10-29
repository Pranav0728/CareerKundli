import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Target, LineChart } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI + Astrology Integration",
    description: "Powerful combination of machine learning algorithms and ancient astrological wisdom to provide accurate career insights.",
  },
  {
    icon: Target,
    title: "Career Insights",
    description: "Get detailed analysis of your ideal career paths, work environment preferences, and professional strengths based on your chart.",
  },
  {
    icon: LineChart,
    title: "Skill Growth Path",
    description: "Receive personalized roadmap for skill development aligned with your natural talents and cosmic timing.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 px-4 bg-gradient-hero">
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
