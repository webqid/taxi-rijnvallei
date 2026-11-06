"use client"

import { useEffect, useSyncExternalStore } from "react"
import Link from "next/link"
import { Cookie } from "lucide-react"
import { Button } from "@/components/ui/button"

const CONSENT_KEY = "cookie-consent"

type ConsentValue = "granted" | "denied"

interface ConsentState {
  analytics: ConsentValue
  marketing: ConsentValue
}

// localStorage can be unavailable (private mode, blocked storage). The choice
// is then kept in memory for the rest of the visit.
let memoryConsent: string | null = null
const listeners = new Set<() => void>()

function readConsent(): string | null {
  try {
    return localStorage.getItem(CONSENT_KEY) ?? memoryConsent
  } catch {
    return memoryConsent
  }
}

function parseConsent(raw: string | null): ConsentState | null {
  if (!raw) return null
  try {
    return JSON.parse(raw) as ConsentState
  } catch {
    return null
  }
}

function subscribe(onChange: () => void) {
  listeners.add(onChange)
  window.addEventListener("storage", onChange)
  return () => {
    listeners.delete(onChange)
    window.removeEventListener("storage", onChange)
  }
}

function updateGtagConsent(consent: ConsentState) {
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
  gtag?.("consent", "update", {
    analytics_storage: consent.analytics,
    ad_storage: consent.marketing,
    ad_user_data: consent.marketing,
    ad_personalization: consent.marketing,
  })
}

function saveConsent(consent: ConsentState) {
  memoryConsent = JSON.stringify(consent)
  try {
    localStorage.setItem(CONSENT_KEY, memoryConsent)
  } catch {
    // Storage blocked: keep the in-memory value.
  }
  updateGtagConsent(consent)
  listeners.forEach((listener) => listener())
}

export function CookieBar() {
  // On the server (and during hydration) the bar is hidden; it appears in the
  // browser only when no choice was stored yet.
  const rawConsent = useSyncExternalStore(subscribe, readConsent, () => "server")
  const consent = parseConsent(rawConsent)

  // Re-apply a stored choice on every page load: Consent Mode starts as "denied".
  useEffect(() => {
    if (consent) updateGtagConsent(consent)
  }, [rawConsent]) // eslint-disable-line react-hooks/exhaustive-deps

  if (rawConsent !== null) return null

  return (
    <div
      role="dialog"
      aria-label="Cookiemelding"
      className="fixed inset-x-0 bottom-20 z-50 p-4 md:bottom-0"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-xl border border-border bg-background p-5 shadow-lg sm:flex-row sm:items-center sm:gap-6">
        <div className="flex items-start gap-3 sm:items-center">
          <Cookie className="mt-0.5 size-5 shrink-0 text-muted-foreground sm:mt-0" />
          <p className="text-sm text-muted-foreground">
            Wij gebruiken cookies om uw ervaring te verbeteren en ons websiteverkeer te analyseren.
            Lees ons{" "}
            <Link href="/privacybeleid" prefetch={false} className="underline hover:text-foreground">
              privacybeleid
            </Link>{" "}
            voor meer informatie.
          </p>
        </div>
        <div className="flex shrink-0 gap-2 sm:ml-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => saveConsent({ analytics: "denied", marketing: "denied" })}
          >
            Alleen noodzakelijk
          </Button>
          <Button size="sm" onClick={() => saveConsent({ analytics: "granted", marketing: "granted" })}>
            Accepteren
          </Button>
        </div>
      </div>
    </div>
  )
}
