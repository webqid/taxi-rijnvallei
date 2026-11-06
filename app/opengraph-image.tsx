import { ImageResponse } from "next/og"
import { SITE } from "@/lib/config/site"
import { SteeringWheelIcon } from "@/components/steering-wheel"

// No `runtime` export: Cache Components requires the Node.js runtime, and this
// image is now generated once at build time instead of on every request.

export const alt = "Taxi Rijnvallei - Taxiservice Ede, Wageningen en omgeving"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        {/* Logo circle */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "120px",
            height: "120px",
            borderRadius: "60px",
            background: "#fbbf24",
            marginBottom: "40px",
          }}
        >
          <SteeringWheelIcon width="80" height="80" stroke="#171717" strokeWidth={2.25} />
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            color: "#ffffff",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Taxi Rijnvallei
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "32px",
            color: "#94a3b8",
            marginBottom: "40px",
            textAlign: "center",
          }}
        >
          Taxiservice Ede, Wageningen en omgeving
        </p>

        {/* Features */}
        <div
          style={{
            display: "flex",
            gap: "40px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#f59e0b",
              fontSize: "24px",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24">
              <path d="M20 6 9 17l-5-5" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ color: "#ffffff" }}>24/7 bereikbaar</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#f59e0b",
              fontSize: "24px",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24">
              <path d="M20 6 9 17l-5-5" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ color: "#ffffff" }}>Vaste tarieven</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#f59e0b",
              fontSize: "24px",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24">
              <path d="M20 6 9 17l-5-5" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ color: "#ffffff" }}>Luchthavenvervoer</span>
          </div>
        </div>

        {/* Phone number */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            background: "#f59e0b",
            padding: "16px 40px",
            borderRadius: "12px",
          }}
        >
          <span
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#1a1a2e",
            }}
          >
            Bel {SITE.phone.display}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
