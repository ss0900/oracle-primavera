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
import { getAssetPath } from "../utils/assetPath";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const sections = [
  { id: "hero", label: "Oracle Aconex" },
  { id: "menu", label: "메뉴" },
  { id: "overview-content", label: "개요" },
  { id: "overview-content-2", label: "개요 2" },
  { id: "functions", label: "기능 소개" },
  { id: "functions-2", label: "기능 소개 2" },
  { id: "projects", label: "효과" },
  { id: "benefits-2", label: "효과 2" },
  { id: "benefits-3", label: "효과 3" },
];

const subMenuItems = [
  {
    id: "overview",
    title: "개요",
    description: "건설 프로젝트 협업을 위한 클라우드 플랫폼",
    image: getAssetPath("/Aconex_Overview.png"),
    link: "#overview-content",
  },
  {
    id: "functions",
    title: "기능 소개",
    description: "문서 관리, 메일, 워크플로우, 협업",
    image: getAssetPath("/Aconex_Functions.png"),
    link: "#functions",
  },
  {
    id: "benefits",
    title: "효과",
    description: "Primavera와 Oracle Aconex 역할 비교",
    image: getAssetPath("/Aconex_Benefits.png"),
    link: "#projects",
  },
];

const overviewRiskBullets = [
  "수천 명의 참여자와 수백만 건의 문서",
  "파편화된 커뮤니케이션으로 인한 책임 소재 불분명",
  "데이터 누락이 초래하는 분쟁 및 클레임 비용",
];

const roleCompareData = [
  {
    id: "primavera",
    title: "Oracle Primavera",
    summary: [
      "계획과 통제 (Planning & Control)",
      "언제 무엇을 할지 (When & What)",
    ],
  },
  {
    id: "aconex",
    title: "Oracle Aconex",
    summary: [
      "실행과 기록 (Execution & Records)",
      "실행 과정의 모든 기록 (All Execution Records)",
    ],
  },
];

const coreValueItems = [
  {
    id: "single-platform",
    title: (
      <>
        한 곳에서
        <br />
        함께 일하기
      </>
    ),
    description: ["발주처/협력사/현장이", "같은 화면에서 같이 작업"],
  },
  {
    id: "risk-reduction",
    title: "리스크 감소",
    description: ["변경 불가능한", "감사 추적으로 분쟁 예방"],
  },
  {
    id: "standardization",
    title: "표준화",
    description: ["글로벌 표준 프로세스", "적용으로 업무 효율 극대화"],
  },
];

const { title: functionsTitle, items: functionItems } = aconexFunctionsIntro;

function PrimaveraScheduleIcon() {
  return (
    <svg viewBox="0 0 260 180" role="img" aria-label="일정 간트 보드 아이콘">
      <rect
        x="20"
        y="20"
        width="220"
        height="140"
        rx="12"
        className="aconex-role-icon-outline"
      />
      <rect
        x="20"
        y="20"
        width="220"
        height="22"
        rx="12"
        className="aconex-role-icon-accent-soft"
      />
      <rect
        x="20"
        y="34"
        width="220"
        height="8"
        className="aconex-role-icon-accent-soft"
      />

      <line
        x1="66"
        y1="42"
        x2="66"
        y2="160"
        className="aconex-role-icon-line"
      />
      <line
        x1="98"
        y1="42"
        x2="98"
        y2="160"
        className="aconex-role-icon-line"
      />
      <line
        x1="130"
        y1="42"
        x2="130"
        y2="160"
        className="aconex-role-icon-line"
      />
      <line
        x1="162"
        y1="42"
        x2="162"
        y2="160"
        className="aconex-role-icon-line"
      />
      <line
        x1="194"
        y1="42"
        x2="194"
        y2="160"
        className="aconex-role-icon-line"
      />

      <line
        x1="20"
        y1="70"
        x2="240"
        y2="70"
        className="aconex-role-icon-line"
      />
      <line
        x1="20"
        y1="96"
        x2="240"
        y2="96"
        className="aconex-role-icon-line"
      />
      <line
        x1="20"
        y1="122"
        x2="240"
        y2="122"
        className="aconex-role-icon-line"
      />

      <rect
        x="28"
        y="54"
        width="30"
        height="7"
        rx="3.5"
        className="aconex-role-icon-text-line"
      />
      <rect
        x="28"
        y="80"
        width="30"
        height="7"
        rx="3.5"
        className="aconex-role-icon-text-line"
      />
      <rect
        x="28"
        y="106"
        width="30"
        height="7"
        rx="3.5"
        className="aconex-role-icon-text-line"
      />
      <rect
        x="28"
        y="132"
        width="30"
        height="7"
        rx="3.5"
        className="aconex-role-icon-text-line"
      />

      <rect
        x="76"
        y="78"
        width="48"
        height="11"
        rx="5.5"
        className="aconex-role-icon-accent"
      />
      <rect
        x="108"
        y="104"
        width="58"
        height="11"
        rx="5.5"
        className="aconex-role-icon-accent"
      />
      <rect
        x="150"
        y="130"
        width="56"
        height="11"
        rx="5.5"
        className="aconex-role-icon-accent"
      />

      <polyline
        points="124,84 138,84 138,109"
        className="aconex-role-icon-connector"
      />
      <polyline
        points="166,110 178,110 178,135"
        className="aconex-role-icon-connector"
      />
    </svg>
  );
}

