import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import SectionIndicator from "../components/SectionIndicator";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const sections = [
  { id: "hero", label: "PPM" },
  { id: "overview", label: "메뉴" },
  { id: "overview-content", label: "개요" },
  { id: "overview-features-2", label: "PPM 개요 2" },
  { id: "functions", label: "기능 소개" },
  { id: "functions-2", label: "기능 소개 2" },
  { id: "benefits", label: "도입 효과" },
];

// Sub-menu items data
const subMenuItems = [
  {
    id: "overview",
    title: "개요",
    description: "PPM(Project Portfolio Management) 개요 및 핵심 기능",
    image:
      "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "#overview",
  },
  {
    id: "functions",
    title: "기능 소개",
    description: "Critical Path Method 기반 공정 관리 솔루션",
    image:
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "#functions",
  },
  {
    id: "benefits",
    title: "도입 효과",
    description: "PPM 솔루션 도입으로 기대할 수 있는 효과",
    image:
      "https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "#benefits",
  },
];

// Feature items for CPM section with carousel images
const featureItems2 = [
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
    title: <>포트폴리오 구성</>,
    image: "/포트폴리오 구성(PortfolioProgramProject 인벤토리 & 계층).png",
    alt: "기능 소개 - 포트폴리오 구성",
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
        우선순위 매트릭스로
        <br />
        평가/선정
      </>
    ),
    image: "/우선순위 매트릭스(Prioritization Matrix)로 평가선정.png",
    alt: "기능 소개 - 우선순위 매트릭스",
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
        Investor Map / Scorecard 기반
        <br />
        포트폴리오 분석
      </>
    ),
    image: "/Investor Map  Scorecard 기반 포트폴리오 분석(시각 분석).png",
    alt: "기능 소개 - 포트폴리오 분석",
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
    title: <>시나리오 플래닝 & 비교</>,
    image: "/시나리오 플래닝 & 비교(What-if  Scenario Comparison).png",
    alt: "기능 소개 - 시나리오 플래닝 & 비교",
  },
];

// Feature items for CPM section 2 (separate content)
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
    title: <>리소스 시나리오 최적화</>,
    image: "/리소스 시나리오 최적화(Resource Scenario Optimization).png",
    alt: "기능 소개 - 리소스 시나리오 최적화",
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
    title: <>예산 계획과 분석 뷰</>,
    image: "/예산 계획(Budget Planning)과 분석 뷰(Analysis Views).png",
    alt: "기능 소개 - 예산 계획과 분석 뷰",
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
        지출 추적과 <br />
        포트폴리오 모니터링
      </>
    ),
    image: "/지출 추적(Spending)과 포트폴리오 모니터링.png",
    alt: "기능 소개 - 지출 추적과 포트폴리오 모니터링",
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
    title: <>경영층/PMO용 커스텀 모니터링</>,
    image: "/대시보드(Dashboards) 경영층PMO용 커스텀 모니터링.png",
    alt: "기능 소개 - 경영층/PMO용 커스텀 모니터링",
  },
];

// Overview content items with carousel images
const overviewContentItems = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="8"
          y="12"
          width="32"
          height="24"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
          fill="rgba(99, 102, 241, 0.1)"
        />
        <rect
          x="14"
          y="18"
          width="8"
          height="12"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="rgba(99, 102, 241, 0.2)"
        />
        <rect
          x="26"
          y="22"
          width="8"
          height="8"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="rgba(99, 102, 241, 0.2)"
        />
        <line
          x1="12"
          y1="8"
          x2="12"
          y2="12"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="24"
          y1="8"
          x2="24"
          y2="12"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="36"
          y1="8"
          x2="36"
          y2="12"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
    title: "포트폴리오 관리",
    description: "전사 프로젝트 현황 통합 관리",
    image:
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "PPM 개요 - 포트폴리오 관리",
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
        <text
          x="24"
          y="28"
          fontSize="16"
          fill="currentColor"
          textAnchor="middle"
          fontWeight="bold"
        >
          1
        </text>
        <path d="M24 8 L28 16 L24 12 L20 16 Z" fill="currentColor" />
      </svg>
    ),
    title: "우선순위 결정",
    description: "전략 기반 프로젝트 우선순위 설정",
    image:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "PPM 개요 - 우선순위 결정",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="24"
          cy="24"
          r="18"
          stroke="currentColor"
          strokeWidth="2"
          fill="rgba(99, 102, 241, 0.1)"
        />
        <path
          d="M24 10 L24 24 L34 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="14" cy="24" r="3" fill="currentColor" />
        <circle cx="34" cy="14" r="3" fill="currentColor" />
        <circle cx="34" cy="34" r="3" fill="currentColor" />
      </svg>
    ),
    title: "자원 최적화",
    description: "전사 자원의 효율적 배분",
    image:
      "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "PPM 개요 - 자원 최적화",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line
          x1="12"
          y1="36"
          x2="12"
          y2="24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="36"
          x2="20"
          y2="18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="28"
          y1="36"
          x2="28"
          y2="14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="36"
          y1="36"
          x2="36"
          y2="20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M10 20 L18 14 L26 10 L34 16"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "성과 분석",
    description: "프로젝트 성과 측정 및 분석",
    image:
      "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "PPM 개요 - 성과 분석",
  },
];

