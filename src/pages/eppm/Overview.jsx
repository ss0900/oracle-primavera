import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import SectionIndicator from '../../components/SectionIndicator'
import { getAssetPath } from "../../utils/assetPath";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const sections = [
  { id: 'hero', label: 'EPPM 개요' },
  { id: 'integration', label: '통합 운영' },
  { id: 'features', label: 'CPM 공정표' }
]

function EPPMOverview() {
  const [activeSection, setActiveSection] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  
  const containerRef = useRef(null)
  const isAnimatingRef = useRef(false)
  const currentSectionRef = useRef(0)

  // Section refs
  const heroSectionRef = useRef(null)
  const integrationSectionRef = useRef(null)
  const featuresSectionRef = useRef(null)
  const imageCardRef = useRef(null)
  const integrationImageCardRef = useRef(null)
  const featureCardsRef = useRef([])
  const integrationCardsRef = useRef([])
  const [integrationHoveredIndex, setIntegrationHoveredIndex] = useState(null)

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Navigate to section
  const scrollToSection = useCallback((sectionId) => {
    const sectionIndex = sections.findIndex(s => s.id === sectionId)
    if (sectionIndex === -1) return

    const panels = gsap.utils.toArray('.eppm-panel')
    if (!panels[sectionIndex]) return

    currentSectionRef.current = sectionIndex
    setActiveSection(sectionIndex)

    if (prefersReducedMotion) {
      panels[sectionIndex].scrollIntoView({ behavior: 'auto' })
    } else {
      isAnimatingRef.current = true
      gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: panels[sectionIndex], autoKill: false },
        ease: 'power3.inOut',
        onComplete: () => {
          setTimeout(() => {
            isAnimatingRef.current = false
          }, 100)
        }
      })
    }
  }, [prefersReducedMotion])

  // GSAP scroll hijacking
  useEffect(() => {
    if (prefersReducedMotion) {
      initContentAnimations()
      return () => {
        ScrollTrigger.getAll().forEach(t => t.kill())
      }
    }

    const panels = gsap.utils.toArray('.eppm-panel')

    // Track active section
    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          currentSectionRef.current = i
          setActiveSection(i)
        },
        onEnterBack: () => {
          currentSectionRef.current = i
          setActiveSection(i)
        }
      })
    })

    // Wheel event handler
    const handleWheel = (e) => {
      if (isAnimatingRef.current) {
        e.preventDefault()
        return
      }

      const delta = e.deltaY
      const threshold = 50

      if (Math.abs(delta) < threshold) return

      e.preventDefault()
      isAnimatingRef.current = true

      let nextSection = currentSectionRef.current

      if (delta > 0 && currentSectionRef.current < panels.length - 1) {
        nextSection = currentSectionRef.current + 1
      } else if (delta < 0 && currentSectionRef.current > 0) {
        nextSection = currentSectionRef.current - 1
      } else {
        isAnimatingRef.current = false
        return
      }

      currentSectionRef.current = nextSection
      setActiveSection(nextSection)

      gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: panels[nextSection], autoKill: false },
        ease: 'power3.inOut',
        onComplete: () => {
          setTimeout(() => {
            isAnimatingRef.current = false
          }, 100)
        }
      })
    }

    // Touch events
    let touchStartY = 0

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e) => {
      if (isAnimatingRef.current) return

      const touchEndY = e.changedTouches[0].clientY
      const delta = touchStartY - touchEndY
      const threshold = 50

      if (Math.abs(delta) < threshold) return

      isAnimatingRef.current = true

      let nextSection = currentSectionRef.current

      if (delta > 0 && currentSectionRef.current < panels.length - 1) {
        nextSection = currentSectionRef.current + 1
      } else if (delta < 0 && currentSectionRef.current > 0) {
        nextSection = currentSectionRef.current - 1
      } else {
        isAnimatingRef.current = false
        return
      }

      currentSectionRef.current = nextSection
      setActiveSection(nextSection)

      gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: panels[nextSection], autoKill: false },
        ease: 'power3.inOut',
        onComplete: () => {
          setTimeout(() => {
            isAnimatingRef.current = false
          }, 100)
        }
      })
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    initContentAnimations()

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [prefersReducedMotion])

  // Content animations
  const initContentAnimations = () => {
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Hero section animations
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top 80%',
          end: 'center center',
          toggleActions: 'play none none reverse'
        }
      })

      heroTl.fromTo(
        '.tm-hero-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )

      // Features section animations
      const featuresTl = gsap.timeline({
        scrollTrigger: {
          trigger: featuresSectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      })

      // 1. Title fade-in
      featuresTl.fromTo('.cpm-section-title', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 }
      )

      // 2. Image drop-in + bounce
      featuresTl.fromTo(imageCardRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'bounce.out' },
        "-=0.2"
      )

      // 3. Feature cards sequential appearance
      const cards = featureCardsRef.current
      
      if (cards[0]) {
        featuresTl.fromTo(cards[0], { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, "-=0.5")
      }
      if (cards[1]) {
        featuresTl.fromTo(cards[1], { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
      }
      if (cards[2]) {
        featuresTl.fromTo(cards[2], { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
      }
      if (cards[3]) {
        featuresTl.fromTo(cards[3], { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, "-=0.3")
      }

      // Integration section animations
      const integrationTl = gsap.timeline({
        scrollTrigger: {
          trigger: integrationSectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      })

      // Integration title fade-in
      integrationTl.fromTo('#integration .cpm-section-title', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 }
      )

      // Integration image drop-in
      integrationTl.fromTo(integrationImageCardRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'bounce.out' },
        "-=0.2"
      )

      // Integration cards (2 cards: left slide, right slide)
      const integrationCards = integrationCardsRef.current
      if (integrationCards[0]) {
        integrationTl.fromTo(integrationCards[0], { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, "-=0.5")
      }
      if (integrationCards[1]) {
        integrationTl.fromTo(integrationCards[1], { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, "-=0.3")
      }
    })

    return () => ctx.revert()
  }

  // Feature items data for EPPM
  const featureItems = [
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="8" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="rgba(99, 102, 241, 0.1)" />
          <rect x="28" y="8" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="rgba(99, 102, 241, 0.1)" />
          <rect x="16" y="26" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="rgba(99, 102, 241, 0.1)" />
          <line x1="12" y1="22" x2="24" y2="26" stroke="currentColor" strokeWidth="1.5" />
          <line x1="36" y1="22" x2="24" y2="26" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
      title: (<>대규모와 개별 프로젝트<br />계획 및 공정 관리</>)
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2" fill="rgba(99, 102, 241, 0.1)" />
          <path d="M24 14 L24 24 L32 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 32 L20 28 L24 30 L28 26 L32 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: (<>프로젝트와 연동된<br />Costs 관리</>)
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="4" width="32" height="10" rx="2" stroke="currentColor" strokeWidth="2" fill="rgba(99, 102, 241, 0.1)" />
          <rect x="4" y="19" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2" fill="rgba(99, 102, 241, 0.1)" />
          <rect x="26" y="19" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2" fill="rgba(99, 102, 241, 0.1)" />
          <rect x="8" y="34" width="32" height="10" rx="2" stroke="currentColor" strokeWidth="2" fill="rgba(99, 102, 241, 0.1)" />
          <line x1="24" y1="14" x2="13" y2="19" stroke="currentColor" strokeWidth="1.5" />
          <line x1="24" y1="14" x2="35" y2="19" stroke="currentColor" strokeWidth="1.5" />
          <line x1="13" y1="29" x2="24" y2="34" stroke="currentColor" strokeWidth="1.5" />
          <line x1="35" y1="29" x2="24" y2="34" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
      title: '전사적 프로젝트 관리'
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="rgba(99, 102, 241, 0.1)" />
          <circle cx="10" cy="34" r="6" stroke="currentColor" strokeWidth="2" fill="rgba(99, 102, 241, 0.1)" />
          <circle cx="38" cy="34" r="6" stroke="currentColor" strokeWidth="2" fill="rgba(99, 102, 241, 0.1)" />
          <line x1="20" y1="18" x2="13" y2="29" stroke="currentColor" strokeWidth="1.5" />
          <line x1="28" y1="18" x2="35" y2="29" stroke="currentColor" strokeWidth="1.5" />
          <line x1="16" y1="34" x2="32" y2="34" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
        </svg>
      ),
      title: (<>원활한 실적 업데이트를<br />위한 팀 네트워크</>)
    }
  ]

  // Integration section items (2 cards)
  const integrationItems = [
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="14" r="8" stroke="currentColor" strokeWidth="2" fill="rgba(99, 102, 241, 0.1)" />
          <circle cx="12" cy="36" r="6" stroke="currentColor" strokeWidth="2" fill="rgba(99, 102, 241, 0.1)" />
          <circle cx="36" cy="36" r="6" stroke="currentColor" strokeWidth="2" fill="rgba(99, 102, 241, 0.1)" />
          <circle cx="24" cy="36" r="6" stroke="currentColor" strokeWidth="2" fill="rgba(99, 102, 241, 0.1)" />
          <line x1="20" y1="20" x2="14" y2="30" stroke="currentColor" strokeWidth="1.5" />
          <line x1="24" y1="22" x2="24" y2="30" stroke="currentColor" strokeWidth="1.5" />
          <line x1="28" y1="20" x2="34" y2="30" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
      title: (<>다수의 사용자가 동시에 접속해<br />협업 및 시각화된 의사결정</>)
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="8" width="40" height="28" rx="2" stroke="currentColor" strokeWidth="2" fill="rgba(99, 102, 241, 0.1)" />
          <line x1="4" y1="16" x2="44" y2="16" stroke="currentColor" strokeWidth="1.5" />
          <rect x="8" y="20" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <line x1="24" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="1.5" />
          <line x1="24" y1="26" x2="36" y2="26" stroke="currentColor" strokeWidth="1.5" />
          <line x1="24" y1="32" x2="40" y2="32" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 28 L14 24 L18 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: (<>대시보드, 차트, 리포트 등을 통해<br />경영진부터 실무자까지 모든 레벨의 사용자를 지원</>)
    }
  ]

  return (
    <>
      <div className="cpm-schedule-page" ref={containerRef}>
        {/* Hero Section */}
        <section className="eppm-panel tm-panel" id="hero">
          <div
            className="tm-hero-section"
            ref={heroSectionRef}
            style={{
              backgroundImage: `linear-gradient(rgba(10, 10, 15, 0.7), rgba(10, 10, 15, 0.9)), url(https://images.pexels.com/photos/5989932/pexels-photo-5989932.jpeg?auto=compress&cs=tinysrgb&w=1200)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="tm-hero-content">
              <h1 className="tm-hero-title">EPPM 개요</h1>
              <p className="tm-hero-subtitle">Enterprise Project Portfolio Management</p>
            </div>
            <button
              className="scroll-indicator"
              onClick={() => scrollToSection("integration")}
              aria-label="다음 섹션으로 스크롤"
            >
              <span>Scroll Down</span>
              <div className="scroll-indicator-icon"></div>
            </button>
          </div>
        </section>

        {/* Integration Section */}
        <section 
          className="eppm-panel cpm-features-section" 
          id="integration"
          ref={integrationSectionRef}
        >
          <div className="cpm-features-container">
            <div className="cpm-section-header">
              <h2 className="cpm-section-title">통합 운영</h2>
            </div>
            
            {/* EPPM Dashboard Image Card */}
            <div 
              className="cpm-image-card"
              ref={integrationImageCardRef}
            >
              <img 
                src={getAssetPath("/EPPM.png")}
                alt="EPPM 통합 운영 대시보드"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML = '<div class="cpm-image-placeholder">EPPM Dashboard Screenshot</div>'
                }}
              />
            </div>

            {/* Integration Feature Cards - 2 columns */}
            <div 
              className="cpm-feature-cards" 
              style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
              onMouseLeave={() => setIntegrationHoveredIndex(null)}
            >
              {integrationItems.map((item, index) => (
                <div 
                  key={index}
                  className={`cpm-feature-card ${integrationHoveredIndex !== null && integrationHoveredIndex !== index ? 'dimmed' : ''}`}
                  ref={el => integrationCardsRef.current[index] = el}
                  onMouseEnter={() => setIntegrationHoveredIndex(index)}
                >
                  <div className="cpm-feature-icon">
                    {item.icon}
                  </div>
                  <h4 className="cpm-feature-title">{item.title}</h4>
                  
                  {/* Divider Line */}
                  {index < integrationItems.length - 1 && (
                    <div className="cpm-feature-divider-line" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section 
          className="eppm-panel cpm-features-section" 
          id="features"
          ref={featuresSectionRef}
        >
          <div className="cpm-features-container">
            <div className="cpm-section-header">
              <h2 className="cpm-section-title">CPM 공정표</h2>
            </div>
            
            {/* Gantt Chart Image Card */}
            <div 
              className="cpm-image-card"
              ref={imageCardRef}
            >
              <img 
                src={getAssetPath("/cpm-gantt-chart.png")}
                alt="CPM 공정표 - Primavera P6 간트 차트"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML = '<div class="cpm-image-placeholder">CPM Gantt Chart Screenshot</div>'
                }}
              />
            </div>

            {/* Feature Cards */}
            <div 
              className="cpm-feature-cards"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {featureItems.map((item, index) => (
                <div 
                  key={index}
                  className={`cpm-feature-card ${hoveredIndex !== null && hoveredIndex !== index ? 'dimmed' : ''}`}
                  ref={el => featureCardsRef.current[index] = el}
                  onMouseEnter={() => setHoveredIndex(index)}
                >
                  <div className="cpm-feature-icon">
                    {item.icon}
                  </div>
                  <h4 className="cpm-feature-title">{item.title}</h4>
                  
                  {/* Real Divider Element for Animation */}
                  {index < featureItems.length - 1 && (
                    <div className="cpm-feature-divider-line" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Section Indicator */}
      <SectionIndicator 
        sections={sections}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />
    </>
  )
}

export default EPPMOverview
