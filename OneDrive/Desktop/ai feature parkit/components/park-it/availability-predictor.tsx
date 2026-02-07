"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Clock,
  MapPin,
  Car,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  CalendarDays,
  Zap,
  Activity,
  ChevronDown,
  ChevronUp,
  Star,
  BarChart3,
  Brain,
  RefreshCw,
} from "lucide-react";
import {
  predictAvailability,
  getDefaultInput,
  type PredictionInput,
  type PredictionResult,
  type FactorBreakdown,
} from "@/lib/logistic-regression";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function confidenceColor(c: number) {
  if (c >= 70) return "text-primary";
  if (c >= 40) return "text-yellow-400";
  return "text-destructive";
}

function confidenceBg(c: number) {
  if (c >= 70) return "bg-primary";
  if (c >= 40) return "bg-yellow-400";
  return "bg-destructive";
}

function confidenceLabel(c: number) {
  if (c >= 80) return "Very Likely Available";
  if (c >= 60) return "Likely Available";
  if (c >= 40) return "Uncertain";
  if (c >= 20) return "Likely Full";
  return "Very Likely Full";
}

function ImpactIcon({ impact }: { impact: FactorBreakdown["impact"] }) {
  if (impact === "positive") return <TrendingUp className="h-3.5 w-3.5 text-primary" />;
  if (impact === "negative") return <TrendingDown className="h-3.5 w-3.5 text-destructive" />;
  return <Minus className="h-3.5 w-3.5 text-muted-foreground" />;
}

function formatHour(h: number) {
  if (h === 0) return "12 AM";
  if (h === 12) return "12 PM";
  if (h < 12) return `${h} AM`;
  return `${h - 12} PM`;
}

const TRAFFIC_COLORS = {
  low: "bg-primary/10 text-primary border-primary/30",
  moderate: "bg-yellow-400/10 text-yellow-400 border-yellow-400/30",
  heavy: "bg-destructive/10 text-destructive border-destructive/30",
};

const TRAFFIC_LABELS = {
  low: "Light",
  moderate: "Moderate",
  heavy: "Heavy",
};

// ---------- Card Component ----------

function PredictionCard({
  result,
  rank,
}: {
  result: PredictionResult;
  rank: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="group rounded-xl border border-border bg-card transition-all hover:border-primary/30">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-start gap-4 p-4 text-left"
      >
        {/* Rank badge */}
        <div className="flex flex-col items-center gap-1">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-xs font-bold text-muted-foreground">
            #{rank}
          </span>
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-sans text-sm font-semibold text-foreground">
              {result.spot.name}
            </h3>
            <span className="hidden shrink-0 rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium uppercase text-muted-foreground sm:inline-block">
              {result.spot.type.replace("-", " ")}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="truncate">
              {result.spot.address}, {result.spot.city}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-foreground">{result.spot.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Car className="h-3 w-3" />
              {result.spot.availableSpaces}/{result.spot.totalSpaces}
            </div>
            <span className="text-xs font-semibold text-foreground">
              {"₹"}{result.spot.pricePerHour}
              <span className="font-normal text-muted-foreground">/hr</span>
            </span>
          </div>
        </div>

        {/* Confidence */}
        <div className="flex flex-col items-center gap-1">
          <div className="relative flex h-14 w-14 items-center justify-center">
            <svg className="h-14 w-14 -rotate-90" viewBox="0 0 56 56">
              <circle
                cx="28"
                cy="28"
                r="24"
                fill="none"
                stroke="hsl(var(--secondary))"
                strokeWidth="4"
              />
              <circle
                cx="28"
                cy="28"
                r="24"
                fill="none"
                className={confidenceBg(result.confidence).replace("bg-", "stroke-")}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${(result.confidence / 100) * 150.8} 150.8`}
                style={{ transition: "stroke-dasharray 1s ease" }}
              />
            </svg>
            <span className={`absolute text-sm font-bold ${confidenceColor(result.confidence)}`}>
              {result.confidence}%
            </span>
          </div>
          <span className={`text-[10px] font-medium ${confidenceColor(result.confidence)}`}>
            {result.confidence >= 70 ? "High" : result.confidence >= 40 ? "Medium" : "Low"}
          </span>
        </div>

        <div className="self-center text-muted-foreground">
          {expanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-border px-4 pb-4 pt-3 animate-fade-in">
          <p className="text-xs font-medium text-muted-foreground mb-3 flex items-center gap-1.5">
            <Brain className="h-3 w-3 text-primary" />
            AI Factor Analysis (Logistic Regression + Historical Open Data)
          </p>
          <div className="flex flex-col gap-2">
            {result.factors
              .sort((a, b) => b.contribution - a.contribution)
              .map((f) => (
                <div key={f.name} className="flex items-center gap-3">
                  <ImpactIcon impact={f.impact} />
                  <span className="flex-1 text-xs text-foreground">{f.name}</span>
                  <div className="h-1.5 w-20 rounded-full bg-secondary overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        f.impact === "positive"
                          ? "bg-primary"
                          : f.impact === "negative"
                            ? "bg-destructive"
                            : "bg-muted-foreground"
                      }`}
                      style={{
                        width: `${Math.min(100, (f.contribution / 2.5) * 100)}%`,
                      }}
                    />
                  </div>
                  <span className="w-10 text-right text-[10px] text-muted-foreground">
                    {f.contribution.toFixed(2)}
                  </span>
                </div>
              ))}
          </div>
          <div className="mt-3 rounded-lg bg-secondary/50 px-3 py-2">
            <p className={`text-xs font-semibold ${confidenceColor(result.confidence)}`}>
              {confidenceLabel(result.confidence)}
            </p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">
              Based on {result.factors.length} features analyzed through logistic regression on historical open data
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- Main Component ----------

