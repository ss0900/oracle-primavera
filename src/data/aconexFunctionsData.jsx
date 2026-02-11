import { getAssetPath } from "../utils/assetPath";
export const aconexFunctionsIntro = {
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
      title: <>문서 관리</>,
      image: getAssetPath("/문서 관리(Document Control  Document Register).png"),
      alt: "기능 소개 - 문서 관리",
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
      title: <>문서 송부</>,
      image: getAssetPath("/문서 송부(Transmittals).png"),
      alt: "기능 소개 - 문서 송부",
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
      title: <>메일 + 업무폼</>,
      image: getAssetPath("/메일(Mail) + 업무폼(RFI 등 Mail Type 기반).png"),
      alt: "기능 소개 - 메일 + 업무폼",
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
          검토 / 승인
          <br />& My Tasks
        </>
      ),
      image: getAssetPath("/워크플로우(Workflows) – 검토승인 & My Tasks.png"),
      alt: "기능 소개 - 워크플로우 – 검토/승인 & My Tasks",
    },
  ],
};
