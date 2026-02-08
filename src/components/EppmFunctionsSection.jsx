import { useEffect, useState } from "react";

function EppmFunctionsSection({
  sectionId,
  title,
  items = [],
  heroImages = [],
  sectionRef,
  imageCardRef,
  cardRefs,
  prefersReducedMotion,
  isActive,
  panelClassName = "eppm-panel",
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const resolvedSlides =
    heroImages.length > 0
      ? heroImages
      : items.map((item) => ({
          src: item.image,
          alt:
            item.alt ||
            (typeof item.title === "string" ? item.title : "Feature Image"),
        }));
  const slideCount = resolvedSlides.length;

  useEffect(() => {
    if (!slideCount) return;
    if (activeSlide >= slideCount) {
      setActiveSlide(0);
    }
  }, [activeSlide, slideCount]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!isActive) return;
    if (!slideCount) return;

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slideCount);
    }, 4000);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, isActive, slideCount]);

  return (
    <section
      className={`${panelClassName} ppm-panel ppm-cpm-section`}
      id={sectionId}
      ref={sectionRef}
    >
      <div className="ppm-cpm-container">
        <div className="ppm-cpm-header">
          <h2 className="ppm-cpm-title">{title}</h2>
        </div>

        <div className="ppm-functions-layout">
          <div className="ppm-functions-media">
            <div className="cpm-carousel-container" ref={imageCardRef}>
              <div className="cpm-carousel-wrapper">
                {resolvedSlides.map((slide, index) => (
                  <div
                    key={slide.id || index}
                    className={`cpm-carousel-slide ${index === activeSlide ? "active" : ""}`}
                    style={{
                      transform: `translateX(-${activeSlide * 100}%)`,
                    }}
                  >
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentElement.innerHTML =
                          '<div class="cpm-image-placeholder">Product Screenshot</div>';
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="cpm-carousel-dots">
                {resolvedSlides.map((_, index) => (
                  <button
                    key={index}
                    className={`cpm-carousel-dot ${index === activeSlide ? "active" : ""}`}
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="ppm-functions-cards">
            <div
              className="cpm-feature-cards"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {items.map((item, index) => (
                <button
                  key={item.id || index}
                  className={`cpm-feature-card ${
                    hoveredIndex !== null && hoveredIndex !== index ? "dimmed" : ""
                  } ${index === activeSlide ? "active" : ""}`}
                  ref={(el) => {
                    if (cardRefs?.current) cardRefs.current[index] = el;
                  }}
                  onClick={() => setActiveSlide(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                >
                  <div className="cpm-feature-icon">{item.icon}</div>
                  <h4 className="cpm-feature-title">{item.title}</h4>

                  {index < items.length - 1 && (
                    <div className="cpm-feature-divider-line" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EppmFunctionsSection;
