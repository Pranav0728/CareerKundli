import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Software Engineer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    content: "Career Kundli helped me discover my true calling. The AI-powered insights were incredibly accurate and guided me towards a career path I love!",
    rating: 5,
  },
  {
    name: "Rahul Mehta",
    role: "Marketing Manager",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    content: "I was skeptical at first, but the blend of astrology and AI provided insights I never expected. Changed my entire career perspective!",
    rating: 5,
  },
  {
    name: "Ananya Patel",
    role: "Product Designer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya",
    content: "The personalized career roadmap aligned perfectly with my strengths. It's like having a career counselor who truly understands you.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 px-4 bg-card">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands who found their career destiny
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                
                {/* Testimonial Text */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                {/* User Info */}
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 border-2 border-primary/20">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