function AconexRecordsIcon() {
  return (
    <svg viewBox="0 0 260 180" role="img" aria-label="문서 기록 아이콘">
      <path
        d="M55 112 L138 62 L205 106 L122 156 Z"
        className="aconex-role-icon-outline"
      />
      <path
        d="M47 98 L130 48 L197 92 L114 142 Z"
        className="aconex-role-icon-outline"
      />
      <path
        d="M39 84 L122 34 L189 78 L106 128 Z"
        className="aconex-role-icon-outline"
      />

      <path
        d="M39 84 L122 34 L189 78 L106 128 Z"
        className="aconex-role-icon-paper"
      />
      <line
        x1="83"
        y1="72"
        x2="150"
        y2="111"
        className="aconex-role-icon-text-line"
      />
      <line
        x1="95"
        y1="64"
        x2="162"
        y2="103"
        className="aconex-role-icon-text-line"
      />
      <line
        x1="107"
        y1="57"
        x2="174"
        y2="96"
        className="aconex-role-icon-text-line"
      />

      <g transform="translate(-45, 0)">
        <circle cx="143" cy="104" r="16" className="aconex-role-icon-seal" />
        <path
          d="M138 116 L133 146 L142 140 L152 150 L157 120 Z"
          className="aconex-role-icon-ribbon"
          transform="rotate(30 150 95)"
        />
      </g>
    </svg>
  );
}

function IntegrationScheduleGlyph() {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-label="일정 데이터 아이콘"
      focusable="false"
    >
      <rect
        x="7"
        y="8"
        width="34"
        height="32"
        rx="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="7"
        y1="16"
        x2="41"
        y2="16"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="16"
        y1="16"
        x2="16"
        y2="40"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <line
        x1="24"
        y1="16"
        x2="24"
        y2="40"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <line
        x1="32"
        y1="16"
        x2="32"
        y2="40"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <line
        x1="7"
        y1="24"
        x2="41"
        y2="24"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <line
        x1="7"
        y1="32"
        x2="41"
        y2="32"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <rect x="18" y="27" width="12" height="4" rx="2" fill="currentColor" />
      <rect x="25" y="19" width="8" height="4" rx="2" fill="currentColor" />
    </svg>
  );
}

function IntegrationInformationGlyph() {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-label="문서 정보 아이콘"
      focusable="false"
    >
      <path
        d="M12 31L23 23L36 29L25 37Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M10 25L21 17L34 23L23 31Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8 19L19 11L32 17L21 25Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <line
        x1="20"
        y1="17"
        x2="27"
        y2="22"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <line
        x1="16.5"
        y1="19.5"
        x2="23.5"
        y2="24.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function CoreValuePlatformGlyph() {
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label="단일 플랫폼 아이콘">
      <rect
        x="44"
        y="43"
        width="32"
        height="34"
        rx="5"
        className="aconex-core-value-icon-stroke"
      />
      <line
        x1="44"
        y1="52"
        x2="76"
        y2="52"
        className="aconex-core-value-icon-stroke"
      />
      <line
        x1="44"
        y1="61"
        x2="76"
        y2="61"
        className="aconex-core-value-icon-stroke"
      />
      <line
        x1="44"
        y1="70"
        x2="76"
        y2="70"
        className="aconex-core-value-icon-stroke"
      />

      <circle cx="17" cy="20" r="8" className="aconex-core-value-icon-stroke" />
      <circle
        cx="103"
        cy="20"
        r="8"
        className="aconex-core-value-icon-stroke"
      />
      <circle
        cx="17"
        cy="100"
        r="8"
        className="aconex-core-value-icon-stroke"
      />
      <circle
        cx="103"
        cy="100"
        r="8"
        className="aconex-core-value-icon-stroke"
      />
      <circle cx="60" cy="16" r="6" className="aconex-core-value-icon-accent" />
      <circle
        cx="60"
        cy="104"
        r="6"
        className="aconex-core-value-icon-accent"
      />

      <path d="M25 24 L39 37" className="aconex-core-value-icon-stroke" />
      <path d="M95 24 L81 37" className="aconex-core-value-icon-stroke" />
      <path d="M25 96 L39 83" className="aconex-core-value-icon-stroke" />
      <path d="M95 96 L81 83" className="aconex-core-value-icon-stroke" />
      <path d="M60 23 L60 43" className="aconex-core-value-icon-accent-line" />
      <path d="M60 77 L60 97" className="aconex-core-value-icon-accent-line" />
    </svg>
  );
}

