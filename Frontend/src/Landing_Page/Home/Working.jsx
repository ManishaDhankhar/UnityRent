import React from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const steps = [
  {
    id: 1,
    stepNum: '01',
    title: 'Browse & Discover',
    desc: 'Explore thousands of verified items & skills listed by fellow students nearby.',
    icon: <SearchOutlinedIcon sx={{ fontSize: 30 }} />,
    color: '#063b28',
    bg: '#e6f5f0'
  },
  {
    id: 2,
    stepNum: '02',
    title: 'Instant Chat',
    desc: 'Connect directly with owners or service providers to confirm availability.',
    icon: <ChatOutlinedIcon sx={{ fontSize: 30 }} />,
    color: '#855b28',
    bg: '#f6eedf'
  },
  {
    id: 3,
    stepNum: '03',
    title: 'Digital Verification',
    desc: 'Secure digital agreement and student ID check protect both parties automatically.',
    icon: <VerifiedUserOutlinedIcon sx={{ fontSize: 30 }} />,
    color: '#1d6092',
    bg: '#e3f0f8'
  },
  {
    id: 4,
    stepNum: '04',
    title: 'Rent & Review',
    desc: 'Pick up your item, enjoy your rental, return hassle-free and leave a review.',
    icon: <AutorenewOutlinedIcon sx={{ fontSize: 30 }} />,
    color: '#063b28',
    bg: '#e6f5f0'
  },
];

const Working = () => {
  return (
    <section className="how-it-works-section">
      {/* Header */}
      <div className="section-header">
        <span className="section-subtitle">HOW IT WORKS</span>
        <h2 className="section-main-title">First Time Here? Renting is Simple</h2>
        <p className="section-desc">Get what you need in 4 effortless steps without standard retail costs</p>
      </div>

      {/* Steps Track Container */}
      <div className="steps-container">
        {/* Connecting Gradient Track (Desktop) */}
        <div className="connecting-line"></div>

        <div className="steps-grid">
          {steps.map((step, idx) => (
            <div key={step.id} className="step-card">
              {/* Step Number Tag */}
              <span className="step-number">{step.stepNum}</span>

              {/* Icon Container with Floating Glow */}
              <div
                className="step-icon-wrapper"
                style={{ backgroundColor: step.bg, color: step.color }}
              >
                {step.icon}
              </div>

              {/* Step Content */}
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>

              {/* Desktop Direction Arrow for intermediate steps */}
              {idx < steps.length - 1 && (
                <div className="step-arrow-connector">
                  <ArrowForwardIcon sx={{ fontSize: 16, color: '#a0c4b7' }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Guarantee Banner */}
      <div className="bottom-guarantee-banner">
        <span className="banner-icon">⚡</span>
        <span className="banner-text">
          No paperwork • No awkward follow-ups • 100% Student Verified & Safe
        </span>
      </div>

      {/* Component CSS */}
      <style>{`
        .how-it-works-section {
          padding: 80px 4%;
          background: linear-gradient(180deg, #ffffff 0%, #f4faf8 50%, #ffffff 100%);
          position: relative;
          overflow: hidden;
        }

        .section-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 60px;
        }

        .section-subtitle {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 800;
          color: #855b28;
          letter-spacing: 2px;
          text-transform: uppercase;
          display: block;
          margin-bottom: 10px;
        }

        .section-main-title {
          font-family: 'Plus Jakarta Sans', 'Outfit', sans-serif;
          font-size: 2.8rem;
          font-weight: 800;
          color: #063b28;
          margin: 0 0 12px;
          letter-spacing: -1px;
          line-height: 1.2;
        }

        .section-desc {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.05rem;
          color: #597a6e;
          margin: 0;
        }

        /* Container & Connecting Line */
        .steps-container {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 0;
        }

        .connecting-line {
          display: none;
        }

        @media (min-width: 992px) {
          .connecting-line {
            display: block;
            position: absolute;
            top: 72px;
            left: 12%;
            right: 12%;
            height: 3px;
            background: linear-gradient(90deg, #cce4db 0%, #f7cb2c 50%, #cce4db 100%);
            border-radius: 4px;
            z-index: 1;
          }
        }

        /* Steps Grid */
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 30px;
          position: relative;
          z-index: 2;
        }

        @media (min-width: 640px) {
          .steps-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 992px) {
          .steps-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
          }
        }

        /* Card Component */
        .step-card {
          background: #ffffff;
          border: 1px solid #eef4f1;
          border-radius: 24px;
          padding: 32px 24px 28px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(6, 59, 40, 0.05);
          position: relative;
          transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .step-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 45px rgba(6, 59, 40, 0.12);
          border-color: #cce4db;
        }

        .step-number {
          position: absolute;
          top: -14px;
          background: #063b28;
          color: #f7cb2c;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: 0.8rem;
          padding: 3px 12px;
          border-radius: 50px;
          box-shadow: 0 4px 12px rgba(6, 59, 40, 0.2);
          letter-spacing: 1px;
        }

        .step-icon-wrapper {
          width: 72px;
          height: 72px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          box-shadow: 0 8px 20px rgba(6, 59, 40, 0.08);
          transition: transform 0.3s ease;
        }

        .step-card:hover .step-icon-wrapper {
          transform: scale(1.1) rotate(4deg);
        }

        .step-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 1.25rem;
          font-weight: 800;
          color: #063b28;
          margin: 0 0 10px;
          line-height: 1.3;
        }

        .step-desc {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.9rem;
          color: #597a6e;
          margin: 0;
          line-height: 1.5;
        }

        .step-arrow-connector {
          display: none;
        }

        @media (min-width: 992px) {
          .step-arrow-connector {
            display: flex;
            position: absolute;
            right: -15px;
            top: 65px;
            background: #ffffff;
            border: 1px solid #d8e8e2;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            align-items: center;
            justify-content: center;
            z-index: 5;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          }
        }

        /* Bottom Banner */
        .bottom-guarantee-banner {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin: 50px auto 0;
          background: #e6f5f0;
          border: 1px solid #bce2d5;
          padding: 12px 28px;
          border-radius: 50px;
          box-shadow: 0 4px 16px rgba(6, 59, 40, 0.06);
        }

        .bottom-guarantee-banner {
          display: flex;
          max-width: fit-content;
        }

        .banner-icon {
          font-size: 1.1rem;
        }

        .banner-text {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          font-size: 0.92rem;
          color: #063b28;
        }

        @media (max-width: 768px) {
          .section-main-title {
            font-size: 2.1rem;
          }
          .bottom-guarantee-banner {
            padding: 10px 18px;
          }
          .banner-text {
            font-size: 0.82rem;
          }
        }
      `}</style>
    </section>
  );
}

export default Working;