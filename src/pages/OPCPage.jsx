import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import SectionIndicator from "../components/SectionIndicator";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const sections = [
  { id: "hero", label: "OPC" },
  { id: "menu", label: "메뉴" },
  { id: "overview-content", label: "개요" },
  { id: "core", label: "핵심 기능" },
  { id: "application", label: "활용 방안" },
];

const subMenuItems = [
  {
    id: "overview",
    title: "개요",
    description: "클라우드 기반의 유연한 프로젝트 관리",
    image:
      "https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "#overview-content",
  },
  {
    id: "core",
    title: "핵심 기능",
    description: "일정, 리스크, 포트폴리오, Lean 관리",
    image:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "#core",
  },
  {
    id: "application",
    title: "활용 방안",
    description: "기업 규모별 최적의 도입 방안",
    image:
      "https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "#application",
  },
];

// Overview Features Data
const overviewFeatures = [
  { title: "클라우드 기반", desc: "SaaS 기반의 유연한 서비스" },
  { title: "모바일 지원", desc: "모바일 기기에서의 접근성" },
  { title: "실시간 협업", desc: "팀원간 실시간 협업 환경" },
  { title: "자동 업데이트", desc: "최신 기능 자동 업데이트" },
];

// Core Features Data
const coreFeatures = [
  {
    number: "01",
    title: "Schedule Management",
    desc: "클라우드 기반 일정 관리 및 협업",
  },
  {
    number: "02",
    title: "Risk Analysis",
    desc: "Monte Carlo 시뮬레이션 기반 리스크 분석",
  },
  {
    number: "03",
    title: "Portfolio Analytics",
    desc: "포트폴리오 분석 및 인사이트 도출",
  },
  {
    number: "04",
    title: "Lean Task Management",
    desc: "애자일 방식의 태스크 관리",
  },
];

