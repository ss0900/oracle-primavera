import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import SectionIndicator from "../components/SectionIndicator";
import CoreDocsCard from "../components/CoreDocsCard";
import { getAssetPath } from "../utils/assetPath";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const sections = [
  { id: "hero", label: "OPC" },
  { id: "menu", label: "메뉴" },
  { id: "overview-content", label: "개요" },
  { id: "overview-content-2", label: "개요 2" },
  { id: "functions", label: "기능 소개" },
  { id: "functions-2", label: "기능 소개 2" },
  { id: "application", label: "비교" },
  { id: "application-2", label: "비교 2" },
];

const subMenuItems = [
  {
    id: "overview",
    title: "개요",
    description: "클라우드 기반의 유연한 프로젝트 관리",
    image: getAssetPath("/OPC_Overview.png"),
    link: "#overview-content",
  },
  {
    id: "functions",
    title: "기능 소개",
    description: "일정, 리스크, 포트폴리오, Lean 관리",
    image: getAssetPath("/OPC_Functions.png"),
    link: "#functions",
  },
  {
    id: "comparison",
    title: "비교",
    description: "Primavera P6 PPM과 OPC의 역할 기반 기능 전문성 비교",
    image: getAssetPath("/OPC_Comparison.png"),
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

const executiveQuestionCards = [
  {
    iconKey: "plan-status",
    title: "프로젝트가 계획대로 가고 있는가?",
    description: "",
  },
  {
    iconKey: "delay-signal",
    title: "지연 가능성은 언제, 어디서 발생하는가?",
    description: "",
  },
  {
    iconKey: "impact-analysis",
    title: (
      <>
        이 일정 변경이 비용과 리스크에
        <br />
        어떤 영향을 주는가?
      </>
    ),
    description: "",
  },
];

function OPCExecutiveQuestionIcon({ iconKey }) {
  if (iconKey === "plan-status") {
    return (
      <svg viewBox="0 0 64 64" className="tm-core-docs-icon" aria-hidden="true">
        <rect x="10" y="14" width="44" height="40" rx="8" />
        <path d="M10 24H54" />
        <path d="M22 10V20" />
        <path d="M32 10V20" />
        <path d="M42 10V20" />
        <path d="M20 32H26M30 32H36M40 32H46" />
        <path d="M20 40H26M30 40H36M40 40H46" />
      </svg>
    );
  }

  if (iconKey === "delay-signal") {
    return (
      <svg viewBox="0 0 64 64" className="tm-core-docs-icon" aria-hidden="true">
        <path d="M8 48H54" />
        <path d="M8 48V16" />
        <path d="M14 42L24 32L32 36L44 24L52 28" />
        <circle cx="46" cy="18" r="10" />
        <path d="M46 12V18L50 20" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" className="tm-core-docs-icon" aria-hidden="true">
      <path d="M18 8H40L50 18V50A6 6 0 0 1 44 56H18A6 6 0 0 1 12 50V14A6 6 0 0 1 18 8Z" />
      <path d="M40 8V18H50" />
      <path d="M24 28H38M24 36H38M24 44H34" />
      <circle cx="46" cy="44" r="8" />
      <path d="M46 40V45" />
      <circle cx="46" cy="48" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

const overviewControlCards = [
  {
    iconKey: "visibility",
    title: "1. 경영 관점의 실시간 가시성",
    lines: [
      "프로젝트 · 프로그램 · 포트폴리오 단위",
      "KPI, 마일스톤, 리스크 상태 즉시 확인",
    ],
  },
  {
    iconKey: "proactive",
    title: "2. 사후 보고 → 사전 통제",
    lines: [
      "일정 변경 시 비용 · 리스크 영향 자동 분석",
      "'문제가 될 가능성'을 사전에 인지",
    ],
  },
  {
    iconKey: "decision",
    title: "3. 객관적 의사결정 기반",
    lines: [
      "감정이나 주관이 아닌 데이터 기반 판단",
      "변경 및 클레임 발생 시 명확한 근거 확보",
    ],
  },
];

function OPCOverviewControlIcon({ iconKey }) {
  if (iconKey === "visibility") {
    return (
      <svg viewBox="0 0 64 64" className="tm-core-docs-icon" aria-hidden="true">
        <rect x="34" y="8" width="22" height="16" rx="3" />
        <path d="M38 18L43 14L47 16L52 11" />
        <path d="M38 21H52" />
        <path d="M8 38C13 30 19 26 24 26C29 26 35 30 40 38C35 46 29 50 24 50C19 50 13 46 8 38Z" />
        <circle cx="24" cy="38" r="6" />
      </svg>
    );
  }

  if (iconKey === "proactive") {
    return (
      <svg viewBox="0 0 64 64" className="tm-core-docs-icon" aria-hidden="true">
        <path d="M8 44H56" />
        <path d="M16 40C16 28 24 18 36 18H42" />
        <path d="M38 10L50 18L38 26" />
        <path d="M22 34H30" />
        <path d="M34 34H42" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" className="tm-core-docs-icon" aria-hidden="true">
      <path d="M32 12V48" />
      <path d="M18 18H46" />
      <path d="M18 18L12 30H24L18 18Z" />
      <path d="M46 18L40 30H52L46 18Z" />
      <path d="M32 48H22" />
      <path d="M32 48H42" />
      <path d="M24 30C24 33 21 35 18 35C15 35 12 33 12 30" />
      <path d="M52 30C52 33 49 35 46 35C43 35 40 33 40 30" />
    </svg>
  );
}

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
    image: getAssetPath("/Schedule_CPM.png"),
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
    image: getAssetPath("/Risk_Management.png"),
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
    image: getAssetPath("/Portfolio_Capital_Planning.png"),
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
    image: getAssetPath("/Dashboard_Analytics.png"),
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
    image: getAssetPath("/Workflow_Forms.png"),
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
    image: getAssetPath("/Task_Management_Lean_Board_Handoff_Constraints.png"),
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
    image: getAssetPath("/Timesheets.png"),
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
    image: getAssetPath("/Scope_Management.png"),
    alt: "기능 소개 - 범위 관리",
  },
];

const comparisonRows = [
  { item: "CPM 일정 분석", p6Stars: 5, opcStars: 4 },
  { item: "대규모 일정 처리", p6Stars: 5, opcStars: 4 },
  { item: "자원/로직 상세 제어", p6Stars: 5, opcStars: 3 },
  { item: "비용 관리", p6Stars: 3, opcStars: 4 },
  { item: "리스크 관리", p6Stars: 2, opcStars: 4 },
  { item: "실시간 대시보드", p6Stars: 2, opcStars: 5, emphasized: true },
  { item: "포트폴리오 관리", p6Stars: 2, opcStars: 5, emphasized: true },
  { item: "협업/접근성", p6Stars: 3, opcStars: 5, emphasized: true },
  { item: "경영진 보고", p6Stars: 2, opcStars: 5, emphasized: true },
];

const comparisonGroups = {
  left: {
    startIndex: 0,
    endIndex: 2,
    label: "실행 전문성",
    line1: "실행",
    line2: "전문성",
    srText:
      "상단 3개 비교 항목인 CPM 일정 분석부터 자원/로직 상세 제어까지는 실행 전문성 범주입니다.",
  },
  right: {
    startIndex: 5,
    endIndex: 8,
    label: "경영/통제 전문성",
    line1: "경영/통제",
    line2: "전문성",
    srText:
      "하단 4개 비교 항목인 실시간 대시보드부터 경영진 보고까지는 경영 통제 전문성 범주입니다.",
  },
};

const comparisonRoleColumns = [
  {
    id: "p6",
    header: "Primavera P6",
    accentClass: "is-p6",
    caption: "“최고의 일정 엔진”",
    rows: [
      {
        iconKey: "schedule-tool",
        ko: "일정 관리 전문 도구",
        en: "(Expert Scheduling Tool)",
      },
      {
        iconKey: "expert",
        ko: "공정관리 전문가",
        en: "(Scheduling Expert)",
      },
      {
        iconKey: "cpm",
        ko: "일정(CPM) 중심",
        en: "(Schedule-centric (CPM))",
      },
      {
        iconKey: "local-file",
        ko: "로컬/파일 기반",
        en: "(Local/File-based)",
      },
    ],
  },
  {
    id: "opc",
    header: "Oracle Primavera Cloud (OPC)",
    accentClass: "is-opc",
    caption: "“프로젝트 경영 플랫폼”",
    rows: [
      {
        iconKey: "platform",
        ko: "통합 프로젝트 관리 플랫폼",
        en: "(Integrated Project Mgmt Platform)",
      },
      {
        iconKey: "stakeholders",
        ko: "발주처·경영진·PMO 포함",
        en: "(Incl. Owners, Execs, PMO)",
      },
      {
        iconKey: "cost-risk",
        ko: "일정 + 비용 + 리스크",
        en: "(Schedule + Cost + Risk)",
      },
      {
        iconKey: "cloud-collab",
        ko: "클라우드 기반 실시간 협업",
        en: "(Cloud-based Real-time Collab)",
      },
    ],
  },
];

function OPCComparisonRoleIcon({ iconKey }) {
  if (iconKey === "schedule-tool") {
    return (
      <svg
        viewBox="0 0 64 64"
        className="opc-comparison-2-item-icon"
        aria-hidden="true"
      >
        <rect x="8" y="18" width="30" height="24" rx="5" />
        <path d="M38 30H56" />
        <path d="M48 20V40" />
        <circle cx="23" cy="30" r="8" />
      </svg>
    );
  }

  if (iconKey === "expert") {
    return (
      <svg
        viewBox="0 0 64 64"
        className="opc-comparison-2-item-icon"
        aria-hidden="true"
      >
        <circle cx="32" cy="19" r="9" />
        <path d="M14 50C14 40 22 33 32 33C42 33 50 40 50 50" />
        <rect x="24" y="43" width="16" height="9" rx="2" />
      </svg>
    );
  }

  if (iconKey === "cpm") {
    return (
      <svg
        viewBox="0 0 64 64"
        className="opc-comparison-2-item-icon"
        aria-hidden="true"
      >
        <rect x="8" y="10" width="48" height="44" rx="6" />
        <path d="M16 18H48M16 26H34M16 34H30M16 42H26" />
        <path d="M40 42L46 36L52 39" />
      </svg>
    );
  }

  if (iconKey === "local-file") {
    return (
      <svg
        viewBox="0 0 64 64"
        className="opc-comparison-2-item-icon"
        aria-hidden="true"
      >
        <rect x="8" y="12" width="34" height="24" rx="4" />
        <rect x="18" y="42" width="14" height="4" rx="2" />
        <rect x="46" y="12" width="10" height="32" rx="2" />
      </svg>
    );
  }

  if (iconKey === "platform") {
    return (
      <svg
        viewBox="0 0 64 64"
        className="opc-comparison-2-item-icon"
        aria-hidden="true"
      >
        <path d="M11 30C11 20 19 12 29 12C36 12 41 16 44 22C45 22 46 22 47 22C53 22 58 27 58 33C58 39 53 44 47 44H18C13 44 9 40 9 35C9 32 10 31 11 30Z" />
        <rect x="20" y="30" width="16" height="10" rx="2" />
        <path d="M42 30H52M42 36H52" />
      </svg>
    );
  }

  if (iconKey === "stakeholders") {
    return (
      <svg
        viewBox="0 0 64 64"
        className="opc-comparison-2-item-icon"
        aria-hidden="true"
      >
        <circle cx="17" cy="22" r="6" />
        <circle cx="32" cy="18" r="7" />
        <circle cx="47" cy="22" r="6" />
        <path d="M8 48C8 40 12 34 17 34C22 34 26 40 26 48" />
        <path d="M20 48C20 38 26 31 32 31C38 31 44 38 44 48" />
        <path d="M38 48C38 40 42 34 47 34C52 34 56 40 56 48" />
      </svg>
    );
  }

  if (iconKey === "cost-risk") {
    return (
      <svg
        viewBox="0 0 64 64"
        className="opc-comparison-2-item-icon"
        aria-hidden="true"
      >
        <circle cx="24" cy="24" r="10" />
        <circle cx="39" cy="24" r="10" />
        <circle cx="32" cy="39" r="10" />
        <path d="M24 24H39M28 31L35 31" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 64 64"
      className="opc-comparison-2-item-icon"
      aria-hidden="true"
    >
      <path d="M16 36V22C16 17 20 13 25 13C29 13 32 15 34 18C35 17 38 16 40 16C46 16 50 20 50 26V36" />
      <rect x="12" y="36" width="40" height="14" rx="3" />
      <path d="M22 50V56M42 50V56" />
    </svg>
  );
}

function StarRating({ count, label }) {
  return (
    <div
      className="opc-comparison-stars"
      role="img"
      aria-label={`${label} ${count}점`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <svg
          key={`${label}-${index}`}
          className="opc-comparison-star-icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 2.4L14.94 8.36L21.52 9.32L16.76 13.96L17.88 20.52L12 17.44L6.12 20.52L7.24 13.96L2.48 9.32L9.06 8.36L12 2.4Z" />
        </svg>
      ))}
    </div>
  );
}

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
  const overviewSectionRef2 = useRef(null);
  const functionsSectionRef = useRef(null);
  const functionsSectionRef2 = useRef(null);
  const applicationSectionRef = useRef(null);
  const applicationSectionRef2 = useRef(null);

  // Animation refs
  const overviewCardsRef = useRef([]);
  const overviewControlCardsRef = useRef([]);
  const imageCardRef = useRef(null);
  const featureCardsRef = useRef([]);
  const imageCardRef2 = useRef(null);
  const featureCardsRef2 = useRef([]);
  const comparisonShellRef = useRef(null);
  const comparisonRowRefs = useRef([]);
  const [comparisonBracketOffsets, setComparisonBracketOffsets] = useState({
    left: { top: 0, height: 0 },
    right: { top: 0, height: 0 },
  });

  const updateComparisonBracketOffsets = useCallback(() => {
    const shell = comparisonShellRef.current;
    if (!shell) return;

    const rows = comparisonRowRefs.current;
    if (rows.length < comparisonRows.length || rows.some((row) => !row)) return;

    const shellRect = shell.getBoundingClientRect();
    const getGroupMetrics = (group) => {
      const firstRow = rows[group.startIndex];
      const lastRow = rows[group.endIndex];
      if (!firstRow || !lastRow) return { top: 0, height: 0 };

      const firstRect = firstRow.getBoundingClientRect();
      const lastRect = lastRow.getBoundingClientRect();

      return {
        top: Math.max(0, firstRect.top - shellRect.top),
        height: Math.max(0, lastRect.bottom - firstRect.top),
      };
    };

    setComparisonBracketOffsets({
      left: getGroupMetrics(comparisonGroups.left),
      right: getGroupMetrics(comparisonGroups.right),
    });
  }, []);

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

    // Supported deep links:
    // /opc/overview/1, /opc/overview/2, /opc/functions/1, /opc/functions/2, /opc/comparison/1, /opc/comparison/2
    let targetId = sectionId;
    let isFunctionsSectionNumber = false;
    if (sectionId === "overview") {
      targetId = subId === "2" ? "overview-content-2" : "overview-content";
    }
    if (sectionId === "functions") {
      isFunctionsSectionNumber = subId === "1" || subId === "2";
      targetId = subId === "2" ? "functions-2" : "functions";
    }
    if (sectionId === "comparison") {
      targetId = subId === "2" ? "application-2" : "application";
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
      if (index === 3) path = "/opc/overview/2";
      if (index === 4) path = "/opc/functions/1";
      if (index === 5) path = "/opc/functions/2";
      if (index === 6) path = "/opc/comparison/1";
      if (index === 7) path = "/opc/comparison/2";

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

  useEffect(() => {
    const resizeHandler = () => updateComparisonBracketOffsets();
    const rafId = requestAnimationFrame(updateComparisonBracketOffsets);

    window.addEventListener("resize", resizeHandler);
    window.addEventListener("orientationchange", resizeHandler);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("orientationchange", resizeHandler);
    };
  }, [updateComparisonBracketOffsets]);

  useEffect(() => {
    const timeoutId = setTimeout(updateComparisonBracketOffsets, 120);
    return () => clearTimeout(timeoutId);
  }, [activeSectionId, updateComparisonBracketOffsets]);

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

      if (overviewSectionRef2.current) {
        const overviewControlTl = gsap.timeline({
          scrollTrigger: {
            trigger: overviewSectionRef2.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        });

        const overviewControlTitle =
          overviewSectionRef2.current.querySelector(".tm-section-title");

        if (overviewControlTitle) {
          overviewControlTl.fromTo(
            overviewControlTitle,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5 },
          );
        }

        overviewControlTl.fromTo(
          overviewControlCardsRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.12 },
          "-=0.2",
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
        const comparisonElements =
          applicationSectionRef.current.querySelectorAll(
            ".opc-comparison-animate",
          );

        gsap.fromTo(
          comparisonElements,
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

      if (applicationSectionRef2.current) {
        const comparisonRoleElements =
          applicationSectionRef2.current.querySelectorAll(
            ".opc-comparison-2-animate",
          );

        gsap.fromTo(
          comparisonRoleElements,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.14,
            scrollTrigger: {
              trigger: applicationSectionRef2.current,
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
              backgroundImage: `linear-gradient(rgba(10, 10, 15, 0.7), rgba(10, 10, 15, 0.9)), url(${getAssetPath("/OPC.png")})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="tm-hero-content">
              <h1 className="opc-hero-title tm-hero-title">
                Oracle Primavera Cloud
              </h1>
              <p className="tm-hero-subtitle">OPC</p>
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
          <div className="tm-methods-section opc-overview-executive-section">
            <div className="tm-methods-container opc-overview-executive-container">
              <div className="tm-section-header opc-overview-header">
                <h2 className="tm-section-title">
                  발주처와 경영진의 핵심 질문에 답합니다.
                </h2>
              </div>

              <div className="opc-overview-questions-grid tm-core-docs-grid grid grid-3">
                {executiveQuestionCards.map((item, index) => (
                  <CoreDocsCard
                    key={index}
                    icon={<OPCExecutiveQuestionIcon iconKey={item.iconKey} />}
                    title={item.title}
                    description={item.description}
                    cardRef={(el) => (overviewCardsRef.current[index] = el)}
                  />
                ))}
              </div>

              <div
                className="opc-overview-summary"
                ref={(el) => (overviewCardsRef.current[3] = el)}
              >
                <span
                  className="opc-overview-summary-marker"
                  role="img"
                  aria-label="핵심 메시지"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 6L9 17L4 12" strokeWidth="2.5" />
                  </svg>
                </span>
                <p className="opc-overview-summary-text">
                  OPC는 <strong>일정·비용·리스크를 하나의 화면에서</strong>{" "}
                  연결해
                  <br />
                  모든 질문에 대한 답을 실시간으로 보여줍니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Overview Section 2 */}
        <section
          className="opc-panel tm-panel"
          id="overview-content-2"
          ref={overviewSectionRef2}
        >
          <div className="tm-core-section opc-overview-control-section">
            <div className="tm-core-container opc-overview-control-container">
              <div className="tm-section-header opc-overview-control-header">
                <h2 className="tm-section-title">
                  발주처를 '보고받는 위치'에서
                  <br />
                  '프로젝트를 통제하는 위치'로 이동시킵니다.
                </h2>
              </div>

              <div className="opc-overview-control-grid tm-core-docs-grid grid">
                {overviewControlCards.map((item, index) => (
                  <article
                    key={item.title}
                    className="tm-core-docs-card card glass opc-overview-control-card"
                    ref={(el) => (overviewControlCardsRef.current[index] = el)}
                  >
                    <div className="tm-core-docs-icon-shell opc-overview-control-icon-shell">
                      <OPCOverviewControlIcon iconKey={item.iconKey} />
                    </div>
                    <h3 className="tm-core-docs-card-title">{item.title}</h3>
                    <p className="tm-core-docs-card-desc opc-overview-control-card-desc">
                      {item.lines.map((line, lineIndex) => (
                        <span key={line}>
                          {line}
                          {lineIndex < item.lines.length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Functions Intro Section */}
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

        {/* 6. Functions Intro Section 2 */}
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

        {/* 7. Application Section */}
        <section
          className="opc-panel tm-panel"
          id="application"
          ref={applicationSectionRef}
        >
          <div className="tm-methods-section opc-comparison-section">
            <div className="tm-methods-container opc-comparison-container">
              <div className="tm-section-header opc-comparison-animate">
                <h2 className="tm-section-title">
                  역할에 따른 기능의 전문성: Primavera P6 PPM vs OPC
                </h2>
              </div>

              <div
                className="opc-comparison-shell opc-comparison-animate"
                ref={comparisonShellRef}
              >
                <span className="opc-visually-hidden">
                  {comparisonGroups.left.srText}
                </span>
                <span className="opc-visually-hidden">
                  {comparisonGroups.right.srText}
                </span>

                {comparisonBracketOffsets.left.height > 0 && (
                  <>
                    <div
                      className="opc-comparison-bracket opc-comparison-bracket-left"
                      style={{
                        top: `${comparisonBracketOffsets.left.top}px`,
                        height: `${comparisonBracketOffsets.left.height}px`,
                      }}
                      aria-hidden="true"
                    />
                    <div
                      className="opc-comparison-bracket-label opc-comparison-bracket-label-left"
                      style={{
                        top: `${comparisonBracketOffsets.left.top + comparisonBracketOffsets.left.height / 2}px`,
                      }}
                      aria-label={comparisonGroups.left.label}
                    >
                      <span>
                        {comparisonGroups.left.line1}
                        <br />
                        {comparisonGroups.left.line2}
                      </span>
                    </div>
                  </>
                )}

                {comparisonBracketOffsets.right.height > 0 && (
                  <>
                    <div
                      className="opc-comparison-bracket opc-comparison-bracket-right"
                      style={{
                        top: `${comparisonBracketOffsets.right.top}px`,
                        height: `${comparisonBracketOffsets.right.height}px`,
                      }}
                      aria-hidden="true"
                    />
                    <div
                      className="opc-comparison-bracket-label opc-comparison-bracket-label-right"
                      style={{
                        top: `${comparisonBracketOffsets.right.top + comparisonBracketOffsets.right.height / 2}px`,
                      }}
                      aria-label={comparisonGroups.right.label}
                    >
                      <span>
                        {comparisonGroups.right.line1}
                        <br />
                        {comparisonGroups.right.line2}
                      </span>
                    </div>
                  </>
                )}

                <div className="opc-comparison-table-wrapper">
                  <table className="opc-comparison-table">
                    <thead>
                      <tr>
                        <th scope="col" className="opc-comparison-col-item">
                          비교 항목
                        </th>
                        <th scope="col">Primavera P6 PPM</th>
                        <th scope="col">Oracle Primavera Cloud (OPC)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map((row, index) => (
                        <tr
                          key={row.item}
                          ref={(el) => (comparisonRowRefs.current[index] = el)}
                        >
                          <th
                            scope="row"
                            className={`opc-comparison-item-cell ${row.emphasized ? "is-emphasized" : ""}`}
                          >
                            {row.item}
                          </th>
                          <td className="opc-comparison-rating-cell">
                            <StarRating
                              count={row.p6Stars}
                              label={`Primavera P6 PPM ${row.item}`}
                            />
                          </td>
                          <td className="opc-comparison-rating-cell">
                            <StarRating
                              count={row.opcStars}
                              label={`Oracle Primavera Cloud (OPC) ${row.item}`}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Comparison Section 2 */}
        <section
          className="opc-panel tm-panel"
          id="application-2"
          ref={applicationSectionRef2}
        >
          <div className="tm-core-section opc-comparison-2-section">
            <div className="tm-core-container opc-comparison-2-container">
              <div className="tm-section-header opc-comparison-2-header opc-comparison-2-animate">
                <h2 className="tm-section-title">
                  Primavera P6 PPM과 OPC의 역할
                </h2>
              </div>

              <div className="opc-comparison-2-grid opc-comparison-2-animate">
                {comparisonRoleColumns.map((column) => (
                  <article
                    key={column.id}
                    className={`card glass opc-comparison-2-column ${column.accentClass} opc-comparison-2-animate`}
                  >
                    <header className="opc-comparison-2-column-header">
                      <h3 className="opc-comparison-2-column-title">
                        {column.header}
                      </h3>
                    </header>

                    <ul
                      className="opc-comparison-2-list"
                      aria-label={`${column.header} 역할 요약`}
                    >
                      {column.rows.map((row) => (
                        <li key={row.ko} className="opc-comparison-2-item">
                          <span
                            className="tm-core-docs-icon-shell opc-comparison-2-icon-shell"
                            aria-hidden="true"
                          >
                            <OPCComparisonRoleIcon iconKey={row.iconKey} />
                          </span>
                          <div className="opc-comparison-2-item-copy">
                            <p className="opc-comparison-2-item-ko">{row.ko}</p>
                            <p className="opc-comparison-2-item-en">{row.en}</p>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="opc-comparison-2-caption-bar">
                      <p>{column.caption}</p>
                    </div>
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

export default OPCPage;
