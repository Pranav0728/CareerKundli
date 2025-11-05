import Navbar from "@/components/Navbar";
import Footer from "@/components/Home/Footer";

const CancellationsAndRefunds = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-4">
          Cancellations and Refunds
        </h1>
        <p className="text-muted-foreground text-lg mb-12">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Refund Policy</h2>
            <p className="text-lg mb-4">
            Due to the digital nature of our products, we do not offer refunds
            once the report has been generated and sent.
          </p>
          </section>


        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CancellationsAndRefunds;
