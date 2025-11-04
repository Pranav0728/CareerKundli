"use client";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export default function FloatingSparkles() {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    // Generate random positions only on client
    const newSparkles = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {sparkles.map((sparkle, i) => (
        <div
          key={i}
          className="absolute animate-pulse-glow"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            animationDelay: sparkle.delay,
          }}
        >
          <Sparkles className="w-4 h-4 text-primary/60" />
        </div>
      ))}
    </div>
  );
}
