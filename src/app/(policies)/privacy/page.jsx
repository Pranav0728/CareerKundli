import Navbar from "@/components/Navbar";
import Footer from "@/components/Home/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-4">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground text-lg mb-12">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
            <p className="text-foreground/90 mb-2">We collect the following types of information:</p>
            <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4">
              <li><strong>Account Information:</strong> Name, email address, password</li>
              <li><strong>Resume Data:</strong> Information from uploaded resumes including skills, experience, education, and achievements</li>
              <li><strong>Usage Data:</strong> How you interact with our service, features used, and time spent</li>
              <li><strong>Payment Information:</strong> Processed securely through third-party payment processors</li>
              <li><strong>Device Information:</strong> Browser type, IP address, device type</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
            <p className="text-foreground/90 mb-2">We use your information to:</p>
            <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4">
              <li>Provide and improve our career analysis services</li>
              <li>Generate personalized career insights and recommendations</li>
              <li>Process your payments and manage subscriptions</li>
              <li>Send important account updates and service notifications</li>
              <li>Improve our AI algorithms and service quality</li>
              <li>Provide customer support</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Data Security</h2>
            <p className="text-foreground/90">
              We implement industry-standard security measures to protect your data:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4">
              <li>End-to-end encryption for data transmission</li>
              <li>Secure storage of resume data and personal information</li>
              <li>Regular security audits and updates</li>
              <li>Limited employee access to personal data</li>
              <li>Secure payment processing through certified providers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Data Sharing</h2>
            <p className="text-foreground/90 mb-2">
              We do not sell your personal information. We may share your data only with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4">
              <li><strong>Service Providers:</strong> Third-party services that help operate our platform (cloud hosting, payment processing)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Your Rights</h2>
            <p className="text-foreground/90 mb-2">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your account and data</li>
              <li><strong>Data Portability:</strong> Request your data in a portable format</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Data Retention</h2>
            <p className="text-foreground/90">
              We retain your data for as long as your account is active. After account deletion, 
              we may retain certain information for legal compliance, fraud prevention, and resolving disputes. 
              Resume data is permanently deleted within 30 days of account closure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Cookies and Tracking</h2>
            <p className="text-foreground/90">
              We use cookies and similar technologies to improve user experience, analyze usage patterns, 
              and personalize content. You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Children's Privacy</h2>
            <p className="text-foreground/90">
              Our service is not intended for users under 18 years of age. We do not knowingly collect 
              information from children. If we learn we have collected data from a child, we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. International Data Transfers</h2>
            <p className="text-foreground/90">
              Your data may be transferred to and processed in countries other than your own. 
              We ensure appropriate safeguards are in place for such transfers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Changes to Privacy Policy</h2>
            <p className="text-foreground/90">
              We may update this Privacy Policy from time to time. We will notify you of significant changes 
              via email or through our service. Continued use after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Contact Us</h2>
            <p className="text-foreground/90">
              For privacy-related questions or to exercise your rights, contact us at:<br />
              Email: privacy@careerkundli.com<br />
              Address: Career Kundli Inc., 123 Career Avenue, Tech City, TC 12345
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
