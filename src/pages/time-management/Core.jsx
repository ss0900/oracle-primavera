import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function TimeManagementCore() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const definitionBoxRef = useRef(null);
  const treeRef = useRef(null);
  const nodesRef = useRef([]);
  // const linesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Title fade-in
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      );

      // 2. Definition box slide-in
      if (definitionBoxRef.current) {
        tl.fromTo(
          definitionBoxRef.current,
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" },
          "-=0.3",
        );
      }

      // 3. Tree container fade-in
      if (treeRef.current) {
        tl.fromTo(
          treeRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
          "-=0.2",
        );
      }

      // // 4. Connection lines draw
      // linesRef.current.forEach((line, i) => {
      //   if (line) {
      //     tl.fromTo(
      //       line,
      //       { strokeDasharray: "1000", strokeDashoffset: 1000 },
      //       { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" },
      //       i === 0 ? "-=0.4" : "<",
      //     );
      //   }
      // });

      // // 5. Nodes pop-up sequentially by level
      nodesRef.current.forEach((node, i) => {
        if (node) {
          tl.fromTo(
            node,
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" },
            i === 0 ? "-=0.6" : "-=0.3",
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="tm-core-page" ref={containerRef}>
      <div className="tm-core-container">
        {/* Breadcrumb */}
        <nav className="tm-breadcrumb">
          <button onClick={() => navigate("/")} className="tm-breadcrumb-home">
            <span className="tm-breadcrumb-home-icon">H</span>
          </button>
          <span className="tm-breadcrumb-separator">&gt;</span>
          <button
            onClick={() => navigate("/time-management")}
            className="tm-breadcrumb-item"
          >
            Time Management
          </button>
          <span className="tm-breadcrumb-separator">&gt;</span>
          <span className="tm-breadcrumb-item tm-breadcrumb-current">
            핵심 개념
          </span>
        </nav>

        {/* Title */}
        <div className="tm-core-header" ref={titleRef}>
          <h1 className="tm-core-title">WBS (Work Breakdown Structure)</h1>
        </div>

        {/* Definition Box */}
        <div className="tm-core-definition" ref={definitionBoxRef}>
          <div className="tm-definition-label">정의</div>
          <div className="tm-definition-content">
            프로젝트 산출물 중심의 계층적 구조 (의사소통 및 관리의 기준)
          </div>
        </div>

        {/* WBS Tree Diagram */}
        <div className="tm-wbs-diagram" ref={treeRef}>
          <svg
            className="tm-wbs-svg"
            viewBox="0 0 1400 850"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Connection Lines */}
            {/* <g className="tm-wbs-lines"> */}
            {/* Level 1 (Project) to Level 2 (Design, Procurement, Construction) */}
            {/* <path
                ref={(el) => (linesRef.current[0] = el)}
                d="M700 120 V160 H300 V200"
                stroke="var(--color-accent)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              />
              <path
                ref={(el) => (linesRef.current[1] = el)}
                d="M700 120 V200"
                stroke="var(--color-accent)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              />
              <path
                ref={(el) => (linesRef.current[2] = el)}
                d="M700 120 V160 H1100 V200"
                stroke="var(--color-accent)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              /> */}

            {/* Level 2 (Construction) to Level 3 (Zone A, Zone B) */}
            {/* <path
                ref={(el) => (linesRef.current[3] = el)}
                d="M1100 260 V310 H950 V360"
                stroke="var(--color-accent)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              />
              <path
                ref={(el) => (linesRef.current[4] = el)}
                d="M1100 260 V310 H1250 V360"
                stroke="var(--color-accent)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              /> */}

            {/* Level 3 (Zone A) to Level 4 (토목, 건축, 기계) */}
            {/* <path
                ref={(el) => (linesRef.current[5] = el)}
                d="M950 420 V470 H750 V520"
                stroke="var(--color-accent)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              />
              <path
                ref={(el) => (linesRef.current[6] = el)}
                d="M950 420 V520"
                stroke="var(--color-accent)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              />
              <path
                ref={(el) => (linesRef.current[7] = el)}
                d="M950 420 V470 H1150 V520"
                stroke="var(--color-accent)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              /> */}

            {/* Level 4 (토목) to Level 5 (Activities) */}
            {/* <path
                ref={(el) => (linesRef.current[8] = el)}
                d="M750 580 V630 H550 V680"
                stroke="var(--color-accent)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              />
              <path
                ref={(el) => (linesRef.current[9] = el)}
                d="M750 580 V680"
                stroke="var(--color-accent)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              /> */}

            {/* Level 4 (건축) to Level 5 (Activity) */}
            {/* <path
                ref={(el) => (linesRef.current[10] = el)}
                d="M950 580 V680"
                stroke="var(--color-accent)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              /> */}

            {/* Level 4 (기계) to Level 5 (Activity) */}
            {/* <path
                ref={(el) => (linesRef.current[11] = el)}
                d="M1150 580 V680"
                stroke="var(--color-accent)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              />
            </g> */}

            {/* Nodes */}
            <g className="tm-wbs-nodes">
              {/* Level 1: Project */}
              <g ref={(el) => (nodesRef.current[0] = el)}>
                <rect
                  x="600"
                  y="60"
                  width="200"
                  height="60"
                  rx="8"
                  fill="var(--color-bg-tertiary)"
                  stroke="var(--color-accent)"
                  strokeWidth="2"
                />
                <text
                  x="700"
                  y="85"
                  textAnchor="middle"
                  fill="var(--color-text-primary)"
                  fontSize="14"
                  fontWeight="600"
                >
                  Project
                </text>
                <text
                  x="700"
                  y="105"
                  textAnchor="middle"
                  fill="var(--color-text-secondary)"
                  fontSize="12"
                >
                  (EPC 공사)
                </text>
              </g>

              {/* Level 2: Design, Procurement, Construction */}
              <g ref={(el) => (nodesRef.current[1] = el)}>
                <rect
                  x="200"
                  y="200"
                  width="200"
                  height="60"
                  rx="8"
                  fill="var(--color-bg-tertiary)"
                  stroke="var(--color-accent)"
                  strokeWidth="2"
                />
                <text
                  x="300"
                  y="225"
                  textAnchor="middle"
                  fill="var(--color-text-primary)"
                  fontSize="14"
                  fontWeight="600"
                >
                  Design
                </text>
                <text
                  x="300"
                  y="245"
                  textAnchor="middle"
                  fill="var(--color-text-secondary)"
                  fontSize="12"
                >
                  (설계)
                </text>
              </g>

              <g ref={(el) => (nodesRef.current[2] = el)}>
                <rect
                  x="600"
                  y="200"
                  width="200"
                  height="60"
                  rx="8"
                  fill="var(--color-bg-tertiary)"
                  stroke="var(--color-accent)"
                  strokeWidth="2"
                />
                <text
                  x="700"
                  y="225"
                  textAnchor="middle"
                  fill="var(--color-text-primary)"
                  fontSize="14"
                  fontWeight="600"
                >
                  Procurement
                </text>
                <text
                  x="700"
                  y="245"
                  textAnchor="middle"
                  fill="var(--color-text-secondary)"
                  fontSize="12"
                >
                  (구매)
                </text>
              </g>

              <g ref={(el) => (nodesRef.current[3] = el)}>
                <rect
                  x="1000"
                  y="200"
                  width="200"
                  height="60"
                  rx="8"
                  fill="var(--color-bg-tertiary)"
                  stroke="var(--color-accent)"
                  strokeWidth="2"
                />
                <text
                  x="1100"
                  y="225"
                  textAnchor="middle"
                  fill="var(--color-text-primary)"
                  fontSize="14"
                  fontWeight="600"
                >
                  Construction
                </text>
                <text
                  x="1100"
                  y="245"
                  textAnchor="middle"
                  fill="var(--color-text-secondary)"
                  fontSize="12"
                >
                  (시공)
                </text>
              </g>

              {/* Level 3: Zone A, Zone B */}
              <g ref={(el) => (nodesRef.current[4] = el)}>
                <rect
                  x="850"
                  y="360"
                  width="200"
                  height="60"
                  rx="8"
                  fill="var(--color-bg-secondary)"
                  stroke="var(--color-text-secondary)"
                  strokeWidth="2"
                />
                <text
                  x="890"
                  y="392"
                  fill="var(--color-text-primary)"
                  fontSize="14"
                  fontWeight="600"
                >
                  📦 Zone A
                </text>
              </g>

              <g ref={(el) => (nodesRef.current[5] = el)}>
                <rect
                  x="1150"
                  y="360"
                  width="200"
                  height="60"
                  rx="8"
                  fill="var(--color-bg-secondary)"
                  stroke="var(--color-text-secondary)"
                  strokeWidth="2"
                />
                <text
                  x="1190"
                  y="392"
                  fill="var(--color-text-primary)"
                  fontSize="14"
                  fontWeight="600"
                >
                  📦 Zone B
                </text>
              </g>

              {/* Level 4: Disciplines under Zone A - 토목, 건축, 기계 */}
              <g ref={(el) => (nodesRef.current[6] = el)}>
                <rect
                  x="650"
                  y="520"
                  width="200"
                  height="60"
                  rx="8"
                  fill="var(--color-bg-secondary)"
                  stroke="var(--color-text-secondary)"
                  strokeWidth="2"
                />
                <text
                  x="690"
                  y="552"
                  fill="var(--color-text-primary)"
                  fontSize="14"
                  fontWeight="600"
                >
                  🚜 토목
                </text>
              </g>

              <g ref={(el) => (nodesRef.current[7] = el)}>
                <rect
                  x="850"
                  y="520"
                  width="200"
                  height="60"
                  rx="8"
                  fill="var(--color-bg-secondary)"
                  stroke="var(--color-text-secondary)"
                  strokeWidth="2"
                />
                <text
                  x="890"
                  y="552"
                  fill="var(--color-text-primary)"
                  fontSize="14"
                  fontWeight="600"
                >
                  🏢 건축
                </text>
              </g>

              <g ref={(el) => (nodesRef.current[8] = el)}>
                <rect
                  x="1050"
                  y="520"
                  width="200"
                  height="60"
                  rx="8"
                  fill="var(--color-bg-secondary)"
                  stroke="var(--color-text-secondary)"
                  strokeWidth="2"
                />
                <text
                  x="1090"
                  y="552"
                  fill="var(--color-text-primary)"
                  fontSize="14"
                  fontWeight="600"
                >
                  ⚙️ 기계
                </text>
              </g>

              {/* Level 5: Activities */}
              {/* 토목 activities (2개) */}
              <g ref={(el) => (nodesRef.current[9] = el)}>
                <rect
                  x="450"
                  y="680"
                  width="200"
                  height="50"
                  rx="6"
                  fill="transparent"
                  stroke="#f97316"
                  strokeWidth="2"
                />
                <text
                  x="550"
                  y="710"
                  textAnchor="middle"
                  fill="#f97316"
                  fontSize="13"
                  fontWeight="600"
                >
                  Activity (단위 작업)
                </text>
              </g>

              <g ref={(el) => (nodesRef.current[10] = el)}>
                <rect
                  x="650"
                  y="680"
                  width="200"
                  height="50"
                  rx="6"
                  fill="transparent"
                  stroke="#f97316"
                  strokeWidth="2"
                />
                <text
                  x="750"
                  y="710"
                  textAnchor="middle"
                  fill="#f97316"
                  fontSize="13"
                  fontWeight="600"
                >
                  Activity (단위 작업)
                </text>
              </g>

              {/* 건축 activity (1개) */}
              <g ref={(el) => (nodesRef.current[11] = el)}>
                <rect
                  x="850"
                  y="680"
                  width="200"
                  height="50"
                  rx="6"
                  fill="transparent"
                  stroke="#f97316"
                  strokeWidth="2"
                />
                <text
                  x="950"
                  y="710"
                  textAnchor="middle"
                  fill="#f97316"
                  fontSize="13"
                  fontWeight="600"
                >
                  Activity (단위 작업)
                </text>
              </g>

              {/* 기계 activity (1개) */}
              <g ref={(el) => (nodesRef.current[12] = el)}>
                <rect
                  x="1050"
                  y="680"
                  width="200"
                  height="50"
                  rx="6"
                  fill="transparent"
                  stroke="#f97316"
                  strokeWidth="2"
                />
                <text
                  x="1150"
                  y="710"
                  textAnchor="middle"
                  fill="#f97316"
                  fontSize="13"
                  fontWeight="600"
                >
                  Activity (단위 작업)
                </text>
              </g>
            </g>
          </svg>

          {/* Grid Background Pattern */}
          <div className="tm-wbs-grid-bg"></div>
        </div>
      </div>
    </div>
  );
}

export default TimeManagementCore;
