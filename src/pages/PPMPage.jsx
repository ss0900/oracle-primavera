import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import SectionIndicator from "../components/SectionIndicator";
import { getAssetPath } from "../utils/assetPath";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const sections = [
  { id: "hero", label: "PPM" },
  { id: "overview", label: "메뉴" },
  { id: "overview-content", label: "개요" },
  { id: "overview-features-2", label: "PPM 개요 2" },
  { id: "overview-features-3", label: "PPM 개요 3" },
  { id: "functions", label: "기능 소개" },
  { id: "functions-2", label: "기능 소개 2" },
  { id: "benefits", label: "효과" },
  { id: "benefits-2", label: "효과 2" },
];

// Sub-menu items data
const subMenuItems = [
  {
    id: "overview",
    title: "개요",
    description: "PPM(Project Portfolio Management) 개요 및 핵심 기능",
    image: getAssetPath("/PPM_Overview.png"),
    link: "#overview",
  },
  {
    id: "functions",
    title: "기능 소개",
    description: "Critical Path Method 기반 공정 관리 중심 기능",
    image: getAssetPath("/PPM_Functions.png"),
    link: "#functions",
  },
  {
    id: "benefits",
    title: "효과",
    description: "PPM 솔루션 도입으로 기대할 수 있는 효과",
    image: getAssetPath("/PPM_Benefits.png"),
    link: "#benefits",
  },
];

// Feature items for CPM section with carousel images
const featureItems2 = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="7"
          y="10"
          width="34"
          height="8"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x="7"
          y="20"
          width="34"
          height="8"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x="7"
          y="30"
          width="34"
          height="8"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
    title: <>WBS 및 Activity</>,
    images: [getAssetPath("/WBS_Activity.png")],
    alts: ["기능 소개 - WBS 및 Activity"],
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="2" />
        <path
          d="M24 14V24L31 28"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M15 31L20 27L24 29L28 25L33 28"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: <>CP Activity 분석</>,
    images: [getAssetPath("/CPM_Activity_Analysis.png")],
    alts: ["기능 소개 - CPM Activity 분석"],
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 10H40V18H8V10Z" stroke="currentColor" strokeWidth="2" />
        <path d="M8 22H22V30H8V22Z" stroke="currentColor" strokeWidth="2" />
        <path d="M26 22H40V30H26V22Z" stroke="currentColor" strokeWidth="2" />
        <path d="M8 34H40V42H8V34Z" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: (
      <>
        Critical Path Method (CPM)
        <br />
        자동 계산
      </>
    ),
    images: [getAssetPath("/CPM_Auto_Calculation.png")],
    alts: ["기능 소개 - CPM 자동계산"],
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="12" r="7" stroke="currentColor" strokeWidth="2" />
        <circle cx="11" cy="34" r="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="37" cy="34" r="5" stroke="currentColor" strokeWidth="2" />
        <path
          d="M19 18L13 29M29 18L35 29M16 34H32"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    images: [
      getAssetPath("/Resource_Status_Analysis_1.png"),
      getAssetPath("/Resource_Status_Analysis_2.png"),
    ],
    alts: [
      "기능 소개 - 리소스 현황 및 분석_1",
      "기능 소개 - 리소스 현황 및 분석_2",
    ],
    title: <>리소스 현황 및 분석</>,
  },
];

// [MOD] ppm/functions/1: 카드(4개)와 실제 슬라이드(총 5개)를 매핑
const featureItems2Slides = featureItems2.flatMap((item, featureIndex) =>
  item.images.map((src, imageIndex) => ({
    featureIndex,
    imageIndex,
    src,
    alt:
      item.alts?.[imageIndex] ||
      item.alts?.[0] ||
      `기능 소개 이미지 ${imageIndex + 1}`,
  })),
);

const getFeatureItems2SlidePosition = (globalSlideIndex) => {
  if (!featureItems2Slides.length) return { featureIndex: 0, imageIndex: 0 };
  const maxIndex = featureItems2Slides.length - 1;
  const safeIndex = Math.max(0, Math.min(globalSlideIndex, maxIndex));
  const target = featureItems2Slides[safeIndex];
  return { featureIndex: target.featureIndex, imageIndex: target.imageIndex };
};

const getFeatureItems2GlobalSlideIndex = (featureIndex, imageIndex = 0) => {
  if (!featureItems2.length) return 0;
  const safeFeatureIndex = Math.max(
    0,
    Math.min(featureIndex, featureItems2.length - 1),
  );
  let offset = 0;
  for (let i = 0; i < safeFeatureIndex; i += 1) {
    offset += featureItems2[i].images.length;
  }
  const maxImageIndex = Math.max(
    0,
    featureItems2[safeFeatureIndex].images.length - 1,
  );
  const safeImageIndex = Math.max(0, Math.min(imageIndex, maxImageIndex));
  return offset + safeImageIndex;
};

// Feature items for CPM section 2 (separate content)
const featureItems = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="7"
          y="10"
          width="34"
          height="8"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x="7"
          y="20"
          width="34"
          height="8"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x="7"
          y="30"
          width="34"
          height="8"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
    title: (
      <>
        인력, 장비, 자재 자원
        <br />
        계획 및 부하 분석
      </>
    ),
    images: [
      getAssetPath("/Resource_Planning_Load_Analysis_1.png"),
      getAssetPath("/Resource_Planning_Load_Analysis_2.png"),
    ],
    alts: [
      "기능 소개 - 인력, 장비, 자재 자원 계획 및 부하 분석_1",
      "기능 소개 - 인력, 장비, 자재 자원 계획 및 부하 분석_2",
    ],
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="2" />
        <path
          d="M24 14V24L31 28"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M15 31L20 27L24 29L28 25L33 28"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: <>Baseline 설정 및 비교 분석</>,
    images: [getAssetPath("/Baseline_Settings_and_Comparison_Analysis.png")],
    alts: ["기능 소개 - Baseline 설정 및 비교 분석"],
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 10H40V18H8V10Z" stroke="currentColor" strokeWidth="2" />
        <path d="M8 22H22V30H8V22Z" stroke="currentColor" strokeWidth="2" />
        <path d="M26 22H40V30H26V22Z" stroke="currentColor" strokeWidth="2" />
        <path d="M8 34H40V42H8V34Z" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: <>시나리오별 일정 영향 분석</>,
    images: [getAssetPath("/Scenario_Planning_Comparison.png")],
    alts: ["기능 소개 - 시나리오별 일정 영향 분석"],
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="12" r="7" stroke="currentColor" strokeWidth="2" />
        <circle cx="11" cy="34" r="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="37" cy="34" r="5" stroke="currentColor" strokeWidth="2" />
        <path
          d="M19 18L13 29M29 18L35 29M16 34H32"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: <>공정 진도 및 실적 관리</>,
    images: [getAssetPath("/Process_Progress_and_Performance_Management.png")],
    alts: ["기능 소개 - 공정 진도 및 실적 관리"],
  },
];

// [MOD] ppm/functions/2: 카드(4개)와 실제 슬라이드(총 5개)를 매핑 (첫 카드만 2장)
const featureItemsSlides = featureItems.flatMap((item, featureIndex) =>
  item.images.map((src, imageIndex) => ({
    featureIndex,
    imageIndex,
    src,
    alt:
      item.alts?.[imageIndex] ||
      item.alts?.[0] ||
      `기능 소개 이미지 ${imageIndex + 1}`,
  })),
);

