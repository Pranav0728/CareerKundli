import Navbar from "@/components/Navbar";
import Footer from "@/components/Home/Footer";

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-4">
          Shipping Policy
        </h1>
        <p className="text-muted-foreground text-lg mb-12">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Digital Service</h2>
            <p className="text-foreground/90">
              Career Kundli is a digital service that provides AI-powered career analysis and insights. 
              As we provide exclusively digital services, there are no physical products to ship.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Service Delivery</h2>
            <p className="text-foreground/90">
              All our services are delivered digitally and instantly upon successful payment:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4">
              <li>Career analysis reports are generated immediately after resume upload</li>
              <li>Results are accessible through your account dashboard</li>
              <li>Reports can be downloaded as PDF files</li>
              <li>No shipping fees or delivery times apply</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Access to Services</h2>
            <p className="text-foreground/90">
              Once you purchase a subscription or service:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4">
              <li>You receive immediate access to all purchased features</li>
              <li>Your account is activated within minutes of payment confirmation</li>
              <li>All reports and analyses are stored in your account for future reference</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Technical Requirements</h2>
            <p className="text-foreground/90">
              To access our services, you need:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/90 ml-4">
              <li>A stable internet connection</li>
              <li>A modern web browser (Chrome, Firefox, Safari, or Edge)</li>
              <li>An active email address for account notifications</li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ShippingPolicy;
