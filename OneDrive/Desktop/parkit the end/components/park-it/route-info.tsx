"use client";

import {
  Navigation,
  Clock,
  Route,
  AlertTriangle,
  Car,
  MapPin,
  Star,
  X,
  IndianRupee,
} from "lucide-react";
import type { ParkingSpot } from "@/lib/parking-data";
import { estimateTravelTime, getTrafficLevel } from "@/lib/parking-data";

interface RouteInfoProps {
  spot: ParkingSpot & { distance: number };
  onClose: () => void;
  onNavigate: () => void;
}

export function RouteInfo({ spot, onClose, onNavigate }: RouteInfoProps) {
  const trafficLevel = getTrafficLevel();
  const eta = estimateTravelTime(spot.distance, trafficLevel);

  const trafficInfo = {
    low: {
      label: "Light Traffic",
      description: "Roads are clear. Great time to drive!",
      color: "text-primary",
      bgColor: "bg-primary/10",
      barWidth: "w-1/3",
    },
    moderate: {
      label: "Moderate Traffic",
      description: "Expect some slowdowns on main roads.",
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      barWidth: "w-2/3",
    },
    heavy: {
      label: "Heavy Traffic",
      description: "Peak hours. Consider alternate routes.",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      barWidth: "w-full",
    },
  }[trafficLevel];

  const availability = spot.availableSpaces / spot.totalSpaces;
  const availColor =
    availability > 0.3
      ? "text-primary"
      : availability > 0.1
      ? "text-yellow-400"
      : "text-destructive";

  return (
    <div className="animate-slide-in-right rounded-xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-border p-4">
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg font-bold text-foreground truncate">
            {spot.name}
          </h3>
          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {spot.address}, {spot.city}
          </div>
          <div className="mt-1 flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium text-foreground">
              {spot.rating}
            </span>
            <span className="text-xs text-muted-foreground">rating</span>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Close route info"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Route Stats */}
      <div className="grid grid-cols-3 gap-px bg-border">
        <div className="flex flex-col items-center justify-center bg-card p-4">
          <Route className="mb-1.5 h-5 w-5 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">
            {spot.distance.toFixed(1)}
          </span>
          <span className="text-[10px] text-muted-foreground">km distance</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-card p-4">
          <Clock className="mb-1.5 h-5 w-5 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">
            {eta}
          </span>
          <span className="text-[10px] text-muted-foreground">min ETA</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-card p-4">
          <IndianRupee className="mb-1.5 h-5 w-5 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">
            {spot.pricePerHour}
          </span>
          <span className="text-[10px] text-muted-foreground">per hour</span>
        </div>
      </div>

      {/* Traffic */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className={`h-4 w-4 ${trafficInfo.color}`} />
          <span className={`text-sm font-semibold ${trafficInfo.color}`}>
            {trafficInfo.label}
          </span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          {trafficInfo.description}
        </p>
        {/* Traffic bar */}
        <div className="mt-3 h-2 w-full rounded-full bg-secondary">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${trafficInfo.barWidth}`}
            style={{
              background:
                trafficLevel === "low"
                  ? "hsl(152, 76%, 48%)"
                  : trafficLevel === "moderate"
                  ? "hsl(43, 74%, 66%)"
                  : "hsl(0, 72%, 51%)",
            }}
          />
        </div>
      </div>

      {/* Availability */}
      <div className="border-t border-border p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Parking Availability</span>
          <span className={`text-sm font-bold ${availColor}`}>
            {spot.availableSpaces} / {spot.totalSpaces} spots
          </span>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-secondary">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${availability * 100}%`,
              background:
                availability > 0.3
                  ? "hsl(152, 76%, 48%)"
                  : availability > 0.1
                  ? "hsl(43, 74%, 66%)"
                  : "hsl(0, 72%, 51%)",
            }}
          />
        </div>
        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <Car className="h-3 w-3" />
          {spot.type === "multi-level" && "Multi-Level Parking"}
          {spot.type === "open" && "Open Air Parking"}
          {spot.type === "underground" && "Underground Parking"}
          {spot.type === "street" && "Street Parking"}
          {" "} | {spot.isOpen24Hours ? "Open 24/7" : spot.openHours}
        </div>
      </div>

      {/* Features */}
      <div className="border-t border-border p-4">
        <span className="text-xs font-medium text-muted-foreground">Amenities</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {spot.features.map((f) => (
            <span
              key={f}
              className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Navigate button */}
      <div className="border-t border-border p-4">
        <button
          type="button"
          onClick={onNavigate}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
        >
          <Navigation className="h-4 w-4" />
          Start Navigation
        </button>
      </div>
    </div>
  );
}
