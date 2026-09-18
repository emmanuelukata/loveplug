"use client";

import { useSyncExternalStore } from "react";
import { setCookie } from "@/lib/cookies";

const COOKIE_NAME = "age-confirmed";
const COOKIE_DAYS = 30;

function subscribeCookie(): () => void {
  return () => {};
}

function getCookieSnapshot(): boolean {
  if (typeof document === "undefined") return false;
  const match = document.cookie.match(new RegExp(`(^| )${COOKIE_NAME}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) === "true" : false;
}

function getCookieServerSnapshot(): boolean {
  return false;
}

export default function AgeGate() {
  const confirmed = useSyncExternalStore(
    subscribeCookie,
    getCookieSnapshot,
    getCookieServerSnapshot,
  );

  const handleConfirm = () => {
    setCookie(COOKIE_NAME, "true", COOKIE_DAYS);
    window.location.reload();
  };

  const handleExit = () => {
    window.location.href = "https://google.com";
  };

  if (confirmed) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-secondary"
      role="dialog"
      aria-modal="true"
      aria-label="Age verification"
    >
      <div className="w-full max-w-md px-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-tertiary">
          Age Verification
        </h1>
        <p className="mt-4 text-tertiary/70 leading-relaxed">
          This website contains content intended for adults aged 18 and over.
          By entering, you confirm you are of legal age.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={handleConfirm}
            className="w-full bg-primary px-8 py-3 text-sm font-semibold uppercase tracking-wider text-tertiary transition-all hover:bg-accent-hover"
          >
            I confirm I am 18+
          </button>
          <button
            onClick={handleExit}
            className="w-full border border-tertiary/30 px-8 py-3 text-sm font-medium text-tertiary/70 transition-colors hover:border-tertiary hover:text-tertiary"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
