import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Free Explorer",
      price: "₹0",
      period: "forever",
      features: [
        "2 Career Kundli Analyses / month",
        "Basic AI + Astrology Insights",
        "Limited Job Market Data",
        "Basic Skill Recommendations"
      ],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Career Pro",
      price: "₹99",
      period: "per month",
      features: [
        "Unlimited Career Analyses",
        "Live Job Market Insights",
        "AI-Generated Career Roadmap",
        "Shareable PDF Reports",
        "Priority Support"
      ],
      cta: "Upgrade Now",
      popular: true
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4 bg-linear-to-b from-background to-background/50">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your <span className="text-gradient-gold">Career Path</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock your potential with AI-powered astrology insights and live market data
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                plan.popular 
                  ? 'border-primary shadow-lg shadow-primary/20 glow-effect' 
                  : 'border-border'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-xs font-bold rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}

              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gradient-gold">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">/ {plan.period}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={plan.popular ? "hero" : "outline"}
                  className="w-full"
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
