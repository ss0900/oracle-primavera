import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import SectionIndicator from "../components/SectionIndicator";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const sections = [
  { id: "hero", label: "EPPM" },
  { id: "menu", label: "메뉴" },
  { id: "integration", label: "통합 운영" },
  { id: "cpm-features", label: "CPM 공정표" },
  { id: "solution", label: "솔루션 특징" },
  { id: "cases", label: "구축 사례" },
];

// Sub-menu items data
const subMenuItems = [
  {
    id: "overview",
    title: "개요",
    description:
      "EPPM(Enterprise Project Portfolio Management) 개요 및 핵심 기능",
    image:
      "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "#integration",
  },
  {
    id: "solution",
    title: "솔루션 특징",
    description: "확장성, 유연성, 통합성, 보안성",
    image:
      "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "#solution",
  },
  {
    id: "cases",
    title: "구축 사례",
    description: "제조, 에너지, 건설 등 다양한 구축 사례",
    image:
      "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "#cases",
  },
];

// Integration feature items
const integrationItems = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="24"
          cy="14"
          r="8"
          stroke="currentColor"
          strokeWidth="2"
          fill="rgba(99, 102, 241, 0.1)"
        />
        <circle
          cx="12"
          cy="36"
          r="6"
          stroke="currentColor"
          strokeWidth="2"
          fill="rgba(99, 102, 241, 0.1)"
        />
        <circle
          cx="36"
          cy="36"
          r="6"
          stroke="currentColor"
          strokeWidth="2"
          fill="rgba(99, 102, 241, 0.1)"
        />
        <circle
          cx="24"
          cy="36"
          r="6"
          stroke="currentColor"
          strokeWidth="2"
          fill="rgba(99, 102, 241, 0.1)"
        />
        <line
          x1="20"
          y1="20"
          x2="14"
          y2="30"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="24"
          y1="22"
          x2="24"
          y2="30"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="28"
          y1="20"
          x2="34"
          y2="30"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
    title: (
      <>
        다수의 사용자가 동시에 접속해
        <br />
        협업 및 시각화된 의사결정
      </>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="4"
          y="8"
          width="40"
          height="28"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
          fill="rgba(99, 102, 241, 0.1)"
        />
        <line
          x1="4"
          y1="16"
          x2="44"
          y2="16"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="8"
          y="20"
          width="12"
          height="12"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="24"
          y1="20"
          x2="40"
          y2="20"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="24"
          y1="26"
          x2="36"
          y2="26"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="24"
          y1="32"
          x2="40"
          y2="32"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M10 28 L14 24 L18 26"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: (
      <>
        대시보드, 차트, 리포트 등을 통해
        <br />
        경영진부터 실무자까지 모든 레벨의 사용자를 지원
      </>
    ),
  },
];

