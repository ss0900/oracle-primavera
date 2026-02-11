import { getAssetPath } from "../utils/assetPath";
export const unifierFunctions2Intro = {
  title: "기능 소개",
  items: [
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
      title: "대시보드 · 리포팅 · 분석",
      image: getAssetPath("/대시보드·리포팅·분석(Analytics  Dashboards).png"),
      alt: "기능 소개 - 대시보드 · 리포팅 · 분석",
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
          문서 / 첨부 · 마크업과
          <br />
          Document Manager 연계
        </>
      ),
      image: getAssetPath("/문서첨부·마크업 + Document Manager 연계.png"),
      alt: "기능 소개 - 문서/첨부·마크업 + Document Manager 연계",
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
          알림, 태스크와
          <br /> 이메일 기반 처리 지원
        </>
      ),
      image: getAssetPath("/알림·태스크(Tasks)·이메일 기반 처리 지원.png"),
      alt: "기능 소개 - 알림, 태스크 및 이메일 기반 처리 지원",
    },
  ],
};
