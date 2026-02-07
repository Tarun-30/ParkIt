"use client";

import { ArrowLeft, MapPin, Users, Globe, Shield, Target, Heart } from "lucide-react";

const TEAM_VALUES = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To eliminate parking frustration across Gujarat by providing real-time, AI-powered parking intelligence that saves drivers time, fuel, and stress.",
  },
  {
    icon: Globe,
    title: "Coverage",
    description:
      "Currently serving 9+ cities across Gujarat including Ahmedabad, Surat, Vadodara, Rajkot, and Gandhinagar with plans to expand to all major Indian cities.",
  },
  {
    icon: Shield,
    title: "Data Privacy First",
    description:
      "We only use your current location to find nearby parking. We do not store personal data, track your movements, or sell any information to third parties.",
  },
  {
    icon: Heart,
    title: "Built for Gujarat",
    description:
      "Created by a team passionate about solving urban mobility challenges in Gujarat, understanding local traffic patterns, festivals, and city layouts.",
  },
];

const STATS = [
  { label: "Parking Zones", value: "20+" },
  { label: "Cities Covered", value: "9+" },
  { label: "AI Features", value: "15" },
  { label: "Data Points", value: "50K+" },
];

interface AboutPageProps {
  onBack: () => void;
}

export function AboutPage({ onBack }: AboutPageProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
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
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <MapPin className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-sans text-sm font-bold text-foreground sm:text-base">About ParkIT</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Hero */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Users className="h-8 w-8" />
          </div>
          <h1 className="mt-6 font-sans text-3xl font-bold text-foreground sm:text-4xl">
            <span className="text-balance">Smart Parking for a Smarter Gujarat</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            ParkIT uses artificial intelligence and historical open datasets to predict parking
            availability across Gujarat. Our logistic regression model analyzes 15 features including
            traffic patterns, local events, temporal data, and geographic information to give you
            confidence scores for every parking zone.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-5 text-center">
              <p className="font-sans text-2xl font-bold text-primary">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {TEAM_VALUES.map((value) => (
            <div key={value.title} className="rounded-xl border border-border bg-card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <value.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-sans text-lg font-semibold text-foreground">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Technology */}
        <div className="mt-16 rounded-xl border border-border bg-card p-8">
          <h2 className="font-sans text-xl font-bold text-foreground">Our Technology</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            ParkIT{"'"}s availability prediction engine is built on a logistic regression model trained on
            12 months of historical parking occupancy data from Gujarat Municipal Corporations.
            The model processes 15 distinct features to produce a probability score (0-100%)
            for each parking zone, refreshing every 5 minutes. Traffic conditions are analyzed from
            Gujarat SRTC historical flow data, and nearby events are cross-referenced against a
            comprehensive Gujarat event calendar covering festivals, markets, and religious events.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "Logistic Regression",
              "Sigmoid Activation",
              "15-Feature Model",
              "Historical Open Data",
              "5-Min Refresh",
              "Gujarat SRTC Data",
              "Event Calendar AI",
              "Real-Time GPS",
            ].map((tag) => (
              <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
