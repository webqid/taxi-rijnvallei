import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Taxi Rijnvallei - Taxiservice Wageningen en omgeving"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
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
            background: "#f59e0b",
            marginBottom: "40px",
          }}
        >
          <span
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "#1a1a2e",
            }}
          >
            TR
          </span>
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
          Taxiservice Wageningen en omgeving
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
            <span>✓</span>
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
            <span>✓</span>
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
            <span>✓</span>
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
            Bel 0317-844466
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
