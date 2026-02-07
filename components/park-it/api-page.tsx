"use client";

import { ArrowLeft, MapPin, Code, Terminal, Key, Gauge, Database, Zap, Copy, Check } from "lucide-react";
import { useState } from "react";

const ENDPOINTS = [
  {
    method: "GET",
    path: "/api/v1/parking/zones",
    description: "List all available parking zones with current availability data.",
    params: [
      { name: "city", type: "string", required: false, description: "Filter by city name (e.g., Ahmedabad)" },
      { name: "type", type: "string", required: false, description: "Filter by parking type: multi-level, open, underground, street" },
      { name: "limit", type: "number", required: false, description: "Max results to return (default: 20)" },
    ],
    response: `{
  "zones": [
    {
      "id": "p1",
      "name": "Riverfront Multi-Level Parking",
      "city": "Ahmedabad",
      "lat": 23.035,
      "lng": 72.571,
      "totalSpaces": 450,
      "availableSpaces": 127,
      "type": "multi-level",
      "pricePerHour": 30,
      "rating": 4.5
    }
  ],
  "total": 20
}`,
  },
  {
    method: "GET",
    path: "/api/v1/parking/predict",
    description: "Get AI-powered availability prediction for parking zones using logistic regression on historical data.",
    params: [
      { name: "hour", type: "number", required: false, description: "Hour of day 0-23 (default: current hour)" },
      { name: "dayOfWeek", type: "number", required: false, description: "Day of week 0-6 (default: current day)" },
      { name: "city", type: "string", required: false, description: "Filter predictions by city" },
      { name: "zoneId", type: "string", required: false, description: "Get prediction for specific zone" },
    ],
    response: `{
  "predictions": [
    {
      "zoneId": "p1",
      "zoneName": "Riverfront Multi-Level Parking",
      "confidence": 74,
      "trafficLevel": "moderate",
      "trafficConfidence": 0.89,
      "activeEvents": ["Weekly Market Days"],
      "eventConfidence": 0.82,
      "factors": [...]
    }
  ],
  "analysisTimestamp": "2026-02-07T14:30:00Z",
  "modelVersion": "lr-v1.0-15feat"
}`,
  },
  {
    method: "GET",
    path: "/api/v1/parking/nearest",
    description: "Find nearest parking zones to a given coordinate using Haversine distance calculation.",
    params: [
      { name: "lat", type: "number", required: true, description: "Latitude of the location" },
      { name: "lng", type: "number", required: true, description: "Longitude of the location" },
      { name: "radius", type: "number", required: false, description: "Search radius in km (default: 5)" },
      { name: "limit", type: "number", required: false, description: "Max results (default: 5)" },
    ],
    response: `{
  "zones": [
    {
      "id": "p1",
      "name": "Riverfront Multi-Level Parking",
      "distance": 1.2,
      "eta": 8,
      "trafficLevel": "moderate",
      "availableSpaces": 127,
      "totalSpaces": 450
    }
  ]
}`,
  },
  {
    method: "GET",
    path: "/api/v1/traffic/analyze",
    description: "Get AI-analyzed traffic conditions based on historical Gujarat SRTC data.",
    params: [
      { name: "hour", type: "number", required: false, description: "Hour of day (default: current)" },
      { name: "dayOfWeek", type: "number", required: false, description: "Day of week (default: current)" },
    ],
    response: `{
  "level": "moderate",
  "score": 0.62,
  "confidence": 0.89,
  "source": "Gujarat SRTC Historical Flow Data",
  "dataPoints": 8760
}`,
  },
  {
    method: "GET",
    path: "/api/v1/events/active",
    description: "List currently active events from the Gujarat event calendar that may impact parking.",
    params: [
      { name: "city", type: "string", required: false, description: "Filter by city" },
    ],
    response: `{
  "events": [
    {
      "name": "Weekly Market Days",
      "type": "market",
      "impactScore": 0.45,
      "peakHours": [9, 10, 11, 12, 13, 17, 18, 19]
    }
  ]
}`,
  },
];

