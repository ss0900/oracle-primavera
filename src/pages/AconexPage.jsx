import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import SectionIndicator from "../components/SectionIndicator";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const sections = [
  { id: "hero", label: "Aconex" },
  { id: "menu", label: "메뉴" },
  { id: "overview-content", label: "개요" },
  { id: "features", label: "기능" },
  { id: "projects", label: "사례" },
];

const subMenuItems = [
  {
    id: "overview",
    title: "개요",
    description: "건설 프로젝트 협업을 위한 클라우드 플랫폼",
    image: "https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "#overview-content",
  },
  {
    id: "features",
    title: "주요 기능",
    description: "문서 관리, 메일, BIM, 현장 관리",
    image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "#features",
  },
  {
    id: "projects",
    title: "프로젝트 사례",
    description: "글로벌 대형 프로젝트 적용 사례",
    image: "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "#projects",
  },
];

// Overview Features Data
const overviewFeatures = [
    { title: "문서 관리", desc: "프로젝트 문서의 중앙 집중 관리" },
    { title: "워크플로우", desc: "승인 및 검토 프로세스 자동화" },
    { title: "협업", desc: "프로젝트 참여자간 실시간 협업" },
    { title: "추적성", desc: "모든 커뮤니케이션 이력 관리" }
];

// Features Data
const featuresData = [
    { number: "01", title: "Document Control", desc: "버전 관리, 개정 이력, 배포 관리가 통합된 문서 제어" },
    { number: "02", title: "Mail & Correspondence", desc: "프로젝트 관련 모든 서신의 추적 및 관리" },
    { number: "03", title: "BIM Collaboration", desc: "BIM 모델 협업 및 조정 도구" },
    { number: "04", title: "Field Management", desc: "현장 이슈, 안전, 품질 관리" }
];