const getFeatureItemsSlidePosition = (globalSlideIndex) => {
  if (!featureItemsSlides.length) return { featureIndex: 0, imageIndex: 0 };
  const maxIndex = featureItemsSlides.length - 1;
  const safeIndex = Math.max(0, Math.min(globalSlideIndex, maxIndex));
  const target = featureItemsSlides[safeIndex];
  return { featureIndex: target.featureIndex, imageIndex: target.imageIndex };
};

const getFeatureItemsGlobalSlideIndex = (featureIndex, imageIndex = 0) => {
  if (!featureItems.length) return 0;
  const safeFeatureIndex = Math.max(
    0,
    Math.min(featureIndex, featureItems.length - 1),
  );
  let offset = 0;
  for (let i = 0; i < safeFeatureIndex; i += 1) {
    offset += featureItems[i].images.length;
  }
  const maxImageIndex = Math.max(
    0,
    featureItems[safeFeatureIndex].images.length - 1,
  );
  const safeImageIndex = Math.max(0, Math.min(imageIndex, maxImageIndex));
  return offset + safeImageIndex;
};

const renderOverviewValueIcon = (iconType) => {
  if (iconType === "processing") {
    return (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="10"
          y="10"
          width="24"
          height="8"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x="10"
          y="24"
          width="24"
          height="8"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x="10"
          y="38"
          width="24"
          height="8"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M34 14H42M34 28H42M34 42H42"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M42 14L47 18M42 28L47 32M42 42L47 46"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M49 12H56V20H49V12Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M49 26H56V34H49V26Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M49 40H56V48H49V40Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (iconType === "optimization") {
    return (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="32"
          cy="32"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          fill="currentColor"
          fillOpacity="0.12"
        />
        <circle cx="32" cy="32" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="17" cy="24" r="6" stroke="currentColor" strokeWidth="2" />
        <circle cx="47" cy="24" r="6" stroke="currentColor" strokeWidth="2" />
        <circle cx="20" cy="43" r="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="44" cy="43" r="5" stroke="currentColor" strokeWidth="2" />
        <path
          d="M19 15L25 15L25 9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M45 49L39 49L39 55"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19 15C25 9 35 8 42 14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M45 49C39 55 29 56 22 50"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (iconType === "tracking") {
    return (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16 12H35L45 22V48C45 50.2 43.2 52 41 52H16C13.8 52 12 50.2 12 48V16C12 13.8 13.8 12 16 12Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M35 12V22H45" stroke="currentColor" strokeWidth="2" />
        <path
          d="M20 29H35M20 35H31M20 41H28"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="43" cy="40" r="8" stroke="currentColor" strokeWidth="2" />
        <path
          d="M49 46L54 51"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (iconType === "evidence") {
    return (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 10H38L48 20V50C48 52.2 46.2 54 44 54H12C9.8 54 8 52.2 8 50V14C8 11.8 9.8 10 12 10Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M38 10V20H48" stroke="currentColor" strokeWidth="2" />
        <path
          d="M16 42L22 35L28 38L35 30"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 45H36"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M40 34L45 29L51 35L46 40L40 34Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M32 50L40 42"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="26" cy="34" r="14" stroke="currentColor" strokeWidth="2" />
      <path
        d="M14 34H38M26 20C23 24 21 29 21 34C21 39 23 44 26 48M26 20C29 24 31 29 31 34C31 39 29 44 26 48"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M40 21H53M46.5 21V37"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M42 24L46.5 21L51 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M51 37V44L44 48"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const overviewValueItemsTop = [
  {
    iconType: "processing",
    titleKo: "대규모 처리 능력",
    titleEn: "Large-scale Processing Power",
    description: (
      <>
        초대형 프로젝트의 방대한 데이터를
        <br />
        빠르고 안정적으로 처리
      </>
    ),
  },
  {
    iconType: "optimization",
    titleKo: "다중 프로젝트 자원 최적화",
    titleEn: "Multi-Project Resource Optimization",
    description: (
      <>
        전사적 자원 풀을 활용한 최적의
        <br />
        레벨링(Resource Leveling) 수행
      </>
    ),
  },
  {
    iconType: "tracking",
    titleKo: "명확한 성과 추적",
    titleEn: "Clear Performance Tracking",
    description: (
      <>
        무제한 Baseline 비교를 통해
        <br />
        변경 이력과 성과를 투명하게 관리
      </>
    ),
  },
];

const overviewValueItemsBottom = [
  {
    iconType: "evidence",
    titleKo: "정량적 근거 제공",
    titleEn: "Provides Quantitative Evidence",
    description: (
      <>
        계약 Claim 대응 및 변화 원인 분석 시<br />
        객관적이고 신뢰성 있는 데이터 제시
      </>
    ),
  },
  {
    iconType: "global",
    titleKo: "글로벌 표준",
    titleEn: "Global Standard",
    description: (
      <>
        건설, 엔지니어링, 인프라 등<br />
        대형 프로젝트 분야의 사실상 표준 도구
      </>
    ),
  },
];

const overviewEvmsItems = [
  {
    titleKo: "자원 및 코드 기반 계획",
    titleEn: "Resource & Code-based Planning",
    description: (
      <>
        인력, 장비, 자재 등 모든 자원을
        <br />
        세밀하게 할당하고 커스텀 코드를 통해
        <br />
        데이터를 다각적으로 분류 및 분석합니다.
      </>
    ),
    icon: (
      <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="28"
          cy="37"
          r="17"
          stroke="currentColor"
          strokeWidth="2.4"
        />
        <circle cx="28" cy="37" r="12" stroke="currentColor" strokeWidth="2" />
        <path
          d="M39.5 48.5L52 61"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <rect
          x="20.5"
          y="31"
          width="13.5"
          height="7.5"
          rx="1.6"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M34 33.5H38.5L41.5 36.5V38.5H34"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="24"
          cy="40.5"
          r="2.2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="33"
          cy="40.5"
          r="2.2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="16.5"
          cy="18"
          r="4.2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M9.5 28C9.5 24.5 12.6 22 16.5 22C20.4 22 23.5 24.5 23.5 28"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle
          cx="28.5"
          cy="14.5"
          r="3.8"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M22.5 22C22.5 18.9 25.1 16.7 28.5 16.7C31.9 16.7 34.5 18.9 34.5 22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M42.4 12.6L44.3 10.7L47 13.4L45.1 15.3M42 17H45.8M40.3 22.7L42.2 20.8L44.9 23.5L43 25.4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="45.2"
          cy="18.8"
          r="4.5"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="51.5"
          cy="28.2"
          r="4.3"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="55.8"
          cy="17.6"
          r="3.8"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    titleKo: "Baseline 및 변경 이력 관리",
    titleEn: "Baseline & Change History Management",
    description: (
      <>
        원본 계획(Baseline)을 설정하고
        <br />
        모든 변경 사항을 추적하여 계획과 실적의 차이를
        <br />
        명확하게 비교하고 원인을 분석합니다.
      </>
    ),
    icon: (
      <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11 56H58"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M58 56L52.4 52.2M58 56L52.4 59.8"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 56L22 44L31 44L39.5 34L48 34L55.5 28"
          stroke="rgba(185, 196, 214, 0.75)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="5 6"
        />
        <path
          d="M11 56L22 50L33 47L45 47L53 38"
          stroke="var(--color-warning, #ff8f3d)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="2 6"
        />
        <path
          d="M53 38L48.5 37.7L51 41.4L53 38Z"
          fill="var(--color-warning, #ff8f3d)"
        />
        <circle cx="22" cy="50" r="1.8" fill="var(--color-warning, #ff8f3d)" />
        <circle cx="33" cy="47" r="1.8" fill="var(--color-warning, #ff8f3d)" />
        <path
          d="M10.5 60.5H30.5"
          stroke="rgba(185, 196, 214, 0.6)"
          strokeWidth="1.6"
          strokeDasharray="4 4"
        />
      </svg>
    ),
  },
  {
    titleKo: "강력한 Earned Value 분석",
    titleEn: "Powerful Earned Value Analysis",
    description: (
      <>
        EVM(획득 가치 관리)을 통해
        <br />
        프로젝트의 비용 및 일정 성과를 객관적인 지표로
        <br />
        측정하고 미래 성과를 예측합니다.
      </>
    ),
    icon: (
      <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="12"
          y="10"
          width="46"
          height="46"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="2.2"
        />
        <path
          d="M12 21.5H58M12 33H58M12 44.5H58M23.5 10V56M35 10V56M46.5 10V56"
          stroke="rgba(169, 191, 218, 0.35)"
          strokeWidth="1.3"
        />
        <path
          d="M12 56C18 54 23 51 27 45C31 38 33 30 37.5 24C42 18 49 14 58 12"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 56C18 54.5 24.5 50.5 29 45C33.5 39.5 36 33.5 40.2 29C44.4 24.5 50 21.5 58 19.5"
          stroke="rgba(178, 205, 238, 0.95)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 56C17 55 23 54 27.5 51.5C32 49 35.5 45 40.5 42C45.5 39 51 37 58 35.8"
          stroke="rgba(176, 196, 222, 0.85)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 5"
        />
        <text
          x="45.5"
          y="23.5"
          fill="currentColor"
          fontSize="6.8"
          fontWeight="700"
          fontFamily="var(--font-display)"
        >
          EV
        </text>
        <text
          x="48"
          y="30.8"
          fill="rgba(190, 214, 242, 0.95)"
          fontSize="6.5"
          fontWeight="700"
          fontFamily="var(--font-display)"
        >
          PV
        </text>
        <text
          x="48.3"
          y="40"
          fill="rgba(176, 196, 222, 0.95)"
          fontSize="6.5"
          fontWeight="700"
          fontFamily="var(--font-display)"
        >
          AC
        </text>
      </svg>
    ),
  },
];

const leftBenefitItems = [
  {
    tone: "gold",
    title: "일정 관리",
    description: (
      <>
        CPM 네트워크 일정을 사용하여
        <br />
        지연공정을 모니터링하고
        <br />
        사전경고를 제공합니다.
      </>
    ),
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l4 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    tone: "red",
    title: "공기 분석",
    description: (
      <>
        공기연장 및 클레임 발생 시<br />
        CPM 네트워크를 사용하여
        <br />
        객관적인 분석을 제공합니다.
      </>
    ),
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
        <path d="M7 11h8M11 7v8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    tone: "violet",
    title: "BIM 연계",
    description: (
      <>
        시공 BIM을 동시에 수행하여 BIM과
        <br />
        공정관리의 연계를 수행하게 합니다.
      </>
    ),
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          d="M12 3L4 7l8 4 8-4-8-4zM4 12l8 4 8-4M4 17l8 4 8-4"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const keywordItems = [
  "시뮬레이션 예측",
  "다양한 분석 data 제공",
  <>
    초기 계획과의
    <br />
    비교/모니터링
  </>,
  "공기지연 분석",
  "월별 가동률을 고려한 공정계획",
  "공정률을 통한 기성관리",
  "만회대책 수립/반영",
  "투입 리소스를 고려한 향후예측",
  "향후 타 프로젝트를 위한 자료",
];

const rightBenefitItems = [
  {
    tone: "orange",
    title: "진행상황 추적",
    description: (
      <>
        매월 실제 업데이트를 통해
        <br />
        계획과 실제 진행상황을 비교합니다.
      </>
    ),
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M5 18v-4M10 18V9M15 18v-7M20 18V6" strokeLinecap="round" />
        <path d="M3 20h18" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    tone: "pink",
    title: "선진화된 공정관리",
    description: (
      <>
        Primavera 도구를 사용한 선진화된
        <br />
        공정관리 수행 현장임을 인식시킵니다.
      </>
    ),
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M4 20h16M6 20V8h12v12M9 8V4h6v4" strokeLinejoin="round" />
        <path d="M9 13h6M9 16h6" strokeLinecap="round" />
      </svg>
    ),
  },
];

const p6MsComparisonRows = [
  {
    category: "프로젝트 규모",
    p6: "초대형·복합 프로젝트 최적",
    ms: "소규모~중규모 적합",
    p6Accent: true,
    msAccent: false,
    p6Icon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 17H17M5 17V8H9V17M11 17V4H15V17"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    msIcon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 8H17M4 8L6 3H14L16 8M5 8V17H15V8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    category: "다중 프로젝트/포트폴리오",
    p6: "중앙 DB 기반 강력 처리",
    ms: "단일 프로젝트 중심",
    p6Accent: true,
    msAccent: false,
    p6Icon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse
          cx="10"
          cy="5"
          rx="5.5"
          ry="2.5"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M4.5 5V10C4.5 11.4 6.96 12.5 10 12.5C13.04 12.5 15.5 11.4 15.5 10V5M4.5 10V15C4.5 16.4 6.96 17.5 10 17.5C13.04 17.5 15.5 16.4 15.5 15V10"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    ),
    msIcon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6 3H12L16 7V17H6V3Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M12 3V7H16" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    category: "Baseline 비교",
    p6: "무제한 저장·비교",
    ms: "제한적 수준",
    p6Accent: true,
    msAccent: false,
    p6Icon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2.5 11C3.9 8 6 7 7.8 7C10.2 7 11.2 10 13.1 10C14.3 10 15.3 9.4 16.6 8M17.5 9C16.1 12 14 13 12.2 13C9.8 13 8.8 10 6.9 10C5.7 10 4.7 10.6 3.4 12"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    msIcon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    category: "리소스/로직 제어",
    p6: "고급 레벨링 / 복잡 로직 가능",
    ms: "기본 수준",
    p6Accent: true,
    msAccent: false,
    p6Icon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4 6H16M4 10H16M4 14H16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="8" cy="6" r="1.5" fill="currentColor" />
        <circle cx="12" cy="10" r="1.5" fill="currentColor" />
        <circle cx="9" cy="14" r="1.5" fill="currentColor" />
      </svg>
    ),
    msIcon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M10 6V10L13 12"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    category: "리스크/성과 분석",
    p6: "고급 분석 기능 지원",
    ms: "제한적",
    p6Accent: false,
    msAccent: false,
    p6Icon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 16H17M5 13L8 10L11 12L15 7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M14 7H15V8" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
    msIcon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 3V10H17"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    category: "비용",
    p6: "높은 초기 투자",
    ms: "낮은 진입 비용",
    p6Accent: false,
    msAccent: false,
    p6Icon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6 6C6 4.9 7.3 4 9 4C10.7 4 12 4.9 12 6C12 7.1 10.7 8 9 8C7.3 8 6 8.9 6 10C6 11.1 7.3 12 9 12C10.7 12 12 12.9 12 14C12 15.1 10.7 16 9 16C7.3 16 6 15.1 6 14"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M9 3V17M14 6H16M14 10H16M14 14H16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    msIcon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 4V16M13 7.2C13 6.1 11.7 5.2 10 5.2C8.3 5.2 7 6.1 7 7.2C7 8.3 8.3 9.2 10 9.2C11.7 9.2 13 10.1 13 11.2C13 12.3 11.7 13.2 10 13.2C8.3 13.2 7 12.3 7 11.2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    category: "사용자 접근성",
    p6: "학습 곡선 있음",
    ms: "사용자 친화적, Office 친화",
    p6Accent: false,
    msAccent: true,
    p6Icon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4 16V4M4 16H16M7 13C9 13 12 12.4 14 8C14.5 6.9 15 6 16 5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M14.2 5H16V6.8" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
    msIcon: (
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="10"
          cy="10"
          r="6.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle cx="7.7" cy="8.3" r="0.8" fill="currentColor" />
        <circle cx="12.3" cy="8.3" r="0.8" fill="currentColor" />
        <path
          d="M7.2 12.2C7.8 13 8.8 13.5 10 13.5C11.2 13.5 12.2 13 12.8 12.2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const p6MsComparisonSummary = [
  "Primavera P6는 대규모/복잡 프로젝트의 기준 도구이며,",
  "MS Project는 소규모 프로젝트와 빠른 도입이 요구되는 환경에 적합합니다.",
];

const formatSvgNumber = (value) =>
  Number.isInteger(value) ? value : Number(value.toFixed(2));

const buildRoundedOrthPath = (points, cornerRadius = 10) => {
  if (!Array.isArray(points) || points.length < 2) return "";

  const toPoint = (point) =>
    `${formatSvgNumber(point.x)} ${formatSvgNumber(point.y)}`;

  let d = `M ${toPoint(points[0])}`;

  for (let i = 1; i < points.length; i += 1) {
    const prev = points[i - 1];
    const curr = points[i];
    const next = points[i + 1];

    if (!next) {
      d += ` L ${toPoint(curr)}`;
      continue;
    }

    const v1x = curr.x - prev.x;
    const v1y = curr.y - prev.y;
    const v2x = next.x - curr.x;
    const v2y = next.y - curr.y;
    const len1 = Math.hypot(v1x, v1y);
    const len2 = Math.hypot(v2x, v2y);
    const isAxisAligned =
      (v1x === 0 || v1y === 0) && (v2x === 0 || v2y === 0) && len1 && len2;

    if (!isAxisAligned) {
      d += ` L ${toPoint(curr)}`;
      continue;
    }

    const r = Math.min(cornerRadius, len1 / 2, len2 / 2);
    const p1 = {
      x: curr.x - Math.sign(v1x) * r,
      y: curr.y - Math.sign(v1y) * r,
    };
    const p2 = {
      x: curr.x + Math.sign(v2x) * r,
      y: curr.y + Math.sign(v2y) * r,
    };

    d += ` L ${toPoint(p1)} Q ${toPoint(curr)} ${toPoint(p2)}`;
  }

  return d;
};

const overviewPrecisionDiagram = {
  viewBox: "0 0 760 440",
  nodes: [
    { x: 20, y: 266, width: 86, height: 34, rx: 8, tone: "is-main" },
    { x: 146, y: 258, width: 72, height: 20, rx: 6 },
    { x: 146, y: 288, width: 72, height: 20, rx: 6 },
    { x: 146, y: 336, width: 90, height: 28, rx: 8, tone: "is-main" },
    { x: 246, y: 266, width: 84, height: 34, rx: 8, tone: "is-main" },
    { x: 316, y: 164, width: 76, height: 32, rx: 8, tone: "is-main" },
    { x: 386, y: 70, width: 100, height: 32, rx: 7, tone: "is-core" },
    { x: 386, y: 110, width: 100, height: 32, rx: 7, tone: "is-core" },
    { x: 408, y: 150, width: 78, height: 18, rx: 6 },
    { x: 408, y: 176, width: 78, height: 18, rx: 6 },
    { x: 420, y: 202, width: 66, height: 18, rx: 6 },
    { x: 412, y: 228, width: 74, height: 20, rx: 6 },
    { x: 412, y: 254, width: 74, height: 20, rx: 6 },
    { x: 412, y: 280, width: 74, height: 20, rx: 6 },
    { x: 404, y: 306, width: 82, height: 20, rx: 6, tone: "is-main" },
    { x: 404, y: 332, width: 82, height: 20, rx: 6 },
    { x: 404, y: 358, width: 82, height: 20, rx: 6 },
    { x: 404, y: 384, width: 82, height: 20, rx: 6 },
    { x: 396, y: 410, width: 90, height: 20, rx: 6 },
    { x: 502, y: 122, width: 90, height: 32, rx: 7, tone: "is-main" },
    { x: 514, y: 160, width: 74, height: 20, rx: 6 },
    { x: 514, y: 186, width: 74, height: 20, rx: 6 },
    { x: 502, y: 254, width: 92, height: 34, rx: 7, tone: "is-main" },
    { x: 514, y: 292, width: 74, height: 20, rx: 6 },
    { x: 502, y: 344, width: 92, height: 34, rx: 7, tone: "is-main" },
    { x: 514, y: 382, width: 74, height: 20, rx: 6 },
    { x: 498, y: 400, width: 96, height: 30, rx: 7, tone: "is-main" },
  ],
  links: [
    [{ x: 106, y: 283 }, { x: 138, y: 283 }, { x: 138, y: 268 }, { x: 146, y: 268 }],
    [{ x: 106, y: 283 }, { x: 138, y: 283 }, { x: 138, y: 298 }, { x: 146, y: 298 }],
    [{ x: 218, y: 268 }, { x: 238, y: 268 }, { x: 238, y: 283 }, { x: 246, y: 283 }],
    [{ x: 218, y: 298 }, { x: 238, y: 298 }, { x: 238, y: 350 }, { x: 236, y: 350 }],
    [{ x: 236, y: 350 }, { x: 362, y: 350 }, { x: 362, y: 316 }, { x: 404, y: 316 }],
    [{ x: 372, y: 94 }, { x: 372, y: 424 }],
    [{ x: 372, y: 126 }, { x: 386, y: 126 }],
    [{ x: 372, y: 166 }, { x: 408, y: 166 }],
    [{ x: 372, y: 192 }, { x: 408, y: 192 }],
    [{ x: 372, y: 238 }, { x: 412, y: 238 }],
    [{ x: 372, y: 264 }, { x: 412, y: 264 }],
    [{ x: 372, y: 290 }, { x: 412, y: 290 }],
    [{ x: 372, y: 316 }, { x: 404, y: 316 }],
    [{ x: 372, y: 342 }, { x: 404, y: 342 }],
    [{ x: 372, y: 368 }, { x: 404, y: 368 }],
    [{ x: 372, y: 394 }, { x: 404, y: 394 }],
    [{ x: 372, y: 420 }, { x: 396, y: 420 }],
    [{ x: 486, y: 138 }, { x: 502, y: 138 }],
    [{ x: 486, y: 170 }, { x: 514, y: 170 }],
    [{ x: 486, y: 196 }, { x: 514, y: 196 }],
    [{ x: 486, y: 271 }, { x: 502, y: 271 }],
    [{ x: 486, y: 302 }, { x: 514, y: 302 }],
    [{ x: 486, y: 361 }, { x: 502, y: 361 }],
    [{ x: 486, y: 392 }, { x: 514, y: 392 }],
    [{ x: 486, y: 415 }, { x: 498, y: 415 }],
    [{ x: 626, y: 138 }, { x: 626, y: 415 }],
    [{ x: 592, y: 138 }, { x: 626, y: 138 }],
    [{ x: 588, y: 170 }, { x: 626, y: 170 }],
    [{ x: 588, y: 196 }, { x: 626, y: 196 }],
    [{ x: 594, y: 271 }, { x: 626, y: 271 }],
    [{ x: 588, y: 302 }, { x: 626, y: 302 }],
    [{ x: 594, y: 361 }, { x: 626, y: 361 }],
    [{ x: 588, y: 392 }, { x: 626, y: 392 }],
    [{ x: 594, y: 415 }, { x: 626, y: 415 }],
    [{ x: 626, y: 182 }, { x: 634, y: 182 }],
    [{ x: 626, y: 291 }, { x: 634, y: 291 }],
    [{ x: 626, y: 384 }, { x: 634, y: 384 }],
    [{ x: 634, y: 182 }, { x: 634, y: 384 }],
    [{ x: 634, y: 291 }, { x: 642, y: 291 }],
  ],
  criticalPathPoints: [
    { x: 74, y: 283 },
    { x: 106, y: 283 },
    { x: 106, y: 350 },
    { x: 246, y: 350 },
    { x: 246, y: 283 },
    { x: 316, y: 283 },
    { x: 316, y: 180 },
    { x: 386, y: 180 },
    { x: 386, y: 86 },
  ],
  criticalArrows: ["182,342 198,350 182,358", "342,172 358,180 342,188"],
  criticalStartDot: { cx: 74, cy: 283, r: 8 },
  criticalBadge: { x: 112, y: 188, width: 198, height: 46, textX: 211, textY: 218 },
  project: { x: 642, y: 248, width: 104, height: 86, textX: 694, textY: 301 },
};

const overviewPrecisionCriticalBasePathD = buildRoundedOrthPath(
  overviewPrecisionDiagram.criticalPathPoints,
  12,
);
const overviewPrecisionCriticalPathD = overviewPrecisionCriticalBasePathD;
function PPMPage() {
  const { sectionId, subId } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState(sections[0].id);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  // [MOD] ppm/functions/1: track selected feature card and selected image index
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [activeFeatureImageIndex, setActiveFeatureImageIndex] = useState(0);
  const [hoveredCardIndex2, setHoveredCardIndex2] = useState(null);
  // [MOD] ppm/functions/2: track selected feature card and selected image index
  const [activeFeature2Index, setActiveFeature2Index] = useState(0);
  const [activeFeature2ImageIndex, setActiveFeature2ImageIndex] = useState(0);

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

  const activeFunctionsSlideIndex = getFeatureItems2GlobalSlideIndex(
    activeFeatureIndex,
    activeFeatureImageIndex,
  );
  const activeFunctions2SlideIndex = getFeatureItemsGlobalSlideIndex(
    activeFeature2Index,
    activeFeature2ImageIndex,
  );

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
      if (!featureItems2Slides.length) return;
      const interval = setInterval(() => {
        // [MOD] ppm/functions/1: auto-rotate 5 slides (1,1,1,2)
        const nextSlideIndex =
          (activeFunctionsSlideIndex + 1) % featureItems2Slides.length;
        const nextPosition = getFeatureItems2SlidePosition(nextSlideIndex);
        setActiveFeatureIndex(nextPosition.featureIndex);
        setActiveFeatureImageIndex(nextPosition.imageIndex);
      }, 4000); // 4 seconds

      return () => clearInterval(interval);
    }

    if (activeSectionId === "functions-2") {
      if (!featureItemsSlides.length) return;
      const interval = setInterval(() => {
        // [MOD] ppm/functions/2: auto-rotate 5 slides (2,1,1,1)
        const nextSlideIndex =
          (activeFunctions2SlideIndex + 1) % featureItemsSlides.length;
        const nextPosition = getFeatureItemsSlidePosition(nextSlideIndex);
        setActiveFeature2Index(nextPosition.featureIndex);
        setActiveFeature2ImageIndex(nextPosition.imageIndex);
      }, 4000); // 4 seconds

      return () => clearInterval(interval);
    }
  }, [
    prefersReducedMotion,
    activeSectionId,
    activeFunctionsSlideIndex,
    activeFunctions2SlideIndex,
  ]);

  // [MOD] ppm/functions/1: click card -> move to first image of that card
  const setFunctionsFeature = useCallback((featureIndex) => {
    setActiveFeatureIndex(featureIndex);
    setActiveFeatureImageIndex(0);
  }, []);

  // [MOD] ppm/functions/1: click dot -> map to card and image index
  const setFunctionsSlideByGlobalIndex = useCallback((globalSlideIndex) => {
    const nextPosition = getFeatureItems2SlidePosition(globalSlideIndex);
    setActiveFeatureIndex(nextPosition.featureIndex);
    setActiveFeatureImageIndex(nextPosition.imageIndex);
  }, []);

  // [MOD] ppm/functions/2: click card -> move to first image of that card
  const setFunctions2Feature = useCallback((featureIndex) => {
    setActiveFeature2Index(featureIndex);
    setActiveFeature2ImageIndex(0);
  }, []);

  // [MOD] ppm/functions/2: click dot -> map to card and image index
  const setFunctions2SlideByGlobalIndex = useCallback((globalSlideIndex) => {
    const nextPosition = getFeatureItemsSlidePosition(globalSlideIndex);
    setActiveFeature2Index(nextPosition.featureIndex);
    setActiveFeature2ImageIndex(nextPosition.imageIndex);
  }, []);

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
      let isBenefitsSectionNumber = false;
      if (sectionId === "overview") {
        targetId = "overview-content";
        if (subId === "2") targetId = "overview-features-2";
        if (subId === "3") targetId = "overview-features-3";
      }
      if (sectionId === "functions") {
        isFunctionsSectionNumber = subId === "1" || subId === "2";
        targetId = subId === "2" ? "functions-2" : "functions";
      }
      if (sectionId === "benefits") {
        isBenefitsSectionNumber = subId === "1" || subId === "2";
        targetId = subId === "2" ? "benefits-2" : "benefits";
      }

      const targetIndex = sections.findIndex((s) => s.id === targetId);

      // Handle subId for slide navigation (1-based index from URL)
      // Note: Overview and Functions treat some subId values as SECTIONS, so we skip carousel linking for them here.
      if (
        subId &&
        sectionId !== "overview" &&
        !isFunctionsSectionNumber &&
        !isBenefitsSectionNumber
      ) {
        const slideIndex = parseInt(subId, 10) - 1;
        if (!isNaN(slideIndex) && slideIndex >= 0) {
          // overview-content is section-level only, not mapped to slide index
          if (targetId === "functions")
            setFunctionsSlideByGlobalIndex(slideIndex);
          if (targetId === "functions-2")
            setFunctions2SlideByGlobalIndex(slideIndex);
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
  }, [
    sectionId,
    subId,
    scrollToSection,
    setFunctionsSlideByGlobalIndex,
    setFunctions2SlideByGlobalIndex,
  ]);

  // Update URL based on section
  const updateUrlForSection = useCallback(
    (index) => {
      let path = "/ppm";
      // Index 0 (Hero) and 1 (Menu) stay as /ppm to avoid confusion
      if (index === 2) path = "/ppm/overview/1";
      if (index === 3) path = "/ppm/overview/2";
      if (index === 4) path = "/ppm/overview/3";
      if (index === 5) path = "/ppm/functions/1";
      if (index === 6) path = "/ppm/functions/2";
      if (index === 7) path = "/ppm/benefits/1";
      if (index === 8) path = "/ppm/benefits/2";

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
    const footerSection = document.querySelector(".footer");
    const snapTargets = footerSection ? [...panels, footerSection] : panels;
    const lastPanelIndex = panels.length - 1;
    const lastSnapIndex = snapTargets.length - 1;

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

    // Wheel event handler
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
      const threshold = 50;

      if (Math.abs(delta) < threshold) return;

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
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        "-=0.2",
      );

      const overviewCards = overviewCardsRef.current.filter(Boolean);
      if (overviewCards.length) {
        overviewContentTl.fromTo(
          overviewCards,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.1 },
          "-=0.25",
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

      const benefitsInfographic = benefitsSectionRef.current.querySelector(
        ".ppm-benefits-infographic",
      );
      const benefitsLeftNodes = benefitsSectionRef.current.querySelectorAll(
        ".ppm-benefits-column-left .ppm-benefits-node",
      );
      const benefitsHub =
        benefitsSectionRef.current.querySelector(".ppm-benefits-hub");
      const benefitsKeywordCards = benefitsSectionRef.current.querySelectorAll(
        ".ppm-benefits-keyword",
      );
      const benefitsRightNodes = benefitsSectionRef.current.querySelectorAll(
        ".ppm-benefits-column-right .ppm-benefits-node",
      );

      if (benefitsInfographic) {
        benefitsTl.fromTo(
          benefitsInfographic,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.2",
        );
      }

      if (benefitsLeftNodes.length) {
        benefitsTl.fromTo(
          benefitsLeftNodes,
          { x: -36, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.45, stagger: 0.12 },
          "-=0.4",
        );
      }

      if (benefitsHub) {
        benefitsTl.fromTo(
          benefitsHub,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.55, ease: "power2.out" },
          "-=0.35",
        );
      }

      if (benefitsKeywordCards.length) {
        benefitsTl.fromTo(
          benefitsKeywordCards,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.34, stagger: 0.05 },
          "-=0.3",
        );
      }

      if (benefitsRightNodes.length) {
        benefitsTl.fromTo(
          benefitsRightNodes,
          { x: 36, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.44, stagger: 0.14 },
          "-=0.2",
        );
      }
    });

    return () => ctx.revert();
  };

  return (
    <>
      <div className="ppm-page ppm-page-container" ref={containerRef}>
        {/* Hero Section */}
        <section
          className="ppm-panel ppm-hero-section"
          id="hero"
          ref={heroSectionRef}
          style={{
            backgroundImage: `linear-gradient(rgba(10, 10, 15, 0.7), rgba(10, 10, 15, 0.9)), url(${getAssetPath("/PPM.png")})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="ppm-hero-content">
            <h1 className="ppm-hero-title">
              Primavera P6
              <br />
              Professional Project Management
            </h1>
            <p className="ppm-hero-subtitle">Primavera P6 PPM</p>
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
                CPM 기반 통합 일정 (공정)
                <br />
                계획 · 분석 · 통제 솔루션
              </h2>

              {/* Description */}
              <p className="ppm-overview-description">
                초대형 프로젝트의 CPM 기반 일정(공정) 계획·분석·통제를 지원하는
                Windows 데스크톱 애플리케이션으로
                <br />
                베이스라인 비교, 진도 업데이트, 자원/비용 연계를 통해 프로젝트
                수행을 정밀하게 관리합니다.
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
              <h2 className="ppm-cpm-title">
                Primavera P6가 제공하는 결정적 비즈니스 가치
              </h2>
            </div>

            <div
              className="ppm-overview-infographic"
              ref={overviewImageCardRef}
            >
              <div className="ppm-overview-infographic-row ppm-overview-infographic-row-top">
                {overviewValueItemsTop.map((item, index) => (
                  <article
                    key={item.titleEn}
                    className="ppm-overview-value-item"
                    ref={(el) => (overviewCardsRef.current[index] = el)}
                  >
                    <div className="ppm-overview-value-icon" aria-hidden="true">
                      {renderOverviewValueIcon(item.iconType)}
                    </div>
                    <h3 className="ppm-overview-value-title">
                      <span className="ppm-overview-value-title-ko">
                        {item.titleKo}
                      </span>
                      <span className="ppm-overview-value-title-en">
                        ({item.titleEn})
                      </span>
                    </h3>
                    <p className="ppm-overview-value-description">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>

              <div
                className="ppm-overview-infographic-divider"
                aria-hidden="true"
              />

              <div className="ppm-overview-infographic-row ppm-overview-infographic-row-bottom">
                {overviewValueItemsBottom.map((item, index) => (
                  <article
                    key={item.titleEn}
                    className="ppm-overview-value-item"
                    ref={(el) =>
                      (overviewCardsRef.current[
                        overviewValueItemsTop.length + index
                      ] = el)
                    }
                  >
                    <div className="ppm-overview-value-icon" aria-hidden="true">
                      {renderOverviewValueIcon(item.iconType)}
                    </div>
                    <h3 className="ppm-overview-value-title">
                      <span className="ppm-overview-value-title-ko">
                        {item.titleKo}
                      </span>
                      <span className="ppm-overview-value-title-en">
                        ({item.titleEn})
                      </span>
                    </h3>
                    <p className="ppm-overview-value-description">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Overview Content 2 Section */}
        <section
          className="ppm-panel ppm-overview-content-section ppm-overview-precision-section"
          id="overview-features-2"
        >
          <div className="ppm-cpm-container">
            <div className="ppm-cpm-header">
              <h2 className="ppm-cpm-title">
                특징 1: PMBOK 기반의 프로젝트 공정 관리
              </h2>
            </div>

            <div className="ppm-overview-precision-layout">
              <article className="ppm-overview-precision-module">
                <div
                  className="ppm-overview-precision-module-icon"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="27"
                      cy="29"
                      r="18"
                      stroke="currentColor"
                      strokeWidth="2.4"
                    />
                    <path
                      d="M27 19V29L33 33"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                    <path
                      d="M13 29H10M44 29H41M27 12V9M27 49V46"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M47 19C50.5 23 52.6 28.2 52.6 33.8"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                    <path
                      d="M48 40L51.8 33.8L57.2 38.8"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="47.5"
                      cy="40.5"
                      r="8.6"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M47.5 35.8V45.2M42.8 40.5H52.2M44.3 37.3L50.7 43.7M44.3 43.7L50.7 37.3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h3 className="ppm-overview-precision-module-title">
                  <span className="ppm-overview-precision-module-title-ko">
                    CPM 기반 일정 엔진
                  </span>
                  <span className="ppm-overview-precision-module-title-en">
                    (CPM-based Scheduling Engine)
                  </span>
                </h3>
                <p className="ppm-overview-precision-module-description">
                  Critical Path 및 Float의 수학적 분석을 통해 프로젝트의 가장
                  중요한 경로를 식별하고 잠재적 지연을 예측합니다.
                </p>
              </article>

              <div
                className="ppm-overview-precision-diagram"
                aria-label="CPM 및 WBS 네트워크 로직 다이어그램"
              >
                <svg
                  className="ppm-overview-precision-svg"
                  viewBox={overviewPrecisionDiagram.viewBox}
                  role="img"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <title>CPM 및 WBS 네트워크 로직 다이어그램</title>

                  <g className="ppm-overview-precision-line-group" aria-hidden="true">
                    <path
                      className="ppm-overview-precision-line"
                      d={overviewPrecisionCriticalBasePathD}
                    />
                    {overviewPrecisionDiagram.links.map((points, index) => (
                      <path
                        key={`precision-link-${index}`}
                        className="ppm-overview-precision-line"
                        d={buildRoundedOrthPath(points, 8)}
                      />
                    ))}
                  </g>

                  <g className="ppm-overview-precision-node-group" aria-hidden="true">
                    {overviewPrecisionDiagram.nodes.map((node, index) => (
                      <rect
                        key={`precision-node-${index}`}
                        className={`ppm-overview-precision-node${node.tone ? ` ${node.tone}` : ""}`}
                        x={node.x}
                        y={node.y}
                        width={node.width}
                        height={node.height}
                        rx={node.rx}
                      />
                    ))}
                  </g>

                  <g className="ppm-overview-precision-critical-group" aria-hidden="true">
                    <path
                      className="ppm-overview-precision-critical-path"
                      d={overviewPrecisionCriticalPathD}
                    />
                    <circle
                      className="ppm-overview-precision-critical-dot"
                      cx={overviewPrecisionDiagram.criticalStartDot.cx}
                      cy={overviewPrecisionDiagram.criticalStartDot.cy}
                      r={overviewPrecisionDiagram.criticalStartDot.r}
                    />
                    {overviewPrecisionDiagram.criticalArrows.map((points, index) => (
                      <polygon
                        key={`precision-critical-arrow-${index}`}
                        className="ppm-overview-precision-critical-arrow"
                        points={points}
                      />
                    ))}
                    <g className="ppm-overview-precision-critical-badge">
                      <rect
                        x={overviewPrecisionDiagram.criticalBadge.x}
                        y={overviewPrecisionDiagram.criticalBadge.y}
                        width={overviewPrecisionDiagram.criticalBadge.width}
                        height={overviewPrecisionDiagram.criticalBadge.height}
                        rx="10"
                      />
                      <text
                        x={overviewPrecisionDiagram.criticalBadge.textX}
                        y={overviewPrecisionDiagram.criticalBadge.textY}
                        textAnchor="middle"
                      >
                        Critical Path
                      </text>
                    </g>
                  </g>

                  <g className="ppm-overview-precision-project-group" aria-hidden="true">
                    <rect
                      className="ppm-overview-precision-project-box"
                      x={overviewPrecisionDiagram.project.x}
                      y={overviewPrecisionDiagram.project.y}
                      width={overviewPrecisionDiagram.project.width}
                      height={overviewPrecisionDiagram.project.height}
                      rx="10"
                    />
                    <text
                      className="ppm-overview-precision-project-text"
                      x={overviewPrecisionDiagram.project.textX}
                      y={overviewPrecisionDiagram.project.textY}
                      textAnchor="middle"
                    >
                      Project
                    </text>
                  </g>
                </svg>
              </div>

              <article className="ppm-overview-precision-module">
                <div
                  className="ppm-overview-precision-module-icon"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="24"
                      y="8"
                      width="16"
                      height="14"
                      rx="3"
                      stroke="currentColor"
                      strokeWidth="2.2"
                    />
                    <circle
                      cx="14"
                      cy="42"
                      r="5.5"
                      stroke="currentColor"
                      strokeWidth="2.2"
                    />
                    <circle
                      cx="32"
                      cy="42"
                      r="5.5"
                      stroke="currentColor"
                      strokeWidth="2.2"
                    />
                    <circle
                      cx="50"
                      cy="42"
                      r="5.5"
                      stroke="currentColor"
                      strokeWidth="2.2"
                    />
                    <path
                      d="M32 22V30M20 30H44M20 30L14 36M32 30V36M44 30L50 36"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 52H54"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h3 className="ppm-overview-precision-module-title">
                  <span className="ppm-overview-precision-module-title-ko">
                    WBS 및 네트워크 로직
                  </span>
                  <span className="ppm-overview-precision-module-title-en">
                    (WBS &amp; Network Logic)
                  </span>
                </h3>
                <p className="ppm-overview-precision-module-description">
                  복잡한 프로젝트를 위계적인 WBS(작업
                  <br />
                  분해 구조)로 명확하게 구조화하고,
                  <br />
                  작업 간의 논리적 관계를 정의하여
                  <br />
                  전체 공정을 시각화합니다.
                </p>
              </article>
            </div>
          </div>
        </section>
        {/* Overview Content 3 Section */}
        <section
          className="ppm-panel ppm-overview-content-section ppm-overview-precision-section"
          id="overview-features-3"
        >
          <div className="ppm-cpm-container">
            <div className="ppm-cpm-header">
              <h2 className="ppm-cpm-title">
                특징 2: 비용 일정 통합 기반 EVMS 분석 제공
              </h2>
            </div>

            <div className="ppm-overview-infographic">
              <div className="ppm-overview-infographic-row ppm-overview-infographic-row-top">
                {overviewEvmsItems.map((item) => (
                  <article
                    key={item.titleEn}
                    className="ppm-overview-value-item"
                  >
                    <div className="ppm-overview-value-icon" aria-hidden="true">
                      {item.icon}
                    </div>
                    <h3 className="ppm-overview-value-title">
                      <span className="ppm-overview-value-title-ko">
                        {item.titleKo}
                      </span>
                      <span className="ppm-overview-value-title-en">
                        ({item.titleEn})
                      </span>
                    </h3>
                    <p className="ppm-overview-value-description">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
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
                    {featureItems2Slides.map((slide, index) => (
                      <div
                        key={index}
                        className={`cpm-carousel-slide ${index === activeFunctionsSlideIndex ? "active" : ""}`}
                        style={{
                          transform: `translateX(-${activeFunctionsSlideIndex * 100}%)`,
                        }}
                      >
                        <img
                          src={slide.src}
                          alt={slide.alt}
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
                    {featureItems2Slides.map((_, index) => (
                      <button
                        key={index}
                        className={`cpm-carousel-dot ${index === activeFunctionsSlideIndex ? "active" : ""}`}
                        onClick={() => setFunctionsSlideByGlobalIndex(index)}
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
                      className={`cpm-feature-card ${hoveredCardIndex !== null && hoveredCardIndex !== index ? "dimmed" : ""} ${index === activeFeatureIndex ? "active" : ""}`}
                      ref={(el) => (featureCardsRef.current[index] = el)}
                      onClick={() => setFunctionsFeature(index)}
                      onMouseEnter={() => setHoveredCardIndex(index)}
                    >
                      <div className="cpm-feature-icon">{item.icon}</div>
                      <h4 className="cpm-feature-title">{item.title}</h4>

                      {index < featureItems2.length - 1 && (
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
                    {featureItemsSlides.map((slide, index) => (
                      <div
                        key={index}
                        className={`cpm-carousel-slide ${index === activeFunctions2SlideIndex ? "active" : ""}`}
                        style={{
                          transform: `translateX(-${activeFunctions2SlideIndex * 100}%)`,
                        }}
                      >
                        <img
                          src={slide.src}
                          alt={slide.alt}
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
                    {featureItemsSlides.map((_, index) => (
                      <button
                        key={index}
                        className={`cpm-carousel-dot ${index === activeFunctions2SlideIndex ? "active" : ""}`}
                        onClick={() => setFunctions2SlideByGlobalIndex(index)}
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
                      className={`cpm-feature-card ${hoveredCardIndex2 !== null && hoveredCardIndex2 !== index ? "dimmed" : ""} ${index === activeFeature2Index ? "active" : ""}`}
                      ref={(el) => (featureCardsRef2.current[index] = el)}
                      onClick={() => setFunctions2Feature(index)}
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
              <h2 className="ppm-cpm-title">
                Primavera를 활용한 CPM 공정관리 이점
              </h2>
            </div>

            <div className="ppm-benefits-infographic">
              <svg
                className="ppm-benefits-connectors"
                viewBox="0 0 1200 560"
                aria-hidden="true"
              >
                <defs>
                  <marker
                    id="ppm-benefits-arrow"
                    markerWidth="12"
                    markerHeight="8"
                    refX="10"
                    refY="4"
                    orient="auto"
                  >
                    <path d="M0 0L12 4L0 8Z" fill="rgba(172, 216, 244, 0.6)" />
                  </marker>
                </defs>
                <path
                  d="M300 280H500"
                  fill="none"
                  stroke="rgba(172, 216, 244, 0.45)"
                  strokeWidth="1.6"
                  markerEnd="url(#ppm-benefits-arrow)"
                />
                <path
                  d="M700 280H900"
                  fill="none"
                  stroke="rgba(172, 216, 244, 0.45)"
                  strokeWidth="1.6"
                  markerEnd="url(#ppm-benefits-arrow)"
                />
              </svg>

              <div className="ppm-benefits-column ppm-benefits-column-left">
                {leftBenefitItems.map((item) => (
                  <article
                    key={item.title}
                    className={`ppm-benefits-node ppm-benefits-node-${item.tone}`}
                  >
                    <div
                      className={`ppm-benefits-node-icon ppm-tone-${item.tone}`}
                    >
                      {item.icon}
                    </div>
                    <div className="ppm-benefits-node-copy">
                      <h3 className="ppm-benefits-node-title">{item.title}</h3>
                      <p className="ppm-benefits-node-description">
                        {item.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="ppm-benefits-column ppm-benefits-column-center">
                <div className="ppm-benefits-hub">
                  <div className="ppm-benefits-hub-frame">
                    <svg
                      viewBox="0 0 220 220"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <circle
                        cx="110"
                        cy="110"
                        r="95"
                        stroke="rgba(175, 226, 255, 0.25)"
                        strokeWidth="2"
                      />
                      <circle
                        cx="110"
                        cy="110"
                        r="74"
                        fill="rgba(0, 195, 255, 0.08)"
                        stroke="rgba(0, 212, 255, 0.35)"
                        strokeWidth="2"
                      />
                      <rect
                        x="74"
                        y="54"
                        width="72"
                        height="116"
                        rx="10"
                        fill="rgba(8, 16, 28, 0.92)"
                        stroke="rgba(190, 233, 255, 0.45)"
                        strokeWidth="2"
                      />
                      <rect
                        x="84"
                        y="68"
                        width="52"
                        height="64"
                        rx="6"
                        fill="rgba(0, 212, 255, 0.12)"
                      />
                      <path
                        d="M92 89H128M92 101H121M92 113H118"
                        stroke="rgba(194, 239, 255, 0.95)"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M114 154L130 138"
                        stroke="rgba(255, 171, 66, 0.95)"
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="132"
                        cy="136"
                        r="10"
                        fill="rgba(255, 171, 66, 0.9)"
                      />
                    </svg>
                  </div>
                  <p className="ppm-benefits-hub-caption">CPM HUB</p>
                </div>
              </div>

              <div className="ppm-benefits-column ppm-benefits-column-right">
                <div className="ppm-benefits-keyword-grid">
                  {keywordItems.map((label) => (
                    <div key={label} className="ppm-benefits-keyword">
                      {label}
                    </div>
                  ))}
                </div>

                <div className="ppm-benefits-results">
                  {rightBenefitItems.map((item) => (
                    <article
                      key={item.title}
                      className={`ppm-benefits-node ppm-benefits-node-${item.tone} ppm-benefits-node-right`}
                    >
                      <div
                        className={`ppm-benefits-node-icon ppm-tone-${item.tone}`}
                      >
                        {item.icon}
                      </div>
                      <div className="ppm-benefits-node-copy">
                        <h3 className="ppm-benefits-node-title">
                          {item.title}
                        </h3>
                        <p className="ppm-benefits-node-description">
                          {item.description}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section 2 */}
        <section
          className="ppm-panel ppm-overview-content-section ppm-overview-precision-section ppm-benefits-compare-section"
          id="benefits-2"
        >
          <div className="ppm-cpm-container">
            <div className="ppm-cpm-header">
              <h2 className="ppm-cpm-title">Primavera P6 vs. MS Project</h2>
            </div>

            <div className="ppm-benefits-compare-shell">
              <div className="ppm-overview-infographic ppm-benefits-compare-card">
                <div className="ppm-benefits-compare-table-wrap">
                  <table className="ppm-benefits-compare-table">
                    <thead>
                      <tr>
                        <th scope="col">항목 (Category)</th>
                        <th scope="col">Primavera P6</th>
                        <th scope="col">MS Project</th>
                      </tr>
                    </thead>
                    <tbody>
                      {p6MsComparisonRows.map((row) => (
                        <tr key={row.category}>
                          <th scope="row">{row.category}</th>
                          <td data-label="Primavera P6">
                            <div className="ppm-benefits-compare-cell">
                              <span
                                className={`ppm-benefits-compare-text ${row.p6Accent ? "ppm-benefits-compare-text-accent" : ""}`}
                              >
                                {row.p6}
                              </span>
                              <span
                                className="ppm-benefits-compare-icon"
                                aria-hidden="true"
                              >
                                {row.p6Icon}
                              </span>
                            </div>
                          </td>
                          <td data-label="MS Project">
                            <div className="ppm-benefits-compare-cell">
                              <span
                                className={`ppm-benefits-compare-text ${row.msAccent ? "ppm-benefits-compare-text-accent-soft" : ""}`}
                              >
                                {row.ms}
                              </span>
                              <span
                                className="ppm-benefits-compare-icon"
                                aria-hidden="true"
                              >
                                {row.msIcon}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="ppm-benefits-compare-summary">
                {p6MsComparisonSummary.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
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
