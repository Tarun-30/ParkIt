"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Car } from "lucide-react";

const CITIES = [
  { name: "Ahmedabad", spots: 6, areas: "CG Road, SG Highway, Vastrapur, Manek Chowk" },
  { name: "Surat", spots: 3, areas: "Dumas Road, Athwa Gate, Railway Station" },
  { name: "Vadodara", spots: 3, areas: "Gorwa, Alkapuri, Railway Junction" },
  { name: "Rajkot", spots: 2, areas: "Kalawad Road, Race Course" },
  { name: "Gandhinagar", spots: 2, areas: "Infocity, Mahatma Mandir" },
  { name: "Bhavnagar", spots: 1, areas: "Nilambag Circle" },
  { name: "Junagadh", spots: 1, areas: "Girnar Ropeway" },
  { name: "Dwarka", spots: 1, areas: "Dwarkadhish Temple" },
  { name: "Somnath", spots: 1, areas: "Somnath Temple" },
];

export function Coverage() {
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
    <section ref={ref} className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span
            className={`inline-block text-sm font-semibold uppercase tracking-wider text-primary transition-all duration-500 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Coverage
          </span>
          <h2
            className={`font-display mt-3 text-3xl font-bold text-foreground sm:text-4xl transition-all duration-500 delay-100 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-balance">All across Gujarat</span>
          </h2>
          <p
            className={`mt-4 text-muted-foreground leading-relaxed transition-all duration-500 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            From the bustling streets of Ahmedabad to the sacred temples of
            Dwarka and Somnath. We have got Gujarat covered.
          </p>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CITIES.map((city, i) => (
            <div
              key={city.name}
              className={`group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all duration-500 hover:border-primary/30 hover:bg-secondary ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: visible ? `${300 + i * 80}ms` : "0ms" }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-semibold text-foreground">
                    {city.name}
                  </h3>
                  <span className="flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    <Car className="h-2.5 w-2.5" />
                    {city.spots} locations
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {city.areas}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