// CPM Feature items
const featureItems = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="4"
          y="8"
          width="16"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
          fill="rgba(99, 102, 241, 0.1)"
        />
        <rect
          x="28"
          y="8"
          width="16"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
          fill="rgba(99, 102, 241, 0.1)"
        />
        <rect
          x="16"
          y="26"
          width="16"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
          fill="rgba(99, 102, 241, 0.1)"
        />
        <line
          x1="12"
          y1="22"
          x2="24"
          y2="26"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="36"
          y1="22"
          x2="24"
          y2="26"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
    title: (
      <>
        대규모와 개별 프로젝트
        <br />
        계획 및 공정 관리
      </>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="24"
          cy="24"
          r="16"
          stroke="currentColor"
          strokeWidth="2"
          fill="rgba(99, 102, 241, 0.1)"
        />
        <path
          d="M24 14 L24 24 L32 28"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M16 32 L20 28 L24 30 L28 26 L32 28"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: (
      <>
        프로젝트와 연동된
        <br />
        Costs 관리
      </>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="8"
          y="4"
          width="32"
          height="10"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
          fill="rgba(99, 102, 241, 0.1)"
        />
        <rect
          x="4"
          y="19"
          width="18"
          height="10"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
          fill="rgba(99, 102, 241, 0.1)"
        />
        <rect
          x="26"
          y="19"
          width="18"
          height="10"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
          fill="rgba(99, 102, 241, 0.1)"
        />
        <rect
          x="8"
          y="34"
          width="32"
          height="10"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
          fill="rgba(99, 102, 241, 0.1)"
        />
        <line
          x1="24"
          y1="14"
          x2="13"
          y2="19"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="24"
          y1="14"
          x2="35"
          y2="19"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="13"
          y1="29"
          x2="24"
          y2="34"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="35"
          y1="29"
          x2="24"
          y2="34"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
    title: "전사적 프로젝트 관리",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="24"
          cy="12"
          r="8"
          stroke="currentColor"
          strokeWidth="2"
          fill="rgba(99, 102, 241, 0.1)"
        />
        <circle
          cx="10"
          cy="34"
          r="6"
          stroke="currentColor"
          strokeWidth="2"
          fill="rgba(99, 102, 241, 0.1)"
        />
        <circle
          cx="38"
          cy="34"
          r="6"
          stroke="currentColor"
          strokeWidth="2"
          fill="rgba(99, 102, 241, 0.1)"
        />
        <line
          x1="20"
          y1="18"
          x2="13"
          y2="29"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="28"
          y1="18"
          x2="35"
          y2="29"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="16"
          y1="34"
          x2="32"
          y2="34"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="3 2"
        />
      </svg>
    ),
    title: (
      <>
        원활한 실적 업데이트를
        <br />
        위한 팀 네트워크
      </>
    ),
  },
];

// Solution Features
const solutionFeatures = [
  {
    title: "확장성",
    desc: "대규모 프로젝트 및 사용자 지원이 가능한 엔터프라이즈급 확장성",
  },
  {
    title: "유연성",
    desc: "다양한 산업 및 비즈니스 프로세스에 맞춤 적용 가능",
  },
  { title: "통합성", desc: "ERP, CRM 등 기존 시스템과의 원활한 연동" },
  { title: "보안성", desc: "엔터프라이즈급 보안 및 권한 관리" },
];

