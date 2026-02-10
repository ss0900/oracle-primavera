import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import SectionIndicator from "../components/SectionIndicator";
import EppmFunctionsSection from "../components/EppmFunctionsSection";
import { aconexFunctionsIntro } from "../data/aconexFunctionsData";
import {
  aconexFunctions2FeatureItems,
  aconexFunctions2Images,
  aconexFunctions2Title,
} from "../data/aconexFunctions2Data";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const sections = [
  { id: "hero", label: "Aconex" },
  { id: "menu", label: "메뉴" },
  { id: "overview-content", label: "개요" },
  { id: "overview-content-2", label: "개요 2" },
  { id: "functions", label: "기능 소개" },
  { id: "functions-2", label: "기능 소개 2" },
  { id: "projects", label: "프로젝트 사례" },
];

const subMenuItems = [
  {
    id: "overview",
    title: "개요",
    description: "건설 프로젝트 협업을 위한 클라우드 플랫폼",
    image:
      "https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "#overview-content",
  },
  {
    id: "functions",
    title: "기능 소개",
    description: "문서 관리, 메일, 워크플로우, 협업",
    image:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "#functions",
  },
  {
    id: "projects",
    title: "프로젝트 사례",
    description: "글로벌 대형 프로젝트 적용 사례",
    image:
      "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "#projects",
  },
];

const overviewRiskBullets = [
  "수천 명의 참여자와 수백만 건의 문서",
  "파편화된 커뮤니케이션으로 인한 책임 소재 불분명",
  "데이터 누락이 초래하는 분쟁 및 클레임 비용",
];

