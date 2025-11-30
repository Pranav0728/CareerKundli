"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Script from "next/script";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function PricingPage() {
  const [currency, setCurrency] = useState("INR");
  const [amount, setAmount] = useState(99); // default INR price
  const session = 
  useEffect(() => {
    const fetchRegion = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        if (data.country_code !== "IN") {
          setCurrency("USD");
          setAmount(2);
        }
      } catch (e) {
        console.error("Could not detect region:", e);
      }
    };
    fetchRegion();
  }, []);
  const handlePayment = async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency }),
      });
      const data = await res.json();
      if (!data.orderId) throw new Error("Order creation failed");
      
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: Math.round(amount * 100),
        currency,
        name: "Career Kundli",
        description: "Career Pro Plan Subscription",
        order_id: data.orderId,
        handler: async function (response) {
          try {
            const capture = await fetch("/api/subscription", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                order_id: response.razorpay_order_id,
                payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                amount,
                currency,
              }),
            });
            const capRes = await capture.json();
            if (!capture.ok) throw new Error(capRes?.error || "Activation failed");
            window.location.href = "/success";
          } catch (err) {
            console.error("Activation error:", err);
            window.location.href = "/failed";
          }
        },
        prefill: {
          name: "User",
          email: "user@example.com",
        },
        theme: { color: "#FBBF24" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment failed:", err);
      window.location.href = "/failed";
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <section className="py-20 px-4 bg-gradient-to-b from-background to-background/50">
        <div className="container mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">
            Choose Your <span className="text-gradient-gold">Career Path</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Unlock your true potential with AI + Astrology
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-2">Free Explorer</h3>
              <p className="text-4xl font-bold text-gradient-gold mb-4">{currency === "INR" ? "₹0" : "$0"}</p>
              <ul className="space-y-3 text-left mb-8">
                <li className="flex items-center gap-2"><Check className="text-primary w-5 h-5"/>1 free analyses/month</li>
                <li className="flex items-center gap-2"><Check className="text-primary w-5 h-5"/>Basic AI + Astrology Insights</li>
                <li className="flex items-center gap-2"><Check className="text-primary w-5 h-5"/>Career Path Recommendations</li>
                <li className="flex items-center gap-2"><Check className="text-primary w-5 h-5"/>Personalized AI roadmap</li>
              </ul>
              <Button variant="outline" className="w-full">Start Free</Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="border-primary shadow-lg glow-effect">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-2">Career Pro</h3>
              <p className="text-4xl font-bold text-gradient-gold mb-4">
                {currency === "INR" ? `₹${amount}` : `$${amount}`}
              </p>
              <ul className="space-y-3 text-left mb-8">
                <li className="flex items-center gap-2"><Check className="text-primary w-5 h-5"/>Unlimited career analyses</li>
                <li className="flex items-center gap-2"><Check className="text-primary w-5 h-5"/>Live job market data</li>
                <li className="flex items-center gap-2"><Check className="text-primary w-5 h-5"/>Personalized AI roadmap</li>
              </ul>
              <Button className="w-full" onClick={handlePayment}>
                Subscribe Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}