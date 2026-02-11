export const eppmFunctionsIntro = {
  title: "기능 소개",
  items: [
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
          일정 관리
          <br />- EPS, WBS, Activity 구조 관리
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
          진척 관리
          <br />- Activity%Complete 관리
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
      title: (
        <>
          자원 관리
          <br />- 작업에 필요한 자원 연결
        </>
      ),
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
          공정 분석
          <br />- Critical Path 및 Float 분석
        </>
      ),
    },
  ],
  heroImages: [
    {
      src: "/일정 관리.png",
      alt: "기능 소개 - 일정 관리",
    },
    {
      src: "/진척 관리.png",
      alt: "기능 소개 - 진척 관리",
    },
    {
      src: "/자원 관리.png",
      alt: "기능 소개 - 자원 관리",
    },
    {
      src: "/공정 분석.png",
      alt: "기능 소개 - 공정 분석",
    },
  ],
};

export const unifierFunctionsIntro = {
  title: "기능 소개",
  items: [
    {
      ...eppmFunctionsIntro.items[0],
      title: (
        <>
          비즈니스 프로세스와 <br /> 워크플로우 자동화
        </>
      ),
    },
    {
      ...eppmFunctionsIntro.items[1],
      title: <>계약 · 조달 · 변경 관리</>,
    },
    {
      ...eppmFunctionsIntro.items[2],
      title: <>비용 관리</>,
    },
    {
      ...eppmFunctionsIntro.items[3],
      title: (
        <>
          자금 · 현금 흐름 및 <br />
          다중 기준선 / 예측 비교
        </>
      ),
    },
  ],
  heroImages: [
    {
      src: "/비즈니스 프로세스(Business Processes, BP)·워크플로우 자동화.png",
      alt: "기능 소개 - 비즈니스 프로세스 및 워크플로우 자동화",
    },
    {
      src: "/계약(Contract)·조달·변경(Change) 관리.png",
      alt: "기능 소개 - 계약, 조달 및 변경 관리",
    },
    {
      src: "/비용관리(Cost Management) 예산·원가·실적·예측(Forecast).png",
      alt: "기능 소개 - 비용 관리",
    },
    {
      src: "/자금·현금흐름(Cash Flow) 및 다중 기준선예측 비교.png",
      alt: "기능 소개 - 자금 및 현금 흐름 관리",
    },
  ],
};
