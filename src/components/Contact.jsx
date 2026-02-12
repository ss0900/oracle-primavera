import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function Contact({ id }) {
  const sectionRef = useRef(null);
  const currentSectionRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const contactSection = sectionRef.current;
    const footerSection = document.querySelector(".footer");

    if (!contactSection || !footerSection) return;

    const snapTargets = [contactSection, footerSection];
    const lastSnapIndex = snapTargets.length - 1;
    const triggers = [];

    currentSectionRef.current =
      window.scrollY >= footerSection.offsetTop - window.innerHeight * 0.5
        ? lastSnapIndex
        : 0;

    triggers.push(
      ScrollTrigger.create({
        trigger: contactSection,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          currentSectionRef.current = 0;
        },
        onEnterBack: () => {
          currentSectionRef.current = 0;
        },
      }),
    );

    triggers.push(
      ScrollTrigger.create({
        trigger: footerSection,
        start: "top top",
        end: "bottom center",
        onEnter: () => {
          currentSectionRef.current = lastSnapIndex;
        },
        onEnterBack: () => {
          currentSectionRef.current = lastSnapIndex;
        },
      }),
    );

    const snapToIndex = (targetIndex) => {
      const target = snapTargets[targetIndex];

      if (!target) {
        isAnimatingRef.current = false;
        return;
      }

      currentSectionRef.current = targetIndex;

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

    const handleWheel = (event) => {
      if (isAnimatingRef.current) {
        event.preventDefault();
        return;
      }

      const delta = event.deltaY;
      if (Math.abs(delta) < 50) return;

      let nextSection = currentSectionRef.current;

      if (delta > 0 && currentSectionRef.current < lastSnapIndex) {
        nextSection = currentSectionRef.current + 1;
      } else if (delta < 0 && currentSectionRef.current > 0) {
        nextSection = currentSectionRef.current - 1;
      } else {
        return;
      }

      event.preventDefault();
      isAnimatingRef.current = true;
      snapToIndex(nextSection);
    };

    let touchStartY = 0;

    const handleTouchStart = (event) => {
      touchStartY = event.touches[0].clientY;
    };

    const handleTouchEnd = (event) => {
      if (isAnimatingRef.current) return;

      const delta = touchStartY - event.changedTouches[0].clientY;
      if (Math.abs(delta) < 50) return;

      let nextSection = currentSectionRef.current;
      if (delta > 0 && currentSectionRef.current < lastSnapIndex) {
        nextSection = currentSectionRef.current + 1;
      } else if (delta < 0 && currentSectionRef.current > 0) {
        nextSection = currentSectionRef.current - 1;
      } else {
        return;
      }

      isAnimatingRef.current = true;
      snapToIndex(nextSection);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      triggers.forEach((trigger) => trigger.kill());
      gsap.killTweensOf(window);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="section"
      style={{ background: "var(--color-bg-primary)" }}
    >
      <div className="container">
        <div
          className="fade-in-section"
          style={{ textAlign: "center", marginBottom: "var(--space-2xl)" }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            비즈니스 문의 및 채용 정보를 확인하세요
          </p>
        </div>

        <div className="contact-grid stagger-cards">
          <div className="contact-card card-item">
            <div className="contact-icon">💼</div>
            <h3 className="contact-title">비즈니스 문의</h3>
            <p className="contact-desc">
              프로젝트 협업, 파트너십, 서비스 문의 등<br />
              비즈니스 관련 문의를 기다립니다.
            </p>
            <button
              className="btn btn-primary"
              style={{ width: "100%" }}
              onClick={() => {
                window.location.href = "https://www.p6ix.co.kr/contact";
              }}
            >
              문의하기
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <div
              style={{
                marginTop: "var(--space-lg)",
                paddingTop: "var(--space-lg)",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                fontSize: "var(--text-sm)",
                color: "var(--color-text-muted)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-sm)",
                  marginBottom: "var(--space-sm)",
                }}
              >
                <span>📧</span>
                <span>p6ix@p6ix.co.kr</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-sm)",
                }}
              >
                <span>📞</span>
                <span>02-6337-1771</span>
              </div>
            </div>
          </div>

          {/* <div className="contact-card card-item">
            <div
              className="contact-icon"
              style={{ background: "var(--gradient-secondary)" }}
            >
              🚀
            </div>
            <h3 className="contact-title">채용 안내</h3>
            <p className="contact-desc">
              함께 성장할 인재를 찾습니다.
              <br />
              다양한 포지션에서 함께할 분을 기다립니다.
            </p>
            <button className="btn btn-secondary" style={{ width: "100%" }}>
              채용 공고 보기
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <div
              style={{
                marginTop: "var(--space-lg)",
                paddingTop: "var(--space-lg)",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                fontSize: "var(--text-sm)",
                color: "var(--color-text-muted)",
              }}
            >
              <div style={{ marginBottom: "var(--space-sm)" }}>
                <span style={{ color: "var(--color-accent)" }}>
                  현재 채용 중인 포지션
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "var(--space-xs)",
                }}
              >
                {["프론트엔드", "백엔드", "DevOps", "AI/ML"].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "4px 8px",
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "var(--text-xs)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default Contact;