// Projects Data
const projectsData = [
    { 
        tag: "건축",
        title: "대형 복합 건물", 
        desc: "초고층 복합 건물 프로젝트의 문서 협업 관리",
        img: "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    { 
        tag: "교통",
        title: "철도 인프라", 
        desc: "고속철도 건설 프로젝트 문서 관리",
        img: "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    { 
        tag: "에너지",
        title: "발전소 건설", 
        desc: "해외 발전소 EPC 프로젝트 협업",
        img: "https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
];

function AconexPage() {
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
  const featuresSectionRef = useRef(null);
  const projectsSectionRef = useRef(null);
  
  // Animation refs
  const overviewCardsRef = useRef([]);
  const featuresCardsRef = useRef([]);
  const projectsCardsRef = useRef([]);

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

    const panels = gsap.utils.toArray(".aconex-panel");
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
       const targetIndex = sections.findIndex((s) => s.id === sectionId); // Simple mapping for strict ids like 'features', 'projects'
       
       // Handle mapping if necessary, or just rely on direct ID match
       // The user requested /aconex/overview, /aconex/features, /aconex/projects
       // Our IDs are: overview-content, features, projects
       
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
    let path = "/aconex";
    // index 0(Hero), 1(Menu) -> /aconex
    if (index === 2) path = "/aconex/overview";
    if (index === 3) path = "/aconex/features";
    if (index === 4) path = "/aconex/projects";

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

    const panels = gsap.utils.toArray(".aconex-panel");

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
        ".aconex-hero-title",
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
          ".aconex-menu-card",
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

      // Features
      if (featuresSectionRef.current) {
          gsap.fromTo(featuresCardsRef.current,
              { x: -30, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.5, stagger: 0.1,
                scrollTrigger: { trigger: featuresSectionRef.current, start: 'top 60%', toggleActions: 'play none none reverse'}
              }
          );
      }

       // Projects
       if (projectsSectionRef.current) {
          gsap.fromTo(projectsCardsRef.current,
              { y: 50, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, stagger: 0.2,
                scrollTrigger: { trigger: projectsSectionRef.current, start: 'top 60%', toggleActions: 'play none none reverse'}
              }
          );
       }
    });
    return () => ctx.revert();
  };

  return (
    <>
      <div className="ppm-page aconex-page-container" ref={containerRef}>
        {/* 1. Hero Section */}
        <section className="aconex-panel tm-panel" id="hero" ref={heroSectionRef}>
          <div
            className="tm-hero-section"
            style={{
              backgroundImage: `linear-gradient(rgba(10, 10, 15, 0.6), rgba(10, 10, 15, 0.8)), url(https://images.pexels.com/photos/3774503/pexels-photo-3774503.jpeg?auto=compress&cs=tinysrgb&w=1200)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="tm-hero-content">
              <h1 className="aconex-hero-title tm-hero-title">Aconex</h1>
              <p className="tm-hero-subtitle">
                Oracle Aconex
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
          className="aconex-panel ppm-panel ppm-overview-section"
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
                  Aconex
                </span>
              </nav>

              {/* Main Title */}
              <h2 className="ppm-overview-title">
                건설 프로젝트 협업 및
                <br />
                문서 관리 플랫폼
              </h2>

              {/* Description */}
              <p className="ppm-overview-description">
                Oracle Aconex는 모든 프로젝트 참여자를 연결하고
                <br />
                정보와 프로세스를 통합하여
                <br />
                프로젝트의 가시성과 제어를 강화합니다.
              </p>

              {/* Divider */}
              <div className="ppm-overview-divider"></div>

              {/* Sub-menu Cards (PPM Style) */}
              <div className="ppm-submenu-grid">
                {subMenuItems.map((item, index) => (
                  <button
                    key={item.id}
                    className="ppm-submenu-card aconex-menu-card"
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
          className="aconex-panel tm-panel"
          id="overview-content"
          ref={overviewSectionRef}
        >
            <div className="tm-methods-section">
                <div className="tm-methods-container">
                    <div className="tm-section-header">
                        <h2 className="tm-section-title">Aconex 개요</h2>
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '40px' }}>프로젝트 문서 관리와 협업을 위한 클라우드 플랫폼</p>
                    </div>
                    <div className="tm-ppm-eppm-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                        {overviewFeatures.map((item, index) => (
                           <div key={index} className="tm-spoke-box" style={{ width: '100%', flexDirection: 'column', padding: '30px 20px', height: 'auto', alignItems: 'center', textAlign: 'center' }} ref={el => overviewCardsRef.current[index] = el}>
                               <div className="tm-spoke-icon" style={{ marginBottom: '15px' }}>
                                   {/* Icon */}
                                   <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                               </div>
                               <h4 style={{ fontSize: '1.2rem', marginBottom: '10px', color: 'var(--text-primary)' }}>{item.title}</h4>
                               <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{item.desc}</p>
                           </div>
                       ))}
                    </div>
                </div>
            </div>
        </section>

        {/* 4. Features Section */}
        <section
          className="aconex-panel tm-panel"
          id="features"
          ref={featuresSectionRef}
        >
             <div className="tm-advantages-section">
                <div className="tm-advantages-container">
                    <div className="tm-section-header">
                        <h2 className="tm-section-title">주요 기능</h2>
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '40px' }}>성공적인 프로젝트를 위한 핵심 기능</p>
                    </div>
                    <div className="tm-ppm-eppm-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
                        {featuresData.map((item, index) => (
                            <div key={index} className="tm-ppm-eppm-card" style={{ padding: '30px', display: 'flex', alignItems: 'flex-start' }} ref={el => featuresCardsRef.current[index] = el}>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-accent)', marginRight: '20px', opacity: 0.5 }}>{item.number}</div>
                                <div>
                                    <h3 style={{ fontSize: '1.4rem', marginBottom: '10px', color: 'var(--text-primary)' }}>{item.title}</h3>
                                    <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
             </div>
        </section>

        {/* 5. Projects Section */}
        <section
          className="aconex-panel tm-panel"
          id="projects"
          ref={projectsSectionRef}
        >
             <div className="tm-methods-section" style={{ background: 'var(--bg-darker)' }}>
                <div className="tm-methods-container">
                    <div className="tm-section-header">
                        <h2 className="tm-section-title">프로젝트 사례</h2>
                    </div>
                    <div className="tm-ppm-eppm-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '40px' }}>
                        {projectsData.map((item, index) => (
                             <div key={index} className="tm-ppm-eppm-card" style={{ padding: '0', overflow: 'hidden', height: 'auto' }} ref={el => projectsCardsRef.current[index] = el}>
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

export default AconexPage;
