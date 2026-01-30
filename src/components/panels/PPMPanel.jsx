import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProductPanel from './ProductPanel'

const features = [
  '일정 관리 및 WBS 구성',
  '자원 배정 및 로드 분석',
  '진도 관리 및 성과 측정',
  '리스크 분석 및 시뮬레이션'
]

const visualItems = [
  { icon: 'schedule', label: 'Schedule', color: '#00d4ff' },
  { icon: 'resources', label: 'Resources', color: '#7c3aed' },
  { icon: 'progress', label: 'Progress', color: '#10b981' },
  { icon: 'analytics', label: 'Analytics', color: '#f59e0b' }
]

function PPMPanel({ id }) {
  const [activeItem, setActiveItem] = useState(0)
  const visualRef = useRef(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveItem(prev => (prev + 1) % visualItems.length)
    }, 3000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const visual = visualRef.current
    if (!visual) return

    const trigger = ScrollTrigger.create({
      trigger: visual,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          visual.querySelectorAll('.ppm-visual-item'),
          { opacity: 0, scale: 0.8, y: 20 },
          {
            opacity: 1,
            scale: 1,
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

  const renderIcon = (icon, isActive) => {
    const strokeColor = isActive ? 'currentColor' : 'rgba(255,255,255,0.5)'
    switch (icon) {
      case 'schedule':
        return (
          <svg viewBox="0 0 48 48" fill="none" stroke={strokeColor} strokeWidth="2">
            <rect x="6" y="10" width="36" height="32" rx="4" />
            <line x1="6" y1="18" x2="42" y2="18" />
            <line x1="14" y1="6" x2="14" y2="14" />
            <line x1="34" y1="6" x2="34" y2="14" />
            <rect x="12" y="24" width="8" height="6" rx="1" fill={isActive ? '#00d4ff' : 'transparent'} />
            <rect x="24" y="24" width="12" height="6" rx="1" fill={isActive ? '#00d4ff' : 'transparent'} opacity="0.6" />
            <rect x="12" y="34" width="16" height="4" rx="1" fill={isActive ? '#00d4ff' : 'transparent'} opacity="0.4" />
          </svg>
        )
      case 'resources':
        return (
          <svg viewBox="0 0 48 48" fill="none" stroke={strokeColor} strokeWidth="2">
            <circle cx="24" cy="14" r="8" />
            <path d="M8 42v-4a12 12 0 0 1 12-12h8a12 12 0 0 1 12 12v4" />
            <circle cx="38" cy="18" r="5" opacity="0.6" />
            <circle cx="10" cy="18" r="5" opacity="0.6" />
          </svg>
        )
      case 'progress':
        return (
          <svg viewBox="0 0 48 48" fill="none" stroke={strokeColor} strokeWidth="2">
            <rect x="6" y="8" width="36" height="32" rx="4" />
            <rect x="12" y="16" width="24" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
            <rect x="12" y="16" width="16" height="4" rx="2" fill={isActive ? '#10b981' : 'transparent'} />
            <rect x="12" y="24" width="24" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
            <rect x="12" y="24" width="20" height="4" rx="2" fill={isActive ? '#10b981' : 'transparent'} opacity="0.7" />
            <rect x="12" y="32" width="24" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
            <rect x="12" y="32" width="8" height="4" rx="2" fill={isActive ? '#10b981' : 'transparent'} opacity="0.4" />
          </svg>
        )
      case 'analytics':
        return (
          <svg viewBox="0 0 48 48" fill="none" stroke={strokeColor} strokeWidth="2">
            <rect x="6" y="8" width="36" height="32" rx="4" />
            <polyline points="12,32 18,24 26,28 36,16" strokeWidth="2.5" stroke={isActive ? '#f59e0b' : strokeColor} />
            <circle cx="12" cy="32" r="2" fill={isActive ? '#f59e0b' : 'transparent'} />
            <circle cx="18" cy="24" r="2" fill={isActive ? '#f59e0b' : 'transparent'} />
            <circle cx="26" cy="28" r="2" fill={isActive ? '#f59e0b' : 'transparent'} />
            <circle cx="36" cy="16" r="2" fill={isActive ? '#f59e0b' : 'transparent'} />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <ProductPanel
      id={id}
      title="Primavera P6 PPM"
      subtitle="Professional Project Management"
      description="대규모 프로젝트의 일정, 자원, 비용을 통합 관리하는 전문 프로젝트 관리 솔루션입니다. 체계적인 WBS 구성과 크리티컬 패스 분석으로 프로젝트 성공률을 높입니다."
      features={features}
      ctaUrl="#"
      className="ppm-panel"
    >
      <div className="ppm-visual" ref={visualRef}>
        <div className="ppm-visual-grid">
          {visualItems.map((item, index) => (
            <button
              key={item.icon}
              className={`ppm-visual-item ${activeItem === index ? 'active' : ''}`}
              onClick={() => setActiveItem(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActiveItem(index)
                }
              }}
              aria-label={`${item.label} 기능 보기`}
              aria-pressed={activeItem === index}
              style={{ '--item-color': item.color }}
            >
              <div className="ppm-visual-icon">
                {renderIcon(item.icon, activeItem === index)}
              </div>
              <span className="ppm-visual-label">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="ppm-visual-center">
          <div className="ppm-center-ring" />
          <div className="ppm-center-content">
            <span className="ppm-center-label">P6 PPM</span>
            <span className="ppm-center-value">{visualItems[activeItem].label}</span>
          </div>
        </div>
      </div>
    </ProductPanel>
  )
}

export default PPMPanel
