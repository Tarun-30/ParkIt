"use client";

import { useEffect, useRef, useState } from "react";
import { Search, MapPin, Navigation, CheckCircle2 } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    number: "01",
    title: "Search Your Destination",
    description:
      "Enter your destination or use GPS to find your current location. Our smart search covers all major cities, landmarks, and areas in Gujarat.",
  },
  {
    icon: MapPin,
    number: "02",
    title: "Choose a Parking Spot",
    description:
      "Browse nearby parking options with real-time availability, pricing, ratings, and amenities. Compare spots and select the perfect one.",
  },
  {
    icon: Navigation,
    number: "03",
    title: "Navigate & Park",
    description:
      "Get turn-by-turn directions with live traffic updates and accurate ETA. Follow the route directly to your selected parking space.",
  },
  {
    icon: CheckCircle2,
    number: "04",
    title: "Park with Confidence",
    description:
      "Arrive at a verified, secure parking spot. All locations feature CCTV monitoring and are regularly reviewed for safety and quality.",
  },
];

export function HowItWorks() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span
            className={`inline-block text-sm font-semibold uppercase tracking-wider text-primary transition-all duration-500 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            How it works
          </span>
          <h2
            className={`font-display mt-3 text-3xl font-bold text-foreground sm:text-4xl transition-all duration-500 delay-100 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-balance">Park in four simple steps</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className={`group relative transition-all duration-600 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: visible ? `${300 + i * 150}ms` : "0ms" }}
            >
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="absolute top-8 left-[calc(50%+30px)] hidden h-px w-[calc(100%-60px)] bg-border lg:block" />
              )}

              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/25">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-card border border-border text-[10px] font-bold text-muted-foreground">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
