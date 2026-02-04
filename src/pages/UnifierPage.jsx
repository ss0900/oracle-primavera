import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import SectionIndicator from "../components/SectionIndicator";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const sections = [
  { id: "hero", label: "Unifier" },
  { id: "menu", label: "메뉴" },
  { id: "overview-content", label: "개요" },
  { id: "modules", label: "모듈" },
  { id: "customers", label: "사례" },
];

const subMenuItems = [
  {
    id: "overview",
    title: "개요",
    description: "비용, 계약, 문서 관리의 완벽한 통합",
    image: "https://images.pexels.com/photos/1098515/pexels-photo-1098515.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "#overview-content",
  },
  {
    id: "modules",
    title: "주요 모듈",
    description: "Cost, Contract, DM 등 핵심 모듈",
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "#modules",
  },
  {
    id: "customers",
    title: "고객 사례",
    description: "공공, 부동산, 인프라 성공 사례",
    image: "https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "#customers",
  },
];

// Overview Features Data
const overviewFeatures = [
    { title: "비용 관리", desc: "프로젝트 예산 및 비용 통합 관리" },
    { title: "계약 관리", desc: "계약 및 변경 관리 자동화" },
    { title: "문서 관리", desc: "프로젝트 문서 중앙 관리" },
    { title: "워크플로우", desc: "업무 프로세스 자동화" }
];

// Modules Data
const modulesData = [
    { title: "Cost Management", desc: "예산 수립, 비용 추적, 지출 관리를 위한 통합 비용 관리 모듈" },
    { title: "Contract Management", desc: "계약 생성, 변경 관리, 기성 처리를 위한 계약 관리 모듈" },
    { title: "Document Management", desc: "도면, 문서, 레코드의 중앙 관리 및 버전 제어 모듈" },
    { title: "Capital Planning", desc: "자본 투자 계획 및 포트폴리오 관리 모듈" },
    { title: "Asset Lifecycle", desc: "자산 생애주기 전반의 관리 모듈" },
    { title: "Space Management", desc: "시설 및 공간 관리 모듈" }
];

