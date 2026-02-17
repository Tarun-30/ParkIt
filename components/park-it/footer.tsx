"use client";

import { MapPin } from "lucide-react";

interface FooterProps {
  onNavigate?: (section: string) => void;
  onOpenPrivacy?: () => void;
  onOpenCareers?: () => void;
}

export function Footer({ onNavigate, onOpenPrivacy, onOpenCareers }: FooterProps) {
  function handleSectionClick(sectionId: string) {
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const el = document.querySelector(`#${sectionId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <MapPin className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold text-foreground">
                park<span className="text-primary">IT</span>
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Smart parking solutions for Gujarat. Find, navigate, and park with
              confidence.
            </p>
          </div>

          {/* Cities */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">Cities</h4>
            <ul className="mt-3 flex flex-col gap-2">
              {[
                "Ahmedabad",
                "Surat",
                "Vadodara",
                "Rajkot",
                "Gandhinagar",
                "Bhavnagar",
              ].map((city) => (
                <li key={city}>
                  <span className="text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer">
                    {city}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">Product</h4>
            <ul className="mt-3 flex flex-col gap-2">
              {[
                { label: "Features", action: () => handleSectionClick("features") },
                { label: "How it Works", action: () => handleSectionClick("how-it-works") },
                { label: "API Access", action: () => handleSectionClick("api-access") },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={item.action}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">Company</h4>
            <ul className="mt-3 flex flex-col gap-2">
              {[
                { label: "About Us", action: () => handleSectionClick("about") },
                {
                  label: "Careers",
                  action: onOpenCareers,
                },
                {
                  label: "Privacy Policy",
                  action: onOpenPrivacy,
                },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={item.action}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            2026 ParkIT. Built for Gujarat, India.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">
              Made for Hackathon
            </span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground" />
            <span className="text-xs text-primary font-medium">
              v2.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
