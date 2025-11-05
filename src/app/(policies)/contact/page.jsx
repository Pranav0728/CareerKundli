import Navbar from "@/components/Navbar";
import Footer from "@/components/Home/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-4">
          Contact Us
        </h1>
        <p className="text-muted-foreground text-lg mb-12">
          Have questions? We'd love to hear from you.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">support@careerkundli.com</p>
              <p className="text-sm text-muted-foreground mt-2">
                We'll respond within 24 hours
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                Phone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">+1 (555) 123-4567</p>
              <p className="text-sm text-muted-foreground mt-2">
                Mon-Fri, 9am-6pm EST
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Office Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground">
              Career Kundli Inc.<br />
              123 Career Avenue<br />
              Tech City, TC 12345<br />
              United States
            </p>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default ContactUs;