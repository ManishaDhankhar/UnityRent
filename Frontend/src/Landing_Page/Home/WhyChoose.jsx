import { useState } from "react";

const NAVY = "#002d5b";
const GOLD = "#F5A623";
const LIGHT_BG = "#EEF3F9";

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    label: "Verified Users",
    desc: "Student email & phone verification for safety",
    stat: "100% Verified",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "Easy Booking",
    desc: "Rent items in minutes with secure payments",
    stat: "2 Min Setup",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    label: "Direct Chat",
    desc: "Message owners directly within the platform",
    stat: "Real-time",
  },
];

export default function WhyChooseUs() {
  const [hovered, setHovered] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');

        .wcu-section * {
          font-family: 'Montserrat', sans-serif;
          box-sizing: border-box;
        }

        .wcu-card {
          background: #fff;
          border-radius: 16px;
          border: 1.5px solid #c5d5e8;
          padding: 36px 28px 28px;
          text-align: left;
          cursor: default;
          position: relative;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .wcu-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(0, 45, 91, 0.14);
          border-color: ${NAVY};
        }

        .wcu-card-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, ${NAVY}, ${GOLD});
          border-radius: 16px 16px 0 0;
          opacity: 0;
          transition: opacity 0.25s ease;
        }

        .wcu-card:hover .wcu-card-bar {
          opacity: 1;
        }

        .wcu-icon-circle {
          width: 62px;
          height: 62px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${LIGHT_BG};
          color: ${NAVY};
          border: 2px solid #c5d5e8;
          margin-bottom: 22px;
          transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
        }

        .wcu-card:hover .wcu-icon-circle {
          background: ${NAVY};
          color: #fff;
          border-color: ${NAVY};
          transform: scale(1.08) rotate(-4deg);
        }

        .wcu-stat {
          display: inline-block;
          background: ${LIGHT_BG};
          color: ${NAVY};
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          padding: 4px 10px;
          border-radius: 20px;
          margin-bottom: 14px;
          border: 1px solid #c5d5e8;
          transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
        }

        .wcu-card:hover .wcu-stat {
          background: ${GOLD};
          color: #fff;
          border-color: ${GOLD};
        }

        .wcu-learn {
          font-size: 13px;
          font-weight: 600;
          color: ${GOLD};
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.25s ease, transform 0.25s ease;
          display: inline-block;
          margin-top: 12px;
        }

        .wcu-card:hover .wcu-learn {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 680px) {
          .wcu-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <section
        className="wcu-section"
        style={{
          backgroundColor: LIGHT_BG,
          padding: "80px 40px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Decorative blobs */}
        <div style={{
          position: "absolute", top: "-80px", left: "-80px",
          width: "320px", height: "320px", borderRadius: "50%",
          backgroundColor: NAVY, opacity: 0.05, pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "-60px", right: "-60px",
          width: "260px", height: "260px", borderRadius: "50%",
          backgroundColor: GOLD, opacity: 0.08, pointerEvents: "none",
        }} />

        {/* Header */}
        <div style={{ marginBottom: "56px", position: "relative", zIndex: 1 }}>
          <p style={{
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em",
            color: GOLD, margin: "0 0 14px", textTransform: "uppercase",
            fontFamily: "'Montserrat', sans-serif",
          }}>
            OUR ADVANTAGES
          </p>
          <h2 style={{
            fontSize: "38px", fontWeight: 800,
            color: NAVY, margin: "0 0 14px", lineHeight: 1.2,
            fontFamily: "'Montserrat', sans-serif",
          }}>
            Why Choose{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              UnityRent?
              <span style={{
                position: "absolute", bottom: "-4px", left: 0, right: 0,
                height: "3px", backgroundColor: GOLD, borderRadius: "2px",
              }} />
            </span>
          </h2>
          <p style={{
            fontSize: "15px", color: "#4a6480",
            margin: "18px 0 0", fontWeight: 500,
            fontFamily: "'Montserrat', sans-serif",
          }}>
            Everything you need to rent with confidence
          </p>
        </div>

        {/* Cards */}
        <div
          className="wcu-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            maxWidth: "920px",
            width: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          {features.map((f, i) => (
            <div
              key={f.label}
              className="wcu-card"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="wcu-card-bar" />
              <div className="wcu-icon-circle">{f.icon}</div>
              <span className="wcu-stat">{f.stat}</span>
              <h3 style={{
                fontSize: "17px", fontWeight: 700,
                color: NAVY, margin: "0 0 10px",
                fontFamily: "'Montserrat', sans-serif",
              }}>
                {f.label}
              </h3>
              <p style={{
                fontSize: "14px", color: "#4a6480",
                lineHeight: 1.65, margin: 0, fontWeight: 500,
                fontFamily: "'Montserrat', sans-serif",
              }}>
                {f.desc}
              </p>
              <div className="wcu-learn">Learn more →</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}