"use client";

import { useEffect, useState } from "react";
import { ArrowRight, MapPin, Navigation, Clock, Shield } from "lucide-react";

const STATS = [
  { label: "Parking Spots", value: "6,200+", icon: MapPin },
  { label: "Cities Covered", value: "10+", icon: Navigation },
  { label: "Avg. Save Time", value: "12 min", icon: Clock },
  { label: "Secure Parking", value: "100%", icon: Shield },
];

export function Hero({ onGetStarted, onExploreMap }: { onGetStarted: () => void; onExploreMap?: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-primary/3 blur-[100px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-32 lg:py-40">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div
            className={`mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm text-muted-foreground transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            Live GPS Tracking across Gujarat
          </div>

          {/* Main heading */}
          <h1
            className={`font-display text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl transition-all duration-700 delay-150 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <span className="text-balance">
              Never Circle for{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-primary">Parking</span>
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-primary/20 rounded-sm" />
              </span>{" "}
              Again
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl transition-all duration-700 delay-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <span className="text-pretty">
              Real-time parking availability, smart navigation, and instant spot
              booking across all of Gujarat. Save time, fuel, and frustration.
            </span>
          </p>

          {/* CTA Buttons */}
          <div
            className={`mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center transition-all duration-700 delay-500 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <button
              type="button"
              onClick={onGetStarted}
              className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 active:scale-95"
            >
              Find Parking Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={onExploreMap}
              className="flex items-center gap-2 rounded-xl border border-border bg-transparent px-8 py-4 text-base font-semibold text-foreground transition-all hover:bg-secondary active:scale-95"
            >
              <Navigation className="h-4 w-4" />
              Explore Map
            </button>
          </div>
        </div>

        {/* Stats */}
        <div
          className={`mx-auto mt-20 grid max-w-3xl grid-cols-2 gap-4 lg:grid-cols-4 transition-all duration-700 delay-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5 text-center transition-all hover:border-primary/30 hover:bg-secondary"
            >
              <stat.icon className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
              <span className="font-display text-2xl font-bold text-foreground">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground">Scroll to explore</span>
          <div className="h-8 w-5 rounded-full border-2 border-muted-foreground/30 p-1">
            <div className="h-2 w-1.5 rounded-full bg-primary animate-bounce mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
