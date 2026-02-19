import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import SectionIndicator from "../components/SectionIndicator";
import EppmFunctionsSection from "../components/EppmFunctionsSection";
import { eppmFunctionsIntro } from "../data/functionsIntroData";
import { eppmMenuItems } from "../data/eppmMenuData";
import { getAssetPath } from "../utils/assetPath";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const sections = [
  { id: "hero", label: "EPPM" },
  { id: "menu", label: "메뉴" },
  { id: "integration", label: "통합 운영" },
  { id: "cpm-features", label: "CPM 공정표" },
  { id: "functions", label: "기능 소개" },
  { id: "functions-2", label: "기능 소개 2" },
  { id: "cases", label: "과정" },
  { id: "cases-2", label: "과정 2" },
  { id: "cases-3", label: "과정 3" },
  { id: "cases-4", label: "과정 4" },
  { id: "cases-5", label: "과정 5" },
];

// Feature items for Functions section (matched to PPM functions/1)
const {
  title: functionsTitle,
  items: functionItems,
  heroImages: functionHeroImages,
} = eppmFunctionsIntro;

// Feature items for Functions section 2 (separate content)
const functionItems2 = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M24 6 L36 10 V20 C36 28 30 34 24 38 C18 34 12 28 12 20 V10 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="rgba(99, 102, 241, 0.1)"
        />
        <path
          d="M20 22 L23 25 L28 20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: (
      <>
        코드 관리
        <br />
        <br />- WBS 코드, Activity 코드 설정
      </>
    ),
    image: getAssetPath("/Code_Management.png"),
    alt: "기능 소개 - 코드 관리",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="8"
          y="22"
          width="6"
          height="14"
          rx="1"
          stroke="currentColor"
          strokeWidth="2"
          fill="rgba(99, 102, 241, 0.1)"
        />
        <rect
          x="20"
          y="14"
          width="6"
          height="22"
          rx="1"
          stroke="currentColor"
          strokeWidth="2"
          fill="rgba(99, 102, 241, 0.1)"
        />
        <rect
          x="32"
          y="10"
          width="6"
          height="26"
          rx="1"
          stroke="currentColor"
          strokeWidth="2"
          fill="rgba(99, 102, 241, 0.1)"
        />
        <line
          x1="8"
          y1="38"
          x2="40"
          y2="38"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
    title: (
      <>
        보고 기능
        <br />- Gantt Chart 및<br />
        커스터마이징 뷰 제공
      </>
    ),
    image: getAssetPath("/Reporting.png"),
    alt: "기능 소개 - 보고 기능",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16 16 L10 24 L16 32"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32 16 L38 24 L32 32"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="22"
          y1="34"
          x2="26"
          y2="14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: (
      <>
        권한 관리
        <br />
        <br />- 사용자별 Role/Project Access 설정
      </>
    ),
    image: getAssetPath("/User_Management.png"),
    alt: "기능 소개 - 권한 관리",
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

