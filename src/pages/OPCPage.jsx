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
  { id: "functions", label: "기능 소개" },
  { id: "functions-2", label: "기능 소개 2" },
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
    id: "functions",
    title: "기능 소개",
    description: "일정, 리스크, 포트폴리오, Lean 관리",
    image:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "#functions",
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

// Function Intro Data (mirrors PPM functions/1)
const functionItems1 = [
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
    title: <>일정 관리</>,
    image: "/일정 관리(Schedule  CPM).png",
    alt: "기능 소개 - 일정 관리",
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
    title: <>리스크 관리</>,
    image: "/리스크 관리(Risk 정성 + 정량, Monte Carlo).png",
    alt: "기능 소개 - 리스크 관리",
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
    title: (
      <>
        포트폴리오와 <br /> 자본 · 예산 계획
      </>
    ),
    image: "/포트폴리오자본·예산 계획(Portfolio & Capital Planning).png",
    alt: "기능 소개 - 포트폴리오와 자본 · 예산 계획",
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
    title: <>대시보드 & 분석</>,
    image: "/대시보드 & 분석(Ops Dashboard  Primavera Analytics).png",
    alt: "기능 소개 - 대시보드 & 분석",
  },
];

// Function Intro Data 2 (placeholder)
const functionItems2 = [
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
    title: <>워크플로우 & 폼</>,
    image: "/워크플로우 & 폼(Workflow  Forms).png",
    alt: "기능 소개 - 워크플로우 & 폼",
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
    title: <>작업 관리</>,
    image: "/작업관리(Task Management Lean 보드핸드오프제약).png",
    alt: "기능 소개 - 작업 관리",
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
    title: <>타임시트</>,
    image: "/타임시트(Timesheets).png",
    alt: "기능 소개 - 타임시트",
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
    title: <>범위 관리</>,
    image:
      "/범위 관리(Scope Management Scope Items  Work Packages  Assignments).png",
    alt: "기능 소개 - 범위 관리",
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
  const { sectionId, subId } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState(sections[0].id);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const [hoveredCardIndex2, setHoveredCardIndex2] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSlide2, setActiveSlide2] = useState(0);

  const containerRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const currentSectionRef = useRef(0);

  // Section refs
  const heroSectionRef = useRef(null);
  const menuSectionRef = useRef(null);
  const overviewSectionRef = useRef(null);
  const functionsSectionRef = useRef(null);
  const functionsSectionRef2 = useRef(null);
  const applicationSectionRef = useRef(null);

  // Animation refs
  const overviewCardsRef = useRef([]);
  const imageCardRef = useRef(null);
  const featureCardsRef = useRef([]);
  const imageCardRef2 = useRef(null);
  const featureCardsRef2 = useRef([]);
  const applicationCardsRef = useRef([]);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Auto-play carousel only when in Functions section
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (activeSectionId !== "functions") return;

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % functionItems1.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, activeSectionId]);

  // Auto-play carousel only when in Functions section 2
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (activeSectionId !== "functions-2") return;

    const interval = setInterval(() => {
      setActiveSlide2((prev) => (prev + 1) % functionItems2.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, activeSectionId]);

  // Navigate to section
  const scrollToSection = useCallback(
    (sectionId) => {
      const sectionIndex = sections.findIndex((s) => s.id === sectionId);
      if (sectionIndex === -1) return;

      const panels = gsap.utils.toArray(".opc-panel");
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
    if (!sectionId) return;

    // The user requested /opc/overview, /opc/functions/1, /opc/functions/2, /opc/application
    // Our IDs are: overview-content, functions, functions-2, application
    let targetId = sectionId;
    let isFunctionsSectionNumber = false;
    if (sectionId === "overview") targetId = "overview-content";
    if (sectionId === "functions") {
      isFunctionsSectionNumber = subId === "1" || subId === "2";
      targetId = subId === "2" ? "functions-2" : "functions";
    }

    if (subId && sectionId !== "overview" && !isFunctionsSectionNumber) {
      const slideIndex = parseInt(subId, 10) - 1;
      if (!isNaN(slideIndex) && slideIndex >= 0) {
        if (targetId === "functions") setActiveSlide(slideIndex);
        if (targetId === "functions-2") setActiveSlide2(slideIndex);
      }
    }

    const foundIndex = sections.findIndex((s) => s.id === targetId);

    if (foundIndex !== -1 && foundIndex !== currentSectionRef.current) {
      setTimeout(() => {
        scrollToSection(targetId);
      }, 100);
    }
  }, [sectionId, subId, scrollToSection]);

  // Update URL based on section
  const updateUrlForSection = useCallback(
    (index) => {
      let path = "/opc";
      // index 0(Hero), 1(Menu) -> /opc
      if (index === 2) path = "/opc/overview/1";
      if (index === 3) path = "/opc/functions/1";
      if (index === 4) path = "/opc/functions/2";
      if (index === 5) path = "/opc/application";

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
          setActiveSectionId(sections[i].id);
          updateUrlForSection(i);
        },
        onEnterBack: () => {
          currentSectionRef.current = i;
          setActiveSection(i);
          setActiveSectionId(sections[i].id);
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

      // Functions Intro
      if (functionsSectionRef.current) {
        const featuresTl = gsap.timeline({
          scrollTrigger: {
            trigger: functionsSectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        });

        const functionsTitle =
          functionsSectionRef.current.querySelector(".ppm-cpm-title");

        if (functionsTitle) {
          featuresTl.fromTo(
            functionsTitle,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5 },
          );
        }

        if (imageCardRef.current) {
          featuresTl.fromTo(
            imageCardRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "bounce.out" },
            "-=0.2",
          );
        }

        const cards = featureCardsRef.current;
        if (cards[0]) {
          featuresTl.fromTo(
            cards[0],
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5 },
            "-=0.5",
          );
        }
        if (cards[1]) {
          featuresTl.fromTo(
            cards[1],
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 },
            "-=0.3",
          );
        }
        if (cards[2]) {
          featuresTl.fromTo(
            cards[2],
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 },
            "-=0.3",
          );
        }
        if (cards[3]) {
          featuresTl.fromTo(
            cards[3],
            { x: 50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5 },
            "-=0.3",
          );
        }
      }

      // Functions Intro 2
      if (functionsSectionRef2.current) {
        const featuresTl2 = gsap.timeline({
          scrollTrigger: {
            trigger: functionsSectionRef2.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        });

        const functionsTitle2 =
          functionsSectionRef2.current.querySelector(".ppm-cpm-title");

        if (functionsTitle2) {
          featuresTl2.fromTo(
            functionsTitle2,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5 },
          );
        }

        if (imageCardRef2.current) {
          featuresTl2.fromTo(
            imageCardRef2.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "bounce.out" },
            "-=0.2",
          );
        }

        const cards2 = featureCardsRef2.current;
        if (cards2[0]) {
          featuresTl2.fromTo(
            cards2[0],
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5 },
            "-=0.5",
          );
        }
        if (cards2[1]) {
          featuresTl2.fromTo(
            cards2[1],
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 },
            "-=0.3",
          );
        }
        if (cards2[2]) {
          featuresTl2.fromTo(
            cards2[2],
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 },
            "-=0.3",
          );
        }
        if (cards2[3]) {
          featuresTl2.fromTo(
            cards2[3],
            { x: 50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5 },
            "-=0.3",
          );
        }
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
                Oracle Cloud 기반의 프로젝트 / 포트폴리오 관리(프로젝트 컨트롤)
                솔루션으로,
                <br />
                일정 · 리소스 · 리스크 등 핵심 관리 기능을 통합해 사무실과 현장
                팀이 협업하며 프로젝트를 관리할 수 있도록 지원합니다.
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

        {/* 4. Functions Intro Section */}
        <section
          className="opc-panel ppm-panel ppm-cpm-section"
          id="functions"
          ref={functionsSectionRef}
        >
          <div className="ppm-cpm-container">
            <div className="ppm-cpm-header">
              <h2 className="ppm-cpm-title">기능 소개</h2>
            </div>

            <div className="ppm-functions-layout">
              {/* Carousel Image Card */}
              <div className="ppm-functions-media">
                <div className="cpm-carousel-container" ref={imageCardRef}>
                  <div className="cpm-carousel-wrapper">
                    {functionItems1.map((item, index) => (
                      <div
                        key={index}
                        className={`cpm-carousel-slide ${index === activeSlide ? "active" : ""}`}
                        style={{
                          transform: `translateX(-${activeSlide * 100}%)`,
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.alt}
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.parentElement.innerHTML =
                              '<div class="cpm-image-placeholder">OPC Screenshot</div>';
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Carousel Navigation Dots */}
                  <div className="cpm-carousel-dots">
                    {functionItems1.map((_, index) => (
                      <button
                        key={index}
                        className={`cpm-carousel-dot ${index === activeSlide ? "active" : ""}`}
                        onClick={() => setActiveSlide(index)}
                        aria-label={`슬라이드 ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Feature Cards */}
              <div className="ppm-functions-cards">
                <div
                  className="cpm-feature-cards"
                  onMouseLeave={() => setHoveredCardIndex(null)}
                >
                  {functionItems1.map((item, index) => (
                    <button
                      key={index}
                      className={`cpm-feature-card ${hoveredCardIndex !== null && hoveredCardIndex !== index ? "dimmed" : ""} ${index === activeSlide ? "active" : ""}`}
                      ref={(el) => (featureCardsRef.current[index] = el)}
                      onClick={() => setActiveSlide(index)}
                      onMouseEnter={() => setHoveredCardIndex(index)}
                    >
                      <div className="cpm-feature-icon">{item.icon}</div>
                      <h4 className="cpm-feature-title">{item.title}</h4>

                      {index < functionItems1.length - 1 && (
                        <div className="cpm-feature-divider-line" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Functions Intro Section 2 */}
        <section
          className="opc-panel ppm-panel ppm-cpm-section"
          id="functions-2"
          ref={functionsSectionRef2}
        >
          <div className="ppm-cpm-container">
            <div className="ppm-cpm-header">
              <h2 className="ppm-cpm-title">기능 소개</h2>
            </div>

            <div className="ppm-functions-layout">
              {/* Carousel Image Card */}
              <div
                className="ppm-functions-media"
                style={{ marginTop: "-12px" }}
              >
                <div className="cpm-carousel-container" ref={imageCardRef2}>
                  <div className="cpm-carousel-wrapper">
                    {functionItems2.map((item, index) => (
                      <div
                        key={index}
                        className={`cpm-carousel-slide ${index === activeSlide2 ? "active" : ""}`}
                        style={{
                          transform: `translateX(-${activeSlide2 * 100}%)`,
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.alt}
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.parentElement.innerHTML =
                              '<div class="cpm-image-placeholder">OPC Screenshot</div>';
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Carousel Navigation Dots */}
                  <div className="cpm-carousel-dots">
                    {functionItems2.map((_, index) => (
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

              {/* Feature Cards */}
              <div className="ppm-functions-cards">
                <div
                  className="cpm-feature-cards"
                  onMouseLeave={() => setHoveredCardIndex2(null)}
                >
                  {functionItems2.map((item, index) => (
                    <button
                      key={index}
                      className={`cpm-feature-card ${hoveredCardIndex2 !== null && hoveredCardIndex2 !== index ? "dimmed" : ""} ${index === activeSlide2 ? "active" : ""}`}
                      ref={(el) => (featureCardsRef2.current[index] = el)}
                      onClick={() => setActiveSlide2(index)}
                      onMouseEnter={() => setHoveredCardIndex2(index)}
                    >
                      <div className="cpm-feature-icon">{item.icon}</div>
                      <h4 className="cpm-feature-title">{item.title}</h4>

                      {index < functionItems2.length - 1 && (
                        <div className="cpm-feature-divider-line" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Application Section */}
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
