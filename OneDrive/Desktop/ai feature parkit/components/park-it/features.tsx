"use client";

import { useEffect, useRef, useState } from "react";
import {
  Navigation,
  MapPin,
  Clock,
  Shield,
  Zap,
  Smartphone,
} from "lucide-react";

const FEATURES = [
  {
    icon: Navigation,
    title: "Live GPS Tracking",
    description:
      "Real-time location tracking with accurate positioning across all Gujarat cities and highways.",
  },
  {
    icon: MapPin,
    title: "Smart Spot Finder",
    description:
      "AI-powered algorithms find the nearest available parking spaces based on your destination.",
  },
  {
    icon: Clock,
    title: "ETA & Traffic",
    description:
      "Get accurate travel time estimates with live traffic conditions and alternate route suggestions.",
  },
  {
    icon: Shield,
    title: "Secure Parking",
    description:
      "All listed spots feature CCTV monitoring, security guards, and verified safety ratings.",
  },
  {
    icon: Zap,
    title: "Instant Booking",
    description:
      "Reserve your parking spot in seconds. No more circling blocks looking for spaces.",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description:
      "Seamless experience across all devices with real-time notifications and updates.",
  },
];

export function Features({ onOpenPredictor }: { onOpenPredictor?: () => void }) {
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
    <section ref={ref} id="features" className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-border" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span
            className={`inline-block text-sm font-semibold uppercase tracking-wider text-primary transition-all duration-500 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Features
          </span>
          <h2
            className={`font-display mt-3 text-3xl font-bold text-foreground sm:text-4xl transition-all duration-500 delay-100 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-balance">Everything you need to park smarter</span>
          </h2>
          <p
            className={`mt-4 text-muted-foreground leading-relaxed transition-all duration-500 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Powered by real-time data and intelligent navigation to make parking
            effortless across Gujarat.
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const isClickable = feature.title === "Smart Spot Finder";
            const Wrapper = isClickable ? "button" : "div";
            return (
              <Wrapper
                key={feature.title}
                type={isClickable ? "button" : undefined}
                onClick={isClickable ? onOpenPredictor : undefined}
                className={`group rounded-xl border border-border bg-card p-6 text-left transition-all duration-500 hover:border-primary/30 hover:bg-secondary ${
                  isClickable ? "cursor-pointer ring-1 ring-primary/20 hover:ring-primary/40" : ""
                } ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: visible ? `${300 + i * 100}ms` : "0ms" }}
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="font-sans font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
                {isClickable && (
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                    Try Availability Predictor
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                )}
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
