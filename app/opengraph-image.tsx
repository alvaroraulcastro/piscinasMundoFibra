import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Piscinas Mundo Fibra — Piscinas de fibra de vidrio en Chile";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #003d6b 0%, #0057a8 50%, #006ea8 100%)",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background circles */}
        <div
          style={{
            position: "absolute",
            top: -60,
            left: -60,
            width: 300,
            height: 300,
            borderRadius: "50%",
            border: "2px solid rgba(0,200,224,0.15)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            right: -40,
            width: 400,
            height: 400,
            borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.08)",
            display: "flex",
          }}
        />

        {/* Wave bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 120,
            background: "rgba(0,200,224,0.12)",
            borderRadius: "100% 100% 0 0",
            display: "flex",
          }}
        />

        {/* Logo infinity SVG */}
        <svg
          width="130"
          height="80"
          viewBox="0 0 130 80"
          style={{ marginBottom: 24 }}
        >
          <path
            d="M25 40 C25 27.85 34.85 18 47 18 C59.15 18 66 24.75 68 40 C70 55.25 76.85 62 89 62 C101.15 62 111 52.15 111 40 C111 27.85 101.15 18 89 18 C76.85 18 70 24.75 68 40 C66 55.25 59.15 62 47 62 C34.85 62 25 52.15 25 40 Z"
            fill="none"
            stroke="#00c8e0"
            strokeWidth="7"
            strokeLinecap="round"
          />
        </svg>

        {/* Title */}
        <div
          style={{
            fontSize: 62,
            fontWeight: 900,
            color: "white",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: 16,
            letterSpacing: "-1px",
          }}
        >
          Piscinas Mundo Fibra
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 26,
            color: "#00c8e0",
            textAlign: "center",
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          Piscinas de Fibra de Vidrio en Chile
        </div>

        {/* Divider */}
        <div
          style={{
            width: 480,
            height: 1,
            background: "rgba(0,200,224,0.4)",
            marginBottom: 28,
            display: "flex",
          }}
        />

        {/* Features */}
        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.75)",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Alta Durabilidad · Fácil Mantenimiento · Cotiza Online
        </div>

        {/* Contact */}
        <div
          style={{
            fontSize: 20,
            color: "rgba(255,255,255,0.5)",
            textAlign: "center",
          }}
        >
          +56 9 5408 8120 · @piscinasmundofibra
        </div>
      </div>
    ),
    { ...size }
  );
}