const eppmCoreChallenges = [
  {
    title: "무엇부터 할지 우선순위 정하기",
    bullets: [
      "전략, 자본, 자원 제약 하에서 '무엇을 먼저 할지' 결정",
      "프로젝트들을 비용·일정·효과로 비교해서 결정",
    ],
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="14"
          y="34"
          width="8"
          height="22"
          rx="1.5"
          fill="currentColor"
        />
        <rect
          x="28"
          y="25"
          width="8"
          height="28"
          rx="1.5"
          fill="currentColor"
        />
        <rect
          x="42"
          y="17"
          width="8"
          height="34"
          rx="1.5"
          fill="currentColor"
        />
        <rect x="56" y="8" width="8" height="40" rx="1.5" fill="currentColor" />
        <path
          d="M12 60L68 50"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M40 55L32 70H48L40 55Z" fill="currentColor" opacity="0.9" />
        <path
          d="M12 58V16"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "통합 일정 관리 및 통제",
    bullets: [
      "대형 프로젝트의 WBS 및 Critical Path 관리",
      "계획과 실적을 계속 맞춰가는 관리",
    ],
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14 62V16H62"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="22"
          y="25"
          width="14"
          height="8"
          rx="1.5"
          fill="currentColor"
          opacity="0.95"
        />
        <rect
          x="34"
          y="38"
          width="14"
          height="8"
          rx="1.5"
          fill="currentColor"
          opacity="0.95"
        />
        <rect
          x="46"
          y="51"
          width="14"
          height="8"
          rx="1.5"
          fill="currentColor"
          opacity="0.95"
        />
        <path
          d="M36 31H44V39M48 44H56V52"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M44 39L38 39M56 52L50 52"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const processInsightCards = [
  {
    keyword: "계층",
    body: "포트폴리오 → 프로그램 → 프로젝트의 계층적 관리 구조",
  },
  {
    keyword: "제약",
    body: "자본 및 자원 제약 조건을 고려한 최적의 프로젝트 선별",
  },
  {
    keyword: "성과",
    body: "기업 전략에 부합하는 프로젝트 선정",
  },
];

const processStep2ComparisonCards = [
  {
    product: "P6 Web Application",
    description: (
      <>
        여러 역할(발주처/PM/팀원 등)이 쉽게 접속해서 현황을 보고
        <br />
        협업 · 업데이트하기 좋은 인터페이스
      </>
    ),
    imageSrc: getAssetPath("/P6_Web_Application.png"),
    imageAlt: "P6 Web Application 화면 예시",
  },
  {
    product: "Primavera P6 Professional",
    description: (
      <>
        일정을 깊게 만들고(복잡한 CPM/로직/자원/세부 설정),
        <br />
        경우에 따라 오프라인으로도 작업하는
        <br />
        '스케줄러 / 플래너' 중심 데스크톱 클라이언트
      </>
    ),
    imageSrc: getAssetPath("/P6_Professional_Schedule.png"),
    imageAlt: "Primavera P6 Professional 화면 예시",
  },
];

const processStep3FieldUpdateImage = getAssetPath(
  "/Connectivity_between_the_field_and_the_system.png",
);

const processStep3ConnectionBullets = [
  {
    label: "The Problem",
    body: "복잡한 입력 방식은 데이터 누락을 유발",
  },
  {
    label: "The Solution",
    body: "현장 실무 인력을 위한 '가벼운 입력' 지원",
  },
  {
    label: "Method",
    body: (
      <>
        단순 폼 및 모바일 인터페이스를 통해
        <br />
        본인 작업의 진척을 즉시 공유
      </>
    ),
  },
];

const processStep5SummaryItems = [
  {
    text: "계획 대비 실적(Progress)의 정밀한 추적",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="12"
          cy="12"
          r="8.5"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M8.5 12L10.8 14.3L15.6 9.6"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    text: "일정 변경이 전체 프로젝트에 미치는 영향 즉시 파악",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="12"
          cy="12"
          r="8.5"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M12 7.5V12L15.2 14.2"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    text: "표준화된 보고 체계를 통한 투명성 확보",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="7.4"
          y="4.8"
          width="9.2"
          height="14.4"
          rx="1.8"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M9.6 9.3H14.4M9.6 12H14.4M9.6 14.7H12.6"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

function EPPMPage() {
  const { sectionId, subId } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState(sections[0].id);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const containerRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const currentSectionRef = useRef(0);

  // Section refs
  const heroSectionRef = useRef(null);
  const menuSectionRef = useRef(null);
  const integrationSectionRef = useRef(null);
  const cpmFeaturesSectionRef = useRef(null);
  const functionsSectionRef = useRef(null);
  const functionsSectionRef2 = useRef(null);
  const casesSectionRef = useRef(null);

  // Animation refs
  const integrationImageCardRef = useRef(null);
  const integrationCardsRef = useRef([]);

  const cpmImageCardRef = useRef(null);
  const cpmFeatureCardsRef = useRef([]);

  const functionsImageCardRef = useRef(null);
  const functionsImageCardRef2 = useRef(null);
  const functionsCardsRef = useRef([]);
  const functionsCardsRef2 = useRef([]);
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
      setActiveSectionId(sectionId);

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
      if (sectionId === "functions") {
        targetId = subId === "2" ? "functions-2" : "functions";
      }
      if (sectionId === "solution") {
        targetId = "functions";
      }
      if (sectionId === "process") {
        if (subId === "5") targetId = "cases-5";
        else if (subId === "4") targetId = "cases-4";
        else if (subId === "3") targetId = "cases-3";
        else if (subId === "2") targetId = "cases-2";
        else targetId = "cases";
      }
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
      if (index === 4) path = "/eppm/functions/1";
      if (index === 5) path = "/eppm/functions/2";
      if (index === 6) path = "/eppm/process/1";
      if (index === 7) path = "/eppm/process/2";
      if (index === 8) path = "/eppm/process/3";
      if (index === 9) path = "/eppm/process/4";
      if (index === 10) path = "/eppm/process/5";

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
          if (sections[i]) setActiveSectionId(sections[i].id);
          updateUrlForSection(i);
        },
        onEnterBack: () => {
          currentSectionRef.current = i;
          setActiveSection(i);
          if (sections[i]) setActiveSectionId(sections[i].id);
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
      if (sections[boundedIndex]) setActiveSectionId(sections[boundedIndex].id);

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
      window.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
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
      const isMobileViewport = window.matchMedia("(max-width: 768px)").matches;
      const integrationCardOrder = isMobileViewport
        ? [0, 1, 2, 4, 3]
        : [0, 1, 2, 3, 4];

      integrationCardOrder.forEach((cardIndex, i) => {
        const card = integrationCardsRef.current[cardIndex];
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
              backgroundImage: `linear-gradient(rgba(10, 10, 15, 0.7), rgba(10, 10, 15, 0.9)), url(${getAssetPath("/EPPM.png")})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="tm-hero-content">
              <h1 className="eppm-hero-title tm-hero-title">
                Primavera P6
                <br />
                Enterprise Project
                <br />
                Portfolio Management
              </h1>
              <p className="tm-hero-subtitle">Primavera P6 EPPM</p>
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
                전사적 프로젝트 · 프로그램 · 포트폴리오를 통합적으로
                우선순위화하고,
                <br />
                계획 · 관리 · 실행 / 평가까지 지원하는 PPM 솔루션으로,
                <br />
                일정 · 자원 · 성과를 기반으로 의사결정을 돕습니다.
              </p>

              {/* Divider */}
              <div className="ppm-overview-divider"></div>

              {/* Sub-menu Cards (PPM Style) */}
              <div className="ppm-submenu-grid">
                {eppmMenuItems.map((item) => (
                  <button
                    key={item.id}
                    className="ppm-submenu-card"
                    onClick={() => navigate(item.path)}
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
              <h2 className="cpm-section-title">계획과 현실의 차이</h2>
            </div>

            <div
              className="eppm-overview-gap-frame"
              ref={integrationImageCardRef}
            >
              <div className="eppm-overview-gap-visuals">
                <div
                  className="eppm-overview-gap-visual-column"
                  ref={(el) => (integrationCardsRef.current[0] = el)}
                >
                  <div
                    className="eppm-overview-gap-visual-card is-simple"
                    role="img"
                    aria-label="회의와 의사결정을 상징하는 아이콘"
                  >
                    <svg
                      className="eppm-simple-decision-icon"
                      viewBox="0 0 240 240"
                      fill="currentColor"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <circle cx="120" cy="38" r="14" />
                      <rect x="92" y="58" width="56" height="34" rx="6" />
                      <polygon points="72,112 168,112 186,182 54,182" />
                      <rect x="98" y="182" width="44" height="44" rx="3" />
                      <path d="M34 98H58V132H34V98Z" />
                      <path d="M20 132H58V150H20V132Z" />
                      <path d="M182 98H206V132H182V98Z" />
                      <path d="M182 132H220V150H182V132Z" />
                    </svg>
                  </div>
                </div>
                <div className="eppm-overview-gap-divider" aria-hidden="true" />
                <div
                  className="eppm-overview-gap-visual-column"
                  ref={(el) => (integrationCardsRef.current[1] = el)}
                >
                  <div
                    className="eppm-overview-gap-visual-card is-complex"
                    role="img"
                    aria-label="복잡한 실행 현장 네트워크 다이어그램"
                  >
                    <svg
                      className="eppm-complex-network-svg"
                      viewBox="0 0 640 360"
                      fill="none"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <g stroke="currentColor" strokeWidth="2" opacity="0.46">
                        <path d="M44 300L118 230L186 244L252 178L328 198L404 132L486 146L578 96" />
                        <path d="M70 78L154 122L210 90L278 132L346 102L420 146L510 126L594 172" />
                        <path d="M92 300L136 184L208 208L260 122L332 142L396 88L472 104L548 58" />
                        <path d="M44 222L130 206L186 256L250 230L326 266L390 240L458 278L536 236" />
                        <path d="M136 44L188 98L250 68L318 102L396 78L468 112L530 84" />
                        <path d="M238 300L286 250L338 278L408 212L474 236L534 194L586 212" />
                      </g>

                      <g stroke="currentColor" strokeWidth="1.4" opacity="0.5">
                        <rect x="152" y="160" width="64" height="44" rx="4" />
                        <rect x="236" y="206" width="74" height="50" rx="4" />
                        <rect x="328" y="86" width="70" height="48" rx="4" />
                        <rect x="424" y="152" width="76" height="54" rx="4" />
                        <rect x="492" y="214" width="58" height="40" rx="4" />
                        <rect x="94" y="98" width="58" height="36" rx="4" />
                        <path d="M184 182H236M310 232H424M364 134V206M500 178H548M122 134V176" />
                      </g>

                      <g fill="currentColor" opacity="0.78">
                        <circle cx="44" cy="300" r="3.8" />
                        <circle cx="118" cy="230" r="3.2" />
                        <circle cx="186" cy="244" r="3.5" />
                        <circle cx="252" cy="178" r="3.2" />
                        <circle cx="328" cy="198" r="3.6" />
                        <circle cx="404" cy="132" r="3.2" />
                        <circle cx="486" cy="146" r="3.6" />
                        <circle cx="578" cy="96" r="4" />
                        <circle cx="70" cy="78" r="3.2" />
                        <circle cx="154" cy="122" r="3.5" />
                        <circle cx="210" cy="90" r="3.2" />
                        <circle cx="278" cy="132" r="3.2" />
                        <circle cx="346" cy="102" r="3.2" />
                        <circle cx="420" cy="146" r="3.5" />
                        <circle cx="510" cy="126" r="3.7" />
                        <circle cx="594" cy="172" r="4" />
                        <circle cx="548" cy="236" r="3.6" />
                        <circle cx="458" cy="278" r="3.4" />
                        <circle cx="390" cy="240" r="3.2" />
                        <circle cx="326" cy="266" r="3.4" />
                        <circle cx="250" cy="230" r="3.2" />
                        <circle cx="136" cy="184" r="3.4" />
                        <circle cx="260" cy="122" r="3.2" />
                        <circle cx="396" cy="88" r="3.4" />
                        <circle cx="548" cy="58" r="3.8" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="eppm-overview-gap-bottom">
                <article
                  className="eppm-overview-gap-text-block"
                  ref={(el) => (integrationCardsRef.current[2] = el)}
                >
                  <h4>문제</h4>
                  <p>
                    대규모 건설, 플랜트, 엔지니어링
                    <br />
                    프로젝트의 복잡성 증가
                  </p>
                </article>

                <div
                  className="eppm-overview-gap-conclusion"
                  ref={(el) => (integrationCardsRef.current[3] = el)}
                >
                  <p>
                    전체 현황을 한눈에 <br />
                    보는 화면이 필요
                  </p>
                </div>

                <article
                  className="eppm-overview-gap-text-block"
                  ref={(el) => (integrationCardsRef.current[4] = el)}
                >
                  <h4>단절</h4>
                  <p>
                    위(투자)와 아래(WBS 실행)
                    <br />
                    데이터 불일치
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Core Challenges Section */}
        <section
          className="eppm-panel tm-panel cpm-features-section"
          id="cpm-features"
          ref={cpmFeaturesSectionRef}
        >
          <div className="cpm-features-container">
            <div className="cpm-section-header">
              <h2 className="cpm-section-title">
                Primavera P6 EPPM이 해결하는 2가지 핵심 과제
              </h2>
            </div>

            <div className="eppm-overview-core-grid" ref={cpmImageCardRef}>
              {eppmCoreChallenges.map((item, index) => (
                <article
                  key={item.title}
                  className="eppm-overview-core-card"
                  ref={(el) => (cpmFeatureCardsRef.current[index] = el)}
                >
                  <div className="eppm-overview-core-icon" aria-hidden="true">
                    {item.icon}
                  </div>
                  <h3 className="eppm-overview-core-title">{item.title}</h3>
                  <ul className="eppm-overview-core-list">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
        {/* 5. Functions Section */}
        <EppmFunctionsSection
          sectionId="functions"
          title={functionsTitle}
          items={functionItems}
          heroImages={functionHeroImages}
          sectionRef={functionsSectionRef}
          imageCardRef={functionsImageCardRef}
          cardRefs={functionsCardsRef}
          prefersReducedMotion={prefersReducedMotion}
          isActive={activeSectionId === "functions"}
        />

        {/* 5-2. Functions Section */}
        <EppmFunctionsSection
          sectionId="functions-2"
          title="기능 소개"
          items={functionItems2}
          sectionRef={functionsSectionRef2}
          imageCardRef={functionsImageCardRef2}
          cardRefs={functionsCardsRef2}
          prefersReducedMotion={prefersReducedMotion}
          isActive={activeSectionId === "functions-2"}
        />

        {/* 6. Process Section 1 */}
        <section className="eppm-panel tm-panel" id="cases">
          <div className="tm-advantages-section eppm-process-section eppm-process-focus-section">
            <div className="tm-advantages-container eppm-process-container eppm-process-focus-container">
              <div className="eppm-process-focus-layout">
                <div className="tm-section-header eppm-process-focus-header">
                  <h2 className="tm-section-title">
                    단일 플랫폼(P6), 완전한 통제
                  </h2>
                  <p className="eppm-process-focus-subtitle">
                    프로젝트·프로그램·포트폴리오를 '우선순위 – 계획 – 실행 –
                    성과'로 한 번에 관리하는 솔루션
                  </p>
                </div>

                <div className="eppm-process-focus-visual">
                  <svg
                    className="eppm-process-focus-svg"
                    viewBox="0 0 640 640"
                    role="img"
                    aria-label="P6 통합 관리 허브 다이어그램"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>P6 통합 관리 허브 다이어그램</title>
                    <defs>
                      <linearGradient
                        id="eppmHubRingGradient"
                        x1="120"
                        y1="120"
                        x2="520"
                        y2="520"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop
                          offset="0%"
                          stopColor="#9ad4ff"
                          stopOpacity="0.9"
                        />
                        <stop
                          offset="55%"
                          stopColor="#4cb9ff"
                          stopOpacity="0.8"
                        />
                        <stop
                          offset="100%"
                          stopColor="#1a84d6"
                          stopOpacity="0.9"
                        />
                      </linearGradient>
                      <radialGradient
                        id="eppmHubCoreGradient"
                        cx="0.5"
                        cy="0.5"
                        r="0.62"
                      >
                        <stop
                          offset="0%"
                          stopColor="#1c5c93"
                          stopOpacity="0.9"
                        />
                        <stop
                          offset="100%"
                          stopColor="#0b1627"
                          stopOpacity="0.95"
                        />
                      </radialGradient>
                      <radialGradient
                        id="eppmHubAuraGradient"
                        cx="0.5"
                        cy="0.5"
                        r="0.7"
                      >
                        <stop
                          offset="0%"
                          stopColor="#29c3ff"
                          stopOpacity="0.2"
                        />
                        <stop
                          offset="100%"
                          stopColor="#29c3ff"
                          stopOpacity="0"
                        />
                      </radialGradient>
                      <pattern
                        id="eppmHubBlueprintPattern"
                        width="22"
                        height="22"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M22 0H0V22"
                          fill="none"
                          stroke="rgba(140, 206, 255, 0.32)"
                          strokeWidth="0.8"
                        />
                      </pattern>
                    </defs>

                    <circle
                      cx="320"
                      cy="320"
                      r="272"
                      fill="url(#eppmHubAuraGradient)"
                    />
                    <circle
                      cx="320"
                      cy="320"
                      r="258"
                      fill="url(#eppmHubBlueprintPattern)"
                      opacity="0.26"
                    />
                    <circle
                      cx="320"
                      cy="320"
                      r="244"
                      fill="none"
                      stroke="rgba(117, 195, 255, 0.2)"
                      strokeWidth="1.6"
                    />

                    <path
                      className="eppm-process-focus-ring-segment"
                      d="M201.8 151.3 A206 206 0 0 1 438.2 151.3"
                    />
                    <path
                      className="eppm-process-focus-ring-segment"
                      d="M488.7 201.8 A206 206 0 0 1 488.7 438.2"
                    />
                    <path
                      className="eppm-process-focus-ring-segment"
                      d="M438.2 488.7 A206 206 0 0 1 201.8 488.7"
                    />
                    <path
                      className="eppm-process-focus-ring-segment"
                      d="M151.3 438.2 A206 206 0 0 1 151.3 201.8"
                    />

                    <path
                      className="eppm-process-focus-inner-segment"
                      d="M228.2 189.0 A160 160 0 0 1 411.8 189.0"
                    />
                    <path
                      className="eppm-process-focus-inner-segment"
                      d="M451.0 228.2 A160 160 0 0 1 451.0 411.8"
                    />
                    <path
                      className="eppm-process-focus-inner-segment"
                      d="M411.8 451.0 A160 160 0 0 1 228.2 451.0"
                    />
                    <path
                      className="eppm-process-focus-inner-segment"
                      d="M189.0 411.8 A160 160 0 0 1 189.0 228.2"
                    />

                    <line
                      className="eppm-process-focus-connector"
                      x1="320"
                      y1="320"
                      x2="320"
                      y2="162"
                    />
                    <line
                      className="eppm-process-focus-connector"
                      x1="320"
                      y1="320"
                      x2="478"
                      y2="320"
                    />
                    <line
                      className="eppm-process-focus-connector"
                      x1="320"
                      y1="320"
                      x2="320"
                      y2="478"
                    />
                    <line
                      className="eppm-process-focus-connector"
                      x1="320"
                      y1="320"
                      x2="162"
                      y2="320"
                    />

                    <circle
                      cx="320"
                      cy="320"
                      r="120"
                      className="eppm-process-focus-core-outer"
                    />
                    <circle
                      cx="320"
                      cy="320"
                      r="90"
                      className="eppm-process-focus-core-inner"
                    />

                    <ellipse
                      cx="320"
                      cy="292"
                      rx="28"
                      ry="10"
                      className="eppm-process-focus-db-line"
                    />
                    <path
                      d="M292 292V332C292 337.5 304.5 342 320 342C335.5 342 348 337.5 348 332V292"
                      className="eppm-process-focus-db-line"
                    />
                    <path
                      d="M292 307C292 312.5 304.5 317 320 317C335.5 317 348 312.5 348 307"
                      className="eppm-process-focus-db-line"
                    />
                    <path
                      d="M292 322C292 327.5 304.5 332 320 332C335.5 332 348 327.5 348 322"
                      className="eppm-process-focus-db-line"
                    />
                    <text
                      x="322"
                      y="390"
                      textAnchor="middle"
                      className="eppm-process-focus-core-text"
                    >
                      P6
                    </text>

                    <text
                      x="320"
                      y="154"
                      textAnchor="middle"
                      className="eppm-process-focus-label"
                    >
                      우선순위 결정
                    </text>
                    <text
                      x="498"
                      y="304"
                      textAnchor="middle"
                      className="eppm-process-focus-label"
                    >
                      <tspan x="498" dy="0">
                        계획 및
                      </tspan>
                      <tspan x="498" dy="36">
                        일정 수립
                      </tspan>
                    </text>
                    <text
                      x="320"
                      y="514"
                      textAnchor="middle"
                      className="eppm-process-focus-label"
                    >
                      실행 통제
                    </text>
                    <text
                      x="142"
                      y="304"
                      textAnchor="middle"
                      className="eppm-process-focus-label"
                    >
                      <tspan x="142" dy="0">
                        성과
                      </tspan>
                      <tspan x="142" dy="36">
                        분석
                      </tspan>
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Process Section 2 */}
        <section
          className="eppm-panel tm-panel"
          id="cases-2"
          ref={casesSectionRef}
        >
          <div className="tm-advantages-section eppm-process-section">
            <div className="tm-advantages-container eppm-process-container">
              <div className="tm-section-header">
                <h2 className="tm-section-title">
                  1단계: 우선순위 결정 및 투자 최적화
                </h2>
              </div>

              <div className="eppm-process-shell">
                {/* <div className="eppm-process-badge" aria-hidden="true">
                  <svg
                    className="eppm-process-badge-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4L4 8L12 12L20 8L12 4Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 12L12 16L20 12"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 16L12 20L20 16"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div> */}

                <div className="eppm-process-grid">
                  <article
                    className="eppm-process-visual-card tm-ppm-eppm-card"
                    ref={(el) => (casesCardsRef.current[0] = el)}
                  >
                    <div className="eppm-process-visual-media">
                      <img
                        src={encodeURI(
                          getAssetPath(
                            "/Priority_Setting_and_Investment_Optimization.png",
                          ),
                        )}
                        alt="1단계 우선순위 결정 및 투자 최적화"
                      />
                    </div>
                  </article>

                  <div className="eppm-process-info-stack">
                    {processInsightCards.map((item, index) => (
                      <article
                        key={item.keyword}
                        className="eppm-process-info-card tm-ppm-eppm-card"
                        ref={(el) => (casesCardsRef.current[index + 1] = el)}
                      >
                        <h3 className="eppm-process-info-label">
                          {item.keyword}
                        </h3>
                        <p className="eppm-process-info-body">{item.body}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Process Section 3 */}
        <section className="eppm-panel tm-panel" id="cases-3">
          <div className="tm-advantages-section eppm-process-section">
            <div className="tm-advantages-container eppm-process-container">
              <div className="eppm-process-shell eppm-process-step3-shell">
                <div className="tm-section-header eppm-process-step3-header">
                  <h2 className="tm-section-title">
                    2단계: 정교한 계획 및 일정 수립
                  </h2>
                  <p className="eppm-process-step3-subtitle">
                    사용자 역할에 따른 맞춤형 인터페이스
                  </p>
                </div>

                {/* <div className="eppm-process-badge eppm-process-step3-badge">
                  STEP 2
                </div> */}

                <div className="eppm-process-step3-grid">
                  {processStep2ComparisonCards.map((item) => (
                    <article
                      key={item.product}
                      className="eppm-process-step3-card tm-ppm-eppm-card"
                    >
                      <div className="eppm-process-step3-media">
                        <img
                          src={item.imageSrc}
                          alt={item.imageAlt}
                          loading="lazy"
                          onLoad={(event) => {
                            delete event.currentTarget.dataset.error;
                          }}
                          onError={(event) => {
                            event.currentTarget.dataset.error = "true";
                          }}
                        />
                        <div
                          className="eppm-process-step3-media-placeholder"
                          aria-hidden="true"
                        >
                          Product Screenshot
                        </div>
                      </div>
                      <h3 className="eppm-process-step3-product">
                        {item.product}
                      </h3>
                      <p className="eppm-process-step3-description">
                        {item.description}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Process Section 4 */}
        <section className="eppm-panel tm-panel" id="cases-4">
          <div className="tm-advantages-section eppm-process-section">
            <div className="tm-advantages-container eppm-process-container">
              <div className="eppm-process-shell eppm-process-step4-shell">
                <div className="tm-section-header eppm-process-step4-header">
                  <h2 className="tm-section-title">
                    3단계: 현장과 시스템의 연결
                  </h2>
                </div>

                {/* <div
                  className="eppm-process-badge eppm-process-step4-badge"
                  aria-hidden="true"
                >
                  <svg
                    className="eppm-process-badge-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4L4 8L12 12L20 8L12 4Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 12L12 16L20 12"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 16L12 20L20 16"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div> */}

                <div className="eppm-process-step4-grid">
                  <article className="eppm-process-step4-frame eppm-process-step4-visual-frame tm-ppm-eppm-card">
                    <div className="eppm-process-step4-media">
                      <img
                        src={processStep3FieldUpdateImage}
                        alt="현장 팀원이 모바일 화면으로 작업 진척을 업데이트하는 예시"
                        loading="lazy"
                        onLoad={(event) => {
                          delete event.currentTarget.dataset.error;
                        }}
                        onError={(event) => {
                          event.currentTarget.dataset.error = "true";
                        }}
                      />
                      <div
                        className="eppm-process-step4-media-placeholder"
                        aria-hidden="true"
                      >
                        Field Update Visual
                      </div>
                    </div>
                  </article>

                  <article className="eppm-process-step4-frame eppm-process-step4-text-frame tm-ppm-eppm-card">
                    <ul className="eppm-process-step4-bullet-list">
                      {processStep3ConnectionBullets.map((item) => (
                        <li
                          key={item.label}
                          className="eppm-process-step4-bullet-item"
                        >
                          <span
                            className="eppm-process-step4-bullet-dot"
                            aria-hidden="true"
                          >
                            •
                          </span>
                          <p className="eppm-process-step4-bullet-text">
                            <strong className="eppm-process-step4-bullet-label">
                              {item.label}:
                            </strong>
                            <span className="eppm-process-step4-bullet-body">
                              {item.body}
                            </span>
                          </p>
                        </li>
                      ))}
                    </ul>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Process Section 5 */}
        <section className="eppm-panel tm-panel" id="cases-5">
          <div className="tm-advantages-section eppm-process-section">
            <div className="tm-advantages-container eppm-process-container">
              <div className="eppm-process-shell eppm-process-step5-shell">
                <div className="tm-section-header eppm-process-step5-header">
                  <h2 className="tm-section-title">
                    4단계: 계획 대비 실적 추적
                  </h2>
                </div>

                <article className="eppm-process-step5-panel tm-ppm-eppm-card">
                  {/* <div className="eppm-process-step5-badge" aria-hidden="true">
                    <span className="eppm-process-step5-badge-icon-wrap">
                      <svg
                        className="eppm-process-step5-badge-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="7.8"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />
                        <path
                          d="M12 8.2V12.2L14.8 14.2"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="eppm-process-step5-badge-text">
                      STEP 4
                    </span>
                  </div> */}

                  <div className="eppm-process-step5-layout">
                    <div
                      className="eppm-process-step5-chart-card"
                      role="img"
                      aria-label="Baseline Plan과 Actual Progress의 추이를 비교한 차트"
                    >
                      <svg
                        className="eppm-process-step5-chart-svg"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <linearGradient
                            id="eppmStep5ActualGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop
                              offset="0%"
                              stopColor="rgba(255, 165, 94, 0.9)"
                            />
                            <stop
                              offset="100%"
                              stopColor="rgba(255, 112, 48, 1)"
                            />
                          </linearGradient>
                          <marker
                            id="eppmStep5BaselineArrow"
                            markerWidth="4"
                            markerHeight="4"
                            refX="3.4"
                            refY="2"
                            orient="auto"
                          >
                            <path
                              d="M0 0L4 2L0 4Z"
                              fill="rgba(226, 243, 255, 0.9)"
                            />
                          </marker>
                          <filter
                            id="eppmStep5ActualGlow"
                            x="-20%"
                            y="-20%"
                            width="140%"
                            height="140%"
                          >
                            <feGaussianBlur stdDeviation="1.2" result="blur" />
                            <feMerge>
                              <feMergeNode in="blur" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>

                        <path
                          className="eppm-process-step5-baseline"
                          d="M8 88C36 69 66 42 95 13"
                          markerEnd="url(#eppmStep5BaselineArrow)"
                        />
                        <path
                          className="eppm-process-step5-actual"
                          d="M8 88C20 82 30 74 38 57C45 41 53 42 60 56C68 72 77 66 88 30C92 20 95 16 97 14"
                        />
                      </svg>
                      <span className="eppm-process-step5-chart-label eppm-process-step5-chart-label--baseline">
                        Baseline Plan
                      </span>
                      <span className="eppm-process-step5-chart-label eppm-process-step5-chart-label--actual">
                        Actual Progress
                      </span>
                    </div>

                    <ul className="eppm-process-step5-summary-list">
                      {processStep5SummaryItems.map((item) => (
                        <li
                          key={item.text}
                          className="eppm-process-step5-summary-item"
                        >
                          <span
                            className="eppm-process-step5-summary-icon"
                            aria-hidden="true"
                          >
                            {item.icon}
                          </span>
                          <p className="eppm-process-step5-summary-text">
                            {item.text}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
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