// Application Data
const applicationData = [
  {
    title: "중소기업",
    desc: "초기 투자 없이 클라우드 서비스로 프로젝트 관리 시작",
    list: ["빠른 도입 및 적용", "낮은 초기 비용", "유연한 확장"],
    img: "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "대기업",
    desc: "기존 On-premise 솔루션과 연계한 하이브리드 운영",
    list: ["P6와 연동", "글로벌 팀 협업", "통합 대시보드"],
    img: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "프로젝트 팀",
    desc: "현장 중심의 실시간 프로젝트 관리",
    list: ["모바일 접근", "실시간 업데이트", "팀 협업 강화"],
    img: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

function OPCPage() {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const containerRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const currentSectionRef = useRef(0);

  // Section refs
  const heroSectionRef = useRef(null);
  const menuSectionRef = useRef(null);
  const overviewSectionRef = useRef(null);
  const coreSectionRef = useRef(null);
  const applicationSectionRef = useRef(null);

  // Animation refs
  const overviewCardsRef = useRef([]);
  const coreCardsRef = useRef([]);
  const applicationCardsRef = useRef([]);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Navigate to section
  const scrollToSection = useCallback(
    (sectionId) => {
      const sectionIndex = sections.findIndex((s) => s.id === sectionId);
      if (sectionIndex === -1) return;

      const panels = gsap.utils.toArray(".opc-panel");
      if (!panels[sectionIndex]) return;

      currentSectionRef.current = sectionIndex;
      setActiveSection(sectionIndex);

      if (prefersReducedMotion) {
        panels[sectionIndex].scrollIntoView({ behavior: "auto" });
      } else {
        isAnimatingRef.current = true;
        gsap.to(window, {
          duration: 0.8,
          scrollTo: { y: panels[sectionIndex], autoKill: false },
          ease: "power3.inOut",
          onComplete: () => {
            setTimeout(() => {
              isAnimatingRef.current = false;
            }, 100);
          },
        });
      }
    },
    [prefersReducedMotion],
  );

  // Deep linking logic
  useEffect(() => {
    if (sectionId) {
      // Only scroll if we are not already at the right section (to avoid loops if param matches)
      const targetIndex = sections.findIndex((s) => s.id === sectionId); // Simple mapping for strict ids like 'core', 'application'

      // Handle mapping if necessary, or just rely on direct ID match
      // The user requested /opc/overview, /opc/core, /opc/application
      // Our IDs are: overview-content, core, application

      let targetId = sectionId;
      if (sectionId === "overview") targetId = "overview-content";

      const foundIndex = sections.findIndex((s) => s.id === targetId);

      if (foundIndex !== -1 && foundIndex !== currentSectionRef.current) {
        setTimeout(() => {
          scrollToSection(targetId);
        }, 100);
      }
    }
  }, [sectionId, scrollToSection]);

  // Update URL based on section
  const updateUrlForSection = useCallback(
    (index) => {
      let path = "/opc";
      // index 0(Hero), 1(Menu) -> /opc
      if (index === 2) path = "/opc/overview";
      if (index === 3) path = "/opc/core";
      if (index === 4) path = "/opc/application";

      navigate(path, { replace: true });
    },
    [navigate],
  );

  // GSAP scroll hijacking
  useEffect(() => {
    if (prefersReducedMotion) {
      initContentAnimations();
      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    }

    const panels = gsap.utils.toArray(".opc-panel");

    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          currentSectionRef.current = i;
          setActiveSection(i);
          updateUrlForSection(i);
        },
        onEnterBack: () => {
          currentSectionRef.current = i;
          setActiveSection(i);
          updateUrlForSection(i);
        },
      });
    });

    const handleWheel = (e) => {
      if (isAnimatingRef.current) {
        e.preventDefault();
        return;
      }

      const delta = e.deltaY;
      const threshold = 50;

      if (Math.abs(delta) < threshold) return;

      e.preventDefault();
      isAnimatingRef.current = true;

      let nextSection = currentSectionRef.current;

      if (delta > 0 && currentSectionRef.current < panels.length - 1) {
        nextSection = currentSectionRef.current + 1;
      } else if (delta < 0 && currentSectionRef.current > 0) {
        nextSection = currentSectionRef.current - 1;
      } else {
        isAnimatingRef.current = false;
        return;
      }

      currentSectionRef.current = nextSection;
      setActiveSection(nextSection);

      gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: panels[nextSection], autoKill: false },
        ease: "power3.inOut",
        onComplete: () => {
          setTimeout(() => {
            isAnimatingRef.current = false;
          }, 100);
        },
      });
    };

    // Touch events
    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e) => {
      if (isAnimatingRef.current) return;
      const touchEndY = e.changedTouches[0].clientY;
      const delta = touchStartY - touchEndY;
      if (Math.abs(delta) < 50) return;

      isAnimatingRef.current = true;
      let nextSection = currentSectionRef.current;

      if (delta > 0 && currentSectionRef.current < panels.length - 1) {
        nextSection = currentSectionRef.current + 1;
      } else if (delta < 0 && currentSectionRef.current > 0) {
        nextSection = currentSectionRef.current - 1;
      } else {
        isAnimatingRef.current = false;
        return;
      }

      currentSectionRef.current = nextSection;
      setActiveSection(nextSection);

      gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: panels[nextSection], autoKill: false },
        ease: "power3.inOut",
        onComplete: () => {
          setTimeout(() => {
            isAnimatingRef.current = false;
          }, 100);
        },
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    initContentAnimations();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [prefersReducedMotion]);

  // Content Animations
  const initContentAnimations = () => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Hero
      gsap.fromTo(
        ".opc-hero-title",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Menu Stagger
      if (menuSectionRef.current) {
        gsap.fromTo(
          ".opc-menu-card",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            scrollTrigger: {
              trigger: menuSectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Overview Features
      if (overviewSectionRef.current) {
        gsap.fromTo(
          overviewCardsRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            scrollTrigger: {
              trigger: overviewSectionRef.current,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Core Features
      if (coreSectionRef.current) {
        gsap.fromTo(
          coreCardsRef.current,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            scrollTrigger: {
              trigger: coreSectionRef.current,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Application
      if (applicationSectionRef.current) {
        gsap.fromTo(
          applicationCardsRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            scrollTrigger: {
              trigger: applicationSectionRef.current,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    });
    return () => ctx.revert();
  };

  return (
    <>
      <div className="ppm-page opc-page-container" ref={containerRef}>
        {/* 1. Hero Section */}
        <section className="opc-panel tm-panel" id="hero" ref={heroSectionRef}>
          <div
            className="tm-hero-section"
            style={{
              backgroundImage: `linear-gradient(rgba(10, 10, 15, 0.7), rgba(10, 10, 15, 0.9)), url(https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg?auto=compress&cs=tinysrgb&w=1200)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="tm-hero-content">
              <h1 className="opc-hero-title tm-hero-title">OPC</h1>
              <p className="tm-hero-subtitle">Oracle Primavera Cloud</p>
            </div>
            <button
              className="scroll-indicator"
              onClick={() => scrollToSection("menu")}
              aria-label="다음 섹션으로 스크롤"
            >
              <span>Scroll Down</span>
              <div className="scroll-indicator-icon"></div>
            </button>
          </div>
        </section>

        {/* 2. Menu Section (Structure matched to PPM 2nd section) */}
        <section
          className="opc-panel ppm-panel ppm-overview-section"
          id="menu"
          ref={menuSectionRef}
        >
          <div className="ppm-overview-container">
            <div className="ppm-overview-content">
              {/* Breadcrumb */}
              <nav className="ppm-breadcrumb">
                <Link to="/" className="ppm-breadcrumb-home">
                  <span className="ppm-breadcrumb-home-icon">H</span>
                </Link>
                <span className="ppm-breadcrumb-separator">&gt;</span>
                <span className="ppm-breadcrumb-item ppm-breadcrumb-current">
                  OPC
                </span>
              </nav>

              {/* Main Title */}
              <h2 className="ppm-overview-title">
                클라우드 기반의
                <br />
                스마트 건설 관리 플랫폼
              </h2>

              {/* Description */}
              <p className="ppm-overview-description">
                OPC(Oracle Primavera Cloud)는 언제 어디서나 프로젝트를
                <br />
                통합 관리할 수 있는 최적의 클라우드 솔루션입니다.
              </p>

              {/* Divider */}
              <div className="ppm-overview-divider"></div>

              {/* Sub-menu Cards (PPM Style) */}
              <div className="ppm-submenu-grid">
                {subMenuItems.map((item, index) => (
                  <button
                    key={item.id}
                    className="ppm-submenu-card opc-menu-card"
                    onClick={() => scrollToSection(item.link.replace("#", ""))}
                  >
                    <div
                      className="ppm-submenu-card-bg"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="ppm-submenu-card-overlay" />
                    <h4 className="ppm-submenu-card-title">{item.title}</h4>
                    <div className="ppm-submenu-card-arrow">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Overview Section */}
        <section
          className="opc-panel tm-panel"
          id="overview-content"
          ref={overviewSectionRef}
        >
          <div className="tm-methods-section">
            <div className="tm-methods-container">
              <div className="tm-section-header">
                <h2 className="tm-section-title">OPC 개요</h2>
                <p
                  style={{
                    textAlign: "center",
                    color: "var(--text-secondary)",
                    marginBottom: "40px",
                  }}
                >
                  언제 어디서나 프로젝트를 관리할 수 있는 유연함
                </p>
              </div>
              <div
                className="tm-ppm-eppm-grid"
                style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}
              >
                {overviewFeatures.map((item, index) => (
                  <div
                    key={index}
                    className="tm-spoke-box"
                    style={{
                      width: "100%",
                      flexDirection: "column",
                      padding: "30px 20px",
                      height: "auto",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                    ref={(el) => (overviewCardsRef.current[index] = el)}
                  >
                    <div
                      className="tm-spoke-icon"
                      style={{ marginBottom: "15px" }}
                    >
                      {/* Icon */}
                      <svg
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
                      </svg>
                    </div>
                    <h4
                      style={{
                        fontSize: "1.2rem",
                        marginBottom: "10px",
                        color: "var(--text-primary)",
                      }}
                    >
                      {item.title}
                    </h4>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--text-secondary)",
                        lineHeight: "1.5",
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Core Features Section */}
        <section className="opc-panel tm-panel" id="core" ref={coreSectionRef}>
          <div className="tm-advantages-section">
            <div className="tm-advantages-container">
              <div className="tm-section-header">
                <h2 className="tm-section-title">핵심 기능</h2>
                <p
                  style={{
                    textAlign: "center",
                    color: "var(--text-secondary)",
                    marginBottom: "40px",
                  }}
                >
                  Oracle Primavera Cloud의 강력한 기능
                </p>
              </div>
              <div
                className="tm-ppm-eppm-grid"
                style={{ gridTemplateColumns: "repeat(2, 1fr)", gap: "30px" }}
              >
                {coreFeatures.map((item, index) => (
                  <div
                    key={index}
                    className="tm-ppm-eppm-card"
                    style={{
                      padding: "30px",
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                    ref={(el) => (coreCardsRef.current[index] = el)}
                  >
                    <div
                      style={{
                        fontSize: "2rem",
                        fontWeight: "bold",
                        color: "var(--color-accent)",
                        marginRight: "20px",
                        opacity: 0.5,
                      }}
                    >
                      {item.number}
                    </div>
                    <div>
                      <h3
                        style={{
                          fontSize: "1.4rem",
                          marginBottom: "10px",
                          color: "var(--text-primary)",
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "1rem",
                          color: "var(--text-secondary)",
                          lineHeight: "1.5",
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Application Section */}
        <section
          className="opc-panel tm-panel"
          id="application"
          ref={applicationSectionRef}
        >
          <div
            className="tm-methods-section"
            style={{ background: "var(--bg-darker)" }}
          >
            <div className="tm-methods-container">
              <div className="tm-section-header">
                <h2 className="tm-section-title">활용 방안</h2>
              </div>
              <div
                className="tm-ppm-eppm-grid"
                style={{
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "30px",
                  marginTop: "40px",
                }}
              >
                {applicationData.map((item, index) => (
                  <div
                    key={index}
                    className="tm-ppm-eppm-card"
                    style={{ padding: "0", overflow: "hidden", height: "auto" }}
                    ref={(el) => (applicationCardsRef.current[index] = el)}
                  >
                    <div
                      className="tm-card-image"
                      style={{ height: "200px", overflow: "hidden" }}
                    >
                      <img
                        src={item.img}
                        alt={item.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div
                      className="tm-card-content"
                      style={{ padding: "20px" }}
                    >
                      <h3
                        style={{
                          fontSize: "1.25rem",
                          marginBottom: "15px",
                          color: "var(--text-primary)",
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.95rem",
                          color: "var(--text-secondary)",
                          marginBottom: "15px",
                          lineHeight: "1.5",
                        }}
                      >
                        {item.desc}
                      </p>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        {item.list.map((li, i) => (
                          <li
                            key={i}
                            style={{
                              color: "var(--text-tertiary)",
                              fontSize: "0.9rem",
                              marginBottom: "5px",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <span
                              style={{
                                color: "var(--color-primary)",
                                marginRight: "8px",
                              }}
                            >
                              •
                            </span>{" "}
                            {li}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <SectionIndicator
        sections={sections}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />
    </>
  );
}

export default OPCPage;
