"use client";

import { useState, useEffect } from "react";
import { MapPin, Menu, X } from "lucide-react";

export function Header({ onGetStarted }: { onGetStarted: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <MapPin className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            park<span className="text-primary">IT</span>
          </span>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {["Features", "How it Works", "Coverage", "About"].map((item) => (
            <button
              key={item}
              type="button"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={onGetStarted}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-95"
          >
            Find Parking
          </button>
        </div>

        <button
          type="button"
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="glass animate-fade-in-up mt-2 mx-4 rounded-xl p-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {["Features", "How it Works", "Coverage", "About"].map((item) => (
              <button
                key={item}
                type="button"
                className="text-left text-sm text-muted-foreground transition-colors hover:text-foreground py-2"
              >
                {item}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                onGetStarted();
                setMobileOpen(false);
              }}
              className="mt-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
            >
              Find Parking
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