const METHOD_COLORS: Record<string, string> = {
  GET: "bg-primary/10 text-primary",
  POST: "bg-yellow-400/10 text-yellow-400",
  PUT: "bg-blue-400/10 text-blue-400",
  DELETE: "bg-destructive/10 text-destructive",
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-[10px] text-muted-foreground transition-all hover:text-foreground"
      aria-label="Copy to clipboard"
    >
      {copied ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

interface ApiPageProps {
  onBack: () => void;
}

export function ApiPage({ onBack }: ApiPageProps) {
  const [expandedEndpoint, setExpandedEndpoint] = useState<number | null>(0);

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
            <span className="font-sans text-sm font-bold text-foreground sm:text-base">API Access</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Code className="h-8 w-8" />
          </div>
          <h1 className="mt-6 font-sans text-3xl font-bold text-foreground sm:text-4xl">
            <span className="text-balance">ParkIT Developer API</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            Integrate ParkIT parking intelligence into your applications. Access real-time availability,
            AI predictions, traffic analysis, and event data through our RESTful API.
          </p>
        </div>

        {/* Quick Info */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5 flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Terminal className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Base URL</h3>
              <p className="mt-1 font-mono text-xs text-muted-foreground">https://api.parkit.in/v1</p>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Key className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Authentication</h3>
              <p className="mt-1 text-xs text-muted-foreground">Bearer token in Authorization header</p>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Gauge className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Rate Limits</h3>
              <p className="mt-1 text-xs text-muted-foreground">1000 requests/hour (free tier)</p>
            </div>
          </div>
        </div>

        {/* Data Sources */}
        <div className="mt-8 rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Database className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Data Sources</h3>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              "Gujarat Municipal Corporation parking occupancy logs",
              "Gujarat SRTC historical traffic flow data",
              "Gujarat event calendar (festivals, markets, religious events)",
              "OpenStreetMap geographic data",
            ].map((source) => (
              <div key={source} className="flex items-center gap-2 text-xs text-muted-foreground">
                <Zap className="h-3 w-3 text-primary shrink-0" />
                {source}
              </div>
            ))}
          </div>
        </div>

        {/* Endpoints */}
        <h2 className="mt-12 font-sans text-xl font-bold text-foreground">Endpoints</h2>
        <div className="mt-6 flex flex-col gap-4">
          {ENDPOINTS.map((ep, i) => (
            <div key={ep.path} className="rounded-xl border border-border bg-card overflow-hidden">
              <button
                type="button"
                onClick={() => setExpandedEndpoint(expandedEndpoint === i ? null : i)}
                className="flex w-full items-center gap-3 p-4 text-left hover:bg-secondary/50 transition-colors"
              >
                <span className={`shrink-0 rounded-md px-2.5 py-1 text-xs font-bold ${METHOD_COLORS[ep.method]}`}>
                  {ep.method}
                </span>
                <code className="flex-1 font-mono text-sm text-foreground">{ep.path}</code>
                <span className="text-xs text-muted-foreground hidden sm:inline">{ep.description.slice(0, 60)}...</span>
              </button>

              {expandedEndpoint === i && (
                <div className="border-t border-border p-4 animate-fade-in">
                  <p className="text-sm text-muted-foreground">{ep.description}</p>

                  {ep.params.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-xs font-semibold text-foreground mb-2">Parameters</h4>
                      <div className="rounded-lg border border-border overflow-hidden">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="bg-secondary">
                              <th className="px-3 py-2 text-left text-muted-foreground font-medium">Name</th>
                              <th className="px-3 py-2 text-left text-muted-foreground font-medium">Type</th>
                              <th className="px-3 py-2 text-left text-muted-foreground font-medium">Required</th>
                              <th className="px-3 py-2 text-left text-muted-foreground font-medium">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ep.params.map((param) => (
                              <tr key={param.name} className="border-t border-border">
                                <td className="px-3 py-2 font-mono text-primary">{param.name}</td>
                                <td className="px-3 py-2 text-muted-foreground">{param.type}</td>
                                <td className="px-3 py-2">
                                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${param.required ? "bg-destructive/10 text-destructive" : "bg-secondary text-muted-foreground"}`}>
                                    {param.required ? "Yes" : "No"}
                                  </span>
                                </td>
                                <td className="px-3 py-2 text-muted-foreground">{param.description}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-foreground">Response Example</h4>
                      <CopyButton text={ep.response} />
                    </div>
                    <pre className="rounded-lg bg-secondary p-4 text-xs text-muted-foreground overflow-x-auto font-mono">
                      {ep.response}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
