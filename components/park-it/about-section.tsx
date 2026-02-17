"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Shield, MapPin, Heart, Lock, Eye } from "lucide-react";

const VALUES = [
  {
    icon: Users,
    title: "Community First",
    description:
      "Built by drivers, for drivers. We understand the daily struggle of finding parking in crowded Gujarat cities.",
  },
  {
    icon: Shield,
    title: "Privacy by Design",
    description:
      "We only access your current location when you use the app. No tracking history, no personal data stored. Your privacy matters.",
  },
  {
    icon: MapPin,
    title: "Hyperlocal Focus",
    description:
      "From Ahmedabad to Somnath, we cover Gujarat with real parking data from verified locations across 10+ cities.",
  },
  {
    icon: Heart,
    title: "Open & Transparent",
    description:
      "Our prediction model uses publicly available open datasets. No hidden algorithms, no black boxes.",
  },
];

export function AboutSection() {
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
    <section ref={ref} id="about" className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-border" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span
            className={`inline-block text-sm font-semibold uppercase tracking-wider text-primary transition-all duration-500 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            About Us
          </span>
          <h2
            className={`font-display mt-3 text-3xl font-bold text-foreground sm:text-4xl transition-all duration-500 delay-100 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-balance">
              Making parking smarter across Gujarat
            </span>
          </h2>
          <p
            className={`mt-4 text-muted-foreground leading-relaxed transition-all duration-500 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            ParkIT is a smart parking solution born out of a simple frustration:
            wasting time circling for parking in busy Gujarat cities. We combine
            real-time GPS data, logistic regression models, and open historical
            datasets to predict parking availability with high confidence.
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          {VALUES.map((value, i) => (
            <div
              key={value.title}
              className={`group rounded-xl border border-border bg-card p-6 transition-all duration-500 hover:border-primary/30 hover:bg-secondary ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: visible ? `${300 + i * 100}ms` : "0ms",
              }}
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                <value.icon className="h-5 w-5" />
              </div>
              <h3 className="font-sans font-semibold text-foreground">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Privacy callout */}
        <div
          className={`mt-12 rounded-xl border border-primary/20 bg-primary/5 p-6 sm:p-8 transition-all duration-500 delay-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Lock className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">
                Your Data Stays Yours
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                ParkIT only requests your <strong className="text-foreground">current location</strong> to find nearby parking spots. We do not
                track your movement history, store personal data, or share any information
                with third parties. Location data is used in real-time and discarded
                immediately after your session. No accounts, no cookies tracking you,
                no data mining.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                  <Lock className="h-3 w-3" />
                  No Personal Data Stored
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                  <Eye className="h-3 w-3" />
                  Location Used in Real-Time Only
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                  <Shield className="h-3 w-3" />
                  No Third-Party Sharing
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
