import { UserCircle, Brain, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: UserCircle,
    title: "Upload Your Resume",
    description: "Simply upload your resume — our AI analyzes your skills, experience, and career patterns.",
  },
  {
    icon: Brain,
    title: "AI Meets Astrology",
    description: "AI + Astrology combine with live job market data to find your ideal path.",
  },
  {
    icon: TrendingUp,
    title: "Discover Your Destiny",
    description: "Get your personalized Career Kundli and future career insights.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-4 bg-card">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground">
            Three simple steps to unlock your career destiny
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative text-center group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-cosmic flex items-center justify-center text-white font-bold text-lg cosmic-glow">
                {index + 1}
              </div>
              
              {/* Icon Container */}
              <div className="mb-6 mt-8 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 glow-effect">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              
              {/* Connector Line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
