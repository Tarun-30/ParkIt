"use client";

import { useEffect, useRef, useState } from "react";
import {
  Search,
  MapPin,
  Navigation,
  CheckCircle2,
  Database,
  Brain,
  RefreshCw,
  Activity,
  Clock,
  Cpu,
} from "lucide-react";

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

const ALGORITHM_DETAILS = [
  {
    icon: Database,
    title: "Data Collection",
    detail:
      "We aggregate parking data from 20+ verified locations across Gujarat. Historical occupancy patterns are derived from open municipal datasets and traffic flow records published by Gujarat state authorities.",
    metric: "20+ Sources",
  },
  {
    icon: Brain,
    title: "Logistic Regression Model",
    detail:
      "Our prediction engine uses a 13-feature logistic regression model. Features include time-of-day, day-of-week (cyclical encoding with sin/cos), traffic conditions, nearby event density, parking type scores, and geographic coordinates normalized to Gujarat's bounding box.",
    metric: "13 Features",
  },
  {
    icon: Cpu,
    title: "Sigmoid Prediction",
    detail:
      "The model computes z = bias + SUM(wi * xi) for all features, then applies the sigmoid function sigma(z) = 1/(1 + e^(-z)) to produce a 0-100% confidence score. Each factor's contribution is broken down so you can see exactly why a prediction was made.",
    metric: "Real-Time",
  },
  {
    icon: RefreshCw,
    title: "30-Second Refresh",
    detail:
      "Parking availability data refreshes every 30 seconds using simulated sensor readings and historical pattern matching. Prediction weights are recalibrated daily based on accumulated open data to keep accuracy above 85%.",
    metric: "Every 30s",
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
    <section ref={ref} id="how-it-works" className="relative py-24 lg:py-32 bg-secondary/30">
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

        {/* Steps */}
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

        {/* Algorithm deep dive */}
        <div className="mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <span
              className={`inline-block text-sm font-semibold uppercase tracking-wider text-primary transition-all duration-500 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Under the Hood
            </span>
            <h3
              className={`font-display mt-3 text-2xl font-bold text-foreground sm:text-3xl transition-all duration-500 delay-100 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="text-balance">How our prediction algorithm works</span>
            </h3>
            <p
              className={`mt-4 text-sm text-muted-foreground leading-relaxed transition-all duration-500 delay-200 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Our availability predictor uses a logistic regression model trained
              on historical open datasets from Gujarat traffic and municipal parking
              systems. Here is how data flows from raw input to confidence score.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {ALGORITHM_DETAILS.map((item, i) => (
              <div
                key={item.title}
                className={`group rounded-xl border border-border bg-card p-6 transition-all duration-500 hover:border-primary/30 hover:bg-secondary ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: visible ? `${600 + i * 100}ms` : "0ms" }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold text-primary">
                    {item.metric}
                  </span>
                </div>
                <h4 className="mt-4 font-sans font-semibold text-foreground">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Data flow diagram */}
          <div
            className={`mt-8 rounded-xl border border-border bg-card p-6 sm:p-8 transition-all duration-500 delay-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              Data Pipeline
            </h4>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { label: "Open Data Sources", sub: "Municipal + Traffic APIs" },
                { label: "Feature Extraction", sub: "13 normalized features" },
                { label: "Logistic Regression", sub: "Pre-trained weights" },
                { label: "Sigmoid Transform", sub: "z to probability" },
                { label: "Confidence Score", sub: "0-100% per spot" },
              ].map((step, i, arr) => (
                <div key={step.label} className="flex items-center gap-3">
                  <div className="rounded-lg border border-border bg-secondary px-4 py-3 text-center">
                    <p className="text-xs font-semibold text-foreground">{step.label}</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">{step.sub}</p>
                  </div>
                  {i < arr.length - 1 && (
                    <span className="text-primary font-bold text-lg hidden sm:block">{">"}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-2">
              <Clock className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs text-muted-foreground">
                Availability data refreshes every <strong className="text-foreground">30 seconds</strong> | Prediction weights recalibrated <strong className="text-foreground">daily</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