// Customers Data
const customersData = [
    { 
        tag: "공공",
        title: "공공기관 시설 관리", 
        desc: "대규모 공공 시설의 자산 및 유지보수 관리 시스템 구축",
        img: "https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    { 
        tag: "부동산",
        title: "부동산 개발사", 
        desc: "복합 개발 프로젝트의 비용 및 계약 관리",
        img: "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    { 
        tag: "인프라",
        title: "인프라 운영사", 
        desc: "도로 및 철도 자산의 생애주기 관리",
        img: "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
];

function UnifierPage() {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  const containerRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const currentSectionRef = useRef(0);

  // Section refs
  const heroSectionRef = useRef(null);
  const menuSectionRef = useRef(null);
  const overviewSectionRef = useRef(null);
  const modulesSectionRef = useRef(null);
  const customersSectionRef = useRef(null);
  
  // Animation refs
  const overviewCardsRef = useRef([]);
  const modulesCardsRef = useRef([]);
  const customersCardsRef = useRef([]);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Navigate to section
  const scrollToSection = useCallback((sectionId) => {
    const sectionIndex = sections.findIndex((s) => s.id === sectionId);
    if (sectionIndex === -1) return;

    const panels = gsap.utils.toArray(".unifier-panel");
    if (!panels[sectionIndex]) return;

    currentSectionRef.current = sectionIndex;
    setActiveSection(sectionIndex);

    if (prefersReducedMotion) {
      panels[sectionIndex].scrollIntoView({ behavior: "auto" });
    } else {
      isAnimatingRef.current = true;
      gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: panels[sectionIndex], autoKill: false },
        ease: "power3.inOut",
        onComplete: () => {
          setTimeout(() => {
            isAnimatingRef.current = false;
          }, 100);
        },
      });
    }
  }, [prefersReducedMotion]);

  // Deep linking logic
  useEffect(() => {
    if (sectionId) {
       // Only scroll if we are not already at the right section (to avoid loops if param matches)
       const targetIndex = sections.findIndex((s) => s.id === sectionId); // Simple mapping for strict ids
       
       // Handle mapping if necessary, or just rely on direct ID match
       // The user requested /unifier/overview, /unifier/modules, /unifier/customers
       // Our IDs are: overview-content, modules, customers
       
       let targetId = sectionId;
       if (sectionId === "overview") targetId = "overview-content";
       
       const foundIndex = sections.findIndex((s) => s.id === targetId);

      if (foundIndex !== -1 && foundIndex !== currentSectionRef.current) {
        setTimeout(() => {
          scrollToSection(targetId);
        }, 100);
      }
    }
  }, [sectionId, scrollToSection]);

  // Update URL based on section
  const updateUrlForSection = useCallback((index) => {
    let path = "/unifier";
    // index 0(Hero), 1(Menu) -> /unifier
    if (index === 2) path = "/unifier/overview";
    if (index === 3) path = "/unifier/modules";
    if (index === 4) path = "/unifier/customers";

    navigate(path, { replace: true });
  }, [navigate]);

   // GSAP scroll hijacking
   useEffect(() => {
    if (prefersReducedMotion) {
      initContentAnimations();
      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    }

    const panels = gsap.utils.toArray(".unifier-panel");

    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          currentSectionRef.current = i;
          setActiveSection(i);
          updateUrlForSection(i);
        },
        onEnterBack: () => {
          currentSectionRef.current = i;
          setActiveSection(i);
          updateUrlForSection(i);
        },
      });
    });

    const handleWheel = (e) => {
      if (isAnimatingRef.current) {
        e.preventDefault();
        return;
      }

      const delta = e.deltaY;
      const threshold = 50;

      if (Math.abs(delta) < threshold) return;

      e.preventDefault();
      isAnimatingRef.current = true;

      let nextSection = currentSectionRef.current;

      if (delta > 0 && currentSectionRef.current < panels.length - 1) {
        nextSection = currentSectionRef.current + 1;
      } else if (delta < 0 && currentSectionRef.current > 0) {
        nextSection = currentSectionRef.current - 1;
      } else {
        isAnimatingRef.current = false;
        return;
      }

      currentSectionRef.current = nextSection;
      setActiveSection(nextSection);

      gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: panels[nextSection], autoKill: false },
        ease: "power3.inOut",
        onComplete: () => {
          setTimeout(() => {
            isAnimatingRef.current = false;
          }, 100);
        },
      });
    };

    // Touch events
    let touchStartY = 0;
    const handleTouchStart = (e) => { touchStartY = e.touches[0].clientY; };
    const handleTouchEnd = (e) => {
      if (isAnimatingRef.current) return;
      const touchEndY = e.changedTouches[0].clientY;
      const delta = touchStartY - touchEndY;
      if (Math.abs(delta) < 50) return;

      isAnimatingRef.current = true;
      let nextSection = currentSectionRef.current;

      if (delta > 0 && currentSectionRef.current < panels.length - 1) {
        nextSection = currentSectionRef.current + 1;
      } else if (delta < 0 && currentSectionRef.current > 0) {
        nextSection = currentSectionRef.current - 1;
      } else {
        isAnimatingRef.current = false;
        return;
      }

      currentSectionRef.current = nextSection;
      setActiveSection(nextSection);

      gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: panels[nextSection], autoKill: false },
        ease: "power3.inOut",
        onComplete: () => {
          setTimeout(() => {
            isAnimatingRef.current = false;
          }, 100);
        },
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    initContentAnimations();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [prefersReducedMotion]);

  // Content Animations
  const initContentAnimations = () => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Hero
      gsap.fromTo(
        ".unifier-hero-title",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Menu Stagger
      if (menuSectionRef.current) {
        gsap.fromTo(
          ".unifier-menu-card",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            scrollTrigger: {
              trigger: menuSectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Overview Features
      if (overviewSectionRef.current) {
          gsap.fromTo(overviewCardsRef.current, 
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, stagger: 0.1,
                scrollTrigger: { trigger: overviewSectionRef.current, start: 'top 60%', toggleActions: 'play none none reverse'}
              }
          );
      }

      // Modules
      if (modulesSectionRef.current) {
          gsap.fromTo(modulesCardsRef.current,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, stagger: 0.1,
                scrollTrigger: { trigger: modulesSectionRef.current, start: 'top 60%', toggleActions: 'play none none reverse'}
              }
          );
      }

       // Customers
       if (customersSectionRef.current) {
          gsap.fromTo(customersCardsRef.current,
              { y: 50, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, stagger: 0.2,
                scrollTrigger: { trigger: customersSectionRef.current, start: 'top 60%', toggleActions: 'play none none reverse'}
              }
          );
       }
    });
    return () => ctx.revert();
  };

  return (
    <>
      <div className="ppm-page unifier-page-container" ref={containerRef}>
        {/* 1. Hero Section */}
        <section className="unifier-panel tm-panel" id="hero" ref={heroSectionRef}>
          <div
            className="tm-hero-section"
            style={{
              backgroundImage: `linear-gradient(rgba(10, 10, 15, 0.7), rgba(10, 10, 15, 0.9)), url(https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=1200)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="tm-hero-content">
              <h1 className="unifier-hero-title tm-hero-title">Unifier</h1>
              <p className="tm-hero-subtitle">
                Oracle Primavera Unifier
              </p>
            </div>
            <button
              className="scroll-indicator"
              onClick={() => scrollToSection("menu")}
              aria-label="다음 섹션으로 스크롤"
            >
              <span>Scroll Down</span>
              <div className="scroll-indicator-icon"></div>
            </button>
          </div>
        </section>

        {/* 2. Menu Section (Structure matched to PPM 2nd section) */}
        <section
          className="unifier-panel ppm-panel ppm-overview-section"
          id="menu"
          ref={menuSectionRef}
        >
          <div className="ppm-overview-container">
            <div className="ppm-overview-content">
              {/* Breadcrumb */}
              <nav className="ppm-breadcrumb">
                <Link to="/" className="ppm-breadcrumb-home">
                  <span className="ppm-breadcrumb-home-icon">H</span>
                </Link>
                <span className="ppm-breadcrumb-separator">&gt;</span>
                <span className="ppm-breadcrumb-item ppm-breadcrumb-current">
                  Unifier
                </span>
              </nav>

              {/* Main Title */}
              <h2 className="ppm-overview-title">
                최적의 프로젝트 통제 및
                <br />
                비용 관리 솔루션
              </h2>

              {/* Description */}
              <p className="ppm-overview-description">
                Oracle Primavera Unifier는 프로젝트 생애주기 전반에 걸친
                <br />
                비용, 계약, 문서 관리의 완벽한 통합을 지원하는
                <br />
                엔터프라이즈급 관리 플랫폼입니다.
              </p>

              {/* Divider */}
              <div className="ppm-overview-divider"></div>

              {/* Sub-menu Cards (PPM Style) */}
              <div className="ppm-submenu-grid">
                {subMenuItems.map((item, index) => (
                  <button
                    key={item.id}
                    className="ppm-submenu-card unifier-menu-card"
                    onClick={() => scrollToSection(item.link.replace("#", ""))}
                  >
                    <div
                      className="ppm-submenu-card-bg"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="ppm-submenu-card-overlay" />
                    <h4 className="ppm-submenu-card-title">{item.title}</h4>
                    <div className="ppm-submenu-card-arrow">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Overview Section */}
        <section
          className="unifier-panel tm-panel"
          id="overview-content"
          ref={overviewSectionRef}
        >
            <div className="tm-methods-section">
                <div className="tm-methods-container">
                    <div className="tm-section-header">
                        <h2 className="tm-section-title">Unifier 개요</h2>
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '40px' }}>프로젝트 비용, 계약, 문서 관리의 통합</p>
                    </div>
                    <div className="tm-ppm-eppm-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                        {overviewFeatures.map((item, index) => (
                           <div key={index} className="tm-spoke-box" style={{ width: '100%', flexDirection: 'column', padding: '30px 20px', height: 'auto', alignItems: 'center', textAlign: 'center' }} ref={el => overviewCardsRef.current[index] = el}>
                               <div className="tm-spoke-icon" style={{ marginBottom: '15px' }}>
                                   {/* Icon */}
                                   <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                               </div>
                               <h4 style={{ fontSize: '1.2rem', marginBottom: '10px', color: 'var(--text-primary)' }}>{item.title}</h4>
                               <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{item.desc}</p>
                           </div>
                       ))}
                    </div>
                </div>
            </div>
        </section>

        {/* 4. Modules Section */}
        <section
          className="unifier-panel tm-panel"
          id="modules"
          ref={modulesSectionRef}
        >
             <div className="tm-advantages-section">
                <div className="tm-advantages-container">
                    <div className="tm-section-header">
                        <h2 className="tm-section-title">주요 모듈</h2>
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '40px' }}>다양한 프로젝트 요구사항을 충족하는 모듈</p>
                    </div>
                    <div className="tm-ppm-eppm-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
                        {modulesData.map((item, index) => (
                            <div key={index} className="tm-ppm-eppm-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }} ref={el => modulesCardsRef.current[index] = el}>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '15px', color: 'var(--text-primary)', borderBottom: '2px solid var(--color-primary)', paddingBottom: '10px', width: '100%' }}>{item.title}</h3>
                                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
             </div>
        </section>

        {/* 5. Customers Section */}
        <section
          className="unifier-panel tm-panel"
          id="customers"
          ref={customersSectionRef}
        >
             <div className="tm-methods-section" style={{ background: 'var(--bg-darker)' }}>
                <div className="tm-methods-container">
                    <div className="tm-section-header">
                        <h2 className="tm-section-title">고객 사례</h2>
                    </div>
                    <div className="tm-ppm-eppm-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '40px' }}>
                        {customersData.map((item, index) => (
                             <div key={index} className="tm-ppm-eppm-card" style={{ padding: '0', overflow: 'hidden', height: 'auto' }} ref={el => customersCardsRef.current[index] = el}>
                                 <div className="tm-card-image" style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                                     <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                     <span style={{ position: 'absolute', top: '15px', left: '15px', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '5px 10px', borderRadius: '4px', fontSize: '0.8rem' }}>{item.tag}</span>
                                 </div>
                                 <div className="tm-card-content" style={{ padding: '25px' }}>
                                     <h3 style={{ fontSize: '1.25rem', marginBottom: '15px', color: 'var(--text-primary)' }}>{item.title}</h3>
                                     <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{item.desc}</p>
                                 </div>
                             </div>
                        ))}
                    </div>
                </div>
             </div>
        </section>
      </div>

      <SectionIndicator
        sections={sections}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />
    </>
  );
}

export default UnifierPage;
