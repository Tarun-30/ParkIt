"use client";

import { useState } from "react";
import { Header } from "@/components/park-it/header";
import { Hero } from "@/components/park-it/hero";
import { Features } from "@/components/park-it/features";
import { HowItWorks } from "@/components/park-it/how-it-works";
import { Coverage } from "@/components/park-it/coverage";
import { Footer } from "@/components/park-it/footer";
import { Dashboard } from "@/components/park-it/dashboard";
import { AvailabilityPredictor } from "@/components/park-it/availability-predictor";

type View = "landing" | "dashboard" | "predictor";

export default function Page() {
  const [view, setView] = useState<View>("landing");

  if (view === "dashboard") {
    return <Dashboard onBack={() => setView("landing")} />;
  }

  if (view === "predictor") {
    return <AvailabilityPredictor onBack={() => setView("landing")} />;
  }

  return (
    <main className="min-h-screen bg-background">
      <Header onGetStarted={() => setView("dashboard")} onOpenPredictor={() => setView("predictor")} />
      <Hero onGetStarted={() => setView("dashboard")} />
      <Features onOpenPredictor={() => setView("predictor")} />
      <HowItWorks />
      <Coverage />

      {/* CTA Section */}
      <section className="relative py-24 lg:py-32 bg-secondary/30">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            <span className="text-balance">Ready to find your perfect parking spot?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground leading-relaxed">
            Join thousands of drivers across Gujarat who save time and fuel
            every day with ParkIT.
          </p>
          <button
            type="button"
            onClick={() => setView("dashboard")}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-10 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 active:scale-95"
          >
            Get Started Now
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
