"use client";

import { ArrowLeft, MapPin, Shield, Eye, Lock, Trash2, Server } from "lucide-react";

const SECTIONS = [
  {
    icon: Eye,
    title: "What Data We Collect",
    content: [
      "Current GPS location (only when you actively search for parking) - we use this solely to find nearby parking spots.",
      "We do NOT store your location history, travel patterns, or movement data.",
      "We do NOT require you to create an account, provide your name, email, or any personal information.",
      "No cookies are used for tracking. We use minimal session data for app functionality only.",
    ],
  },
  {
    icon: Lock,
    title: "How We Use Your Location",
    content: [
      "Your current location is used exclusively to calculate distances to nearby parking zones.",
      "Location data is processed client-side in your browser and is never sent to or stored on our servers.",
      "When you close the app or navigate away, your location data is immediately discarded.",
      "We do not build location profiles, heatmaps, or any analytics from individual user locations.",
    ],
  },
  {
    icon: Server,
    title: "Data Storage & Security",
    content: [
      "Parking availability predictions are computed in real-time using pre-loaded historical datasets.",
      "Historical data used for AI predictions is aggregated and anonymized municipal parking data - it contains no personal information.",
      "All traffic and event analysis is performed using publicly available open datasets from Gujarat government sources.",
      "We use HTTPS encryption for all data transmission.",
    ],
  },
  {
    icon: Trash2,
    title: "Data Retention",
    content: [
      "We retain zero personal user data. There is nothing to delete because we never store it.",
      "Search queries are not logged or stored.",
      "No user profiles, accounts, or identifiers are created.",
      "If you wish to verify our data practices, our prediction engine runs entirely client-side.",
    ],
  },
  {
    icon: Shield,
    title: "Third-Party Sharing",
    content: [
      "We do NOT sell, share, or transfer any user data to third parties.",
      "We do NOT use any third-party analytics, advertising, or tracking services.",
      "Map tiles are loaded from OpenStreetMap, which has its own privacy policy. No user data is sent to them.",
      "We do not integrate with any social media platforms or data brokers.",
    ],
  },
];

interface PrivacyPageProps {
  onBack: () => void;
}

export function PrivacyPage({ onBack }: PrivacyPageProps) {
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
            <span className="font-sans text-sm font-bold text-foreground sm:text-base">Privacy Policy</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Shield className="h-8 w-8" />
          </div>
          <h1 className="mt-6 font-sans text-3xl font-bold text-foreground sm:text-4xl">
            <span className="text-balance">Your Privacy Matters</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            ParkIT is built with a privacy-first approach. We only use your current location to
            find nearby parking - nothing more. We do not collect, store, or share any personal data.
          </p>
        </div>

        {/* Key promise */}
        <div className="mt-10 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
          <p className="font-sans text-lg font-bold text-foreground">
            We only take logs of your current location to find parking near you.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Your data is private and never stored, shared, or sold. Period.
          </p>
        </div>

        {/* Sections */}
        <div className="mt-12 flex flex-col gap-6">
          {SECTIONS.map((section) => (
            <div key={section.title} className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <section.icon className="h-5 w-5" />
                </div>
                <h2 className="font-sans text-lg font-semibold text-foreground">{section.title}</h2>
              </div>
              <ul className="mt-4 flex flex-col gap-3">
                {section.content.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-xs text-muted-foreground">
          Last updated: February 2026. If you have questions, reach out via our contact page.
        </p>
      </div>
    </div>
  );
}
