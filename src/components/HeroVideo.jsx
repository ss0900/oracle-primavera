import { useEffect, useRef, useState } from "react";
import { getAssetPath } from "../utils/assetPath";

const PRIMAVERA_STRUCTURE_SECTION_ID = "ppm";

function HeroVideo({ id, scrollToSection }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const handleScrollToStructure = () => {
    scrollToSection(PRIMAVERA_STRUCTURE_SECTION_ID);
  };

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25 },
    );

    observer.observe(container);

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
    };

    video.addEventListener("loadeddata", handleLoadedData);

    return () => {
      observer.disconnect();
      video.removeEventListener("loadeddata", handleLoadedData);
    };
  }, []);

  return (
    <section id={id} className="hero hero-video-section" ref={containerRef}>
      <div className="hero-video-container">
        <video
          ref={videoRef}
          className={`hero-video ${isVideoLoaded ? "loaded" : ""}`}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={getAssetPath("/hero.mp4")} type="video/mp4" />
        </video>
        <div className="hero-video-overlay" />
      </div>

      <div className="container hero-content">
        <h1 className="hero-title">
          <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            Primavera는 하나의 툴이 아니라
          </span>
          <span
            className="gradient-text"
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            프로젝트 관리 체계입니다.
          </span>
        </h1>

        <p
          className="hero-subtitle"
          style={{ maxWidth: "none", fontSize: "clamp(0.85rem, 1.7vw, var(--text-xl))" }}
        >
          <span style={{ display: "block", whiteSpace: "nowrap" }}>
            현장 공정 관리에서 프로젝트 통합 관리, 기업 포트폴리오 관리까지
          </span>
          <span style={{ display: "block", whiteSpace: "nowrap" }}>
            단계적으로 확장되며, P6IX는 이를 목적 중심의 하나의 흐름으로 설계합니다.
          </span>
        </p>

        <div className="hero-cta">
          <button
            className="btn btn-primary"
            onClick={handleScrollToStructure}
            aria-label="Primavera 제품군 전체 구조 보기"
          >
            Primavera 제품군 전체 구조 보기
          </button>
        </div>
      </div>

      <button
        className="scroll-indicator"
        onClick={handleScrollToStructure}
        aria-label="Scroll to next section"
      >
        <span>Scroll Down</span>
        <div className="scroll-indicator-icon" />
      </button>
    </section>
  );
}

export default HeroVideo;
