import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import SectionIndicator from "../components/SectionIndicator";
import EppmFunctionsSection from "../components/EppmFunctionsSection";
import { unifierFunctionsIntro } from "../data/functionsIntroData";
import { unifierFunctions2Intro } from "../data/unifierFunctions2Data";
import { getAssetPath } from "../utils/assetPath";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const sections = [
  { id: "hero", label: "Unifier" },
  { id: "menu", label: "메뉴" },
  { id: "overview-content", label: "개요" },
  { id: "overview-content-2", label: "개요 2" },
  { id: "functions", label: "기능 소개" },
  { id: "functions-2", label: "기능 소개 2" },
  { id: "customers", label: "효과" },
  { id: "benefits-2", label: "효과 2" },
  { id: "benefits-3", label: "효과 3" },
];

const subMenuItems = [
  {
    id: "overview",
    title: "개요",
    description: "비용, 계약, 문서 관리의 완벽한 통합",
    image: getAssetPath("/Unifier_Overview.png"),
    link: "#overview-content",
  },
  {
    id: "functions",
    title: "기능 소개",
    description: "프로젝트 통제와 비용 관리 핵심 기능",
    image: getAssetPath("/Unifier_Functions.png"),
    link: "#functions",
  },
  {
    id: "benefits",
    title: "효과",
    description: "공공, 부동산, 인프라 도입 효과",
    image: getAssetPath("/Unifier_Benefits.png"),
    link: "#customers",
  },
];

const overview2FlowSteps = [
  {
    title: "Capital Planning",
    description: "투자 결정 및 우선순위",
    tone: "planning",
  },
  {
    title: "Project Controls",
    description: "실행 및 통제",
    tone: "controls",
  },
  {
    title: "Facilities & Asset Mgmt",
    description: "운영 및 자산 관리",
    tone: "asset",
  },
];

// Functions Data (mirrors Unifier modules - 4 cards)
const {
  title: functionsTitle,
  items: functionItems,
  heroImages: functionHeroImages,
} = unifierFunctionsIntro;
const { title: functionsTitle2, items: functionItems2 } =
  unifierFunctions2Intro;

const benefitsKpiData = [
  { value: "125+", label: "사전 구성된 비즈니스 프로세스" },
  { value: "250+", label: "대시보드 및 리포트" },
];
const benefits2P6Image = encodeURI(
  getAssetPath("/Schedule_and_Resource_Plan_Center.png"),
);
const benefits2UnifierImage = encodeURI(
  getAssetPath("/Cost_Contract_and_Workflow_Center.png"),
);

