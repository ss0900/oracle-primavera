import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const metrics = [
  {
    value: 500,
    suffix: '+',
    label: '프로젝트 완료',
    tooltip: '2023년 기준 누적 완료 프로젝트 수'
  },
  {
    value: 98,
    suffix: '%',
    label: '고객 만족도',
    tooltip: '연간 고객 만족도 조사 결과'
  },
  {
    value: 15,
    suffix: '년',
    label: '업력',
    tooltip: '2008년 설립 이래 지속적인 성장'
  },
  {
    value: 200,
    suffix: '+',
    label: '전문 인력',
    tooltip: '개발자, 디자이너, PM 등 전문가 구성'
  }
]

function AnimatedCounter({ value, suffix, onComplete }) {
  const [count, setCount] = useState(0)
  const countRef = useRef({ value: 0 })

  useEffect(() => {
    gsap.to(countRef.current, {
      value: value,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        setCount(Math.floor(countRef.current.value))
      },
      onComplete
    })
  }, [value])

  return (
    <span>{count.toLocaleString()}{suffix}</span>
  )
}

function MetricCard({ metric, index, isVisible }) {
  const [showCounter, setShowCounter] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    if (isVisible && !showCounter) {
      const timer = setTimeout(() => {
        setShowCounter(true)
      }, index * 200)
      return () => clearTimeout(timer)
    }
  }, [isVisible, index])

  return (
    <div 
      ref={cardRef}
      className="metric-card card-item"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="metric-tooltip">{metric.tooltip}</div>
      <div className="metric-value">
        {showCounter ? (
          <AnimatedCounter 
            value={metric.value} 
            suffix={metric.suffix}
          />
        ) : (
          <span>0{metric.suffix}</span>
        )}
      </div>
      <div className="metric-label">{metric.label}</div>
      
      {/* Mini chart decoration */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'var(--gradient-primary)',
        opacity: 0.5,
        transform: showCounter ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 1s ease-out'
      }} />
    </div>
  )
}

function Metrics({ id }) {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      onEnter: () => setIsVisible(true),
    })

    return () => {
      trigger.kill()
    }
  }, [])

  return (
    <section 
      id={id} 
      ref={sectionRef}
      className="section" 
      style={{ background: 'var(--color-bg-primary)' }}
    >
      <div className="container">
        <div className="fade-in-section" style={{ textAlign: 'center', marginBottom: 'var(--space-4xl)' }}>
          <h2 className="section-title">Our Achievements</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            숫자로 증명하는 신뢰와 성과
          </p>
        </div>

        <div className="metrics-grid stagger-cards">
          {metrics.map((metric, index) => (
            <MetricCard 
              key={index} 
              metric={metric} 
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Metrics
