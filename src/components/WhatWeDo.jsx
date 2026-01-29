import { useRef, useState } from 'react'

const services = [
  {
    icon: '🚀',
    title: '디지털 트랜스포메이션',
    description: '기업의 비즈니스 프로세스를 혁신하고 디지털 기반의 새로운 가치를 창출합니다.'
  },
  {
    icon: '☁️',
    title: '클라우드 솔루션',
    description: 'AWS, Azure, GCP 기반의 안정적이고 확장 가능한 클라우드 인프라를 구축합니다.'
  },
  {
    icon: '🤖',
    title: 'AI & 머신러닝',
    description: '최신 AI 기술을 활용하여 데이터 기반의 스마트한 의사결정을 지원합니다.'
  },
  {
    icon: '🔒',
    title: '사이버 보안',
    description: '기업 자산과 데이터를 보호하는 종합적인 보안 솔루션을 제공합니다.'
  },
  {
    icon: '📱',
    title: '모바일 개발',
    description: 'iOS, Android 네이티브 및 크로스플랫폼 앱을 개발합니다.'
  },
  {
    icon: '🌐',
    title: '웹 개발',
    description: '최신 기술 스택으로 반응형 웹 애플리케이션을 구축합니다.'
  }
]

function ServiceCard({ service, index }) {
  const cardRef = useRef(null)
  const lightRef = useRef(null)
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    setTransform({ rotateX, rotateY })

    if (lightRef.current) {
      lightRef.current.style.left = `${x - 100}px`
      lightRef.current.style.top = `${y - 100}px`
    }
  }

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 })
  }

  return (
    <div 
      className="service-card card-item"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div 
        className="service-card-inner"
        style={{
          transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`
        }}
      >
        <div ref={lightRef} className="service-card-light" />
        <div className="service-icon">{service.icon}</div>
        <h3 className="service-title">{service.title}</h3>
        <p className="service-desc">{service.description}</p>
      </div>
    </div>
  )
}

function WhatWeDo({ id }) {
  return (
    <section id={id} className="section" style={{ background: 'var(--color-bg-secondary)' }}>
      <div className="container">
        <div className="fade-in-section" style={{ textAlign: 'center', marginBottom: 'var(--space-4xl)' }}>
          <h2 className="section-title">What We Do</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            고객의 성공을 위한 종합적인 IT 서비스를 제공합니다
          </p>
        </div>

        <div className="services-grid stagger-cards">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhatWeDo
