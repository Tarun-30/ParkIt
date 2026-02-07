"use client";

import { useEffect, useRef, useState } from "react";
import { Code2, Database, RefreshCw, Zap, Lock, Globe } from "lucide-react";

const API_ENDPOINTS = [
  {
    method: "GET",
    path: "/api/v1/spots",
    description: "Retrieve all parking spots with real-time availability. Returns location, capacity, pricing, and current occupancy data.",
    params: "city, lat, lng, radius, type",
  },
  {
    method: "GET",
    path: "/api/v1/spots/:id",
    description: "Get detailed information about a specific parking spot including amenities, hours, and live availability count.",
    params: "id",
  },
  {
    method: "GET",
    path: "/api/v1/predict",
    description: "Get AI-based availability predictions using our logistic regression model trained on historical open data.",
    params: "hour, dayOfWeek, city",
  },
  {
    method: "GET",
    path: "/api/v1/search",
    description: "Search locations, landmarks, malls, and points of interest across Gujarat with nearby parking suggestions.",
    params: "q, city, type",
  },
  {
    method: "GET",
    path: "/api/v1/traffic",
    description: "Get current traffic conditions and estimated travel times based on historical flow patterns.",
    params: "from_lat, from_lng, to_lat, to_lng",
  },
];

const API_FEATURES = [
  {
    icon: Zap,
    title: "Real-Time Data",
    description: "Parking availability refreshes every 30 seconds from on-ground sensor simulations and historical patterns.",
  },
  {
    icon: Database,
    title: "Open Dataset Powered",
    description: "Predictions are built on publicly available traffic and parking occupancy datasets from Gujarat municipalities.",
  },
  {
    icon: RefreshCw,
    title: "Auto-Refresh",
    description: "Data refreshes every 30 seconds. Historical patterns are recalculated daily to keep predictions accurate.",
  },
  {
    icon: Lock,
    title: "Rate Limited",
    description: "Free tier supports 100 requests/minute. No API key required for read-only public endpoints.",
  },
];

export function ApiAccessSection() {
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
    <section ref={ref} id="api-access" className="relative py-24 lg:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span
            className={`inline-block text-sm font-semibold uppercase tracking-wider text-primary transition-all duration-500 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            API Access
          </span>
          <h2
            className={`font-display mt-3 text-3xl font-bold text-foreground sm:text-4xl transition-all duration-500 delay-100 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-balance">Build on top of ParkIT</span>
          </h2>
          <p
            className={`mt-4 text-muted-foreground leading-relaxed transition-all duration-500 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Access our parking data and prediction engine through a simple REST
            API. Integrate real-time parking availability into your own apps,
            services, or city management dashboards.
          </p>
        </div>

        {/* API Features */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {API_FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className={`group rounded-xl border border-border bg-card p-5 transition-all duration-500 hover:border-primary/30 hover:bg-secondary ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: visible ? `${300 + i * 100}ms` : "0ms",
              }}
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Endpoints */}
        <div
          className={`mt-12 rounded-xl border border-border bg-card overflow-hidden transition-all duration-500 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-center gap-2 border-b border-border px-6 py-4">
            <Code2 className="h-5 w-5 text-primary" />
            <h3 className="font-display text-sm font-bold text-foreground">
              API Endpoints
            </h3>
            <span className="ml-auto flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-medium text-primary">
              <Globe className="h-3 w-3" />
              Base URL: api.parkit.dev/v1
            </span>
          </div>
          <div className="divide-y divide-border">
            {API_ENDPOINTS.map((endpoint) => (
              <div
                key={endpoint.path}
                className="flex flex-col gap-2 px-6 py-4 transition-colors hover:bg-secondary/50 sm:flex-row sm:items-center sm:gap-4"
              >
                <div className="flex items-center gap-3 sm:w-72 shrink-0">
                  <span className="rounded-md bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary uppercase">
                    {endpoint.method}
                  </span>
                  <code className="text-xs font-mono text-foreground">
                    {endpoint.path}
                  </code>
                </div>
                <p className="flex-1 text-xs text-muted-foreground leading-relaxed">
                  {endpoint.description}
                </p>
                <div className="sm:w-40 shrink-0">
                  <span className="text-[10px] text-muted-foreground">
                    Params: <span className="text-foreground">{endpoint.params}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Code example */}
        <div
          className={`mt-8 rounded-xl border border-border bg-card overflow-hidden transition-all duration-500 delay-600 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-center gap-2 border-b border-border px-6 py-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-destructive/60" />
              <div className="h-3 w-3 rounded-full bg-yellow-400/60" />
              <div className="h-3 w-3 rounded-full bg-primary/60" />
            </div>
            <span className="ml-2 text-xs text-muted-foreground">
              Example Request
            </span>
          </div>
          <pre className="overflow-x-auto p-6 text-xs leading-relaxed">
            <code className="text-muted-foreground">
              <span className="text-primary">{"// Get nearby parking spots"}</span>
              {"\n"}
              <span className="text-foreground">{"const"}</span>{" response = "}
              <span className="text-foreground">{"await"}</span>{" fetch("}
              {"\n  "}
              <span className="text-primary">{'"https://api.parkit.dev/v1/spots?city=Ahmedabad&lat=23.02&lng=72.57&radius=5"'}</span>
              {"\n);\n"}
              <span className="text-foreground">{"const"}</span>{" data = "}
              <span className="text-foreground">{"await"}</span>{" response.json();"}
              {"\n\n"}
              <span className="text-primary">{"// Response: { spots: [...], total: 6, refreshInterval: 30 }"}</span>
              {"\n\n"}
              <span className="text-primary">{"// Get AI predictions"}</span>
              {"\n"}
              <span className="text-foreground">{"const"}</span>{" predictions = "}
              <span className="text-foreground">{"await"}</span>{" fetch("}
              {"\n  "}
              <span className="text-primary">{'"https://api.parkit.dev/v1/predict?hour=9&dayOfWeek=1&city=Ahmedabad"'}</span>
              {"\n);\n"}
              <span className="text-primary">{"// Returns confidence scores for each parking zone"}</span>
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}
