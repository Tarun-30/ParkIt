"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Search,
  MapPin,
  Building2,
  Plane,
  GraduationCap,
  Store,
  X,
  Crosshair,
  Hospital,
  Train,
  Landmark,
} from "lucide-react";
import type { SearchLocation } from "@/lib/parking-data";
import { searchPlaces } from "@/lib/parking-data";

const TYPE_ICONS: Record<string, typeof MapPin> = {
  landmark: Landmark,
  mall: Building2,
  hospital: Hospital,
  station: Train,
  airport: Plane,
  temple: MapPin,
  university: GraduationCap,
  market: Store,
};

interface SearchBarProps {
  onSelectLocation: (location: SearchLocation) => void;
  onUseCurrentLocation: () => void;
  isLocating: boolean;
}

export function SearchBar({
  onSelectLocation,
  onUseCurrentLocation,
  isLocating,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchLocation[]>([]);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    if (value.trim().length >= 2) {
      setResults(searchPlaces(value));
    } else {
      setResults([]);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function selectResult(loc: SearchLocation) {
    setQuery(loc.name);
    setResults([]);
    setFocused(false);
    onSelectLocation(loc);
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className={`flex items-center gap-3 rounded-xl border bg-card px-4 py-3 transition-all duration-300 ${
          focused
            ? "border-primary shadow-lg shadow-primary/10"
            : "border-border"
        }`}
      >
        <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Search places in Gujarat..."
          className="w-full bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none"
          aria-label="Search locations in Gujarat"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setResults([]);
              inputRef.current?.focus();
            }}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <button
          type="button"
          onClick={onUseCurrentLocation}
          disabled={isLocating}
          className="flex shrink-0 items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-all hover:bg-primary/20 disabled:opacity-50"
          aria-label="Use current location"
        >
          <Crosshair className={`h-3.5 w-3.5 ${isLocating ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline">{isLocating ? "Locating..." : "My Location"}</span>
        </button>
      </div>

      {/* Results dropdown */}
      {focused && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 animate-fade-in-up rounded-xl border border-border bg-card shadow-2xl shadow-black/50 overflow-hidden">
          {results.map((loc, i) => {
            const Icon = TYPE_ICONS[loc.type] || MapPin;
            return (
              <button
                key={loc.id}
                type="button"
                onClick={() => selectResult(loc)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-all hover:bg-secondary ${
                  i !== results.length - 1 ? "border-b border-border" : ""
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {loc.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {loc.address}
                  </p>
                </div>
                <span className="shrink-0 rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium uppercase text-muted-foreground">
                  {loc.type}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {focused && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 animate-fade-in rounded-xl border border-border bg-card p-6 text-center shadow-2xl shadow-black/50">
          <p className="text-sm text-muted-foreground">
            No places found for &ldquo;{query}&rdquo;
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Try searching for cities, landmarks, malls, or temples in Gujarat
          </p>
        </div>
      )}
    </div>
  );
}