function UnifierPage() {
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
  const overviewSectionRef = useRef(null);
  const overviewSectionRef2 = useRef(null);
  const functionsSectionRef = useRef(null);
  const functionsSectionRef2 = useRef(null);
  const benefitsSectionRef = useRef(null);
  const benefitsSectionRef2 = useRef(null);
  const benefitsSectionRef3 = useRef(null);

  // Animation refs
  const overviewCardsRef = useRef([]);
  const overviewFlowRef = useRef(null);
  const functionsImageCardRef = useRef(null);
  const functionsImageCardRef2 = useRef(null);
  const functionsCardsRef = useRef([]);
  const functionsCardsRef2 = useRef([]);
  const benefitsItemsRef = useRef([]);
  const benefitsItemsRef2 = useRef([]);
  const benefitsItemsRef3 = useRef([]);

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

      const panels = gsap.utils.toArray(".unifier-panel");
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
      // Handle mapping if necessary, or just rely on direct ID match
      // Route map:
      // /unifier/overview/1, /unifier/overview/2, /unifier/functions/1, /unifier/functions/2, /unifier/benefits/1, /unifier/benefits/2, /unifier/benefits/3
      // IDs: overview-content, overview-content-2, functions, functions-2, customers, benefits-2, benefits-3

      let targetId = sectionId;
      if (sectionId === "overview")
        targetId = subId === "2" ? "overview-content-2" : "overview-content";
      if (sectionId === "modules") targetId = "functions";
      if (sectionId === "functions")
        targetId = subId === "2" ? "functions-2" : "functions";
      if (sectionId === "benefits")
        targetId =
          subId === "3"
            ? "benefits-3"
            : subId === "2"
              ? "benefits-2"
              : "customers";

      const foundIndex = sections.findIndex((s) => s.id === targetId);

      if (foundIndex !== -1 && foundIndex !== currentSectionRef.current) {
        setTimeout(() => {
          scrollToSection(targetId);
        }, 100);
      }
    }
  }, [sectionId, subId, scrollToSection]);

  // Update URL based on section
  const updateUrlForSection = useCallback(
    (index) => {
      let path = "/unifier";
      // index 0(Hero), 1(Menu) -> /unifier
      if (index === 2) path = "/unifier/overview/1";
      if (index === 3) path = "/unifier/overview/2";
      if (index === 4) path = "/unifier/functions/1";
      if (index === 5) path = "/unifier/functions/2";
      if (index === 6) path = "/unifier/benefits/1";
      if (index === 7) path = "/unifier/benefits/2";
      if (index === 8) path = "/unifier/benefits/3";

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

    const panels = gsap.utils.toArray(".unifier-panel");
    const footerSection = document.querySelector(".footer");
    const snapTargets = footerSection ? [...panels, footerSection] : panels;
    const lastPanelIndex = panels.length - 1;
    const lastSnapIndex = snapTargets.length - 1;

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

    if (footerSection) {
      ScrollTrigger.create({
        trigger: footerSection,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          currentSectionRef.current = lastSnapIndex;
          setActiveSection(lastPanelIndex);
        },
        onEnterBack: () => {
          currentSectionRef.current = lastSnapIndex;
          setActiveSection(lastPanelIndex);
        },
      });
    }

    const snapToIndex = (targetIndex) => {
      const target = snapTargets[targetIndex];
      if (!target) {
        isAnimatingRef.current = false;
        return;
      }

      const boundedIndex = Math.min(targetIndex, lastPanelIndex);
      currentSectionRef.current = targetIndex;
      setActiveSection(boundedIndex);

      gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: target, autoKill: false },
        ease: "power3.inOut",
        onComplete: () => {
          setTimeout(() => {
            isAnimatingRef.current = false;
          }, 100);
        },
      });
    };

    const handleWheel = (e) => {
      if (isAnimatingRef.current) {
        e.preventDefault();
        return;
      }

      const delta = e.deltaY;
      const threshold = 50;

      if (Math.abs(delta) < threshold) return;

      let nextSection = currentSectionRef.current;

      if (delta > 0 && currentSectionRef.current < lastSnapIndex) {
        nextSection = currentSectionRef.current + 1;
      } else if (delta < 0 && currentSectionRef.current > 0) {
        nextSection = currentSectionRef.current - 1;
      } else {
        return;
      }

      e.preventDefault();
      isAnimatingRef.current = true;
      snapToIndex(nextSection);
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

      if (delta > 0 && currentSectionRef.current < lastSnapIndex) {
        nextSection = currentSectionRef.current + 1;
      } else if (delta < 0 && currentSectionRef.current > 0) {
        nextSection = currentSectionRef.current - 1;
      } else {
        isAnimatingRef.current = false;
        return;
      }

      snapToIndex(nextSection);
    };

    const shouldHijackScroll = !window.matchMedia(
      "(hover: none), (pointer: coarse)",
    ).matches;

    if (shouldHijackScroll) {
      window.addEventListener("wheel", handleWheel, { passive: false });
      window.addEventListener("touchstart", handleTouchStart, { passive: true });
      window.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    initContentAnimations();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      if (shouldHijackScroll) {
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [prefersReducedMotion]);

  // Content Animations
  const initContentAnimations = () => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Hero
      gsap.fromTo(
        ".unifier-hero-title",
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
          ".unifier-menu-card",
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

      if (overviewSectionRef2.current && overviewFlowRef.current) {
        gsap.fromTo(
          overviewFlowRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: overviewSectionRef2.current,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Functions
      if (functionsSectionRef.current) {
        const functionsTl = gsap.timeline({
          scrollTrigger: {
            trigger: functionsSectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        });

        const functionsTitle =
          functionsSectionRef.current.querySelector(".ppm-cpm-title");

        if (functionsTitle) {
          functionsTl.fromTo(
            functionsTitle,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5 },
          );
        }

        if (functionsImageCardRef.current) {
          functionsTl.fromTo(
            functionsImageCardRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "bounce.out" },
            "-=0.2",
          );
        }

        const cards = functionsCardsRef.current;
        if (cards[0]) {
          functionsTl.fromTo(
            cards[0],
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5 },
            "-=0.5",
          );
        }
        if (cards[1]) {
          functionsTl.fromTo(
            cards[1],
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 },
            "-=0.3",
          );
        }
        if (cards[2]) {
          functionsTl.fromTo(
            cards[2],
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 },
            "-=0.3",
          );
        }
        if (cards[3]) {
          functionsTl.fromTo(
            cards[3],
            { x: 50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5 },
            "-=0.3",
          );
        }
      }

      if (functionsSectionRef2.current) {
        const functionsTl2 = gsap.timeline({
          scrollTrigger: {
            trigger: functionsSectionRef2.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        });

        const functionsTitle2 =
          functionsSectionRef2.current.querySelector(".ppm-cpm-title");

        if (functionsTitle2) {
          functionsTl2.fromTo(
            functionsTitle2,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5 },
          );
        }

        if (functionsImageCardRef2.current) {
          functionsTl2.fromTo(
            functionsImageCardRef2.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "bounce.out" },
            "-=0.2",
          );
        }

        const cards2 = functionsCardsRef2.current;
        if (cards2[0]) {
          functionsTl2.fromTo(
            cards2[0],
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5 },
            "-=0.5",
          );
        }
        if (cards2[1]) {
          functionsTl2.fromTo(
            cards2[1],
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 },
            "-=0.3",
          );
        }
        if (cards2[2]) {
          functionsTl2.fromTo(
            cards2[2],
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 },
            "-=0.3",
          );
        }
        if (cards2[3]) {
          functionsTl2.fromTo(
            cards2[3],
            { x: 50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5 },
            "-=0.3",
          );
        }
      }

      // Benefits
      if (benefitsSectionRef.current) {
        gsap.fromTo(
          benefitsItemsRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            scrollTrigger: {
              trigger: benefitsSectionRef.current,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      if (benefitsSectionRef2.current) {
        gsap.fromTo(
          benefitsItemsRef2.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            scrollTrigger: {
              trigger: benefitsSectionRef2.current,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      if (benefitsSectionRef3.current) {
        gsap.fromTo(
          benefitsItemsRef3.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            scrollTrigger: {
              trigger: benefitsSectionRef3.current,
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
      <div
        className="ppm-page unifier-page-container eppm-page-container"
        ref={containerRef}
      >
        {/* 1. Hero Section */}
        <section
          className="unifier-panel tm-panel"
          id="hero"
          ref={heroSectionRef}
        >
          <div
            className="tm-hero-section"
            style={{
              backgroundImage: `linear-gradient(rgba(10, 10, 15, 0.7), rgba(10, 10, 15, 0.9)), url(${getAssetPath("/Unifier.png")})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="tm-hero-content">
              <h1 className="unifier-hero-title tm-hero-title">
                Primavera Unifier
              </h1>
              <p className="tm-hero-subtitle">Unifier</p>
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
          className="unifier-panel ppm-panel ppm-overview-section"
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
                  Unifier
                </span>
              </nav>

              {/* Main Title */}
              <h2 className="ppm-overview-title">
                최적의 프로젝트 통제 및
                <br />
                비용 관리 솔루션
              </h2>

              {/* Description */}
              <p className="ppm-overview-description">
                프로젝트(자본사업) 생애주기 전반에서 비용 · 계약 · 변경 · 자금 /
                현금 흐름 · 문서를
                <br />
                워크플로우 기반의 연결된 프로세스로 통합 관리하는 엔터프라이즈급
                Project Controls / PMIS 플랫폼입니다.
              </p>

              {/* Divider */}
              <div className="ppm-overview-divider"></div>

              {/* Sub-menu Cards (PPM Style) */}
              <div className="ppm-submenu-grid">
                {subMenuItems.map((item, index) => (
                  <button
                    key={item.id}
                    className="ppm-submenu-card unifier-menu-card"
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
          className="unifier-panel tm-panel"
          id="overview-content"
          ref={overviewSectionRef}
        >
          <div className="tm-methods-section unifier-overview-shell">
            <div className="tm-methods-container" id="unifier-overview-1">
              <div className="tm-section-header">
                <h2 className="tm-section-title">
                  혼란에서 명확성으로: 단 하나의 진실
                </h2>
              </div>
              <div className="unifier-overview-layout">
                <aside
                  className="tm-ppm-eppm-card unifier-overview-message-card"
                  ref={(el) => (overviewCardsRef.current[0] = el)}
                >
                  <p>업무 프로세스(Workflow) +</p>
                  <p>프로젝트 통제(Project Controls) +</p>
                  <p>정보 관리(PMIS)의 완벽한 결합</p>
                </aside>

                <div
                  className="unifier-overview-visual-wrap"
                  ref={(el) => (overviewCardsRef.current[1] = el)}
                >
                  <div
                    className="unifier-overview-donut"
                    role="img"
                    aria-label="Platform Core를 중심으로 협력사, 발주처, CM, 시공사가 연결된 통합 구조"
                  >
                    <div className="unifier-overview-outer-ring" />

                    <span className="unifier-overview-ring-label is-top-left">
                      협력사
                    </span>
                    <span className="unifier-overview-ring-label is-top-right">
                      발주처
                    </span>
                    <span className="unifier-overview-ring-label is-bottom-right">
                      CM
                    </span>
                    <span className="unifier-overview-ring-label is-bottom-left">
                      시공사
                    </span>

                    <div className="unifier-overview-inner-segments" />

                    <div className="unifier-overview-core">
                      <span>
                        Platform
                        <br />
                        Core
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <p
                className="unifier-overview-summary"
                ref={(el) => (overviewCardsRef.current[2] = el)}
              >
                여러 참여자가 공통된 프로세스 안에서 표준화 · 자동화된 방식으로
                협업합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Overview Section 2 */}
        <section
          className="unifier-panel tm-panel"
          id="overview-content-2"
          ref={overviewSectionRef2}
        >
          <div className="tm-methods-section unifier-overview-shell">
            <div className="tm-methods-container" id="unifier-overview-2">
              <div className="tm-section-header">
                <h2 className="tm-section-title">
                  프로젝트의 탄생부터 운영까지
                </h2>
              </div>

              <div className="unifier-overview2-content" ref={overviewFlowRef}>
                <div className="unifier-overview2-flow" role="list">
                  {overview2FlowSteps.map((step, index) => (
                    <div
                      key={step.title}
                      className="unifier-overview2-step-wrap"
                      role="listitem"
                    >
                      <article
                        className={`tm-ppm-eppm-card unifier-overview2-step unifier-overview2-step--${step.tone}`}
                      >
                        <div className="unifier-overview2-step-text">
                          <h3 className="unifier-overview2-step-title">
                            {step.title}
                          </h3>
                          <p className="unifier-overview2-step-description">
                            {step.description}
                          </p>
                        </div>
                      </article>

                      {index < overview2FlowSteps.length - 1 ? (
                        <span
                          className="unifier-overview2-step-connector"
                          aria-hidden="true"
                        />
                      ) : null}
                    </div>
                  ))}
                </div>

                <div className="unifier-overview2-flowline">
                  <div
                    className="unifier-overview2-flowline-track"
                    aria-hidden="true"
                  />
                  <p className="unifier-overview2-flowline-caption">
                    데이터가 중간에서 끊기지 않고 자동으로 이어짐
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Functions Section */}
        <EppmFunctionsSection
          panelClassName="unifier-panel"
          sectionId="functions"
          title={functionsTitle}
          items={functionItems}
          heroImages={functionHeroImages}
          sectionRef={functionsSectionRef}
          imageCardRef={functionsImageCardRef}
          cardRefs={functionsCardsRef}
          prefersReducedMotion={prefersReducedMotion}
          isActive={sections[activeSection]?.id === "functions"}
        />

        {/* 6. Functions Section 2 */}
        <EppmFunctionsSection
          panelClassName="unifier-panel"
          sectionId="functions-2"
          title={functionsTitle2}
          items={functionItems2}
          sectionRef={functionsSectionRef2}
          imageCardRef={functionsImageCardRef2}
          cardRefs={functionsCardsRef2}
          prefersReducedMotion={prefersReducedMotion}
          isActive={sections[activeSection]?.id === "functions-2"}
        />

        {/* 7. Benefits Section (route: /unifier/benefits/1 -> section id "customers") */}
        <section
          className="unifier-panel tm-panel"
          id="customers"
          ref={benefitsSectionRef}
        >
          <div className="tm-methods-section unifier-benefits-section">
            <div className="tm-methods-container unifier-benefits-container">
              {/* Reuse shared section header rhythm: tm-section-header + tm-section-title */}
              <div className="tm-section-header unifier-benefits-header">
                <h2 className="tm-section-title">
                  Unifier Accelerator: 도입하자마자 바로 효과적
                </h2>
                <p className="unifier-benefits-subtitle">
                  Oracle이 제공하는 검증된 표준 방식 기반의 무상 구성 템플릿
                </p>
              </div>

              <div className="unifier-benefits-kpi-grid">
                {benefitsKpiData.map((item, index) => (
                  // Reuse tm-ppm-eppm-card surface (dark bg, border, radius, hover baseline)
                  <article
                    key={item.value}
                    className="tm-ppm-eppm-card unifier-benefits-kpi-card"
                    ref={(el) => (benefitsItemsRef.current[index] = el)}
                  >
                    <p className="unifier-benefits-kpi-value">{item.value}</p>
                    <p className="unifier-benefits-kpi-label">{item.label}</p>
                  </article>
                ))}
              </div>

              <p
                className="unifier-benefits-conclusion"
                ref={(el) =>
                  (benefitsItemsRef.current[benefitsKpiData.length] = el)
                }
              >
                복잡한 초기 설정 없이 즉시 도입하여 표준화 달성
              </p>
            </div>
          </div>
        </section>

        {/* 8. Benefits Section 2 (route: /unifier/benefits/2 -> section id "benefits-2") */}
        <section
          className="unifier-panel tm-panel"
          id="benefits-2"
          ref={benefitsSectionRef2}
        >
          <div className="tm-methods-section unifier-benefits-section">
            <div className="tm-methods-container unifier-benefits-container unifier-benefits-2-container">
              <div
                className="tm-section-header unifier-benefits-header"
                ref={(el) => (benefitsItemsRef2.current[0] = el)}
              >
                <h2 className="tm-section-title">
                  The Synergy: Primavera Unifier + Primavera P6 EPPM
                </h2>
                <p className="unifier-benefits-2-subtitle">
                  일정(Time)과 비용(Cost)의 완벽한 동기화
                </p>
              </div>

              <div
                className="unifier-benefits-2-flow"
                ref={(el) => (benefitsItemsRef2.current[1] = el)}
              >
                <article className="tm-ppm-eppm-card unifier-benefits-2-side-card unifier-benefits-2-side-card-left">
                  <p className="unifier-benefits-2-side-label">Time/P6</p>
                  <div
                    className="unifier-benefits-2-media-stack"
                    aria-label="Primavera P6 EPPM 화면"
                  >
                    <div className="unifier-benefits-2-media unifier-benefits-2-media-back" />
                    <div className="unifier-benefits-2-media unifier-benefits-2-media-mid" />
                    <div className="unifier-benefits-2-media unifier-benefits-2-media-front">
                      <img
                        src={benefits2P6Image}
                        alt="Primavera P6 EPPM - 일정 및 자원 계획 중심"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="unifier-benefits-2-inline-summary">
                    <h3 className="unifier-benefits-2-summary-title">
                      Primavera P6 EPPM
                    </h3>
                    <p className="unifier-benefits-2-summary-text">
                      일정 및 자원 계획 중심
                    </p>
                  </div>
                </article>

                <article className="tm-ppm-eppm-card unifier-benefits-2-connector-card">
                  <span
                    className="unifier-benefits-2-direction unifier-benefits-2-direction-left"
                    aria-hidden="true"
                  />
                  <span
                    className="unifier-benefits-2-direction unifier-benefits-2-direction-right"
                    aria-hidden="true"
                  />
                  <p className="unifier-benefits-2-connector-title">EVM</p>
                  <p className="unifier-benefits-2-connector-subtitle">
                    (Earned Value Management)
                  </p>
                </article>

                <article className="tm-ppm-eppm-card unifier-benefits-2-side-card unifier-benefits-2-side-card-right">
                  <p className="unifier-benefits-2-side-label">Cost/Unifier</p>
                  <div
                    className="unifier-benefits-2-media-stack"
                    aria-label="Primavera Unifier 화면"
                  >
                    <div className="unifier-benefits-2-media unifier-benefits-2-media-back" />
                    <div className="unifier-benefits-2-media unifier-benefits-2-media-mid" />
                    <div className="unifier-benefits-2-media unifier-benefits-2-media-front">
                      <img
                        src={benefits2UnifierImage}
                        alt="Primavera Unifier - 비용, 계약, 워크플로우 중심"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="unifier-benefits-2-inline-summary">
                    <h3 className="unifier-benefits-2-summary-title">
                      Primavera Unifier
                    </h3>
                    <p className="unifier-benefits-2-summary-text">
                      비용, 계약, 워크플로우 중심
                    </p>
                  </div>
                </article>
              </div>

              <div
                className="unifier-benefits-2-summary"
                ref={(el) => (benefitsItemsRef2.current[2] = el)}
              >
                <div className="unifier-benefits-2-summary-columns">
                  <div className="unifier-benefits-2-summary-item">
                    <h3 className="unifier-benefits-2-summary-title">
                      Primavera P6 EPPM
                    </h3>
                    <p className="unifier-benefits-2-summary-text">
                      일정 및 자원 계획 중심
                    </p>
                  </div>

                  <span
                    className="unifier-benefits-2-summary-divider"
                    aria-hidden="true"
                  />

                  <div className="unifier-benefits-2-summary-item">
                    <h3 className="unifier-benefits-2-summary-title">
                      Primavera Unifier
                    </h3>
                    <p className="unifier-benefits-2-summary-text">
                      비용, 계약, 워크플로우 중심
                    </p>
                  </div>
                </div>

                <p className="unifier-benefits-2-conclusion">
                  데이터 동기화: WBS, 액티비티(Activity), 자원 배정 연동을 통한
                  통합 관리
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Benefits Section 3 (route: /unifier/benefits/3 -> section id "benefits-3") */}
        <section
          className="unifier-panel tm-panel"
          id="benefits-3"
          ref={benefitsSectionRef3}
        >
          <div className="tm-methods-section unifier-benefits-section">
            <div className="tm-methods-container unifier-benefits-container unifier-benefits-3-container">
              <div
                className="tm-section-header unifier-benefits-header"
                ref={(el) => (benefitsItemsRef3.current[0] = el)}
              >
                <h2 className="tm-section-title">
                  유연한 구축 환경 (Deployment Flexibility)
                </h2>
                <p className="unifier-benefits-3-subtitle">
                  조직의 IT 전략과 보안 정책에 맞춘 최적의 선택
                </p>
              </div>

              <div
                className="unifier-benefits-3-compare"
                ref={(el) => (benefitsItemsRef3.current[1] = el)}
              >
                <article className="tm-ppm-eppm-card unifier-benefits-3-option">
                  <div className="unifier-benefits-3-option-layout">
                    <div
                      className="unifier-benefits-3-icon-wrap"
                      aria-hidden="true"
                    >
                      <svg
                        className="unifier-benefits-3-icon-badge unifier-benefits-3-icon-badge-cloud"
                        viewBox="0 0 64 64"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path
                          className="unifier-benefits-3-icon-stroke"
                          d="M18 41h28a8 8 0 0 0 1-16 14 14 0 0 0-27-2 8 8 0 0 0-2 18z"
                        />
                        <path
                          className="unifier-benefits-3-icon-stroke"
                          d="M32 26l9 4v7c0 7-5 11-9 13-4-2-9-6-9-13v-7z"
                        />
                        <path
                          className="unifier-benefits-3-icon-stroke"
                          d="M32 30v14"
                        />
                        <path
                          className="unifier-benefits-3-icon-stroke"
                          d="M27 37h10"
                        />
                      </svg>
                    </div>

                    <div className="unifier-benefits-3-option-copy">
                      <h3 className="unifier-benefits-3-option-title">
                        Oracle Cloud
                      </h3>
                      <p className="unifier-benefits-3-option-description">
                        - 보안성, 확장성, 최신 기능 자동 업데이트
                      </p>
                    </div>
                  </div>
                </article>

                <span
                  className="unifier-benefits-3-divider"
                  aria-hidden="true"
                />

                <article className="tm-ppm-eppm-card unifier-benefits-3-option">
                  <div className="unifier-benefits-3-option-layout">
                    <div
                      className="unifier-benefits-3-icon-wrap"
                      aria-hidden="true"
                    >
                      <svg
                        className="unifier-benefits-3-icon-badge"
                        viewBox="0 0 64 64"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <rect
                          className="unifier-benefits-3-icon-stroke"
                          x="10"
                          y="22"
                          width="24"
                          height="30"
                          rx="2"
                        />
                        <rect
                          className="unifier-benefits-3-icon-stroke"
                          x="36"
                          y="14"
                          width="18"
                          height="38"
                          rx="2"
                        />
                        <path
                          className="unifier-benefits-3-icon-stroke"
                          d="M16 29h4M24 29h4M16 35h4M24 35h4M16 41h4M24 41h4M41 22h3M47 22h3M41 29h3M47 29h3M41 36h3M47 36h3"
                        />
                        <path
                          className="unifier-benefits-3-icon-stroke"
                          d="M22 52v-6M45 52v-7"
                        />
                      </svg>
                    </div>

                    <div className="unifier-benefits-3-option-copy">
                      <h3 className="unifier-benefits-3-option-title">
                        On-Premise
                      </h3>
                      <p className="unifier-benefits-3-option-description">
                        - 조직 내부 정책에 따른 자체 서버 구축 및 관리 지원
                      </p>
                    </div>
                  </div>
                </article>
              </div>

              <div
                className="unifier-benefits-3-conclusion-wrap"
                ref={(el) => (benefitsItemsRef3.current[2] = el)}
              >
                <div className="unifier-benefits-3-bracket" aria-hidden="true">
                  <span className="unifier-benefits-3-bracket-segment is-left" />
                  <span className="unifier-benefits-3-bracket-center" />
                  <span className="unifier-benefits-3-bracket-segment is-right" />
                </div>

                <p className="unifier-benefits-3-conclusion">
                  어떤 환경에서도 동일한 사용자 경험을 제공합니다.
                </p>
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

export default UnifierPage;
