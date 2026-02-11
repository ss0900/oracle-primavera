export interface AconexHomeMenuCard {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  href: string;
}

// 홈 Aconex 섹션 카드 데이터입니다.
// 추후 이미지/문구를 교체하려면 이 배열의 imageSrc, title, description을 수정하세요.
export const aconexHomeMenuCards: AconexHomeMenuCard[] = [
  {
    id: "overview",
    title: "개요",
    description:
      "건설 프로젝트 협업의 핵심 개념과 적용 범위를 빠르게 확인합니다.",
    imageSrc: encodeURI("/Aconex 개요.png"),
    href: "/aconex/overview/1",
  },
  {
    id: "functions",
    title: "기능 소개",
    description:
      "문서 관리, 워크플로우, 커뮤니케이션 기능을 중심으로 Aconex 활용 방식을 살펴봅니다.",
    imageSrc: encodeURI("/Aconex 기능 소개.png"),
    href: "/aconex/functions/1",
  },
  {
    id: "benefits",
    title: "효과",
    description:
      "Aconex 도입으로 얻는 협업 효율과 리스크 절감 효과를 확인합니다.",
    imageSrc: encodeURI("/Aconex 효과.png"),
    href: "/aconex/benefits/1",
  },
];
