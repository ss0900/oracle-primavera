import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import SectionIndicator from "../../components/SectionIndicator";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const sections = [
  { id: "hero", label: "장점" },
  { id: "advantages", label: "Primavera" },
  { id: "comparison", label: "Tool 비교" },
  { id: "ppm-eppm", label: "PPM vs EPPM" },
];

function TimeManagementAdvantages() {
  const [activeSection, setActiveSection] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const currentSectionRef = useRef(0);

  // Animation refs
  const advantagesSectionRef = useRef(null);
  const titleRef = useRef(null);
  const hubRef = useRef(null);
  const boxesRef = useRef([]);
  const connectLinesRef = useRef([]);
  const timelineRef = useRef(null);
  const timelineLineRef = useRef(null);
  const timelineItemsRef = useRef([]);

  // Comparison section refs
  const comparisonSectionRef = useRef(null);
  const comparisonTitleRef = useRef(null);
  const comparisonTableRef = useRef(null);
  const comparisonConclusionRef = useRef(null);
  const comparisonRowsRef = useRef([]);

  // PPM vs EPPM section refs
  const ppmEppmSectionRef = useRef(null);
  const ppmEppmTitleRef = useRef(null);
  const ppmEppmCardsRef = useRef([]);
  const ppmEppmConclusionRef = useRef(null);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Navigate to section
  const scrollToSection = useCallback(
    (sectionId) => {
      const sectionIndex = sections.findIndex((s) => s.id === sectionId);
      if (sectionIndex === -1 || isAnimatingRef.current) return;

      isAnimatingRef.current = true;
      currentSectionRef.current = sectionIndex;
      setActiveSection(sectionIndex);

      const targetSection =
        document.getElementById(sectionId) ||
        containerRef.current?.children[sectionIndex];

      if (targetSection) {
        gsap.to(window, {
          duration: prefersReducedMotion ? 0 : 0.8,
          scrollTo: { y: targetSection, autoKill: false },
          ease: "power3.inOut",
          onComplete: () => {
            isAnimatingRef.current = false;
          },
        });
      } else {
        isAnimatingRef.current = false;
      }
    },
    [prefersReducedMotion],
  );

  // Mouse wheel handler
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let wheelTimeout = null;

    const handleWheel = (e) => {
      if (isAnimatingRef.current) {
        e.preventDefault();
        return;
      }

      const currentIndex = currentSectionRef.current;

      if (e.deltaY > 50 && currentIndex < sections.length - 1) {
        e.preventDefault();
        scrollToSection(sections[currentIndex + 1].id);
      } else if (e.deltaY < -50 && currentIndex > 0) {
        e.preventDefault();
        scrollToSection(sections[currentIndex - 1].id);
      }
    };

    const handleKeyDown = (e) => {
      if (isAnimatingRef.current) return;

      const currentIndex = currentSectionRef.current;

      if (
        (e.key === "ArrowDown" || e.key === "PageDown") &&
        currentIndex < sections.length - 1
      ) {
        e.preventDefault();
        scrollToSection(sections[currentIndex + 1].id);
      } else if (
        (e.key === "ArrowUp" || e.key === "PageUp") &&
        currentIndex > 0
      ) {
        e.preventDefault();
        scrollToSection(sections[currentIndex - 1].id);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      if (wheelTimeout) clearTimeout(wheelTimeout);
    };
  }, [scrollToSection]);

  // Entry animations - New sequence: Timeline first, then Hub-Spoke
  useEffect(() => {
    if (prefersReducedMotion) return;

    if (advantagesSectionRef.current && titleRef.current) {
      gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: advantagesSectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });

        // ========== PHASE 1: Timeline (Historical Context) ==========

        // 0.0s - Title fade-in
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: -40 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        );

        // 0.3s - Timeline base line draw (left to right)
        if (timelineLineRef.current) {
          tl.fromTo(
            timelineLineRef.current,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.6,
              ease: "power2.out",
              transformOrigin: "left center",
            },
            "-=0.2",
          );
        }

        // 0.5s, 0.7s, 0.9s - Timeline items popup sequentially
        timelineItemsRef.current.forEach((item, i) => {
          if (item) {
            const isLast = i === timelineItemsRef.current.length - 1;
            tl.fromTo(
              item,
              { opacity: 0, scale: 0, y: 20 },
              {
                opacity: 1,
                scale: isLast ? 1.1 : 1,
                y: 0,
                duration: 0.4,
                ease: "back.out(1.7)",
              },
              "-=0.2",
            );
            // Extra emphasis for "Present" item
            if (isLast) {
              tl.to(item, { scale: 1, duration: 0.2 });
            }
          }
        });

        // ========== PHASE 2: Hub-Spoke (Current Value) ==========

        // 1.2s - Central cloud hub scale-up
        if (hubRef.current) {
          tl.fromTo(
            hubRef.current,
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
            "-=0.1",
          );
        }

        // 1.5s - Connection lines draw from center outward
        connectLinesRef.current.forEach((line, i) => {
          if (line) {
            tl.fromTo(
              line,
              { strokeDasharray: "150", strokeDashoffset: 150 },
              { strokeDashoffset: 0, duration: 0.5, ease: "power2.out" },
              i === 0 ? "-=0.3" : "<",
            );
          }
        });

        // 1.8s - All 4 boxes fade-in with bounce simultaneously
        boxesRef.current.forEach((box, i) => {
          if (box) {
            tl.fromTo(
              box,
              { opacity: 0, scale: 0.8, y: 20 },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.5,
                ease: "back.out(1.5)",
              },
              i === 0 ? "-=0.2" : "<",
            );
          }
        });

        // 2.2s - Individual icon animations start (handled by CSS)
        tl.add(() => {
          boxesRef.current.forEach((box) => {
            if (box) {
              box.classList.add("tm-icon-animated");
            }
          });
        }, "+=0.4");
      }, advantagesSectionRef);
    }
  }, [prefersReducedMotion]);

  // Comparison section animations - Table buildup sequence
  useEffect(() => {
    if (prefersReducedMotion) return;

    if (comparisonSectionRef.current && comparisonTitleRef.current) {
      gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: comparisonSectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });

        // 0.0s - Title fade-in
        tl.fromTo(
          comparisonTitleRef.current,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        );

        // 0.3s - Table Header (Left to Right)
        if (comparisonTableRef.current) {
          const headerCells =
            comparisonTableRef.current.querySelectorAll("thead th");
          tl.fromTo(
            headerCells,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.4,
              stagger: 0.1,
              ease: "power2.out",
            },
            "-=0.2",
          );
        }

        // 0.6s ~ 1.2s - Rows sequential buildup (Left to Right fill)
        comparisonRowsRef.current.forEach((row, i) => {
          if (row) {
            const cells = row.querySelectorAll("td");
            tl.fromTo(
              cells,
              { opacity: 0, x: -10, scale: 0.95 },
              {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.4,
                stagger: 0.1,
                ease: "back.out(1.2)",
              },
              "-=0.2",
            );
          }
        });

        // 1.6s - Conclusion fade-in + highlight
        if (comparisonConclusionRef.current) {
          tl.fromTo(
            comparisonConclusionRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
            "+=0.2",
          );

          // Highlight keywords
          const keywords =
            comparisonConclusionRef.current.querySelectorAll("em");
          tl.fromTo(
            keywords,
            {
              backgroundColor: "rgba(59, 130, 246, 0)",
              color: "var(--color-text-primary)",
            },
            {
              backgroundColor: "rgba(59, 130, 246, 0.2)",
              color: "var(--color-accent)",
              duration: 0.4,
              stagger: 0.2,
            },
            "-=0.2",
          );
        }
      }, comparisonSectionRef);
    }
  }, [prefersReducedMotion]);

  // PPM vs EPPM section animations
  useEffect(() => {
    if (prefersReducedMotion) return;

    if (ppmEppmSectionRef.current && ppmEppmTitleRef.current) {
      gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ppmEppmSectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          ppmEppmTitleRef.current,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        );

        ppmEppmCardsRef.current.forEach((card, i) => {
          if (card) {
            tl.fromTo(
              card,
              { opacity: 0, x: i === 0 ? -50 : 50 },
              { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
              "-=0.3",
            );
          }
        });

        if (ppmEppmConclusionRef.current) {
          tl.fromTo(
            ppmEppmConclusionRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
            "+=0.2",
          );
        }
      }, ppmEppmSectionRef);
    }
  }, [prefersReducedMotion]);

  const content = (
    <div className="tm-advantages-section" ref={advantagesSectionRef}>
      <div className="tm-advantages-container">
        {/* Section Title */}
        <div className="tm-section-header" ref={titleRef}>
          <h2 className="tm-section-title">왜 'Primavera'인가?</h2>
        </div>

        {/* Hub-Spoke Layout */}
        <div className="tm-hub-spoke-layout">
          {/* Left Boxes */}
          <div className="tm-spoke-column tm-spoke-left">
            {/* Box 1: Top Left */}
            <div
              className="tm-spoke-box"
              ref={(el) => (boxesRef.current[0] = el)}
            >
              <div className="tm-spoke-icon">
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="6"
                    y="8"
                    width="36"
                    height="32"
                    rx="4"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />
                  <line
                    x1="6"
                    y1="16"
                    x2="42"
                    y2="16"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />
                  <line
                    x1="18"
                    y1="8"
                    x2="18"
                    y2="16"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="30"
                    y1="8"
                    x2="30"
                    y2="16"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="15" cy="26" r="3" fill="currentColor" />
                  <circle cx="24" cy="26" r="3" fill="currentColor" />
                  <circle cx="33" cy="26" r="3" fill="currentColor" />
                  <circle cx="15" cy="34" r="3" fill="currentColor" />
                  <circle cx="24" cy="34" r="3" fill="currentColor" />
                </svg>
              </div>
              <span className="tm-spoke-text">일정, 자원, 비용 통합 관리</span>
            </div>

            {/* Box 2: Bottom Left */}
            <div
              className="tm-spoke-box"
              ref={(el) => (boxesRef.current[1] = el)}
            >
              <div className="tm-spoke-icon tm-icon-warning">
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 6 L44 40 H4 L24 6Z"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="24"
                    y1="18"
                    x2="24"
                    y2="28"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="24" cy="34" r="2" fill="currentColor" />
                </svg>
              </div>
              <span className="tm-spoke-text">리스크 관리 연계</span>
            </div>
          </div>

          {/* Center Hub with Connection Lines */}
          <div className="tm-hub-center">
            <svg
              className="tm-connect-svg"
              viewBox="0 0 300 250"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Connection lines */}
              <path
                className="tm-connect-line"
                ref={(el) => (connectLinesRef.current[0] = el)}
                d="M50 60 Q100 60 130 100"
                stroke="var(--color-accent)"
                strokeWidth="2"
                fill="none"
              />
              <path
                className="tm-connect-line"
                ref={(el) => (connectLinesRef.current[1] = el)}
                d="M50 190 Q100 190 130 150"
                stroke="var(--color-accent)"
                strokeWidth="2"
                fill="none"
              />
              <path
                className="tm-connect-line"
                ref={(el) => (connectLinesRef.current[2] = el)}
                d="M250 60 Q200 60 170 100"
                stroke="var(--color-accent)"
                strokeWidth="2"
                fill="none"
              />
              <path
                className="tm-connect-line"
                ref={(el) => (connectLinesRef.current[3] = el)}
                d="M250 190 Q200 190 170 150"
                stroke="var(--color-accent)"
                strokeWidth="2"
                fill="none"
              />
            </svg>

            {/* Cloud Hub */}
            <div className="tm-hub-cloud" ref={hubRef}>
              <svg
                viewBox="0 0 120 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M95 65 C105 65 115 55 115 42 C115 30 105 22 93 22 C92 15 85 5 70 5 C55 5 45 18 45 30 C30 30 20 40 20 52 C20 64 30 75 45 75 L95 75 C100 75 95 65 95 65"
                  fill="rgba(59, 130, 246, 0.2)"
                  stroke="var(--color-accent)"
                  strokeWidth="2"
                />
              </svg>
              <div className="tm-hub-text">
                <span className="tm-hub-title">Primavera P6</span>
              </div>
            </div>
          </div>

          {/* Right Boxes */}
          <div className="tm-spoke-column tm-spoke-right">
            {/* Box 3: Top Right */}
            <div
              className="tm-spoke-box"
              ref={(el) => (boxesRef.current[2] = el)}
            >
              <div className="tm-spoke-icon tm-icon-folder">
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 14 L6 38 C6 40 8 42 10 42 L38 42 C40 42 42 40 42 38 L42 18 C42 16 40 14 38 14 L24 14 L20 8 L10 8 C8 8 6 10 6 12 L6 14Z"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  <line
                    x1="14"
                    y1="26"
                    x2="34"
                    y2="26"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="14"
                    y1="32"
                    x2="28"
                    y2="32"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <span className="tm-spoke-text">단일/멀티 프로젝트 관리</span>
            </div>

            {/* Box 4: Bottom Right */}
            <div
              className="tm-spoke-box"
              ref={(el) => (boxesRef.current[3] = el)}
            >
              <div className="tm-spoke-icon tm-icon-evm">
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 38 L8 14 L40 14 L40 38"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <polyline
                    points="12,30 18,24 26,28 36,18"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="36" cy="18" r="3" fill="#10b981" />
                  <text
                    x="18"
                    y="44"
                    fontSize="8"
                    fill="currentColor"
                    fontWeight="bold"
                  >
                    EVM
                  </text>
                </svg>
              </div>
              <span className="tm-spoke-text">EVM (Earned Value) 관리</span>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="tm-evolution-timeline" ref={timelineRef}>
          <div className="tm-timeline-line">
            <div className="tm-timeline-track" ref={timelineLineRef}></div>
            <div className="tm-timeline-arrow"></div>
          </div>

          <div className="tm-timeline-items">
            <div
              className="tm-timeline-item"
              ref={(el) => (timelineItemsRef.current[0] = el)}
            >
              <div className="tm-timeline-point"></div>
              <div className="tm-timeline-content">
                <span className="tm-timeline-year">1983</span>
                <span className="tm-timeline-label">P3 (DOS)</span>
              </div>
            </div>

            <div
              className="tm-timeline-item"
              ref={(el) => (timelineItemsRef.current[1] = el)}
            >
              <div className="tm-timeline-point"></div>
              <div className="tm-timeline-content">
                <span className="tm-timeline-year">2000s</span>
                <span className="tm-timeline-label">P6 (Client/Web)</span>
              </div>
            </div>

            <div
              className="tm-timeline-item tm-timeline-current"
              ref={(el) => (timelineItemsRef.current[2] = el)}
            >
              <div className="tm-timeline-point"></div>
              <div className="tm-timeline-content">
                <span className="tm-timeline-year">Present</span>
                <span className="tm-timeline-label">
                  Oracle Primavera P6
                  <br />
                  <small>(Global Standard)</small>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <SectionIndicator
        sections={sections}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      <main ref={containerRef}>
        {/* Panel 1: Hero Section */}
        <section className="tm-panel" id="hero">
          <div
            className="tm-hero-section"
            style={{
              backgroundImage: `linear-gradient(rgba(10, 10, 15, 0.7), rgba(10, 10, 15, 0.9)), url(https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="tm-hero-content">
              <h1 className="tm-hero-title">장점</h1>
              <p className="tm-hero-subtitle">Advantages</p>
            </div>
            <button
              className="scroll-indicator"
              onClick={() => scrollToSection("advantages")}
              aria-label="다음 섹션으로 스크롤"
            >
              <span>Scroll Down</span>
              <div className="scroll-indicator-icon"></div>
            </button>
          </div>
        </section>

        {/* Panel 2: Advantages Section */}
        <section className="tm-panel" id="advantages">
          {content}
        </section>

        {/* Panel 3: Tool Comparison Section */}
        <section className="tm-panel" id="comparison">
          <div className="tm-comparison-section" ref={comparisonSectionRef}>
            <div className="tm-comparison-container">
              {/* Section Title */}
              <div className="tm-section-header" ref={comparisonTitleRef}>
                <h2 className="tm-section-title">공정관리 Tool 비교</h2>
              </div>

              {/* Comparison Table */}
              <div className="tm-comparison-table-wrapper">
                <table className="tm-comparison-table" ref={comparisonTableRef}>
                  <thead>
                    <tr>
                      <th className="tm-th-category">구분</th>
                      <th className="tm-th-p6">Primavera P6</th>
                      <th className="tm-th-msproject">MS-Project</th>
                      <th className="tm-th-excel">Excel (EasyPEM)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Row 1: 주 사용 분야 */}
                    <tr ref={(el) => (comparisonRowsRef.current[0] = el)}>
                      <td className="tm-td-category">주 사용 분야</td>
                      <td className="tm-td-p6">
                        <div className="tm-cell-content">
                          <svg
                            className="tm-cell-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 2L4 6V12C4 16.4 7.4 20.5 12 22C16.6 20.5 20 16.4 20 12V6L12 2Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              fill="rgba(59, 130, 246, 0.2)"
                            />
                            <path
                              d="M9 12L11 14L15 10"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>
                            건설 / 플랜트 표준
                            <br />
                            <small>(Global Standard)</small>
                          </span>
                        </div>
                      </td>
                      <td className="tm-td-msproject">
                        <div className="tm-cell-content">
                          <svg
                            className="tm-cell-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="3"
                              y="3"
                              width="18"
                              height="18"
                              rx="2"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <path
                              d="M7 8H17M7 12H12M7 16H15"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                          <span>소프트웨어 / IT 개발</span>
                        </div>
                      </td>
                      <td className="tm-td-excel">
                        <div className="tm-cell-content">
                          <svg
                            className="tm-cell-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="4"
                              y="4"
                              width="16"
                              height="16"
                              rx="2"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <path
                              d="M8 9L10 12L8 15M12 9L14 12L12 15"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>단순 리스트 관리</span>
                        </div>
                      </td>
                    </tr>

                    {/* Row 2: Network 체계 */}
                    <tr ref={(el) => (comparisonRowsRef.current[1] = el)}>
                      <td className="tm-td-category">Network 체계</td>
                      <td className="tm-td-p6">
                        <div className="tm-cell-content">
                          <svg
                            className="tm-cell-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="6"
                              cy="12"
                              r="3"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <circle
                              cx="18"
                              cy="6"
                              r="3"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <circle
                              cx="18"
                              cy="18"
                              r="3"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <path
                              d="M9 12H15M15 12L15 6M15 12L15 18"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                          </svg>
                          <span>PDM / CPM</span>
                        </div>
                      </td>
                      <td className="tm-td-msproject">
                        <div className="tm-cell-content">
                          <svg
                            className="tm-cell-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="6"
                              cy="12"
                              r="3"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <circle
                              cx="18"
                              cy="12"
                              r="3"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <path
                              d="M9 12H15"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                          </svg>
                          <span>PDM</span>
                        </div>
                      </td>
                      <td className="tm-td-excel tm-td-none">
                        <span>없음</span>
                      </td>
                    </tr>

                    {/* Row 3: 데이터 저장 */}
                    <tr ref={(el) => (comparisonRowsRef.current[2] = el)}>
                      <td className="tm-td-category">데이터 저장</td>
                      <td className="tm-td-p6">
                        <div className="tm-cell-content">
                          <svg
                            className="tm-cell-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <ellipse
                              cx="12"
                              cy="6"
                              rx="8"
                              ry="3"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <path
                              d="M4 6V18C4 19.7 7.6 21 12 21C16.4 21 20 19.7 20 18V6"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <path
                              d="M4 12C4 13.7 7.6 15 12 15C16.4 15 20 13.7 20 12"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                          </svg>
                          <span>
                            Oracle / MS-SQL
                            <br />
                            Database
                          </span>
                        </div>
                      </td>
                      <td className="tm-td-msproject">
                        <div className="tm-cell-content">
                          <svg
                            className="tm-cell-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4 4H14L20 10V20H4V4Z"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <path
                              d="M14 4V10H20"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                          </svg>
                          <span>File Based</span>
                        </div>
                      </td>
                      <td className="tm-td-excel">
                        <div className="tm-cell-content">
                          <svg
                            className="tm-cell-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4 4H14L20 10V20H4V4Z"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <path
                              d="M14 4V10H20"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                          </svg>
                          <span>File Based</span>
                        </div>
                      </td>
                    </tr>

                    {/* Row 4: EVM 기능 */}
                    <tr ref={(el) => (comparisonRowsRef.current[3] = el)}>
                      <td className="tm-td-category">EVM 기능</td>
                      <td className="tm-td-p6">
                        <div className="tm-cell-content">
                          <svg
                            className="tm-cell-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="3"
                              y="3"
                              width="18"
                              height="18"
                              rx="2"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <polyline
                              points="7,15 10,10 14,13 17,7"
                              stroke="#10b981"
                              strokeWidth="2"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <circle cx="17" cy="7" r="2" fill="#10b981" />
                          </svg>
                          <span>
                            <strong>강력한 EVM 제공</strong>
                          </span>
                        </div>
                      </td>
                      <td className="tm-td-msproject">
                        <span>기본 제공</span>
                      </td>
                      <td className="tm-td-excel tm-td-weak">
                        <span>수기 계산 필요</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Conclusion */}
              <div
                className="tm-comparison-conclusion"
                ref={comparisonConclusionRef}
              >
                <p>
                  Primavera P6는 <em>대용량 데이터 처리</em>와{" "}
                  <em>다중 사용자 환경</em>에 최적화된 <em>산업 표준</em>입니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Panel 4: PPM vs EPPM Section */}
        <section className="tm-panel" id="ppm-eppm">
          <div className="tm-ppm-eppm-section" ref={ppmEppmSectionRef}>
            <div className="tm-ppm-eppm-container">
              {/* Section Title */}
              <div className="tm-section-header" ref={ppmEppmTitleRef}>
                <h2 className="tm-section-title">P6 PPM vs. EPPM</h2>
              </div>

              {/* Two Column Layout */}
              <div className="tm-ppm-eppm-grid">
                {/* PPM Card */}
                <div
                  className="tm-ppm-eppm-card tm-ppm-card"
                  ref={(el) => (ppmEppmCardsRef.current[0] = el)}
                >
                  <div className="tm-ppm-eppm-card-header">
                    <h3>PPM (Professional)</h3>
                  </div>
                  <div className="tm-ppm-eppm-card-content">
                    {/* Icon: Desktop PC */}
                    <div className="tm-ppm-eppm-icon">
                      <svg
                        viewBox="0 0 80 80"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Monitor */}
                        <rect
                          x="10"
                          y="8"
                          width="60"
                          height="40"
                          rx="3"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          fill="rgba(59, 130, 246, 0.1)"
                        />
                        <rect
                          x="14"
                          y="12"
                          width="52"
                          height="32"
                          rx="1"
                          fill="rgba(59, 130, 246, 0.2)"
                        />
                        {/* Monitor Stand */}
                        <path
                          d="M35 48 L35 56 L25 56 L25 58 L55 58 L55 56 L45 56 L45 48"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                        />
                        {/* PC Tower */}
                        <rect
                          x="62"
                          y="42"
                          width="12"
                          height="24"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="rgba(59, 130, 246, 0.1)"
                        />
                        <circle cx="68" cy="48" r="2" fill="currentColor" />
                        <rect x="65" y="54" width="6" height="8" rx="1" fill="rgba(59, 130, 246, 0.3)" />
                        {/* Keyboard */}
                        <rect
                          x="18"
                          y="62"
                          width="30"
                          height="8"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          fill="rgba(59, 130, 246, 0.1)"
                        />
                        {/* Mouse */}
                        <ellipse
                          cx="55"
                          cy="66"
                          rx="5"
                          ry="4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          fill="rgba(59, 130, 246, 0.1)"
                        />
                      </svg>
                    </div>

                    {/* Features */}
                    <ul className="tm-ppm-eppm-features">
                      <li>
                        <span className="tm-bullet"></span>
                        <span>Client-based (설치형)</span>
                      </li>
                      <li>
                        <span className="tm-bullet"></span>
                        <span>Power User 중심</span>
                      </li>
                      <li>
                        <span className="tm-bullet"></span>
                        <span>독립적 프로젝트 관리 강점</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Divider */}
                <div className="tm-ppm-eppm-divider">
                  <div className="tm-ppm-eppm-vs">VS</div>
                </div>

                {/* EPPM Card */}
                <div
                  className="tm-ppm-eppm-card tm-eppm-card"
                  ref={(el) => (ppmEppmCardsRef.current[1] = el)}
                >
                  <div className="tm-ppm-eppm-card-header">
                    <h3>EPPM (Enterprise)</h3>
                  </div>
                  <div className="tm-ppm-eppm-card-content">
                    {/* Icon: Globe + Server + Cloud */}
                    <div className="tm-ppm-eppm-icon">
                      <svg
                        viewBox="0 0 80 80"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Globe */}
                        <circle
                          cx="28"
                          cy="35"
                          r="18"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="rgba(16, 185, 129, 0.1)"
                        />
                        <ellipse
                          cx="28"
                          cy="35"
                          rx="8"
                          ry="18"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          fill="none"
                        />
                        <line
                          x1="10"
                          y1="35"
                          x2="46"
                          y2="35"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <line
                          x1="28"
                          y1="17"
                          x2="28"
                          y2="53"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />

                        {/* Server */}
                        <rect
                          x="52"
                          y="24"
                          width="20"
                          height="32"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="rgba(16, 185, 129, 0.1)"
                        />
                        <line
                          x1="52"
                          y1="34"
                          x2="72"
                          y2="34"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <line
                          x1="52"
                          y1="44"
                          x2="72"
                          y2="44"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <circle cx="56" cy="29" r="1.5" fill="#10b981" />
                        <circle cx="56" cy="39" r="1.5" fill="#10b981" />
                        <circle cx="56" cy="49" r="1.5" fill="#10b981" />

                        {/* Cloud Upload */}
                        <path
                          d="M55 12 C50 12 46 16 46 20 C42 20 38 24 38 28 C38 32 42 36 48 36 L66 36 C70 36 74 32 74 28 C74 24 70 20 66 20 C66 16 62 12 55 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="rgba(16, 185, 129, 0.2)"
                        />
                        <path
                          d="M55 30 L55 22 M52 25 L55 22 L58 25"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* Connection Lines */}
                        <path
                          d="M44 38 L52 38"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeDasharray="3 2"
                        />
                      </svg>
                    </div>

                    {/* Features */}
                    <ul className="tm-ppm-eppm-features">
                      <li>
                        <span className="tm-bullet"></span>
                        <span>Web-based (웹 접속)</span>
                      </li>
                      <li>
                        <span className="tm-bullet"></span>
                        <span>경영진/관리자 Dashboard 제공</span>
                      </li>
                      <li>
                        <span className="tm-bullet"></span>
                        <span>전사적 포트폴리오 관리 (Portfolio)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Conclusion */}
              <div
                className="tm-ppm-eppm-conclusion"
                ref={ppmEppmConclusionRef}
              >
                <p>
                  건설 현장 실무에서는 <em>정밀한 조작</em>을 위해{" "}
                  <em>PPM을 주로 병행 사용</em>함
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default TimeManagementAdvantages;
