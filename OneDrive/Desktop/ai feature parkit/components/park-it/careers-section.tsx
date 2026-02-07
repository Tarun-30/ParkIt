"use client";

import { ArrowLeft, Rocket, Zap, Battery, Brain, Car, Globe, MapPin, Sparkles } from "lucide-react";

interface CareersSectionProps {
  onBack: () => void;
}

const FUTURE_FEATURES = [
  {
    icon: Battery,
    title: "EV Charging Slot Booking",
    description:
      "Reserve electric vehicle charging stations alongside parking. See real-time charger availability, power types (Type 2, CCS, CHAdeMO), and estimated charging times before you arrive.",
    status: "In Development",
  },
  {
    icon: Brain,
    title: "AI-Powered Smart Routing",
    description:
      "Machine learning models that learn your parking preferences over time and automatically suggest the best spots based on your destination, budget, and timing patterns.",
    status: "Planned",
  },
  {
    icon: Car,
    title: "Automated Parking Guidance",
    description:
      "Indoor navigation systems that guide you to the exact available bay within multi-level parking structures using IoT sensors and augmented reality overlays.",
    status: "Research",
  },
  {
    icon: Sparkles,
    title: "Predictive Demand Pricing",
    description:
      "AI-driven dynamic pricing that helps parking operators optimize rates and gives drivers the best deals during off-peak hours. Transparent and fair for everyone.",
    status: "Planned",
  },
  {
    icon: Globe,
    title: "Pan-India Expansion",
    description:
      "Expanding beyond Gujarat to cover major metros like Mumbai, Delhi, Bangalore, and Chennai. Same smart parking experience, scaled across India.",
    status: "Planned",
  },
  {
    icon: MapPin,
    title: "Smart City Integration",
    description:
      "Direct integration with Gujarat municipal smart city platforms for real-time traffic signal coordination, parking meter connectivity, and automated fine management.",
    status: "Research",
  },
];

const STATUS_COLORS: Record<string, string> = {
  "In Development": "bg-primary/10 text-primary border-primary/30",
  Planned: "bg-yellow-400/10 text-yellow-400 border-yellow-400/30",
  Research: "bg-blue-400/10 text-blue-400 border-blue-400/30",
};

export function CareersSection({ onBack }: CareersSectionProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass sticky top-0 z-10 border-b border-border px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-5xl items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Rocket className="h-4 w-4" />
            </div>
            <div>
              <h1 className="font-sans text-sm font-bold text-foreground sm:text-base">
                Careers & Future Roadmap
              </h1>
              <p className="hidden text-[10px] text-muted-foreground sm:block">
                What we are building next at ParkIT
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        {/* Intro */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            <span className="text-balance">The future of smart parking</span>
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            ParkIT is just getting started. We have an ambitious roadmap of
            exciting features powered by AI, IoT, and open data that will
            transform how Gujarat parks. Here is what is coming next.
          </p>
        </div>

        {/* Future features grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FUTURE_FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:bg-secondary"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-5 w-5" />
                </div>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${STATUS_COLORS[feature.status]}`}
                >
                  {feature.status}
                </span>
              </div>
              <h3 className="mt-4 font-sans font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Join us */}
        <div className="mt-16 rounded-xl border border-primary/20 bg-primary/5 p-6 sm:p-8 text-center">
          <Zap className="mx-auto h-8 w-8 text-primary" />
          <h3 className="mt-4 font-display text-xl font-bold text-foreground">
            Want to build the future of parking?
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            We are looking for passionate developers, data scientists, and urban
            planners who want to solve real-world mobility problems. ParkIT is
            open to collaborators who share our vision of smarter cities.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="mailto:careers@parkit.dev"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 active:scale-95"
            >
              Get in Touch
            </a>
            <span className="text-xs text-muted-foreground">
              careers@parkit.dev
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
