import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import SectionIndicator from "../../components/SectionIndicator";
import { getAssetPath } from "../../utils/assetPath";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const sections = [
  { id: "hero", label: "CPM 공정관리" },
  { id: "features", label: "주요 특징" },
];

function PPMFeatures() {
  const [activeSection, setActiveSection] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const containerRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const currentSectionRef = useRef(0);

  // Section refs
  const heroSectionRef = useRef(null);
  const featuresSectionRef = useRef(null);
  const imageCardRef = useRef(null);
  const featureCardsRef = useRef([]);

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
      if (sectionIndex === -1) return;

      const panels = gsap.utils.toArray(".cpm-panel");
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

  // GSAP scroll hijacking
  useEffect(() => {
    if (prefersReducedMotion) {
      initContentAnimations();
      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    }

    const panels = gsap.utils.toArray(".cpm-panel");

    // Track active section
    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          currentSectionRef.current = i;
          setActiveSection(i);
        },
        onEnterBack: () => {
          currentSectionRef.current = i;
          setActiveSection(i);
        },
      });
    });

    // Wheel event handler
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
      const threshold = 50;

      if (Math.abs(delta) < threshold) return;

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

  // Content animations
  const initContentAnimations = () => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Hero section animations
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top 80%",
          end: "center center",
          toggleActions: "play none none reverse",
        },
      });

      heroTl.fromTo(
        ".tm-hero-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      );

      // Features section animations
      const featuresTl = gsap.timeline({
        scrollTrigger: {
          trigger: featuresSectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Title fade-in (0.0s)
      featuresTl.fromTo(
        ".cpm-section-title",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
      );

      // 2. Image drop-in + bounce (0.3s)
      featuresTl.fromTo(
        imageCardRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "bounce.out" },
        "-=0.2",
      );

      // 3. Feature cards sequential appearance (1.0s~)
      const cards = featureCardsRef.current;

      // Card 1: Slide in from left
      if (cards[0]) {
        featuresTl.fromTo(
          cards[0],
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5 },
          "-=0.5",
        );
      }

      // Card 2: Fade up
      if (cards[1]) {
        featuresTl.fromTo(
          cards[1],
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.3",
        );
      }

      // Card 3: Fade up
      if (cards[2]) {
        featuresTl.fromTo(
          cards[2],
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.3",
        );
      }

      // Card 4: Slide in from right
      if (cards[3]) {
        featuresTl.fromTo(
          cards[3],
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5 },
          "-=0.3",
        );
      }

      // 4. Dividers draw (1.8s) - using DOM elements
      // We need to target the pseudo-elements, but standard CSS animation might be easier for pseudo-elements,
      // OR we can rely on opacity/transform of the card itself if the divider is part of it.
      // Since ::after is hard to animate with GSAP directly without CSS variables, we'll try animating the full card entry which includes the divider.
      // Alternatively, we can use CSS variables to animate the height.
      // Let's stick to the card entrance for now, but to be precise with "dividers draw", we can add a className to trigger CSS animation.
      // Or cleaner: Use a real div for divider instead of ::after to animate it easily with GSAP.
      // For now, let's keep ::after and just let it appear with the card, or use CSS keyframes triggered by a class.
      // Given the request for "sequential draw", using a real element is best.
      // Use <div className="cpm-feature-divider-line"> logic in the render.
    });

    return () => ctx.revert();
  };

  // Feature items data
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

  return (
    <>
      <div className="cpm-schedule-page" ref={containerRef}>
        {/* Hero Section */}
        <section className="cpm-panel tm-panel" id="hero">
          <div
            className="tm-hero-section"
            ref={heroSectionRef}
            style={{
              backgroundImage: `linear-gradient(rgba(10, 10, 15, 0.7), rgba(10, 10, 15, 0.9)), url(https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="tm-hero-content">
              <h1 className="tm-hero-title">CPM 공정관리</h1>
              <p className="tm-hero-subtitle">Critical Path Method Process</p>
            </div>
            <button
              className="scroll-indicator"
              onClick={() => scrollToSection("features")}
              aria-label="다음 섹션으로 스크롤"
            >
              <span>Scroll Down</span>
              <div className="scroll-indicator-icon"></div>
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section
          className="cpm-panel cpm-features-section"
          id="features"
          ref={featuresSectionRef}
        >
          <div className="cpm-features-container">
            <div className="cpm-section-header">
              <h2 className="cpm-section-title">CPM 공정표</h2>
            </div>

            {/* Gantt Chart Image Card */}
            <div className="cpm-image-card" ref={imageCardRef}>
              <img
                src={getAssetPath("/cpm-gantt-chart.png")}
                alt="CPM 공정표 - Primavera P6 간트 차트"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML =
                    '<div class="cpm-image-placeholder">CPM Gantt Chart Screenshot</div>';
                }}
              />
            </div>

            {/* Feature Cards */}
            <div
              className="cpm-feature-cards"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {featureItems.map((item, index) => (
                <div
                  key={index}
                  className={`cpm-feature-card ${hoveredIndex !== null && hoveredIndex !== index ? "dimmed" : ""}`}
                  ref={(el) => (featureCardsRef.current[index] = el)}
                  onMouseEnter={() => setHoveredIndex(index)}
                >
                  <div className="cpm-feature-icon">{item.icon}</div>
                  <h4 className="cpm-feature-title">{item.title}</h4>

                  {/* Real Divider Element for Animation */}
                  {index < featureItems.length - 1 && (
                    <div className="cpm-feature-divider-line" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Section Indicator */}
      <SectionIndicator
        sections={sections}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />
    </>
  );
}

export default PPMFeatures;
