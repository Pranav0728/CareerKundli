import Navbar from "@/components/Navbar";
import Footer from "@/components/Home/Footer";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-4">
          Terms and Conditions
        </h1>
        <p className="text-muted-foreground text-lg mb-12">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p className="text-foreground/90">
              By accessing and using Career Kundli, you accept and agree to be bound by these Terms and Conditions. 
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Service Description</h2>
            <p className="text-foreground/90">
              Career Kundli provides AI-powered career analysis services including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4">
              <li>Resume analysis and skill assessment</li>
              <li>Career growth scoring and predictions</li>
              <li>Skill gap identification</li>
              <li>Personalized career roadmaps</li>
              <li>Career insights and recommendations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Obligations</h2>
            <p className="text-foreground/90 mb-2">You agree to:</p>
            <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4">
              <li>Provide accurate and complete information</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Use the service for lawful purposes only</li>
              <li>Not share your account with others</li>
              <li>Not attempt to reverse engineer or copy our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Intellectual Property</h2>
            <p className="text-foreground/90">
              All content, features, and functionality of Career Kundli are owned by us and protected by 
              copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, 
              or create derivative works without our explicit permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Disclaimer of Warranties</h2>
            <p className="text-foreground/90">
              Career Kundli is provided "as is" without warranties of any kind. While we strive for accuracy, 
              our AI-generated career insights are for informational purposes only and should not be considered 
              professional career advice. We recommend consulting with career counselors for important career decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Limitation of Liability</h2>
            <p className="text-foreground/90">
              Career Kundli shall not be liable for any indirect, incidental, special, or consequential damages 
              resulting from your use or inability to use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Account Termination</h2>
            <p className="text-foreground/90">
              We reserve the right to terminate or suspend accounts that violate these terms, 
              engage in fraudulent activity, or misuse our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Changes to Terms</h2>
            <p className="text-foreground/90">
              We may update these terms from time to time. Continued use of our services after changes 
              constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Contact Information</h2>
            <p className="text-foreground/90">
              For questions about these Terms and Conditions, please contact us at legal@careerkundli.com
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
