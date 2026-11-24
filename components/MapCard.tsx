"use client";

import { useState } from "react";
import { site } from "@/content/site";

/**
 * A styled static map card. Nothing from Google loads with the page: the embedded map is
 * created only when the visitor presses "Load map here".
 */
export function MapCard() {
  const [loaded, setLoaded] = useState(false);
  const q = encodeURIComponent(site.contact.mapQuery);
  const openUrl = `https://www.google.com/maps/search/?api=1&query=${q}`;
  const embedUrl = `https://www.google.com/maps?q=${q}&output=embed`;

  return (
    <div className="border border-rule">
      <div className="relative h-[260px] overflow-hidden bg-paper-2">
        {loaded ? (
          <iframe
            title={`Map showing ${site.contact.addressOneLine}`}
            src={embedUrl}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer"
            allowFullScreen
          />
        ) : (
          <svg viewBox="0 0 400 260" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Schematic plan of the office location, not to scale">
            <g fill="none" stroke="var(--ink-2)" strokeWidth="0.8" opacity="0.6">
              <path d="M0 40L120 30L210 52L300 34L400 46" />
              <path d="M0 104L96 96L170 116L260 98L400 112" />
              <path d="M0 176L110 164L186 188L290 170L400 184" />
              <path d="M0 232L140 224L230 240L330 226L400 236" />
              <path d="M120 30L96 96L110 164L140 224" />
              <path d="M210 52L170 116L186 188L230 240" />
              <path d="M300 34L260 98L290 170L330 226" />
            </g>
            <g fill="none" stroke="var(--evergreen)" strokeWidth="1.1">
              <path d="M338 0C318 60 262 90 252 140S198 214 176 260" />
              <path d="M349 0C329 60 273 90 263 140S209 214 187 260" />
            </g>
            <g>
              <circle cx="150" cy="108" r="14" fill="none" stroke="var(--oxblood)" strokeWidth="1" opacity="0.5" />
              <circle cx="150" cy="108" r="5" fill="var(--oxblood)" />
            </g>
            <text x="172" y="112" fontFamily="var(--font-mono)" fontSize="9.5" letterSpacing="1" fill="var(--ink)">
              GANGA ENCLAVE
            </text>
          </svg>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-rule p-4">
        <p className="label label-2">Schematic · not to scale</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {!loaded && (
            <button type="button" className="link" onClick={() => setLoaded(true)}>
              Load map here
            </button>
          )}
          <a href={openUrl} className="link" target="_blank" rel="noopener noreferrer">
            Open in Maps<span className="sr-only"> (opens in a new tab)</span> <span className="a">↗</span>
          </a>
        </div>
      </div>
      {!loaded && (
        <p className="t-small ink-2 border-t border-rule px-4 py-3">
          Loading the map connects your browser to Google. It is not loaded unless you choose it.
        </p>
      )}
    </div>
  );
}
