import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const metrics = [
  {
    value: 50,
    prefix: '',
    suffix: '%',
    label: '비용 절감',
    description: '프로젝트 비용 관리 효율화'
  },
  {
    value: 30,
    prefix: '',
    suffix: '%',
    label: '시간 단축',
    description: '프로세스 자동화로 업무 시간 감소'
  },
  {
    value: 100,
    prefix: '',
    suffix: '+',
    label: '글로벌 고객',
    description: '전 세계 대형 건설사 도입'
  },
  {
    value: 99,
    prefix: '',
    suffix: '%',
    label: '데이터 정확도',
    description: '실시간 통합 데이터 관리'
  }
]

const modules = [
  { id: 'cost', name: 'Cost Management', icon: 'cost' },
  { id: 'contract', name: 'Contract Management', icon: 'contract' },
  { id: 'document', name: 'Document Control', icon: 'document' },
  { id: 'workflow', name: 'Workflow Automation', icon: 'workflow' }
]

function AnimatedCounter({ value, prefix, suffix, isVisible }) {
  const [count, setCount] = useState(0)
  const countRef = useRef({ value: 0 })

  useEffect(() => {
    if (!isVisible) return

    const tween = gsap.to(countRef.current, {
      value: value,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        setCount(Math.floor(countRef.current.value))
      }
    })

    return () => {
      tween.kill()
    }
  }, [value, isVisible])

  return (
    <span className="unifier-metric-value">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

function UnifierPanel({ id }) {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeModule, setActiveModule] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      onEnter: () => setIsVisible(true)
    })

    return () => {
      trigger.kill()
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setActiveModule(prev => (prev + 1) % modules.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isVisible])

  const renderModuleIcon = (icon, isActive) => {
    const color = isActive ? '#00d4ff' : 'rgba(255,255,255,0.4)'
    switch (icon) {
      case 'cost':
        return (
          <svg viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="2">
            <circle cx="20" cy="20" r="16" />
            <path d="M20 10v20M14 14h8c2 0 4 2 4 4s-2 4-4 4h-6c-2 0-4 2-4 4s2 4 4 4h8" />
          </svg>
        )
      case 'contract':
        return (
          <svg viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="2">
            <rect x="8" y="4" width="24" height="32" rx="2" />
            <line x1="14" y1="12" x2="26" y2="12" />
            <line x1="14" y1="18" x2="26" y2="18" />
            <line x1="14" y1="24" x2="20" y2="24" />
            <path d="M22 28l2 2 4-4" />
          </svg>
        )
      case 'document':
        return (
          <svg viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="2">
            <path d="M8 6h16l8 8v22a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
            <path d="M24 6v8h8" />
            <line x1="14" y1="20" x2="26" y2="20" />
            <line x1="14" y1="26" x2="26" y2="26" />
            <line x1="14" y1="32" x2="20" y2="32" />
          </svg>
        )
      case 'workflow':
        return (
          <svg viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="2">
            <rect x="4" y="16" width="10" height="8" rx="2" />
            <rect x="26" y="8" width="10" height="8" rx="2" />
            <rect x="26" y="24" width="10" height="8" rx="2" />
            <path d="M14 20h6l4-8h2" />
            <path d="M20 20l4 8h2" />
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
      className="section unifier-panel"
    >
      <div className="container">
        <div className="unifier-grid">
          <div className="unifier-left fade-in-section">
            <span className="product-panel-label">Project Controls & Cost Management</span>
            <h2 className="product-panel-title">Primavera Unifier</h2>
            <p className="product-panel-description">
              프로젝트 비용, 계약, 문서를 통합 관리하는 엔터프라이즈 솔루션입니다.
              자동화된 워크플로우와 실시간 대시보드로 프로젝트 전 과정을 효율적으로 관리합니다.
            </p>

            <div className="unifier-modules" role="tablist">
              {modules.map((module, index) => (
                <button
                  key={module.id}
                  className={`unifier-module ${activeModule === index ? 'active' : ''}`}
                  onClick={() => setActiveModule(index)}
                  role="tab"
                  aria-selected={activeModule === index}
                  aria-label={module.name}
                >
                  <span className="unifier-module-icon">
                    {renderModuleIcon(module.icon, activeModule === index)}
                  </span>
                  <span className="unifier-module-name">{module.name}</span>
                </button>
              ))}
            </div>

            {/* <div className="product-panel-cta">
              <a
                href="#"
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Primavera Unifier 소개서 다운로드"
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

          <div className="unifier-right">
            <div className="unifier-metrics stagger-cards">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className="unifier-metric-card card-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <AnimatedCounter
                    value={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    isVisible={isVisible}
                  />
                  <span className="unifier-metric-label">{metric.label}</span>
                  <span className="unifier-metric-desc">{metric.description}</span>
                  <div
                    className="unifier-metric-bar"
                    style={{
                      transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
                      transitionDelay: `${index * 0.2}s`
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UnifierPanel
