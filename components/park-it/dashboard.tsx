"use client";

import { useState, useCallback } from "react";
import { ArrowLeft, List, Map as MapIcon, SlidersHorizontal } from "lucide-react";
import { SearchBar } from "./search-bar";
import { ParkingMap } from "./parking-map";
import { ParkingCard } from "./parking-card";
import { RouteInfo } from "./route-info";
import type { ParkingSpot, SearchLocation } from "@/lib/parking-data";
import { getNearestParkingSpots } from "@/lib/parking-data";

// Default to Ahmedabad center
const DEFAULT_LOCATION = { lat: 23.0225, lng: 72.5714 };

interface DashboardProps {
  onBack: () => void;
}

export function Dashboard({ onBack }: DashboardProps) {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [destination, setDestination] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [nearbySpots, setNearbySpots] = useState<
    (ParkingSpot & { distance: number })[]
  >([]);
  const [selectedSpot, setSelectedSpot] = useState<
    (ParkingSpot & { distance: number }) | null
  >(null);
  const [isLocating, setIsLocating] = useState(false);
  const [mobileView, setMobileView] = useState<"map" | "list">("map");
  const [sortBy, setSortBy] = useState<"distance" | "price" | "availability">(
    "distance"
  );

  const findNearbyParking = useCallback(
    (lat: number, lng: number) => {
      const spots = getNearestParkingSpots(lat, lng, 8);
      // Sort based on preference
      if (sortBy === "price") {
        spots.sort((a, b) => a.pricePerHour - b.pricePerHour);
      } else if (sortBy === "availability") {
        spots.sort(
          (a, b) =>
            b.availableSpaces / b.totalSpaces -
            a.availableSpaces / a.totalSpaces
        );
      }
      setNearbySpots(spots);
    },
    [sortBy]
  );

  const handleUseCurrentLocation = useCallback(() => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setUserLocation(loc);
          findNearbyParking(loc.lat, loc.lng);
          setIsLocating(false);
        },
        () => {
          // Fallback to Ahmedabad if geolocation fails
          setUserLocation(DEFAULT_LOCATION);
          findNearbyParking(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng);
          setIsLocating(false);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      setUserLocation(DEFAULT_LOCATION);
      findNearbyParking(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng);
      setIsLocating(false);
    }
  }, [findNearbyParking]);

  const handleSelectLocation = useCallback(
    (location: SearchLocation) => {
      const loc = { lat: location.lat, lng: location.lng };
      setDestination(loc);
      if (!userLocation) {
        setUserLocation(DEFAULT_LOCATION);
      }
      findNearbyParking(loc.lat, loc.lng);
    },
    [userLocation, findNearbyParking]
  );

  const handleSelectSpot = useCallback(
    (spot: ParkingSpot & { distance: number }) => {
      setSelectedSpot(spot.id === selectedSpot?.id ? null : spot);
    },
    [selectedSpot]
  );

  const handleNavigate = useCallback(() => {
    if (selectedSpot) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${selectedSpot.lat},${selectedSpot.lng}`,
        "_blank"
      );
    }
  }, [selectedSpot]);

  const handleSort = useCallback(
    (type: "distance" | "price" | "availability") => {
      setSortBy(type);
      if (destination) {
        const spots = getNearestParkingSpots(destination.lat, destination.lng, 8);
        if (type === "price") {
          spots.sort((a, b) => a.pricePerHour - b.pricePerHour);
        } else if (type === "availability") {
          spots.sort(
            (a, b) =>
              b.availableSpaces / b.totalSpaces -
              a.availableSpaces / a.totalSpaces
          );
        }
        setNearbySpots(spots);
      } else if (userLocation) {
        const spots = getNearestParkingSpots(
          userLocation.lat,
          userLocation.lng,
          8
        );
        if (type === "price") {
          spots.sort((a, b) => a.pricePerHour - b.pricePerHour);
        } else if (type === "availability") {
          spots.sort(
            (a, b) =>
              b.availableSpaces / b.totalSpaces -
              a.availableSpaces / a.totalSpaces
          );
        }
        setNearbySpots(spots);
      }
    },
    [destination, userLocation]
  );

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Top bar */}
      <div className="glass z-10 border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex-1">
            <SearchBar
              onSelectLocation={handleSelectLocation}
              onUseCurrentLocation={handleUseCurrentLocation}
              isLocating={isLocating}
            />
          </div>
        </div>
      </div>

      {/* Mobile toggle */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2 lg:hidden">
        <div className="flex items-center gap-1 rounded-lg bg-secondary p-1">
          <button
            type="button"
            onClick={() => setMobileView("map")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
              mobileView === "map"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            <MapIcon className="h-3.5 w-3.5" />
            Map
          </button>
          <button
            type="button"
            onClick={() => setMobileView("list")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
              mobileView === "list"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            <List className="h-3.5 w-3.5" />
            List {nearbySpots.length > 0 && `(${nearbySpots.length})`}
          </button>
        </div>
        {nearbySpots.length > 0 && (
          <div className="flex items-center gap-1">
            <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
            <select
              value={sortBy}
              onChange={(e) =>
                handleSort(
                  e.target.value as "distance" | "price" | "availability"
                )
              }
              className="bg-transparent text-xs text-muted-foreground outline-none"
              aria-label="Sort parking spots"
            >
              <option value="distance">Nearest</option>
              <option value="price">Cheapest</option>
              <option value="availability">Most Available</option>
            </select>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Parking list */}
        <div
          className={`flex w-full flex-col border-r border-border lg:w-[400px] ${
            mobileView === "list" ? "flex" : "hidden lg:flex"
          }`}
        >
          {/* Desktop sort */}
          <div className="hidden items-center justify-between border-b border-border px-4 py-3 lg:flex">
            <span className="text-sm font-medium text-foreground">
              {nearbySpots.length > 0
                ? `${nearbySpots.length} parking spots found`
                : "Search to find parking"}
            </span>
            {nearbySpots.length > 0 && (
              <div className="flex items-center gap-1">
                <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
                <select
                  value={sortBy}
                  onChange={(e) =>
                    handleSort(
                      e.target.value as "distance" | "price" | "availability"
                    )
                  }
                  className="bg-transparent text-xs text-muted-foreground outline-none"
                  aria-label="Sort parking spots"
                >
                  <option value="distance">Nearest</option>
                  <option value="price">Cheapest</option>
                  <option value="availability">Most Available</option>
                </select>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            {nearbySpots.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <MapIcon className="h-8 w-8" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  Find Parking Near You
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Search for a destination or use your current location to
                  discover nearby parking spots across Gujarat.
                </p>
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  disabled={isLocating}
                  className="mt-6 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
                >
                  {isLocating ? "Locating..." : "Use My Location"}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {nearbySpots.map((spot, i) => (
                  <ParkingCard
                    key={spot.id}
                    spot={spot}
                    isSelected={selectedSpot?.id === spot.id}
                    onSelect={() => handleSelectSpot(spot)}
                    index={i}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Map area */}
        <div
          className={`relative flex-1 ${
            mobileView === "map" ? "flex" : "hidden lg:flex"
          }`}
        >
          <ParkingMap
            userLocation={userLocation || DEFAULT_LOCATION}
            parkingSpots={nearbySpots}
            selectedSpot={selectedSpot}
            destination={destination}
            onSelectSpot={handleSelectSpot}
          />

          {/* Route info overlay */}
          {selectedSpot && (
            <div className="absolute top-4 right-4 z-10 w-80 max-h-[calc(100vh-120px)] overflow-y-auto">
              <RouteInfo
                spot={selectedSpot}
                onClose={() => setSelectedSpot(null)}
                onNavigate={handleNavigate}
              />
            </div>
          )}

          {/* Quick stats overlay */}
          {nearbySpots.length > 0 && !selectedSpot && (
            <div className="absolute bottom-4 left-4 right-4 z-10 animate-fade-in-up">
              <div className="glass flex items-center justify-between rounded-xl px-4 py-3">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-xs text-muted-foreground">
                      Nearby Spots
                    </span>
                    <p className="font-display text-lg font-bold text-foreground">
                      {nearbySpots.reduce(
                        (acc, s) => acc + s.availableSpaces,
                        0
                      )}{" "}
                      <span className="text-xs font-normal text-muted-foreground">
                        available
                      </span>
                    </p>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div>
                    <span className="text-xs text-muted-foreground">
                      Best Price
                    </span>
                    <p className="font-display text-lg font-bold text-primary">
                      ₹{Math.min(...nearbySpots.map((s) => s.pricePerHour))}
                      <span className="text-xs font-normal text-muted-foreground">
                        /hr
                      </span>
                    </p>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div>
                    <span className="text-xs text-muted-foreground">
                      Closest
                    </span>
                    <p className="font-display text-lg font-bold text-foreground">
                      {nearbySpots[0]?.distance.toFixed(1)}
                      <span className="text-xs font-normal text-muted-foreground">
                        {" "}
                        km
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
