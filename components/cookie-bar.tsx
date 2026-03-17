"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Cookie } from "lucide-react"

const CONSENT_KEY = "cookie-consent"

type ConsentValue = "granted" | "denied"

interface ConsentState {
  analytics: ConsentValue
  marketing: ConsentValue
}

function getStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null
  try {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (!stored) return null
    return JSON.parse(stored) as ConsentState
  } catch {
    return null
  }
}

function storeConsent(consent: ConsentState) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent))
}

function updateGtagConsent(consent: ConsentState) {
  if (typeof window === "undefined") return
  const w = window as unknown as Record<string, unknown>
  if (typeof w.gtag !== "function") return
  const gtag = w.gtag as (...args: unknown[]) => void
  gtag("consent", "update", {
    analytics_storage: consent.analytics,
    ad_storage: consent.marketing,
    ad_user_data: consent.marketing,
    ad_personalization: consent.marketing,
  })
}

export function CookieBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = getStoredConsent()
    if (!stored) {
      setVisible(true)
    } else {
      updateGtagConsent(stored)
    }
  }, [])

  const handleAcceptAll = useCallback(() => {
    const consent: ConsentState = { analytics: "granted", marketing: "granted" }
    storeConsent(consent)
    updateGtagConsent(consent)
    setVisible(false)
  }, [])

  const handleNecessaryOnly = useCallback(() => {
    const consent: ConsentState = { analytics: "denied", marketing: "denied" }
    storeConsent(consent)
    updateGtagConsent(consent)
    setVisible(false)
  }, [])

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookiemelding"
      className="fixed inset-x-0 bottom-0 z-50 p-4"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-xl border border-border bg-background p-5 shadow-lg sm:flex-row sm:items-center sm:gap-6">
        <div className="flex items-start gap-3 sm:items-center">
          <Cookie className="mt-0.5 size-5 shrink-0 text-muted-foreground sm:mt-0" />
          <p className="text-sm text-muted-foreground">
            Wij gebruiken cookies om uw ervaring te verbeteren en ons websiteverkeer te analyseren.
            Lees ons{" "}
            <a href="/privacybeleid" className="underline hover:text-foreground">
              privacybeleid
            </a>{" "}
            voor meer informatie.
          </p>
        </div>
        <div className="flex shrink-0 gap-2 sm:ml-auto">
          <Button variant="outline" size="sm" onClick={handleNecessaryOnly}>
            Alleen noodzakelijk
          </Button>
          <Button size="sm" onClick={handleAcceptAll}>
            Accepteren
          </Button>
        </div>
      </div>
    </div>
  )
}
