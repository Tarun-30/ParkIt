"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import type { ParkingSpot } from "@/lib/parking-data";

interface ParkingMapProps {
  userLocation: { lat: number; lng: number } | null;
  parkingSpots: (ParkingSpot & { distance: number })[];
  selectedSpot: ParkingSpot | null;
  destination: { lat: number; lng: number } | null;
  onSelectSpot: (spot: ParkingSpot & { distance: number }) => void;
}

export function ParkingMap({
  userLocation,
  parkingSpots,
  selectedSpot,
  destination,
  onSelectSpot,
}: ParkingMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const routeRef = useRef<L.Polyline | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const destMarkerRef = useRef<L.Marker | null>(null);
  const [L, setL] = useState<typeof import("leaflet") | null>(null);

  // Load Leaflet dynamically
  useEffect(() => {
    import("leaflet").then((leaflet) => {
      setL(leaflet.default);
    });
  }, []);

  // Initialize map
  useEffect(() => {
    if (!L || !mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [22.3, 72.0], // Center of Gujarat
      zoom: 7,
      zoomControl: true,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [L]);

  // Update user location marker
  useEffect(() => {
    if (!L || !mapInstanceRef.current || !userLocation) return;
    const map = mapInstanceRef.current;

    if (userMarkerRef.current) {
      userMarkerRef.current.setLatLng([userLocation.lat, userLocation.lng]);
    } else {
      const icon = L.divIcon({
        className: "custom-marker",
        html: '<div class="user-marker"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], {
        icon,
        zIndexOffset: 1000,
      })
        .addTo(map)
        .bindPopup(
          '<div class="text-center"><strong>Your Location</strong></div>'
        );
    }

    if (!destination) {
      map.setView([userLocation.lat, userLocation.lng], 13, {
        animate: true,
        duration: 1,
      });
    }
  }, [L, userLocation, destination]);

  // Update parking markers
  const updateParkingMarkers = useCallback(() => {
    if (!L || !mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Clear old markers
    for (const m of markersRef.current) {
      map.removeLayer(m);
    }
    markersRef.current = [];

    for (const spot of parkingSpots) {
      const isSelected = selectedSpot?.id === spot.id;
      const availability = spot.availableSpaces / spot.totalSpaces;
      const color =
        availability > 0.3
          ? "hsl(152, 76%, 48%)"
          : availability > 0.1
          ? "hsl(43, 74%, 66%)"
          : "hsl(0, 72%, 51%)";

      const icon = L.divIcon({
        className: "custom-marker",
        html: `<div class="parking-marker ${isSelected ? "selected" : ""}" style="background:${isSelected ? "hsl(43, 74%, 66%)" : color}">P</div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });

      const marker = L.marker([spot.lat, spot.lng], { icon })
        .addTo(map)
        .bindPopup(
          `<div style="min-width:180px">
            <strong style="font-size:13px">${spot.name}</strong>
            <div style="margin-top:4px;font-size:11px;color:#999">${spot.address}</div>
            <div style="margin-top:8px;display:flex;justify-content:space-between;font-size:12px">
              <span style="color:${color}">${spot.availableSpaces}/${spot.totalSpaces} spots</span>
              <span>₹${spot.pricePerHour}/hr</span>
            </div>
          </div>`
        );

      marker.on("click", () => onSelectSpot(spot));
      markersRef.current.push(marker);
    }
  }, [L, parkingSpots, selectedSpot, onSelectSpot]);

  useEffect(() => {
    updateParkingMarkers();
  }, [updateParkingMarkers]);

  // Draw route when spot is selected
  useEffect(() => {
    if (!L || !mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Remove old route
    if (routeRef.current) {
      map.removeLayer(routeRef.current);
      routeRef.current = null;
    }
    if (destMarkerRef.current) {
      map.removeLayer(destMarkerRef.current);
      destMarkerRef.current = null;
    }

    if (selectedSpot && userLocation) {
      // Create a realistic-looking route with waypoints
      const points = generateRoutePoints(
        userLocation.lat,
        userLocation.lng,
        selectedSpot.lat,
        selectedSpot.lng
      );

      routeRef.current = L.polyline(points, {
        color: "hsl(152, 76%, 48%)",
        weight: 4,
        opacity: 0.8,
        dashArray: "10, 8",
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);

      // Fit bounds to show route
      const bounds = L.latLngBounds([
        [userLocation.lat, userLocation.lng],
        [selectedSpot.lat, selectedSpot.lng],
      ]);
      map.fitBounds(bounds, { padding: [60, 60], animate: true, duration: 1 });
    }

    // Destination marker
    if (destination) {
      const destIcon = L.divIcon({
        className: "custom-marker",
        html: '<div style="width:14px;height:14px;background:hsl(0, 72%, 51%);border-radius:50%;border:3px solid #fff;box-shadow:0 0 15px rgba(239,68,68,0.6)"></div>',
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });
      destMarkerRef.current = L.marker(
        [destination.lat, destination.lng],
        { icon: destIcon }
      ).addTo(map);
    }
  }, [L, selectedSpot, userLocation, destination]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl">
      <div ref={mapRef} className="h-full w-full" />
      {/* Map overlay gradient at top */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background/50 to-transparent z-[2]" />
    </div>
  );
}

// Generate natural-looking route points between two coordinates
function generateRoutePoints(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): [number, number][] {
  const points: [number, number][] = [];
  const steps = 12;

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    // Add slight random offset for natural road-like appearance
    const offset = Math.sin(t * Math.PI) * 0.002 * (Math.random() - 0.5);
    const lat = lat1 + (lat2 - lat1) * t + offset;
    const lng = lng1 + (lng2 - lng1) * t + offset * 1.5;
    points.push([lat, lng]);
  }

  return points;
}
