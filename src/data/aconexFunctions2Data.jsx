import { aconexFunctionsIntro } from "./aconexFunctionsData";

const [workflowIcon, taskIcon, timesheetIcon, scopeIcon] =
  aconexFunctionsIntro.items.map((item) => item.icon);

export const aconexFunctions2Title = "기능 소개";

export const aconexFunctions2FeatureItems = [
  {
    icon: workflowIcon,
    title: (
      <>
        이슈, 점검,
        <br />
        펀치리스트
      </>
    ),
  },
  {
    icon: taskIcon,
    title: (
      <>
        뷰잉 / 공유 및<br />
        모델 코디네이션
      </>
    ),
  },
  { icon: timesheetIcon, title: "협력사 / 벤더 문서" },
  { icon: scopeIcon, title: "대시보드 / 리포팅" },
];

export const aconexFunctions2Images = [
  {
    src: "/현장(Field  Mobile) – 이슈·점검·펀치리스트.png",
    alt: "기능 소개 - 이슈, 점검, 펀치리스트",
  },
  {
    src: "/모델(Models) – 뷰잉공유 + 모델 코디네이션(Model Coordination).png",
    alt: "기능 소개 - 뷰잉 / 공유 및 모델 코디네이션",
  },
  {
    src: "/협력사벤더 문서(SupplierVendor Documents).png",
    alt: "기능 소개 - 협력사 / 벤더 문서",
  },
  {
    src: "/대시보드리포팅(분석가시화).png",
    alt: "기능 소개 - 대시보드 / 리포팅",
  },
];
