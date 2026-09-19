"use client";

import { useSyncExternalStore } from "react";
import { setCookie } from "@/lib/cookies";

const COOKIE_NAME = "age-confirmed";
const COOKIE_DAYS = 30;

function subscribeCookie(): () => void { return () => {}; }
function getCookieSnapshot(): boolean {
  if (typeof document === "undefined") return false;
  const match = document.cookie.match(new RegExp(`(^| )${COOKIE_NAME}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) === "true" : false;
}
function getCookieServerSnapshot(): boolean { return false; }

export default function AgeGate() {
  const confirmed = useSyncExternalStore(subscribeCookie, getCookieSnapshot, getCookieServerSnapshot);

  const handleConfirm = () => { setCookie(COOKIE_NAME, "true", COOKIE_DAYS); window.location.reload(); };
  const handleExit = () => { window.location.href = "https://google.com"; };

  if (confirmed) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#0d0509" }} role="dialog" aria-modal="true" aria-label="Age verification">
      <div style={{ width: "100%", maxWidth: "28rem", padding: "0 2rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#f8eef3", letterSpacing: "-0.025em", fontFamily: "var(--font-display)" }}>Age Verification</h1>
        <p style={{ marginTop: "1.25rem", fontSize: "1rem", lineHeight: 1.6, color: "#c9a9ba" }}>
          This website contains content intended for adults aged 18 and over.<br />By entering, you confirm you are of legal age.
        </p>
        <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <button onClick={handleConfirm} style={{ width: "100%", padding: "1rem", fontSize: "0.875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#f8eef3", backgroundColor: "#ff2e88", border: "none" }}>
            I confirm I am 18+
          </button>
          <button onClick={handleExit} style={{ width: "100%", padding: "1rem", fontSize: "0.875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#c9a9ba", backgroundColor: "transparent", border: "2px solid #3d1e2c" }}>
            I am under 18
          </button>
        </div>
      </div>
    </div>
  );
}