// Benefits data
const benefitItems = [
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <line x1="12" y1="20" x2="12" y2="10" />
        <line x1="18" y1="20" x2="18" y2="4" />
        <line x1="6" y1="20" x2="6" y2="16" />
      </svg>
    ),
    title: "의사결정 개선",
    description: "데이터 기반의 전략적 의사결정 지원",
    image:
      "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "PPM 효과 - 의사결정 개선",
  },
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "효율성 향상",
    description: "프로젝트 수행 효율 30% 이상 개선",
    image:
      "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "PPM 효과 - 효율성 향상",
  },
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: "자원 최적화",
    description: "전사 자원 활용도 극대화",
    image:
      "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "PPM 효과 - 자원 최적화",
  },
  {
    icon: (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "리스크 감소",
    description: "체계적인 리스크 관리로 실패율 감소",
    image:
      "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "PPM 효과 - 리스크 감소",
  },
];

function PPMPage() {
  const { sectionId, subId } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState(sections[0].id);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [hoveredCardIndex2, setHoveredCardIndex2] = useState(null);
  const [activeSlide2, setActiveSlide2] = useState(0);
  const [activeOverviewSlide, setActiveOverviewSlide] = useState(0);
  const [hoveredOverviewCardIndex, setHoveredOverviewCardIndex] =
    useState(null);
  const [activeBenefitsSlide, setActiveBenefitsSlide] = useState(0);
  const [hoveredBenefitsCardIndex, setHoveredBenefitsCardIndex] =
    useState(null);

  const containerRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const currentSectionRef = useRef(0);

  // Section refs
  const heroSectionRef = useRef(null);
  const overviewSectionRef = useRef(null);
  const overviewContentSectionRef = useRef(null);
  const cpmSectionRef = useRef(null);
  const cpmSectionRef2 = useRef(null);
  const benefitsSectionRef = useRef(null);
  const imageCardRef = useRef(null);
  const featureCardsRef = useRef([]);
  const imageCardRef2 = useRef(null);
  const featureCardsRef2 = useRef([]);
  const overviewImageCardRef = useRef(null);
  const overviewCardsRef = useRef([]);
  const benefitsImageCardRef = useRef(null);
  const benefitsCardsRef = useRef([]);

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

  // Auto-play carousel - only when in Functions sections
  useEffect(() => {
    if (prefersReducedMotion) return;

    if (activeSectionId === "functions") {
      const interval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % featureItems.length);
      }, 4000); // 4 seconds

      return () => clearInterval(interval);
    }

    if (activeSectionId === "functions-2") {
      const interval = setInterval(() => {
        setActiveSlide2((prev) => (prev + 1) % featureItems2.length);
      }, 4000); // 4 seconds

      return () => clearInterval(interval);
    }
  }, [prefersReducedMotion, activeSectionId]);

  // Auto-play carousel for Overview Content - only when in Overview Content section
  useEffect(() => {
    if (prefersReducedMotion) return;

    // Only auto-play when in Overview Content section (id: overview-content)
    if (activeSectionId !== "overview-content") return;

    const interval = setInterval(() => {
      setActiveOverviewSlide(
        (prev) => (prev + 1) % overviewContentItems.length,
      );
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [prefersReducedMotion, activeSectionId]);

  // Auto-play carousel for Benefits - only when in Benefits section
  useEffect(() => {
    if (prefersReducedMotion) return;

    // Only auto-play when in Benefits section (id: benefits)
    if (activeSectionId !== "benefits") return;

    const interval = setInterval(() => {
      setActiveBenefitsSlide((prev) => (prev + 1) % benefitItems.length);
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [prefersReducedMotion, activeSectionId]);

  // Navigate to section
  const scrollToSection = useCallback(
    (sectionId) => {
      const sectionIndex = sections.findIndex((s) => s.id === sectionId);
      if (sectionIndex === -1) return;

      const panels = gsap.utils.toArray(".ppm-panel");
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

  // Handle deep linking from URL params
  useEffect(() => {
    if (sectionId) {
      let targetId = sectionId;
      let isFunctionsSectionNumber = false;
      if (sectionId === "overview") {
        targetId = "overview-content";
        if (subId === "2") targetId = "overview-features-2";
      }
      if (sectionId === "functions") {
        isFunctionsSectionNumber = subId === "1" || subId === "2";
        targetId = subId === "2" ? "functions-2" : "functions";
      }
      // benefits matches benefits

      const targetIndex = sections.findIndex((s) => s.id === targetId);

      // Handle subId for slide navigation (1-based index from URL)
      // Note: Overview and Functions treat some subId values as SECTIONS, so we skip carousel linking for them here.
      if (subId && sectionId !== "overview" && !isFunctionsSectionNumber) {
        const slideIndex = parseInt(subId, 10) - 1;
        if (!isNaN(slideIndex) && slideIndex >= 0) {
          // if (targetId === "overview-content") setActiveOverviewSlide(slideIndex); // Overridden by Section logic
          if (targetId === "functions") setActiveSlide(slideIndex);
          if (targetId === "functions-2") setActiveSlide2(slideIndex);
          if (targetId === "benefits") setActiveBenefitsSlide(slideIndex);
        }
      }

      // Prevent redundant scrolling if already at target (avoids loop with scroll listener)
      // Check both index and currentSectionRef to be safe
      if (targetIndex !== -1 && targetIndex !== currentSectionRef.current) {
        // Delay slightly to ensure layout is stable
        setTimeout(() => {
          scrollToSection(targetId);
        }, 100);
      }
    }
  }, [sectionId, subId, scrollToSection]);

  // Update URL based on section
  const updateUrlForSection = useCallback(
    (index) => {
      let path = "/ppm";
      // Index 0 (Hero) and 1 (Menu) stay as /ppm to avoid confusion
      if (index === 2) path = "/ppm/overview/1";
      if (index === 3) path = "/ppm/overview/2";
      if (index === 4) path = "/ppm/functions/1";
      if (index === 5) path = "/ppm/functions/2";
      if (index === 6) path = "/ppm/benefits";

      // Only navigate if path is different from current params
      // Use replace to avoid filling history with scroll events
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

    const panels = gsap.utils.toArray(".ppm-panel");

    // Track active section
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
        ".ppm-hero-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      );

      // Overview section animations
      gsap.fromTo(
        ".ppm-overview-content",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: overviewSectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Overview Content section animations (New Carousel Section)
      const overviewContentTl = gsap.timeline({
        scrollTrigger: {
          trigger: overviewContentSectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      // Scope key elements within this section
      const overviewTitle =
        overviewContentSectionRef.current.querySelector(".ppm-cpm-title");

      if (overviewTitle) {
        overviewContentTl.fromTo(
          overviewTitle,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
        );
      }

      overviewContentTl.fromTo(
        overviewImageCardRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "bounce.out" },
        "-=0.2",
      );

      const overviewCards = overviewCardsRef.current;
      if (overviewCards[0]) {
        overviewContentTl.fromTo(
          overviewCards[0],
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5 },
          "-=0.5",
        );
      }
      if (overviewCards[1]) {
        overviewContentTl.fromTo(
          overviewCards[1],
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.3",
        );
      }
      if (overviewCards[2]) {
        overviewContentTl.fromTo(
          overviewCards[2],
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.3",
        );
      }
      if (overviewCards[3]) {
        overviewContentTl.fromTo(
          overviewCards[3],
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5 },
          "-=0.3",
        );
      }

      // CPM Features section animations
      const featuresTl = gsap.timeline({
        scrollTrigger: {
          trigger: cpmSectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      // Scope key elements within CPM section
      const cpmTitle = cpmSectionRef.current.querySelector(".ppm-cpm-title");

      if (cpmTitle) {
        featuresTl.fromTo(
          cpmTitle,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
        );
      }

      featuresTl.fromTo(
        imageCardRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "bounce.out" },
        "-=0.2",
      );

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

      // CPM Features section 2 animations
      if (cpmSectionRef2.current) {
        const featuresTl2 = gsap.timeline({
          scrollTrigger: {
            trigger: cpmSectionRef2.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        });

        // Scope key elements within CPM section 2
        const cpmTitle2 =
          cpmSectionRef2.current.querySelector(".ppm-cpm-title");

        if (cpmTitle2) {
          featuresTl2.fromTo(
            cpmTitle2,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5 },
          );
        }

        featuresTl2.fromTo(
          imageCardRef2.current,
          { y: -100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "bounce.out" },
          "-=0.2",
        );

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

      // Benefits section animations
      const benefitsTl = gsap.timeline({
        scrollTrigger: {
          trigger: benefitsSectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      // Scope key elements within Benefits section
      const benefitsTitle =
        benefitsSectionRef.current.querySelector(".ppm-cpm-title");

      if (benefitsTitle) {
        benefitsTl.fromTo(
          benefitsTitle,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
        );
      }

      benefitsTl.fromTo(
        benefitsImageCardRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "bounce.out" },
        "-=0.2",
      );

      const benefitsCards = benefitsCardsRef.current;
      if (benefitsCards[0]) {
        benefitsTl.fromTo(
          benefitsCards[0],
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5 },
          "-=0.5",
        );
      }
      if (benefitsCards[1]) {
        benefitsTl.fromTo(
          benefitsCards[1],
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.3",
        );
      }
      if (benefitsCards[2]) {
        benefitsTl.fromTo(
          benefitsCards[2],
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.3",
        );
      }
      if (benefitsCards[3]) {
        benefitsTl.fromTo(
          benefitsCards[3],
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5 },
          "-=0.3",
        );
      }
    });

    return () => ctx.revert();
  };

  return (
    <>
      <div className="ppm-page" ref={containerRef}>
        {/* Hero Section */}
        <section
          className="ppm-panel ppm-hero-section"
          id="hero"
          ref={heroSectionRef}
          style={{
            backgroundImage: `linear-gradient(rgba(10, 10, 15, 0.7), rgba(10, 10, 15, 0.9)), url(https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="ppm-hero-content">
            <h1 className="ppm-hero-title">Project Portfolio Management</h1>
            <p className="ppm-hero-subtitle">PPM</p>
          </div>
          <button
            className="scroll-indicator"
            onClick={() => scrollToSection("overview")}
            aria-label="다음 섹션으로 스크롤"
          >
            <span>Scroll Down</span>
            <div className="scroll-indicator-icon"></div>
          </button>
        </section>

        {/* Overview Section */}
        <section
          className="ppm-panel ppm-overview-section"
          id="overview"
          ref={overviewSectionRef}
        >
          <div className="ppm-overview-container">
            <div className="ppm-overview-content">
              {/* Breadcrumb */}
              <nav className="ppm-breadcrumb">
                <Link to="/" className="ppm-breadcrumb-home">
                  <span className="ppm-breadcrumb-home-icon">H</span>
                </Link>
                <span className="ppm-breadcrumb-separator">&gt;</span>
                {/* <span className="ppm-breadcrumb-item">Solutions</span> */}
                {/* <span className="ppm-breadcrumb-separator">&gt;</span> */}
                <span className="ppm-breadcrumb-item ppm-breadcrumb-current">
                  PPM
                </span>
              </nav>

              {/* Main Title */}
              <h2 className="ppm-overview-title">
                프로젝트 포트폴리오를
                <br />
                통합 관리하는 솔루션
              </h2>

              {/* Description */}
              <p className="ppm-overview-description">
                PPM(Project Portfolio Management)은 조직의 전체 프로젝트
                포트폴리오를 통합 관리하여
                <br />
                전략적 의사결정을 지원하는 솔루션입니다. CPM 공정관리를 통해
                정밀한 일정 관리가 가능합니다.
              </p>

              {/* Divider */}
              <div className="ppm-overview-divider"></div>

              {/* Sub-menu Cards */}
              <div className="ppm-submenu-grid">
                {subMenuItems.map((item, index) => (
                  <button
                    key={item.id}
                    className="ppm-submenu-card"
                    onClick={() =>
                      scrollToSection(
                        item.id === "overview"
                          ? "overview-content"
                          : item.id === "functions"
                            ? "functions"
                            : "benefits",
                      )
                    }
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

        {/* Overview Content Section */}
        <section
          className="ppm-panel ppm-overview-content-section"
          id="overview-content"
          ref={overviewContentSectionRef}
        >
          <div className="ppm-cpm-container">
            <div className="ppm-cpm-header">
              <h2 className="ppm-cpm-title">PPM 개요</h2>
            </div>

            {/* Carousel Image Card */}
            <div className="cpm-carousel-container" ref={overviewImageCardRef}>
              <div className="cpm-carousel-wrapper">
                {overviewContentItems.map((item, index) => (
                  <div
                    key={index}
                    className={`cpm-carousel-slide ${index === activeOverviewSlide ? "active" : ""}`}
                    style={{
                      transform: `translateX(-${activeOverviewSlide * 100}%)`,
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.alt}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentElement.innerHTML =
                          '<div class="cpm-image-placeholder">PPM Overview Screenshot</div>';
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Carousel Navigation Dots */}
              <div className="cpm-carousel-dots">
                {overviewContentItems.map((_, index) => (
                  <button
                    key={index}
                    className={`cpm-carousel-dot ${index === activeOverviewSlide ? "active" : ""}`}
                    onClick={() => setActiveOverviewSlide(index)}
                    aria-label={`슬라이드 ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Feature Cards */}
            <div
              className="cpm-feature-cards"
              onMouseLeave={() => setHoveredOverviewCardIndex(null)}
            >
              {overviewContentItems.map((item, index) => (
                <button
                  key={index}
                  className={`cpm-feature-card ${hoveredOverviewCardIndex !== null && hoveredOverviewCardIndex !== index ? "dimmed" : ""} ${index === activeOverviewSlide ? "active" : ""}`}
                  ref={(el) => (overviewCardsRef.current[index] = el)}
                  onClick={() => setActiveOverviewSlide(index)}
                  onMouseEnter={() => setHoveredOverviewCardIndex(index)}
                >
                  <div className="cpm-feature-icon">{item.icon}</div>
                  <h4 className="cpm-feature-title">{item.title}</h4>

                  {index < overviewContentItems.length - 1 && (
                    <div className="cpm-feature-divider-line" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Overview Content 2 Section (Temporary) */}
        <section
          className="ppm-panel ppm-overview-content-section"
          id="overview-features-2"
        >
          <div className="ppm-cpm-container">
            <div className="ppm-cpm-header">
              <h2 className="ppm-cpm-title">PPM 개요 2</h2>
            </div>
            <div
              className="cpm-carousel-container"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "400px",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "16px",
              }}
            >
              <p style={{ fontSize: "24px", color: "white" }}>
                임시 섹션입니다
              </p>
            </div>
          </div>
        </section>

        {/* Functions Section */}
        <section
          className="ppm-panel ppm-cpm-section"
          id="functions"
          ref={cpmSectionRef}
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
                    {featureItems2.map((item, index) => (
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
                              '<div class="cpm-image-placeholder">CPM Screenshot</div>';
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Carousel Navigation Dots */}
                  <div className="cpm-carousel-dots">
                    {featureItems2.map((_, index) => (
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
                  {featureItems2.map((item, index) => (
                    <button
                      key={index}
                      className={`cpm-feature-card ${hoveredCardIndex !== null && hoveredCardIndex !== index ? "dimmed" : ""} ${index === activeSlide ? "active" : ""}`}
                      ref={(el) => (featureCardsRef.current[index] = el)}
                      onClick={() => setActiveSlide(index)}
                      onMouseEnter={() => setHoveredCardIndex(index)}
                    >
                      <div className="cpm-feature-icon">{item.icon}</div>
                      <h4 className="cpm-feature-title">{item.title}</h4>

                      {index < featureItems.length - 1 && (
                        <div className="cpm-feature-divider-line" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Functions Section 2 */}
        <section
          className="ppm-panel ppm-cpm-section"
          id="functions-2"
          ref={cpmSectionRef2}
        >
          <div className="ppm-cpm-container">
            <div className="ppm-cpm-header">
              <h2 className="ppm-cpm-title">기능 소개</h2>
            </div>

            <div className="ppm-functions-layout">
              {/* Carousel Image Card */}
              <div className="ppm-functions-media">
                <div className="cpm-carousel-container" ref={imageCardRef2}>
                  <div className="cpm-carousel-wrapper">
                    {featureItems.map((item, index) => (
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
                              '<div class="cpm-image-placeholder">CPM Screenshot</div>';
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Carousel Navigation Dots */}
                  <div className="cpm-carousel-dots">
                    {featureItems.map((_, index) => (
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
                  {featureItems.map((item, index) => (
                    <button
                      key={index}
                      className={`cpm-feature-card ${hoveredCardIndex2 !== null && hoveredCardIndex2 !== index ? "dimmed" : ""} ${index === activeSlide2 ? "active" : ""}`}
                      ref={(el) => (featureCardsRef2.current[index] = el)}
                      onClick={() => setActiveSlide2(index)}
                      onMouseEnter={() => setHoveredCardIndex2(index)}
                    >
                      <div className="cpm-feature-icon">{item.icon}</div>
                      <h4 className="cpm-feature-title">{item.title}</h4>

                      {index < featureItems.length - 1 && (
                        <div className="cpm-feature-divider-line" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section
          className="ppm-panel ppm-benefits-section"
          id="benefits"
          ref={benefitsSectionRef}
        >
          <div className="ppm-cpm-container">
            <div className="ppm-cpm-header">
              <h2 className="ppm-cpm-title">도입 효과</h2>
            </div>

            {/* Carousel Image Card */}
            <div className="cpm-carousel-container" ref={benefitsImageCardRef}>
              <div className="cpm-carousel-wrapper">
                {benefitItems.map((item, index) => (
                  <div
                    key={index}
                    className={`cpm-carousel-slide ${index === activeBenefitsSlide ? "active" : ""}`}
                    style={{
                      transform: `translateX(-${activeBenefitsSlide * 100}%)`,
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.alt}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentElement.innerHTML =
                          '<div class="cpm-image-placeholder">Benefits Screenshot</div>';
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Carousel Navigation Dots */}
              <div className="cpm-carousel-dots">
                {benefitItems.map((_, index) => (
                  <button
                    key={index}
                    className={`cpm-carousel-dot ${index === activeBenefitsSlide ? "active" : ""}`}
                    onClick={() => setActiveBenefitsSlide(index)}
                    aria-label={`슬라이드 ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Feature Cards */}
            <div
              className="cpm-feature-cards"
              onMouseLeave={() => setHoveredBenefitsCardIndex(null)}
            >
              {benefitItems.map((item, index) => (
                <button
                  key={index}
                  className={`cpm-feature-card ${hoveredBenefitsCardIndex !== null && hoveredBenefitsCardIndex !== index ? "dimmed" : ""} ${index === activeBenefitsSlide ? "active" : ""}`}
                  ref={(el) => (benefitsCardsRef.current[index] = el)}
                  onClick={() => setActiveBenefitsSlide(index)}
                  onMouseEnter={() => setHoveredBenefitsCardIndex(index)}
                >
                  <div className="cpm-feature-icon">{item.icon}</div>
                  <h4 className="cpm-feature-title">{item.title}</h4>

                  {index < benefitItems.length - 1 && (
                    <div className="cpm-feature-divider-line" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Section Indicator */}
      <SectionIndicator
        sections={sections}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />
    </>
  );
}

export default PPMPage;
