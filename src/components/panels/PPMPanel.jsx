import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// CPM 공정표 기능 목록
const cpmFeatures = [
  { icon: "project", text: "대규모/개별 프로젝트 계획 및 공정 관리" },
  { icon: "cost", text: "비용(Costs) 연동 관리" },
  { icon: "portfolio", text: "전사/포트폴리오 관점 확장" },
  { icon: "team", text: "팀 네트워크 기반 실적 업데이트" },
];

// Resource 관리 기능 목록
const resourceFeatures = [
  { icon: "optimize", text: "Role/Resource 최적화" },
  { icon: "demand", text: "수요·용량 계획" },
  { icon: "decision", text: "프로젝트 전 수명주기 의사결정 지원" },
  { icon: "chart", text: "활용도 그래픽 분석 (히트맵/커브)" },
];

function PPMPanel({ id }) {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState("cpm");
  const [downloadClicked, setDownloadClicked] = useState(false);
  const [isFloatingVisible, setIsFloatingVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Scroll animations
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        ".ppm-hero-content > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ppm-hero",
            start: "top 80%",
          },
        },
      );

      // Feature cards stagger animation
      gsap.fromTo(
        ".ppm-feature-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".ppm-features-section",
            start: "top 70%",
          },
        },
      );

      // Bottom CTA animation
      gsap.fromTo(
        ".ppm-bottom-cta",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".ppm-bottom-cta",
            start: "top 90%",
          },
        },
      );
    }, section);

    // Floating CTA visibility
    const handleScroll = () => {
      const heroSection = section.querySelector(".ppm-hero");
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        setIsFloatingVisible(rect.bottom < 0);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDownload = () => {
    setDownloadClicked(true);
    setTimeout(() => setDownloadClicked(false), 2000);
  };

  const renderIcon = (icon) => {
    switch (icon) {
      case "project":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
          </svg>
        );
      case "cost":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        );
      case "portfolio":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
        );
      case "team":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case "optimize":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        );
      case "demand":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        );
      case "decision":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
        );
      case "chart":
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 3v18h18" />
            <path d="M18 17V9" />
            <path d="M13 17V5" />
            <path d="M8 17v-3" />
          </svg>
        );
      default:
        return null;
    }
  };

  const FeatureCard = ({ title, icon: cardIcon, features, isActive }) => (
    <div className={`ppm-feature-card ${isActive ? "active" : ""}`}>
      <div className="ppm-feature-card-header">
        <span className="ppm-feature-card-icon">
          {cardIcon === "cpm" ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <rect
                x="7"
                y="14"
                width="4"
                height="3"
                rx="0.5"
                fill="currentColor"
                opacity="0.3"
              />
              <rect
                x="13"
                y="14"
                width="5"
                height="3"
                rx="0.5"
                fill="currentColor"
                opacity="0.5"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="7" r="4" />
              <path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" />
              <circle cx="19" cy="7" r="3" />
              <path d="M22 21v-1a3 3 0 0 0-3-3h-1" />
            </svg>
          )}
        </span>
        <h3 className="ppm-feature-card-title">{title}</h3>
      </div>
      <ul className="ppm-feature-list">
        {features.map((feature, index) => (
          <li key={index} className="ppm-feature-item">
            <span className="ppm-feature-icon">{renderIcon(feature.icon)}</span>
            <span className="ppm-feature-text">{feature.text}</span>
          </li>
        ))}
      </ul>
      <div className="ppm-feature-visual">
        {cardIcon === "cpm" ? (
          <div className="ppm-gantt-preview">
            <div
              className="ppm-gantt-bar"
              style={{ width: "60%", animationDelay: "0s" }}
            />
            <div
              className="ppm-gantt-bar"
              style={{ width: "80%", animationDelay: "0.2s" }}
            />
            <div
              className="ppm-gantt-bar critical"
              style={{ width: "100%", animationDelay: "0.4s" }}
            />
            <div
              className="ppm-gantt-bar"
              style={{ width: "50%", animationDelay: "0.6s" }}
            />
          </div>
        ) : (
          <div className="ppm-resource-preview">
            <div className="ppm-resource-bar" style={{ height: "40%" }} />
            <div className="ppm-resource-bar" style={{ height: "60%" }} />
            <div
              className="ppm-resource-bar overflow"
              style={{ height: "85%" }}
            />
            <div className="ppm-resource-bar" style={{ height: "45%" }} />
            <div
              className="ppm-resource-bar overflow"
              style={{ height: "75%" }}
            />
            <div className="ppm-capacity-line" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section id={id} ref={sectionRef} className="section ppm-panel-v3">
      {/* Hero Section */}
      <div className="ppm-hero">
        <div className="ppm-hero-bg" />
        <div className="container">
          <div className="ppm-hero-content">
            <div className="ppm-oracle-badge">
              <svg
                className="ppm-oracle-logo"
                viewBox="0 0 100 16"
                fill="currentColor"
              >
                <text x="0" y="13" fontSize="14" fontWeight="bold">
                  ORACLE
                </text>
              </svg>
              <span>Primavera</span>
            </div>
            <h2 className="ppm-hero-title">Primavera P6 PPM</h2>
            <div className="ppm-hero-divider" />
            <p className="ppm-hero-headline">
              <br /><br />모든 규모의 프로젝트를 정밀하게 관리하세요
            </p>
            <p className="ppm-hero-desc">
              복잡한 프로젝트를 정밀하게 일정·자원 계획/통제하는
              <br />
              전문가용 PM 도구
            </p>
            <br />
            <button
              className={`btn ppm-hero-cta ${downloadClicked ? "clicked" : ""}`}
              onClick={handleDownload}
            >
              {downloadClicked ? (
                <>
                  <svg
                    className="ppm-check-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  다운로드 완료
                </>
              ) : (
                <>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  소개서 다운로드
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Features Section - 2 Column */}
      <div className="ppm-features-section">
        <div className="container">
          {/* Mobile Tabs */}
          <div className="ppm-mobile-tabs">
            <button
              className={`ppm-tab ${activeTab === "cpm" ? "active" : ""}`}
              onClick={() => setActiveTab("cpm")}
            >
              CPM 공정표
            </button>
            <button
              className={`ppm-tab ${activeTab === "resource" ? "active" : ""}`}
              onClick={() => setActiveTab("resource")}
            >
              Resource 관리
            </button>
          </div>

          {/* Desktop: 2 Column Layout */}
          {/* <div className="ppm-features-grid">
            <FeatureCard
              title="CPM 공정표"
              icon="cpm"
              features={cpmFeatures}
              isActive={activeTab === "cpm"}
            />
            <FeatureCard
              title="Resource 관리"
              icon="resource"
              features={resourceFeatures}
              isActive={activeTab === "resource"}
            />
          </div> */}
        </div>
      </div>

      {/* Bottom CTA Section */}
      {/* <div className="ppm-bottom-cta">
        <div className="container">
          <p className="ppm-cta-headline">
            프로젝트 스케줄링의 새로운 기준을 경험하세요
          </p>
          <button
            className={`btn ppm-cta-btn ${downloadClicked ? "clicked" : ""}`}
            onClick={handleDownload}
          >
            {downloadClicked ? (
              <>
                <svg
                  className="ppm-check-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                다운로드 완료
              </>
            ) : (
              <>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                소개서 다운로드
                <span className="ppm-page-count">13P PDF</span>
              </>
            )}
          </button>
          <div className="ppm-source">
            <span className="ppm-source-line" />
            <span className="ppm-source-text">출처: Oracle 공식 홈페이지</span>
          </div>
        </div>
      </div> */}

      {/* Floating CTA */}
      <div className={`ppm-floating-cta ${isFloatingVisible ? "visible" : ""}`}>
        <button
          className={`btn ppm-floating-btn ${downloadClicked ? "clicked" : ""}`}
          onClick={handleDownload}
        >
          {downloadClicked ? (
            <svg
              className="ppm-check-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          )}
          <span>소개서 다운로드</span>
        </button>
      </div>
    </section>
  );
}

export default PPMPanel;
