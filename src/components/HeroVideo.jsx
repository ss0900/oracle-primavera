import { useEffect, useRef, useState } from "react";
import { getAssetPath } from "../utils/assetPath";

function HeroVideo({ id, scrollToSection }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

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
            대한민국 건설의 디지털 전환,
          </span>
          <span
            className="gradient-text"
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            Oracle Primavera로 완성하십시오
          </span>
        </h1>

        <p className="hero-subtitle">
          Oracle Primavera 전문 파트너로서 건설 프로젝트의
          <br />
          체계적인 관리와 성공적인 완수를 지원합니다.
        </p>
      </div>

      <button
        className="scroll-indicator"
        onClick={() => scrollToSection("services")}
        aria-label="Scroll to next section"
      >
        <span>Scroll Down</span>
        <div className="scroll-indicator-icon" />
      </button>
    </section>
  );
}

export default HeroVideo;
