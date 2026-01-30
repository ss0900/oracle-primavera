import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const cloudFeatures = [
  {
    id: 'scheduling',
    title: 'Cloud Scheduling',
    description: '언제 어디서나 웹 브라우저로 일정 관리',
    icon: 'cloud-calendar',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
  },
  {
    id: 'collaboration',
    title: 'Real-time Collaboration',
    description: '팀원 간 실시간 협업 및 문서 공유',
    icon: 'collaboration',
    gradient: 'linear-gradient(135deg, #0f0c29 0%, #302b63 100%)'
  },
  {
    id: 'analytics',
    title: 'Advanced Analytics',
    description: 'AI 기반 예측 분석 및 인사이트 제공',
    icon: 'analytics',
    gradient: 'linear-gradient(135deg, #141e30 0%, #243b55 100%)'
  },
  {
    id: 'mobile',
    title: 'Mobile Access',
    description: '모바일 앱으로 현장에서 실시간 업데이트',
    icon: 'mobile',
    gradient: 'linear-gradient(135deg, #1e1e2f 0%, #2d2d44 100%)'
  },
  {
    id: 'integration',
    title: 'API Integration',
    description: '외부 시스템과 유연한 데이터 연동',
    icon: 'integration',
    gradient: 'linear-gradient(135deg, #1a2a6c 0%, #2d3a6c 100%)'
  }
]

function OPCPanel({ id }) {
  const sectionRef = useRef(null)
  const sliderRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          section.querySelectorAll('.opc-feature-card'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out'
          }
        )
      }
    })

    return () => {
      trigger.kill()
    }
  }, [])

  const handleMouseDown = (e) => {
    if (!sliderRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - sliderRef.current.offsetLeft)
    setScrollLeft(sliderRef.current.scrollLeft)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !sliderRef.current) return
    e.preventDefault()
    const x = e.pageX - sliderRef.current.offsetLeft
    const walk = (x - startX) * 2
    sliderRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e) => {
    if (!sliderRef.current) return
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft)
    setScrollLeft(sliderRef.current.scrollLeft)
  }

  const handleTouchMove = (e) => {
    if (!sliderRef.current) return
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft
    const walk = (x - startX) * 2
    sliderRef.current.scrollLeft = scrollLeft - walk
  }

  const renderIcon = (icon) => {
    switch (icon) {
      case 'cloud-calendar':
        return (
          <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 18c0-8 6-12 12-12s12 4 12 12" />
            <path d="M6 28a10 10 0 0 1 10-10h16a10 10 0 0 1 10 10v4a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6v-4z" />
            <line x1="18" y1="26" x2="18" y2="32" />
            <line x1="24" y1="24" x2="24" y2="32" />
            <line x1="30" y1="28" x2="30" y2="32" />
          </svg>
        )
      case 'collaboration':
        return (
          <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="16" cy="16" r="6" />
            <circle cx="32" cy="16" r="6" />
            <circle cx="24" cy="32" r="6" />
            <line x1="16" y1="22" x2="20" y2="28" />
            <line x1="32" y1="22" x2="28" y2="28" />
            <line x1="22" y1="16" x2="26" y2="16" />
          </svg>
        )
      case 'analytics':
        return (
          <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="6" y="6" width="36" height="36" rx="4" />
            <circle cx="24" cy="24" r="8" />
            <path d="M24 16v8l6 4" />
            <line x1="36" y1="12" x2="40" y2="8" />
            <line x1="12" y1="36" x2="8" y2="40" />
          </svg>
        )
      case 'mobile':
        return (
          <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="12" y="4" width="24" height="40" rx="4" />
            <line x1="12" y1="12" x2="36" y2="12" />
            <line x1="12" y1="36" x2="36" y2="36" />
            <circle cx="24" cy="40" r="2" />
          </svg>
        )
      case 'integration':
        return (
          <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="18" width="12" height="12" rx="2" />
            <rect x="32" y="18" width="12" height="12" rx="2" />
            <rect x="18" y="4" width="12" height="12" rx="2" />
            <rect x="18" y="32" width="12" height="12" rx="2" />
            <line x1="24" y1="16" x2="24" y2="18" />
            <line x1="24" y1="30" x2="24" y2="32" />
            <line x1="16" y1="24" x2="18" y2="24" />
            <line x1="30" y1="24" x2="32" y2="24" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <section
      id={id}
      ref={sectionRef}
      className="section opc-panel"
    >
      <div className="container">
        <div className="opc-header fade-in-section">
          <span className="product-panel-label">Oracle Primavera Cloud</span>
          <h2 className="product-panel-title">클라우드 기반 프로젝트 관리</h2>
          <p className="product-panel-description">
            SaaS 기반의 차세대 프로젝트 관리 플랫폼입니다.
            설치 없이 바로 사용하고, 자동 업데이트로 항상 최신 기능을 경험하세요.
          </p>
        </div>

        <div
          className="opc-slider-container"
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          style={{
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
          role="region"
          aria-label="Oracle Primavera Cloud 기능 슬라이더"
        >
          <div className="opc-slider">
            {cloudFeatures.map((feature) => (
              <article
                key={feature.id}
                className="opc-feature-card"
                style={{ background: feature.gradient }}
              >
                <div className="opc-card-icon">
                  {renderIcon(feature.icon)}
                </div>
                <h3 className="opc-card-title">{feature.title}</h3>
                <p className="opc-card-desc">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>

        <p className="opc-slider-hint" aria-hidden="true">
          ← 드래그하여 더 보기 →
        </p>

        <div className="opc-cta">
          <a
            href="#"
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Oracle Primavera Cloud 소개서 다운로드"
          >
            소개서 다운로드
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>
          <a
            href="/opc"
            className="btn btn-secondary"
            aria-label="Oracle Primavera Cloud 자세히 보기"
          >
            자세히 보기
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default OPCPanel
