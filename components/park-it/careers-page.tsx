"use client";

import { ArrowLeft, MapPin, Rocket, Sparkles, Zap, Battery, Car, Brain, Globe } from "lucide-react";

const FUTURE_FEATURES = [
  {
    icon: Battery,
    title: "EV Charging Slot Booking",
    description:
      "Reserve electric vehicle charging stations in advance. View real-time availability, charging speeds, and estimated wait times at EV stations across Gujarat.",
    status: "In Research",
  },
  {
    icon: Brain,
    title: "Deep Learning Predictions",
    description:
      "Upgrade from logistic regression to neural network models for even more accurate availability predictions with LSTM-based time-series forecasting.",
    status: "Planned",
  },
  {
    icon: Car,
    title: "Automated Valet Parking",
    description:
      "Integration with smart parking garages that support automated vehicle parking systems, letting your car park itself while you walk away.",
    status: "Future Vision",
  },
  {
    icon: Sparkles,
    title: "AI Parking Assistant",
    description:
      "A conversational AI assistant that learns your parking preferences, frequently visited areas, and suggests optimal parking choices before you even ask.",
    status: "In Research",
  },
  {
    icon: Globe,
    title: "Pan-India Expansion",
    description:
      "Expanding ParkIT from Gujarat to all major Indian metropolitan areas including Mumbai, Delhi, Bangalore, Chennai, and Hyderabad.",
    status: "Planned",
  },
  {
    icon: Zap,
    title: "Smart City Integration",
    description:
      "Direct integration with Gujarat Smart City infrastructure for real-time IoT sensor data from parking lots, traffic signals, and city management systems.",
    status: "Future Vision",
  },
];

const STATUS_COLORS: Record<string, string> = {
  "In Research": "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
  Planned: "bg-primary/10 text-primary border-primary/20",
  "Future Vision": "bg-secondary text-muted-foreground border-border",
};

interface CareersPageProps {
  onBack: () => void;
}

export function CareersPage({ onBack }: CareersPageProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
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
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <MapPin className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-sans text-sm font-bold text-foreground sm:text-base">Careers at ParkIT</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Rocket className="h-8 w-8" />
          </div>
          <h1 className="mt-6 font-sans text-3xl font-bold text-foreground sm:text-4xl">
            <span className="text-balance">The Future of Parking is Being Built Here</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            ParkIT is just getting started. We have an ambitious roadmap of exciting features
            powered by AI, IoT, and smart city technologies. Here is what we are building next
            and where you can contribute.
          </p>
        </div>

        {/* Future Features Roadmap */}
        <h2 className="mt-16 font-sans text-xl font-bold text-foreground">Upcoming Features & Roadmap</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          These are the exciting features we plan to add. If you are passionate about any of these areas, we would love to hear from you.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FUTURE_FEATURES.map((feature) => (
            <div key={feature.title} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="h-5 w-5" />
                </div>
                <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${STATUS_COLORS[feature.status]}`}>
                  {feature.status}
                </span>
              </div>
              <h3 className="mt-4 font-sans font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Join Us */}
        <div className="mt-16 rounded-xl border border-primary/20 bg-primary/5 p-8 text-center">
          <h2 className="font-sans text-xl font-bold text-foreground">Interested in Contributing?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground leading-relaxed">
            We are looking for passionate developers, ML engineers, and urban mobility enthusiasts
            who want to shape the future of smart parking in India. Whether you specialize in AI,
            IoT, mobile development, or urban planning, there is a place for you.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {["ML Engineer", "Full-Stack Dev", "IoT Specialist", "UX Designer", "Data Scientist", "Urban Planner"].map((role) => (
              <span key={role} className="rounded-full border border-primary/20 bg-card px-4 py-1.5 text-xs font-medium text-foreground">
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