const projectsData = [
  {
    tag: "건축",
    title: "대형 복합 건물",
    desc: "초고층 복합 건물 프로젝트의 문서 협업 관리",
    img: "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    tag: "교통",
    title: "철도 인프라",
    desc: "고속철도 건설 프로젝트 문서 관리",
    img: "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    tag: "에너지",
    title: "발전소 건설",
    desc: "해외 발전소 EPC 프로젝트 협업",
    img: "https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const { title: functionsTitle, items: functionItems } = aconexFunctionsIntro;

function AconexPage() {
  const { sectionId, subId } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState(sections[0].id);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hoveredCardIndex2, setHoveredCardIndex2] = useState(null);
  const [activeSlide2, setActiveSlide2] = useState(0);

  const containerRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const currentSectionRef = useRef(0);

  const heroSectionRef = useRef(null);
  const menuSectionRef = useRef(null);
  const overviewSectionRef = useRef(null);
  const overviewSectionRef2 = useRef(null);
  const functionsSectionRef = useRef(null);
  const functionsSectionRef2 = useRef(null);
  const projectsSectionRef = useRef(null);

  const overviewCardsRef = useRef([]);
  const overviewCardsRef2 = useRef([]);
  const functionsImageCardRef = useRef(null);
  const functionsImageCardRef2 = useRef(null);
  const functionsCardsRef = useRef([]);
  const functionsCardsRef2 = useRef([]);
  const projectsCardsRef = useRef([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (activeSectionId !== "functions-2") return;
    if (!aconexFunctions2Images.length) return;

    const interval = setInterval(() => {
      setActiveSlide2((prev) => (prev + 1) % aconexFunctions2Images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, activeSectionId]);

  const scrollToSection = useCallback(
    (targetSectionId) => {
      const sectionIndex = sections.findIndex(
        (section) => section.id === targetSectionId,
      );
      if (sectionIndex === -1) return;

      const panels = gsap.utils.toArray(".aconex-panel");
      if (!panels[sectionIndex]) return;

      currentSectionRef.current = sectionIndex;
      setActiveSection(sectionIndex);
      setActiveSectionId(targetSectionId);

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

  useEffect(() => {
    if (!sectionId) return;

    let targetId = sectionId;
    if (sectionId === "overview")
      targetId = subId === "2" ? "overview-content-2" : "overview-content";
    if (sectionId === "features") targetId = "functions";
    if (sectionId === "functions")
      targetId = subId === "2" ? "functions-2" : "functions";

    const foundIndex = sections.findIndex((section) => section.id === targetId);

    if (foundIndex !== -1 && foundIndex !== currentSectionRef.current) {
      setTimeout(() => {
        scrollToSection(targetId);
      }, 100);
    }
  }, [sectionId, subId, scrollToSection]);

  const updateUrlForSection = useCallback(
    (index) => {
      let path = "/aconex";
      if (index === 2) path = "/aconex/overview/1";
      if (index === 3) path = "/aconex/overview/2";
      if (index === 4) path = "/aconex/functions/1";
      if (index === 5) path = "/aconex/functions/2";
      if (index === 6) path = "/aconex/projects";

      navigate(path, { replace: true });
    },
    [navigate],
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      initContentAnimations();
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }

    const panels = gsap.utils.toArray(".aconex-panel");

    panels.forEach((panel, index) => {
      ScrollTrigger.create({
        trigger: panel,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          currentSectionRef.current = index;
          setActiveSection(index);
          setActiveSectionId(sections[index].id);
          updateUrlForSection(index);
        },
        onEnterBack: () => {
          currentSectionRef.current = index;
          setActiveSection(index);
          setActiveSectionId(sections[index].id);
          updateUrlForSection(index);
        },
      });
    });

    const handleWheel = (event) => {
      if (isAnimatingRef.current) {
        event.preventDefault();
        return;
      }

      const delta = event.deltaY;
      const threshold = 50;
      if (Math.abs(delta) < threshold) return;

      event.preventDefault();
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
      setActiveSectionId(sections[nextSection].id);

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

    let touchStartY = 0;
    const handleTouchStart = (event) => {
      touchStartY = event.touches[0].clientY;
    };

    const handleTouchEnd = (event) => {
      if (isAnimatingRef.current) return;

      const touchEndY = event.changedTouches[0].clientY;
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
      setActiveSectionId(sections[nextSection].id);

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
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [prefersReducedMotion, updateUrlForSection]);

  const initContentAnimations = () => {
    if (prefersReducedMotion) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        ".aconex-hero-title",
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

      if (menuSectionRef.current) {
        gsap.fromTo(
          ".aconex-menu-card",
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

      if (overviewSectionRef.current) {
        const overviewCards = overviewCardsRef.current.filter(Boolean);
        if (overviewCards.length) {
          gsap.fromTo(
            overviewCards,
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
      }

      if (overviewSectionRef2.current) {
        const overviewCards2 = overviewCardsRef2.current.filter(Boolean);
        if (overviewCards2.length) {
          gsap.fromTo(
            overviewCards2,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.1,
              scrollTrigger: {
                trigger: overviewSectionRef2.current,
                start: "top 60%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      }

      if (functionsSectionRef.current) {
        const featuresTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: functionsSectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        });

        const functionsTitleElement =
          functionsSectionRef.current.querySelector(".ppm-cpm-title");

        if (functionsTitleElement) {
          featuresTimeline.fromTo(
            functionsTitleElement,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5 },
          );
        }

        if (functionsImageCardRef.current) {
          featuresTimeline.fromTo(
            functionsImageCardRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "bounce.out" },
            "-=0.2",
          );
        }

        const cards = functionsCardsRef.current;
        if (cards[0]) {
          featuresTimeline.fromTo(
            cards[0],
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5 },
            "-=0.5",
          );
        }
        if (cards[1]) {
          featuresTimeline.fromTo(
            cards[1],
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 },
            "-=0.3",
          );
        }
        if (cards[2]) {
          featuresTimeline.fromTo(
            cards[2],
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 },
            "-=0.3",
          );
        }
        if (cards[3]) {
          featuresTimeline.fromTo(
            cards[3],
            { x: 50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5 },
            "-=0.3",
          );
        }
      }

      if (functionsSectionRef2.current) {
        const featuresTimeline2 = gsap.timeline({
          scrollTrigger: {
            trigger: functionsSectionRef2.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        });

        const functionsTitleElement2 =
          functionsSectionRef2.current.querySelector(".ppm-cpm-title");

        if (functionsTitleElement2) {
          featuresTimeline2.fromTo(
            functionsTitleElement2,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5 },
          );
        }

        if (functionsImageCardRef2.current) {
          featuresTimeline2.fromTo(
            functionsImageCardRef2.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "bounce.out" },
            "-=0.2",
          );
        }

        const cards2 = functionsCardsRef2.current;
        if (cards2[0]) {
          featuresTimeline2.fromTo(
            cards2[0],
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5 },
            "-=0.5",
          );
        }
        if (cards2[1]) {
          featuresTimeline2.fromTo(
            cards2[1],
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 },
            "-=0.3",
          );
        }
        if (cards2[2]) {
          featuresTimeline2.fromTo(
            cards2[2],
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 },
            "-=0.3",
          );
        }
        if (cards2[3]) {
          featuresTimeline2.fromTo(
            cards2[3],
            { x: 50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5 },
            "-=0.3",
          );
        }
      }

      if (projectsSectionRef.current) {
        gsap.fromTo(
          projectsCardsRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            scrollTrigger: {
              trigger: projectsSectionRef.current,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    });

    return () => context.revert();
  };

  return (
    <>
      <div className="ppm-page aconex-page-container" ref={containerRef}>
        <section
          className="aconex-panel tm-panel"
          id="hero"
          ref={heroSectionRef}
        >
          <div
            className="tm-hero-section"
            style={{
              backgroundImage:
                "linear-gradient(rgba(10, 10, 15, 0.6), rgba(10, 10, 15, 0.8)), url(https://images.pexels.com/photos/3774503/pexels-photo-3774503.jpeg?auto=compress&cs=tinysrgb&w=1200)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="tm-hero-content">
              <h1 className="aconex-hero-title tm-hero-title">Oracle Aconex</h1>
              <p className="tm-hero-subtitle">Aconex</p>
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

        <section
          className="aconex-panel ppm-panel ppm-overview-section"
          id="menu"
          ref={menuSectionRef}
        >
          <div className="ppm-overview-container">
            <div className="ppm-overview-content">
              <nav className="ppm-breadcrumb">
                <Link to="/" className="ppm-breadcrumb-home">
                  <span className="ppm-breadcrumb-home-icon">H</span>
                </Link>
                <span className="ppm-breadcrumb-separator">&gt;</span>
                <span className="ppm-breadcrumb-item ppm-breadcrumb-current">
                  Aconex
                </span>
              </nav>

              <h2 className="ppm-overview-title">
                건설 프로젝트 협업 및
                <br />
                문서 관리 플랫폼
              </h2>

              <p className="ppm-overview-description">
                건설 프로젝트의 모든 참여자를 단일 플랫폼(CDE)에서 연결해 문서 ·
                커뮤니케이션 · 프로세스를 표준화하고,
                <br />
                완전한 프로젝트 기록과 감사추적을 기반으로 프로젝트의 가시성과
                통제를 강화합니다.
              </p>

              <div className="ppm-overview-divider"></div>

              <div className="ppm-submenu-grid">
                {subMenuItems.map((item) => (
                  <button
                    key={item.id}
                    className="ppm-submenu-card aconex-menu-card"
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

        <section
          className="aconex-panel tm-panel"
          id="overview-content"
          ref={overviewSectionRef}
        >
          <div className="tm-methods-section aconex-overview-shell">
            <div className="tm-methods-container aconex-overview-frame">
              <div
                className="tm-section-header"
                ref={(element) => (overviewCardsRef.current[0] = element)}
              >
                <h2 className="tm-section-title">
                  건설 리스크의 핵심은 ‘정보의 단절’입니다.
                </h2>
              </div>

              <div className="aconex-overview-layout">
                <article
                  className="aconex-overview-copy"
                  ref={(element) => (overviewCardsRef.current[1] = element)}
                >
                  <ul className="aconex-overview-bullets">
                    {overviewRiskBullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>

                <article
                  className="tm-ppm-eppm-card aconex-overview-diagram-card"
                  ref={(element) => (overviewCardsRef.current[2] = element)}
                >
                  <img
                    className="aconex-overview-diagram-image"
                    src="/Information Silos.png"
                    alt="Information Silos 다이어그램"
                  />
                </article>
              </div>
            </div>
          </div>
        </section>

        <section
          className="aconex-panel tm-panel"
          id="overview-content-2"
          ref={overviewSectionRef2}
        >
          <div className="tm-methods-section aconex-overview-shell aconex-cde-shell">
            <div className="tm-methods-container aconex-overview-frame aconex-cde-frame">
              <div
                className="tm-section-header"
                ref={(element) => (overviewCardsRef2.current[0] = element)}
              >
                <h2 className="tm-section-title">
                  공통 데이터 환경(CDE)의 완성
                </h2>
              </div>

              <div className="aconex-cde-layout">
                <article
                  className="tm-ppm-eppm-card aconex-cde-diagram-card"
                  ref={(element) => (overviewCardsRef2.current[1] = element)}
                >
                  <div className="aconex-cde-diagram-wrap">
                    <svg
                      className="aconex-cde-diagram-svg"
                      viewBox="0 0 780 470"
                      aria-label="Aconex CDE hub and spoke diagram"
                      role="img"
                    >
                      <line x1="390" y1="148" x2="390" y2="140" />
                      <line x1="300" y1="305" x2="259" y2="330" />
                      <line x1="480" y1="305" x2="521" y2="330" />

                      <g className="aconex-cde-node aconex-cde-node-hub">
                        <circle cx="390" cy="252" r="104" />
                        <circle cx="390" cy="252" r="90" />
                        <text x="390" y="248" textAnchor="middle">
                          <tspan x="390" dy="0">
                            Oracle Aconex
                          </tspan>
                          <tspan x="390" dy="36">
                            (CDE)
                          </tspan>
                        </text>
                      </g>

                      <g className="aconex-cde-node">
                        <circle cx="390" cy="70" r="70" />
                        <circle cx="390" cy="70" r="59" />
                        <text x="390" y="63" textAnchor="middle">
                          <tspan x="390" dy="0">
                            Collaboration
                          </tspan>
                          <tspan x="390" dy="30">
                            (협업)
                          </tspan>
                        </text>
                      </g>

                      <g className="aconex-cde-node">
                        <circle cx="250" cy="366" r="70" />
                        <circle cx="250" cy="366" r="59" />
                        <text x="250" y="359" textAnchor="middle">
                          <tspan x="250" dy="0">
                            Documents
                          </tspan>
                          <tspan x="250" dy="30">
                            (문서)
                          </tspan>
                        </text>
                      </g>

                      <g className="aconex-cde-node">
                        <circle cx="530" cy="366" r="70" />
                        <circle cx="530" cy="366" r="59" />
                        <text x="530" y="359" textAnchor="middle">
                          <tspan x="530" dy="0">
                            Process
                          </tspan>
                          <tspan x="530" dy="30">
                            (프로세스)
                          </tspan>
                        </text>
                      </g>
                    </svg>
                  </div>
                </article>

                <div
                  className="aconex-cde-description-grid"
                  ref={(element) => (overviewCardsRef2.current[2] = element)}
                >
                  <article className="tm-ppm-eppm-card aconex-cde-description-card">
                    <h3>정의 (Definition)</h3>
                    <p>
                      프로젝트 전 생애주기의 정보와 공식 기록(Record)을
                      <br />
                      표준화하는 단일 중앙 플랫폼
                    </p>
                  </article>

                  <article className="tm-ppm-eppm-card aconex-cde-description-card">
                    <h3>핵심 역할 (Key Role)</h3>
                    <p>
                      발주처, CM, 설계, 시공사 간의
                      <br />
                      정보 흐름 통합
                    </p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>

        <EppmFunctionsSection
          sectionId="functions"
          title={functionsTitle}
          items={functionItems}
          sectionRef={functionsSectionRef}
          imageCardRef={functionsImageCardRef}
          cardRefs={functionsCardsRef}
          prefersReducedMotion={prefersReducedMotion}
          isActive={activeSectionId === "functions"}
          panelClassName="aconex-panel"
        />

        <section
          className="aconex-panel ppm-panel ppm-cpm-section"
          id="functions-2"
          ref={functionsSectionRef2}
        >
          <div className="ppm-cpm-container">
            <div className="ppm-cpm-header">
              <h2 className="ppm-cpm-title">{aconexFunctions2Title}</h2>
            </div>

            <div className="ppm-functions-layout">
              <div
                className="ppm-functions-media"
                style={{ marginTop: "-12px" }}
              >
                <div
                  className="cpm-carousel-container"
                  ref={functionsImageCardRef2}
                >
                  <div className="cpm-carousel-wrapper">
                    {aconexFunctions2Images.map((item, index) => (
                      <div
                        key={index}
                        className={`cpm-carousel-slide ${index === activeSlide2 ? "active" : ""}`}
                        style={{
                          transform: `translateX(-${activeSlide2 * 100}%)`,
                        }}
                      >
                        <img
                          src={item.src}
                          alt={item.alt}
                          onError={(event) => {
                            event.target.style.display = "none";
                            event.target.parentElement.innerHTML =
                              '<div class="cpm-image-placeholder">OPC Screenshot</div>';
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="cpm-carousel-dots">
                    {aconexFunctions2Images.map((_, index) => (
                      <button
                        key={index}
                        className={`cpm-carousel-dot ${index === activeSlide2 ? "active" : ""}`}
                        onClick={() => setActiveSlide2(index)}
                        aria-label={`슬라이드 ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="ppm-functions-cards">
                <div
                  className="cpm-feature-cards"
                  onMouseLeave={() => setHoveredCardIndex2(null)}
                >
                  {aconexFunctions2FeatureItems.map((item, index) => (
                    <button
                      key={index}
                      className={`cpm-feature-card ${hoveredCardIndex2 !== null && hoveredCardIndex2 !== index ? "dimmed" : ""} ${index === activeSlide2 ? "active" : ""}`}
                      ref={(element) =>
                        (functionsCardsRef2.current[index] = element)
                      }
                      onClick={() => setActiveSlide2(index)}
                      onMouseEnter={() => setHoveredCardIndex2(index)}
                    >
                      <div className="cpm-feature-icon">{item.icon}</div>
                      <h4 className="cpm-feature-title">{item.title}</h4>

                      {index < aconexFunctions2FeatureItems.length - 1 && (
                        <div className="cpm-feature-divider-line" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="aconex-panel tm-panel"
          id="projects"
          ref={projectsSectionRef}
        >
          <div
            className="tm-methods-section"
            style={{ background: "var(--bg-darker)" }}
          >
            <div className="tm-methods-container">
              <div className="tm-section-header">
                <h2 className="tm-section-title">프로젝트 사례</h2>
              </div>
              <div
                className="tm-ppm-eppm-grid"
                style={{
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "30px",
                  marginTop: "40px",
                }}
              >
                {projectsData.map((item, index) => (
                  <div
                    key={index}
                    className="tm-ppm-eppm-card"
                    style={{ padding: "0", overflow: "hidden", height: "auto" }}
                    ref={(element) =>
                      (projectsCardsRef.current[index] = element)
                    }
                  >
                    <div
                      className="tm-card-image"
                      style={{
                        height: "200px",
                        overflow: "hidden",
                        position: "relative",
                      }}
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
                      <span
                        style={{
                          position: "absolute",
                          top: "15px",
                          left: "15px",
                          background: "rgba(0,0,0,0.7)",
                          color: "white",
                          padding: "5px 10px",
                          borderRadius: "4px",
                          fontSize: "0.8rem",
                        }}
                      >
                        {item.tag}
                      </span>
                    </div>
                    <div
                      className="tm-card-content"
                      style={{ padding: "25px" }}
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
                          lineHeight: "1.6",
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

export default AconexPage;
