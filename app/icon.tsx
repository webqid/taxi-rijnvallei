import { ImageResponse } from "next/og"
import { SteeringWheelIcon } from "@/components/steering-wheel"

export const size = {
  width: 32,
  height: 32,
}
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fbbf24",
          borderRadius: "16px",
        }}
      >
        <SteeringWheelIcon width="26" height="26" stroke="#171717" strokeWidth={2.25} />
      </div>
    ),
    {
      ...size,
    }
  )
}