// Cases Data
const caseStudies = [
  {
    tag: "제조",
    title: "글로벌 제조기업",
    desc: "전사 R&D 프로젝트 통합 관리 시스템 구축",
    img: "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    tag: "에너지",
    title: "에너지 기업",
    desc: "발전소 건설 프로젝트 포트폴리오 관리",
    img: "https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    tag: "건설",
    title: "종합 건설사",
    desc: "국내외 건설 프로젝트 통합 관리",
    img: "https://images.pexels.com/photos/159358/construction-site-build-construction-work-159358.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

function EPPMPage() {
  const { sectionId, subId } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const containerRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const currentSectionRef = useRef(0);

  // Section refs
  const heroSectionRef = useRef(null);
  const menuSectionRef = useRef(null);
  const integrationSectionRef = useRef(null);
  const cpmFeaturesSectionRef = useRef(null);
  const solutionSectionRef = useRef(null);
  const casesSectionRef = useRef(null);

  // Animation refs
  const integrationImageCardRef = useRef(null);
  const integrationCardsRef = useRef([]);
  const [integrationHoveredIndex, setIntegrationHoveredIndex] = useState(null);

  const cpmImageCardRef = useRef(null);
  const cpmFeatureCardsRef = useRef([]);
  const [cpmHoveredIndex, setCpmHoveredIndex] = useState(null);

  const solutionCardsRef = useRef([]);
  const casesCardsRef = useRef([]);

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

      const panels = gsap.utils.toArray(".eppm-panel");
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
      let targetId = sectionId;
      // Map URL patterns to section IDs
      if (sectionId === "overview") {
        targetId = "integration";
        if (subId === "2") targetId = "cpm-features";
      }
      // solution matches solution
      // cases matches cases

      const targetIndex = sections.findIndex((s) => s.id === targetId);

      if (targetIndex !== -1 && targetIndex !== currentSectionRef.current) {
        setTimeout(() => {
          scrollToSection(targetId);
        }, 100);
      }
    }
  }, [sectionId, subId, scrollToSection]);

  // Update URL based on section
  const updateUrlForSection = useCallback(
    (index) => {
      let path = "/eppm";
      // index 0 (Hero), 1 (Menu) -> /eppm
      if (index === 2) path = "/eppm/overview/1";
      if (index === 3) path = "/eppm/overview/2";
      if (index === 4) path = "/eppm/solution";
      if (index === 5) path = "/eppm/cases";

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

    const panels = gsap.utils.toArray(".eppm-panel");

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
        ".eppm-hero-title",
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
          ".eppm-menu-card",
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

      // Integration
      const integrationTl = gsap.timeline({
        scrollTrigger: {
          trigger: integrationSectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });
      if (integrationImageCardRef.current)
        integrationTl.fromTo(
          integrationImageCardRef.current,
          { y: -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        );
      integrationCardsRef.current.forEach((card, i) => {
        if (card)
          integrationTl.fromTo(
            card,
            { x: i % 2 === 0 ? -30 : 30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5 },
            "-=0.4",
          );
      });

      // CPM Features
      const cpmTl = gsap.timeline({
        scrollTrigger: {
          trigger: cpmFeaturesSectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });
      if (cpmImageCardRef.current)
        cpmTl.fromTo(
          cpmImageCardRef.current,
          { y: -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        );
      cpmFeatureCardsRef.current.forEach((card, i) => {
        if (card)
          cpmTl.fromTo(
            card,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4 },
            "-=0.2",
          );
      });

      // Solution Features
      const solutionTl = gsap.timeline({
        scrollTrigger: {
          trigger: solutionSectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });
      if (solutionCardsRef.current.length > 0) {
        solutionTl.fromTo(
          solutionCardsRef.current,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1 },
        );
      }

      // Cases
      const casesTl = gsap.timeline({
        scrollTrigger: {
          trigger: casesSectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });
      if (casesCardsRef.current.length > 0) {
        casesTl.fromTo(
          casesCardsRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.15 },
        );
      }
    });
    return () => ctx.revert();
  };

  return (
    <>
      <div className="ppm-page eppm-page-container" ref={containerRef}>
        {/* 1. Hero Section */}
        <section className="eppm-panel tm-panel" id="hero" ref={heroSectionRef}>
          <div
            className="tm-hero-section"
            style={{
              backgroundImage: `linear-gradient(rgba(10, 10, 15, 0.7), rgba(10, 10, 15, 0.9)), url(https://images.pexels.com/photos/5989932/pexels-photo-5989932.jpeg?auto=compress&cs=tinysrgb&w=1200)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="tm-hero-content">
              <h1 className="eppm-hero-title tm-hero-title">EPPM</h1>
              <p className="tm-hero-subtitle">
                Enterprise Project Portfolio Management
              </p>
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
          className="eppm-panel ppm-panel ppm-overview-section"
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
                  EPPM
                </span>
              </nav>

              {/* Main Title */}
              <h2 className="ppm-overview-title">
                전사적 프로젝트 포트폴리오
                <br />
                통합 관리 솔루션
              </h2>

              {/* Description */}
              <p className="ppm-overview-description">
                EPPM(Enterprise Project Portfolio Management)은 전사 차원의
                <br />
                프로젝트, 프로그램, 포트폴리오를 통합 관리하여
                <br />
                최적의 의사결정과 리스크 관리를 지원합니다.
              </p>

              {/* Divider */}
              <div className="ppm-overview-divider"></div>

              {/* Sub-menu Cards (PPM Style) */}
              <div className="ppm-submenu-grid">
                {subMenuItems.map((item, index) => (
                  <button
                    key={item.id}
                    className="ppm-submenu-card"
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

        {/* 3. Integration Section */}
        <section
          className="eppm-panel tm-panel cpm-features-section"
          id="integration"
          ref={integrationSectionRef}
        >
          <div className="cpm-features-container">
            <div className="cpm-section-header">
              <h2 className="cpm-section-title">통합 운영</h2>
            </div>
            <div className="cpm-image-card" ref={integrationImageCardRef}>
              <img
                src="/EPPM.png"
                alt="EPPM 통합 운영 대시보드"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML =
                    '<div class="cpm-image-placeholder">EPPM Dashboard Screenshot</div>';
                }}
              />
            </div>
            <div
              className="cpm-feature-cards"
              style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
              onMouseLeave={() => setIntegrationHoveredIndex(null)}
            >
              {integrationItems.map((item, index) => (
                <div
                  key={index}
                  className={`cpm-feature-card ${integrationHoveredIndex !== null && integrationHoveredIndex !== index ? "dimmed" : ""}`}
                  ref={(el) => (integrationCardsRef.current[index] = el)}
                  onMouseEnter={() => setIntegrationHoveredIndex(index)}
                >
                  <div className="cpm-feature-icon">{item.icon}</div>
                  <h4 className="cpm-feature-title">{item.title}</h4>
                  {index < integrationItems.length - 1 && (
                    <div className="cpm-feature-divider-line" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. CPM Features Section */}
        <section
          className="eppm-panel tm-panel cpm-features-section"
          id="cpm-features"
          ref={cpmFeaturesSectionRef}
        >
          <div className="cpm-features-container">
            <div className="cpm-section-header">
              <h2 className="cpm-section-title">CPM 공정표</h2>
            </div>
            <div className="cpm-image-card" ref={cpmImageCardRef}>
              <img
                src="/cpm-gantt-chart.png"
                alt="CPM 공정표"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML =
                    '<div class="cpm-image-placeholder">CPM Gantt Chart Screenshot</div>';
                }}
              />
            </div>
            <div
              className="cpm-feature-cards"
              onMouseLeave={() => setCpmHoveredIndex(null)}
            >
              {featureItems.map((item, index) => (
                <div
                  key={index}
                  className={`cpm-feature-card ${cpmHoveredIndex !== null && cpmHoveredIndex !== index ? "dimmed" : ""}`}
                  ref={(el) => (cpmFeatureCardsRef.current[index] = el)}
                  onMouseEnter={() => setCpmHoveredIndex(index)}
                >
                  <div className="cpm-feature-icon">{item.icon}</div>
                  <h4 className="cpm-feature-title">{item.title}</h4>
                  {index < featureItems.length - 1 && (
                    <div className="cpm-feature-divider-line" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Solution Features Section */}
        <section
          className="eppm-panel tm-panel"
          id="solution"
          ref={solutionSectionRef}
        >
          <div className="tm-methods-section">
            <div className="tm-methods-container">
              <div className="tm-section-header">
                <h2 className="tm-section-title">솔루션 특징</h2>
                <p
                  style={{
                    textAlign: "center",
                    color: "var(--text-secondary)",
                    marginBottom: "40px",
                  }}
                >
                  EPPM 솔루션의 차별화된 특징
                </p>
              </div>
              <div
                className="tm-ppm-eppm-grid"
                style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}
              >
                {solutionFeatures.map((item, index) => (
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
                    ref={(el) => (solutionCardsRef.current[index] = el)}
                  >
                    <div
                      className="tm-spoke-icon"
                      style={{ marginBottom: "15px" }}
                    >
                      {/* Simple generic icon for now */}
                      <svg
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
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

        {/* 6. Cases Section */}
        <section
          className="eppm-panel tm-panel"
          id="cases"
          ref={casesSectionRef}
        >
          <div className="tm-advantages-section">
            <div className="tm-advantages-container">
              <div className="tm-section-header">
                <h2 className="tm-section-title">구축 사례</h2>
              </div>
              <div
                className="tm-ppm-eppm-grid"
                style={{
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "30px",
                  marginTop: "40px",
                }}
              >
                {caseStudies.map((item, index) => (
                  <div
                    key={index}
                    className="tm-ppm-eppm-card"
                    style={{ padding: "0", overflow: "hidden", height: "auto" }}
                    ref={(el) => (casesCardsRef.current[index] = el)}
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
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--color-accent)",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          display: "block",
                          marginBottom: "8px",
                        }}
                      >
                        {item.tag}
                      </span>
                      <h3
                        style={{
                          fontSize: "1.25rem",
                          marginBottom: "10px",
                          color: "var(--text-primary)",
                        }}
                      >
                        {item.title}
                      </h3>
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

export default EPPMPage;
