import { useState } from "react";

const steps = [
  {
    number: 1,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    label: "Browse",
    desc: "Browse items & services near you",
  },
  {
    number: 2,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    label: "Chat",
    desc: "Chat and confirm securely",
  },
  {
    number: 3,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    label: "Verify",
    desc: "Digital agreement protects both sides",
  },
  {
    number: 4,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    label: "Review",
    desc: "Rent → Return → Review",
  },
];

export default function HowItWorks() {
  const [hovered, setHovered] = useState(null);

  return (
    <section style={styles.section}>
      <p style={styles.eyebrow}>HOW IT WORKS</p>
      <h2 style={styles.title}>First time here?</h2>
      <p style={styles.subtitle}>Renting is simple:</p>

      <div style={styles.stepsRow}>
        {steps.map((step, i) => (
          <div key={step.number} style={styles.stepWrapper}>
            {/* Connector line (not after last step) */}
            {i < steps.length - 1 && (
              <div style={styles.connector} aria-hidden="true" />
            )}

            {/* Icon ring */}
            <div
              style={{
                ...styles.iconRing,
                ...(hovered === i ? styles.iconRingHover : {}),
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <span style={styles.icon}>{step.icon}</span>
              <span style={styles.badge}>{step.number}</span>
            </div>

            <p style={styles.label}>{step.label}</p>
            <p style={styles.desc}>{step.desc}</p>
          </div>
        ))}
      </div>

      <p style={styles.tagline}>
        <span style={styles.tagSpan}>No paperwork.</span>{" "}
        <span style={styles.tagSpan}>No awkward follow-ups.</span>{" "}
        <span style={styles.tagSpan}>No confusion.</span>
      </p>
    </section>
  );
}

const ORANGE = "#D85A30";
const ORANGE_LIGHT = "#F0997B";

const styles = {
  section: {
    backgroundColor: "#F5F4F0",
    padding: "64px 32px",
    textAlign: "center",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  eyebrow: {
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.12em",
    color: ORANGE,
    margin: "0 0 12px",
    textTransform: "uppercase",
  },
  title: {
    fontSize: "36px",
    fontWeight: 700,
    color: "#1A1A2E",
    margin: "0 0 8px",
  },
  subtitle: {
    fontSize: "20px",
    fontWeight: 600,
    color: "#4A4A6A",
    margin: "0 0 56px",
  },
  stepsRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: "0",
    width: "100%",
    maxWidth: "760px",
    position: "relative",
  },
  stepWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    position: "relative",
  },
  connector: {
    position: "absolute",
    top: "32px",
    left: "50%",
    right: "-50%",
    height: "2px",
    background: `linear-gradient(90deg, ${ORANGE}, ${ORANGE_LIGHT})`,
    zIndex: 0,
  },
  iconRing: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    border: `2.5px solid ${ORANGE}`,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 1,
    marginBottom: "16px",
    cursor: "default",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    color: ORANGE,
  },
  iconRingHover: {
    transform: "translateY(-4px)",
    boxShadow: `0 8px 24px rgba(216, 90, 48, 0.2)`,
  },
  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    bottom: "-4px",
    right: "-4px",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: ORANGE,
    color: "#fff",
    fontSize: "10px",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: "15px",
    fontWeight: 700,
    color: "#1A1A2E",
    margin: "0 0 6px",
  },
  desc: {
    fontSize: "13px",
    color: "#5A5A7A",
    lineHeight: 1.55,
    maxWidth: "130px",
    margin: "0 auto",
  },
  tagline: {
    marginTop: "56px",
    fontSize: "16px",
    fontStyle: "italic",
    color: "#5A5A7A",
  },
  tagSpan: {
    color: ORANGE,
    fontStyle: "normal",
    fontWeight: 500,
  },
};