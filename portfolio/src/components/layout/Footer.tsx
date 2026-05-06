"use client";

import { useState, useEffect } from "react";
import { PERSONAL } from "@/lib/constants";

export function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} {PERSONAL.firstName} {PERSONAL.lastName}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {Object.entries(PERSONAL.social).map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-muted capitalize hover:text-accent transition-colors"
              >
                {key}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {time && (
              <span className="font-mono text-xs text-text-muted">{time}</span>
            )}
            <button
              onClick={scrollToTop}
              className="text-sm text-text-muted hover:text-accent transition-colors"
            >
              Back to top &uarr;
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
