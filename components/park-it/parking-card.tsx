"use client";

import {
  MapPin,
  Clock,
  Star,
  Car,
  Zap,
  Shield,
  Camera,
  Navigation,
  ChevronRight,
  Bike,
} from "lucide-react";
import type { ParkingSpot } from "@/lib/parking-data";
import { estimateTravelTime, getTrafficLevel } from "@/lib/parking-data";

const FEATURE_ICONS: Record<string, typeof Camera> = {
  CCTV: Camera,
  "EV Charging": Zap,
  Covered: Shield,
  Valet: Car,
  "Security Guard": Shield,
  "Wheelchair Access": Navigation,
  "Wide Spaces": Car,
  "Bike Parking": Bike,
  "Car Wash": Car,
};

interface ParkingCardProps {
  spot: ParkingSpot & { distance: number };
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}

export function ParkingCard({
  spot,
  isSelected,
  onSelect,
  index,
}: ParkingCardProps) {
  const availability = spot.availableSpaces / spot.totalSpaces;
  const trafficLevel = getTrafficLevel();
  const eta = estimateTravelTime(spot.distance, trafficLevel);

  const availabilityColor =
    availability > 0.3
      ? "text-primary"
      : availability > 0.1
      ? "text-yellow-400"
      : "text-destructive";

  const availabilityBg =
    availability > 0.3
      ? "bg-primary/10"
      : availability > 0.1
      ? "bg-yellow-400/10"
      : "bg-destructive/10";

  const trafficBadge = {
    low: { text: "Light Traffic", className: "bg-primary/10 text-primary" },
    moderate: {
      text: "Moderate Traffic",
      className: "bg-yellow-400/10 text-yellow-400",
    },
    heavy: {
      text: "Heavy Traffic",
      className: "bg-destructive/10 text-destructive",
    },
  }[trafficLevel];

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group w-full rounded-xl border p-4 text-left transition-all duration-300 ${
        isSelected
          ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
          : "border-border bg-card hover:border-primary/30 hover:bg-secondary"
      }`}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-display text-sm font-semibold text-foreground">
              {spot.name}
            </h3>
            {isSelected && (
              <span className="shrink-0 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                SELECTED
              </span>
            )}
          </div>
          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{spot.address}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-0.5">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium text-foreground">
              {spot.rating}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            {spot.distance.toFixed(1)} km
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-3 flex items-center gap-3">
        <div
          className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${availabilityBg} ${availabilityColor}`}
        >
          <Car className="h-3 w-3" />
          {spot.availableSpaces}/{spot.totalSpaces}
        </div>
        <div className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs font-medium text-foreground">
          <Clock className="h-3 w-3 text-muted-foreground" />
          {eta} min
        </div>
        <div
          className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${trafficBadge.className}`}
        >
          {trafficBadge.text}
        </div>
        <span className="ml-auto text-sm font-bold text-foreground">
          ₹{spot.pricePerHour}
          <span className="text-xs font-normal text-muted-foreground">/hr</span>
        </span>
      </div>

      {/* Features */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {spot.features.slice(0, 4).map((f) => {
          const Icon = FEATURE_ICONS[f] || Shield;
          return (
            <span
              key={f}
              className="flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground"
            >
              <Icon className="h-2.5 w-2.5" />
              {f}
            </span>
          );
        })}
      </div>

      {/* Navigate button (shown when selected) */}
      {isSelected && (
        <div className="mt-3 flex items-center justify-between rounded-lg bg-primary/10 px-3 py-2 animate-fade-in">
          <div className="flex items-center gap-2">
            <Navigation className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-primary">
              Navigate to this parking
            </span>
          </div>
          <ChevronRight className="h-4 w-4 text-primary" />
        </div>
      )}
    </button>
  );
}
