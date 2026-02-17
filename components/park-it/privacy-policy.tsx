"use client";

import { ArrowLeft, Shield, Lock, Eye, MapPin, Trash2, Server } from "lucide-react";

interface PrivacyPolicyProps {
  onBack: () => void;
}

const SECTIONS = [
  {
    icon: MapPin,
    title: "Location Data",
    content:
      "ParkIT only accesses your current GPS location when you explicitly use the \"My Location\" feature or the Explore Map. This location data is used solely to find nearby parking spots in real-time. We do NOT store your location history, track your movements, or create location profiles. Your coordinates are processed in-memory and discarded immediately after the parking search completes.",
  },
  {
    icon: Lock,
    title: "No Personal Data Collection",
    content:
      "ParkIT does not require account creation, login, or any personal information. We do not collect names, emails, phone numbers, or any personally identifiable information (PII). There are no cookies that track your browsing behavior across websites. The only data stored locally is your UI preferences (like dark mode) which never leave your device.",
  },
  {
    icon: Eye,
    title: "What We See",
    content:
      "When you use ParkIT, we process: (1) Your current GPS coordinates (only when you grant permission), (2) Your search queries to find locations in Gujarat, and (3) Basic anonymous analytics (page views, feature usage counts) to improve the service. None of this data is linked to any individual user.",
  },
  {
    icon: Trash2,
    title: "Data Retention",
    content:
      "Since we don't collect personal data, there is nothing to retain. Location data exists only during your active browser session and is never written to any database. Anonymous usage analytics are aggregated (e.g., \"500 searches today in Ahmedabad\") and individual request logs are purged within 24 hours.",
  },
  {
    icon: Server,
    title: "Third-Party Services",
    content:
      "ParkIT uses OpenStreetMap for map tiles (no tracking). Our parking data comes from publicly available municipal datasets and verified on-ground sources. We do not integrate any third-party advertising, tracking pixels, social media buttons, or analytics services that would compromise your privacy.",
  },
  {
    icon: Shield,
    title: "Open Source Commitment",
    content:
      "Our prediction algorithms use publicly available open datasets from Gujarat traffic and municipal parking systems. The logistic regression model is transparent -- you can see the exact factors and weights used in every prediction through the Factor Analysis breakdown in our Availability Predictor feature.",
  },
];

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass sticky top-0 z-10 border-b border-border px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-4xl items-center gap-3">
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
              <Shield className="h-4 w-4" />
            </div>
            <div>
              <h1 className="font-sans text-sm font-bold text-foreground sm:text-base">
                Privacy Policy
              </h1>
              <p className="hidden text-[10px] text-muted-foreground sm:block">
                Last updated: February 2026
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {/* Summary */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold text-foreground">
            Privacy at a Glance
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            <strong className="text-foreground">ParkIT takes only your current location logs</strong> to find nearby parking.
            We do not collect personal data, do not track your movements, and do
            not share anything with third parties. Your privacy is not just a
            feature -- it is a core principle of how we built this app.
          </p>
        </div>

        {/* Sections */}
        <div className="mt-10 flex flex-col gap-6">
          {SECTIONS.map((section, i) => (
            <div
              key={section.title}
              className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/20"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <section.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-foreground">
                    {section.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-10 rounded-xl border border-border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Questions about our privacy practices? Reach out at{" "}
            <span className="font-medium text-primary">privacy@parkit.dev</span>
          </p>
        </div>
      </div>
    </div>
  );
}