function CoreValueShieldGlyph() {
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label="리스크 감소 아이콘">
      <path
        d="M60 14 L91 26 V53 C91 78 74 96 60 104 C46 96 29 78 29 53 V26 Z"
        className="aconex-core-value-icon-stroke"
      />
      <path
        d="M60 26 L79 34 V52 C79 70 68 83 60 89 C52 83 41 70 41 52 V34 Z"
        className="aconex-core-value-icon-soft"
      />
      <path
        d="M50 60 L58 68 L73 50"
        className="aconex-core-value-icon-accent-line"
      />
    </svg>
  );
}

function CoreValueGlobalGlyph() {
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label="표준화 아이콘">
      <circle
        cx="49"
        cy="60"
        r="30"
        className="aconex-core-value-icon-stroke"
      />
      <ellipse
        cx="49"
        cy="60"
        rx="14"
        ry="30"
        className="aconex-core-value-icon-stroke"
      />
      <path d="M19 60 H79" className="aconex-core-value-icon-stroke" />
      <path d="M24 45 H74" className="aconex-core-value-icon-stroke" />
      <path d="M24 75 H74" className="aconex-core-value-icon-stroke" />

      <g transform="translate(84 62)">
        <circle r="13" className="aconex-core-value-icon-stroke" />
        <circle r="5.2" className="aconex-core-value-icon-stroke" />
        <rect
          x="-1.8"
          y="-21"
          width="3.6"
          height="7"
          rx="1.4"
          className="aconex-core-value-icon-accent"
        />
        <rect
          x="-1.8"
          y="14"
          width="3.6"
          height="7"
          rx="1.4"
          className="aconex-core-value-icon-accent"
        />
        <rect
          x="-21"
          y="-1.8"
          width="7"
          height="3.6"
          rx="1.4"
          className="aconex-core-value-icon-accent"
        />
        <rect
          x="14"
          y="-1.8"
          width="7"
          height="3.6"
          rx="1.4"
          className="aconex-core-value-icon-accent"
        />
        <rect
          x="-1.8"
          y="-21"
          width="3.6"
          height="7"
          rx="1.4"
          transform="rotate(45)"
          className="aconex-core-value-icon-accent"
        />
        <rect
          x="-1.8"
          y="-21"
          width="3.6"
          height="7"
          rx="1.4"
          transform="rotate(90)"
          className="aconex-core-value-icon-accent"
        />
        <rect
          x="-1.8"
          y="-21"
          width="3.6"
          height="7"
          rx="1.4"
          transform="rotate(135)"
          className="aconex-core-value-icon-accent"
        />
        <rect
          x="-1.8"
          y="-21"
          width="3.6"
          height="7"
          rx="1.4"
          transform="rotate(-45)"
          className="aconex-core-value-icon-accent"
        />
      </g>
    </svg>
  );
}

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
  const benefitsSectionRef2 = useRef(null);
  const benefitsSectionRef3 = useRef(null);

  const overviewCardsRef = useRef([]);
  const overviewCardsRef2 = useRef([]);
  const functionsImageCardRef = useRef(null);
  const functionsImageCardRef2 = useRef(null);
  const functionsCardsRef = useRef([]);
  const functionsCardsRef2 = useRef([]);
  const projectsCardsRef = useRef([]);
  const benefitsCardsRef2 = useRef([]);
  const benefitsCardsRef3 = useRef([]);

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
    if (sectionId === "benefits")
      targetId =
        subId === "3"
          ? "benefits-3"
          : subId === "2"
            ? "benefits-2"
            : "projects";

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
      if (index === 6) path = "/aconex/benefits/1";
      if (index === 7) path = "/aconex/benefits/2";
      if (index === 8) path = "/aconex/benefits/3";

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
    const footerSection = document.querySelector(".footer");
    const snapTargets = footerSection ? [...panels, footerSection] : panels;
    const lastPanelIndex = panels.length - 1;
    const lastSnapIndex = snapTargets.length - 1;

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

    if (footerSection) {
      ScrollTrigger.create({
        trigger: footerSection,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          currentSectionRef.current = lastSnapIndex;
          setActiveSection(lastPanelIndex);
          if (sections[lastPanelIndex]) {
            setActiveSectionId(sections[lastPanelIndex].id);
          }
        },
        onEnterBack: () => {
          currentSectionRef.current = lastSnapIndex;
          setActiveSection(lastPanelIndex);
          if (sections[lastPanelIndex]) {
            setActiveSectionId(sections[lastPanelIndex].id);
          }
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
      if (sections[boundedIndex]) {
        setActiveSectionId(sections[boundedIndex].id);
      }

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

    const handleWheel = (event) => {
      if (isAnimatingRef.current) {
        event.preventDefault();
        return;
      }

      const delta = event.deltaY;
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

      event.preventDefault();
      isAnimatingRef.current = true;
      snapToIndex(nextSection);
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
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (shouldHijackScroll) {
        window.removeEventListener("wheel", handleWheel);
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchend", handleTouchEnd);
      }
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
        const roleCompareItems = projectsCardsRef.current.filter(Boolean);
        if (!roleCompareItems.length) return;

        gsap.fromTo(
          roleCompareItems,
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

      if (benefitsSectionRef2.current) {
        const benefits2Items = benefitsCardsRef2.current.filter(Boolean);
        if (!benefits2Items.length) return;

        gsap.fromTo(
          benefits2Items,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.12,
            scrollTrigger: {
              trigger: benefitsSectionRef2.current,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      if (benefitsSectionRef3.current) {
        const benefits3Items = benefitsCardsRef3.current.filter(Boolean);
        if (!benefits3Items.length) return;

        gsap.fromTo(
          benefits3Items,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.12,
            scrollTrigger: {
              trigger: benefitsSectionRef3.current,
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
              backgroundImage: `linear-gradient(rgba(10, 10, 15, 0.6), rgba(10, 10, 15, 0.8)), url(${getAssetPath("/Aconex.png")})`,
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
                  Oracle Aconex
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
                    src={getAssetPath("/Information_Silos.png")}
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
          <div className="tm-methods-section aconex-role-compare-section">
            <div className="tm-methods-container aconex-role-compare-container">
              <div
                className="tm-section-header"
                ref={(element) => (projectsCardsRef.current[0] = element)}
              >
                <h2 className="tm-section-title">
                  Primavera와 Oracle Aconex 역할 비교
                </h2>
              </div>

              <div className="aconex-role-compare-grid">
                {roleCompareData.map((item, index) => (
                  <div
                    key={item.id}
                    className="tm-ppm-eppm-card aconex-role-compare-card"
                    ref={(element) =>
                      (projectsCardsRef.current[index + 1] = element)
                    }
                  >
                    <h3 className="aconex-role-compare-card-title">
                      {item.title}
                    </h3>

                    <div
                      className="aconex-role-compare-card-icon"
                      aria-hidden="true"
                    >
                      {item.id === "primavera" ? (
                        <PrimaveraScheduleIcon />
                      ) : (
                        <AconexRecordsIcon />
                      )}
                    </div>

                    <div className="aconex-role-compare-card-description">
                      <p>{item.summary[0]}</p>
                      <p>{item.summary[1]}</p>
                    </div>
                  </div>
                ))}

                <span
                  className="aconex-role-compare-divider"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          className="aconex-panel tm-panel"
          id="benefits-2"
          ref={benefitsSectionRef2}
        >
          <div className="tm-methods-section aconex-overview-shell aconex-benefits-integration-shell">
            <div className="tm-methods-container aconex-overview-frame aconex-benefits-integration-frame">
              <div
                className="tm-section-header"
                ref={(element) => (benefitsCardsRef2.current[0] = element)}
              >
                <h2 className="tm-section-title">
                  완벽한 프로젝트 관리를 위한 통합
                </h2>
              </div>

              <article
                className="tm-ppm-eppm-card aconex-benefits-integration-card"
                ref={(element) => (benefitsCardsRef2.current[1] = element)}
              >
                <div
                  className="aconex-benefits-integration-diagram"
                  role="img"
                  aria-label="Primavera와 Oracle Aconex 사이 일정 데이터와 진척 및 이슈가 양방향으로 연동되는 다이어그램"
                >
                  <article
                    className="aconex-benefits-node aconex-benefits-node-left"
                    aria-label="Primavera 일정 블록"
                  >
                    <span
                      className="aconex-benefits-node-icon"
                      aria-hidden="true"
                    >
                      <IntegrationScheduleGlyph />
                    </span>
                    <p className="aconex-benefits-node-title">
                      Primavera P6
                      <span>(Schedule)</span>
                    </p>
                  </article>

                  <div
                    className="aconex-benefits-mobile-connector"
                    aria-hidden="true"
                  >
                    <div className="aconex-benefits-mobile-connector-row is-down">
                      <span className="aconex-benefits-mobile-arrow" />
                      <p className="aconex-benefits-mobile-connector-copy">
                        일정 데이터
                        <span>(Schedule Data)</span>
                      </p>
                    </div>

                    <div className="aconex-benefits-mobile-connector-row is-up">
                      <span className="aconex-benefits-mobile-arrow" />
                      <p className="aconex-benefits-mobile-connector-copy">
                        진척 및 이슈
                        <span>(Progress &amp; Issues)</span>
                      </p>
                    </div>
                  </div>

                  <div className="aconex-benefits-sync-ring" aria-hidden="true">
                    <svg
                      className="aconex-benefits-sync-ring-svg"
                      viewBox="0 0 420 420"
                      role="presentation"
                    >
                      <defs>
                        <marker
                          id="aconex-benefits-sync-arrow"
                          markerWidth="9"
                          markerHeight="9"
                          refX="8"
                          refY="4.5"
                          orient="auto"
                        >
                          <path d="M1,1 L8,4.5 L1,8" />
                        </marker>
                      </defs>
                      <path
                        d="M84 124 A156 156 0 0 1 336 124"
                        markerEnd="url(#aconex-benefits-sync-arrow)"
                      />
                      <path
                        d="M336 296 A156 156 0 0 1 84 296"
                        markerEnd="url(#aconex-benefits-sync-arrow)"
                      />
                    </svg>
                    <p className="aconex-benefits-sync-label aconex-benefits-sync-label-top">
                      일정 데이터
                      <span>(Schedule Data)</span>
                    </p>
                    <p className="aconex-benefits-sync-label aconex-benefits-sync-label-bottom">
                      진척 및 이슈
                      <span>(Progress &amp; Issues)</span>
                    </p>
                  </div>

                  <article
                    className="aconex-benefits-node aconex-benefits-node-right"
                    aria-label="Oracle Aconex 정보 블록"
                  >
                    <span
                      className="aconex-benefits-node-icon"
                      aria-hidden="true"
                    >
                      <IntegrationInformationGlyph />
                    </span>
                    <p className="aconex-benefits-node-title">
                      Aconex
                      <span>(Information)</span>
                    </p>
                  </article>
                </div>

                <div
                  className="aconex-benefits-summary"
                  ref={(element) => (benefitsCardsRef2.current[2] = element)}
                >
                  <p className="aconex-benefits-summary-line">
                    <span className="aconex-benefits-summary-label">
                      상호 보완
                    </span>
                    : Primavera P6의 일정 통제 + Oracle Aconex의 프로세스/정보
                    통제
                  </p>
                  <p className="aconex-benefits-summary-line">
                    <span className="aconex-benefits-summary-label">결과</span>:
                    계획된 일정에 맞춰 분쟁 없이 프로젝트를 인도
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section
          className="aconex-panel tm-panel"
          id="benefits-3"
          ref={benefitsSectionRef3}
        >
          <div className="tm-methods-section aconex-overview-shell aconex-core-values-shell">
            <div className="tm-methods-container aconex-overview-frame aconex-core-values-frame">
              <div
                className="tm-section-header"
                ref={(element) => (benefitsCardsRef3.current[0] = element)}
              >
                <h2 className="tm-section-title">핵심 가치</h2>
              </div>

              <div className="aconex-core-values-grid">
                {coreValueItems.map((item, index) => (
                  <article
                    key={item.id}
                    className="tm-ppm-eppm-card aconex-core-value-card"
                    ref={(element) =>
                      (benefitsCardsRef3.current[index + 1] = element)
                    }
                  >
                    <div className="aconex-core-value-icon" aria-hidden="true">
                      {item.id === "single-platform" && (
                        <CoreValuePlatformGlyph />
                      )}
                      {item.id === "risk-reduction" && <CoreValueShieldGlyph />}
                      {item.id === "standardization" && (
                        <CoreValueGlobalGlyph />
                      )}
                    </div>

                    <h3 className="aconex-core-value-title">{item.title}</h3>

                    <p className="aconex-core-value-description">
                      {item.description.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </p>
                  </article>
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
