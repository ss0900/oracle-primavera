import { useEffect, useRef, useState } from "react";
import type { FocusEvent, MouseEvent } from "react";
import HoverExpandCard from "./HoverExpandCard";
import { aconexHomeMenuCards } from "../../data/aconexHomeMenuCards";

interface AconexMenuSectionProps {
  id: string;
}

function AconexMenuSection({ id }: AconexMenuSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isTouchMode, setIsTouchMode] = useState(false);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const isBackgroundRevealed = activeIndex !== null;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const syncTouchMode = () => setIsTouchMode(mediaQuery.matches);

    syncTouchMode();
    mediaQuery.addEventListener("change", syncTouchMode);
    return () => mediaQuery.removeEventListener("change", syncTouchMode);
  }, []);

  const handleAttemptNavigate =
    (index: number) => (event: MouseEvent<HTMLAnchorElement>) => {
      if (!isTouchMode) return;

      // 모바일/터치 환경에서는 첫 탭은 활성화, 두 번째 탭에서 이동되도록 처리합니다.
      if (activeIndex !== index) {
        event.preventDefault();
        setActiveIndex(index);
      }
    };

  const handleMouseLeave = () => {
    if (isTouchMode) return;
    // 마우스가 섹션을 벗어나면 초기 상태(활성 없음)로 복귀합니다.
    setActiveIndex(null);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (isTouchMode) return;
    const nextFocusTarget = event.relatedTarget as Node | null;
    if (!nextFocusTarget || !cardsRef.current?.contains(nextFocusTarget)) {
      setActiveIndex(null);
    }
  };

  return (
    <section
      id={id}
      className={`section eppm-menu-section aconex-menu-section ${isBackgroundRevealed ? "is-bg-revealed" : ""}`}
    >
      <div className="eppm-menu-bg" aria-hidden="true">
        {aconexHomeMenuCards.map((card, index) => (
          <div
            key={card.id}
            className={`eppm-menu-bg-image ${activeIndex === index ? "is-active" : ""}`}
            style={{ backgroundImage: `url(${card.imageSrc})` }}
          />
        ))}
        <div className="eppm-menu-bg-overlay" />
      </div>

      <div className="container eppm-menu-container">
        <header className="eppm-menu-header">
          <h2 className="eppm-menu-title">Primavera P6 Aconex</h2>
          <p className="eppm-menu-subcopy">Aconex 하위 메뉴를 빠르게 살펴보세요.</p>
        </header>

        <div className="eppm-menu-layout">
          <div
            ref={cardsRef}
            className="eppm-menu-cards"
            onMouseLeave={handleMouseLeave}
            onBlur={handleBlur}
          >
            {aconexHomeMenuCards.map((card, index) => (
              <HoverExpandCard
                key={card.id}
                item={card}
                isActive={activeIndex === index}
                onActivate={() => setActiveIndex(index)}
                onAttemptNavigate={handleAttemptNavigate(index)}
              />
            ))}
          </div>

          <div className="eppm-menu-dots" aria-label="Aconex 메뉴 카드 인디케이터">
            {aconexHomeMenuCards.map((card, index) => (
              <button
                key={card.id}
                type="button"
                className={`eppm-menu-dot ${activeIndex === index ? "is-active" : ""}`}
                aria-label={`${card.title} 카드 활성화`}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AconexMenuSection;