interface AvailabilityPredictorProps {
  onBack: () => void;
}

export function AvailabilityPredictor({ onBack }: AvailabilityPredictorProps) {
  const defaultInput = useMemo(() => getDefaultInput(), []);
  const [input, setInput] = useState<PredictionInput>(defaultInput);
  const [filterCity, setFilterCity] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"confidence" | "name" | "price">("confidence");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const predictions = useMemo(() => {
    const results = predictAvailability(input);
    let filtered = filterCity === "all" ? results : results.filter((r) => r.spot.city === filterCity);
    if (sortBy === "confidence") {
      filtered.sort((a, b) => b.confidence - a.confidence);
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.spot.name.localeCompare(b.spot.name));
    } else if (sortBy === "price") {
      filtered.sort((a, b) => a.spot.pricePerHour - b.spot.pricePerHour);
    }
    return filtered;
  }, [input, filterCity, sortBy]);

  const avgConfidence = useMemo(() => {
    if (predictions.length === 0) return 0;
    return Math.round(predictions.reduce((acc, p) => acc + p.confidence, 0) / predictions.length);
  }, [predictions]);

  const highAvail = predictions.filter((p) => p.confidence >= 70).length;
  const medAvail = predictions.filter((p) => p.confidence >= 40 && p.confidence < 70).length;
  const lowAvail = predictions.filter((p) => p.confidence < 40).length;

  // Get AI-inferred traffic and event info from first prediction
  const aiTraffic = predictions.length > 0 ? predictions[0].aiTrafficLevel : "low";
  const aiEvents = predictions.length > 0 ? predictions[0].aiEventScore : 0;

  const cities = useMemo(() => {
    const set = new Set(predictions.map((p) => p.spot.city));
    const allResults = predictAvailability(input);
    for (const r of allResults) set.add(r.spot.city);
    return Array.from(set).sort();
  }, [input, predictions]);

  const updateInput = useCallback(
    (partial: Partial<PredictionInput>) => {
      setInput((prev) => ({ ...prev, ...partial }));
    },
    [],
  );

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <div className="glass z-10 border-b border-border px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
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
              <BarChart3 className="h-4 w-4" />
            </div>
            <div>
              <h1 className="font-sans text-sm font-bold text-foreground sm:text-base">
                AI Availability Predictor
              </h1>
              <p className="hidden text-[10px] text-muted-foreground sm:block">
                Powered by logistic regression on historical open datasets
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          {/* Controls - only time and day */}
          <div
            className={`rounded-xl border border-border bg-card p-4 sm:p-6 transition-all duration-500 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              Select Time & Day
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Time of Day */}
              <div>
                <label className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  Time of Day
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={0}
                    max={23}
                    value={input.hour}
                    onChange={(e) => updateInput({ hour: parseInt(e.target.value) })}
                    className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-secondary [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                    aria-label="Select hour"
                  />
                  <span className="w-16 rounded-md bg-secondary px-2 py-1 text-center text-xs font-semibold text-foreground">
                    {formatHour(input.hour)}
                  </span>
                </div>
              </div>

              {/* Day of Week */}
              <div>
                <label className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <CalendarDays className="h-3 w-3" />
                  Day of Week
                </label>
                <select
                  value={input.dayOfWeek}
                  onChange={(e) => updateInput({ dayOfWeek: parseInt(e.target.value) })}
                  className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-xs text-foreground outline-none transition-all focus:border-primary"
                  aria-label="Select day of week"
                >
                  {DAYS.map((d, i) => (
                    <option key={d} value={i}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* AI-Inferred Parameters */}
            <div className="mt-5 rounded-lg border border-primary/20 bg-primary/5 p-4">
              <h3 className="text-xs font-semibold text-foreground mb-3 flex items-center gap-1.5">
                <Brain className="h-3.5 w-3.5 text-primary" />
                AI-Inferred from Historical Open Data
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {/* AI Traffic */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] text-muted-foreground">Traffic Condition</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`rounded-md border px-2 py-0.5 text-xs font-medium ${TRAFFIC_COLORS[aiTraffic]}`}>
                        {TRAFFIC_LABELS[aiTraffic]}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        Based on Gujarat traffic flow records
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI Events */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
                    <Zap className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] text-muted-foreground">Event Density</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`rounded-md border px-2 py-0.5 text-xs font-medium ${
                        aiEvents > 0.5
                          ? "bg-destructive/10 text-destructive border-destructive/30"
                          : aiEvents > 0.2
                            ? "bg-yellow-400/10 text-yellow-400 border-yellow-400/30"
                            : "bg-primary/10 text-primary border-primary/30"
                      }`}>
                        {aiEvents > 0.5 ? "High" : aiEvents > 0.2 ? "Moderate" : "Low"}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        Based on municipal event data
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                <RefreshCw className="h-3 w-3 text-primary" />
                <span className="text-[10px] text-muted-foreground">
                  Traffic and event patterns auto-analyzed from historical open datasets. Recalibrated daily.
                </span>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div
            className={`mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 transition-all duration-500 delay-100 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                Avg Confidence
              </span>
              <p className={`mt-1 font-sans text-2xl font-bold ${confidenceColor(avgConfidence)}`}>
                {avgConfidence}%
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <span className="text-[10px] font-medium text-primary uppercase tracking-wider">
                High Availability
              </span>
              <p className="mt-1 font-sans text-2xl font-bold text-primary">{highAvail}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <span className="text-[10px] font-medium text-yellow-400 uppercase tracking-wider">
                Medium
              </span>
              <p className="mt-1 font-sans text-2xl font-bold text-yellow-400">{medAvail}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <span className="text-[10px] font-medium text-destructive uppercase tracking-wider">
                Low / Full
              </span>
              <p className="mt-1 font-sans text-2xl font-bold text-destructive">{lowAvail}</p>
            </div>
          </div>

          {/* Filter / Sort Bar */}
          <div
            className={`mt-4 flex flex-wrap items-center justify-between gap-3 transition-all duration-500 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center gap-2">
              <label className="text-xs text-muted-foreground" htmlFor="city-filter">
                City:
              </label>
              <select
                id="city-filter"
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs text-foreground outline-none focus:border-primary"
              >
                <option value="all">All Cities</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-muted-foreground" htmlFor="sort-by">
                Sort:
              </label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "confidence" | "name" | "price")}
                className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs text-foreground outline-none focus:border-primary"
              >
                <option value="confidence">Highest Confidence</option>
                <option value="name">Name A-Z</option>
                <option value="price">Lowest Price</option>
              </select>
            </div>
          </div>

          {/* Predictions Grid */}
          <div
            className={`mt-4 flex flex-col gap-3 pb-8 transition-all duration-500 delay-300 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {predictions.map((result, i) => (
              <PredictionCard key={result.spot.id} result={result} rank={i + 1} />
            ))}

            {predictions.length === 0 && (
              <div className="rounded-xl border border-border bg-card p-12 text-center">
                <MapPin className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-3 text-sm text-muted-foreground">
                  No parking zones found for this filter.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
