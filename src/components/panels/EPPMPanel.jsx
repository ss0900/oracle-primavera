import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const steps = [
  {
    number: '01',
    title: 'Enterprise Planning',
    description: '전사 프로젝트 포트폴리오 관리 및 전략적 자원 배분',
    icon: 'strategy'
  },
  {
    number: '02',
    title: 'Resource Management',
    description: '인력, 장비, 자재 등 통합 자원 최적화',
    icon: 'resources'
  },
  {
    number: '03',
    title: 'Risk Analysis',
    description: '리스크 식별 및 시뮬레이션 기반 의사결정 지원',
    icon: 'risk'
  },
  {
    number: '04',
    title: 'Performance Tracking',
    description: 'EVM 기반 성과 측정 및 대시보드 분석',
    icon: 'performance'
  }
]

function EPPMPanel({ id, isActive }) {
  const sectionRef = useRef(null)
  const [activeStep, setActiveStep] = useState(0)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => setIsInView(true),
      onLeave: () => setIsInView(false),
      onEnterBack: () => setIsInView(true),
      onLeaveBack: () => setIsInView(false)
    })

    return () => {
      trigger.kill()
    }
  }, [])

  useEffect(() => {
    if (!isInView) return

    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isInView])

  const renderStepIcon = (icon, isActive) => {
    const color = isActive ? '#00d4ff' : 'rgba(255,255,255,0.3)'
    switch (icon) {
      case 'strategy':
        return (
          <svg viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2">
            <circle cx="24" cy="24" r="18" />
            <circle cx="24" cy="24" r="10" />
            <circle cx="24" cy="24" r="3" fill={isActive ? color : 'transparent'} />
            <line x1="24" y1="6" x2="24" y2="10" />
            <line x1="24" y1="38" x2="24" y2="42" />
            <line x1="6" y1="24" x2="10" y2="24" />
            <line x1="38" y1="24" x2="42" y2="24" />
          </svg>
        )
      case 'resources':
        return (
          <svg viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2">
            <rect x="8" y="28" width="8" height="14" rx="2" fill={isActive ? color : 'transparent'} opacity="0.6" />
            <rect x="20" y="20" width="8" height="22" rx="2" fill={isActive ? color : 'transparent'} opacity="0.8" />
            <rect x="32" y="12" width="8" height="30" rx="2" fill={isActive ? color : 'transparent'} />
            <path d="M8 10 L24 6 L40 10" strokeLinecap="round" />
          </svg>
        )
      case 'risk':
        return (
          <svg viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2">
            <path d="M24 6 L42 40 H6 Z" strokeLinejoin="round" />
            <line x1="24" y1="18" x2="24" y2="28" strokeWidth="3" />
            <circle cx="24" cy="34" r="2" fill={isActive ? color : 'transparent'} />
          </svg>
        )
      case 'performance':
        return (
          <svg viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="2">
            <rect x="6" y="8" width="36" height="32" rx="4" />
            <polyline points="12,32 18,22 26,26 36,14" strokeWidth="2.5" />
            <path d="M36 14 L36 20 L30 20" strokeLinecap="round" strokeLinejoin="round" />
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
      className="section eppm-panel"
    >
      <div className="container">
        <div className="eppm-content">
          <div className="eppm-left fade-in-section">
            <span className="product-panel-label">Enterprise Project Portfolio Management</span>
            <h2 className="product-panel-title">Primavera P6 EPPM</h2>
            <p className="product-panel-description">
              전사 수준의 프로젝트 포트폴리오를 통합 관리하는 엔터프라이즈 솔루션입니다.
              웹 기반 협업, 실시간 모니터링, 고급 분석 기능으로 조직 전체의 프로젝트 가시성을 확보합니다.
            </p>

            <div className="eppm-steps">
              {steps.map((step, index) => (
                <button
                  key={step.number}
                  className={`eppm-step ${activeStep === index ? 'active' : ''}`}
                  onClick={() => setActiveStep(index)}
                  aria-label={`${step.title} 단계 보기`}
                  aria-pressed={activeStep === index}
                >
                  <div className="eppm-step-number">{step.number}</div>
                  <div className="eppm-step-content">
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* <div className="product-panel-cta">
              <a
                href="#"
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Primavera P6 EPPM 소개서 다운로드"
              >
                소개서 다운로드
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            </div> */}
          </div>

          <div className="eppm-right">
            <div className="eppm-visual">
              <div className="eppm-visual-bg" />
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`eppm-visual-content ${activeStep === index ? 'active' : ''}`}
                >
                  <div className="eppm-icon-wrapper">
                    {renderStepIcon(step.icon, activeStep === index)}
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
              <div className="eppm-progress">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`eppm-progress-dot ${activeStep === index ? 'active' : ''}`}
                    onClick={() => setActiveStep(index)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Step ${index + 1}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setActiveStep(index)
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EPPMPanel
