import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const steps = [
  {
    number: '01',
    title: '요구사항 분석',
    description: '비즈니스 목표와 기술 요구사항을 심층 분석합니다.',
    visual: '📋'
  },
  {
    number: '02',
    title: '아키텍처 설계',
    description: '확장 가능하고 안정적인 시스템 구조를 설계합니다.',
    visual: '🏗️'
  },
  {
    number: '03',
    title: '개발 및 구현',
    description: '애자일 방법론으로 신속하고 유연하게 개발합니다.',
    visual: '💻'
  },
  {
    number: '04',
    title: '테스트 및 검증',
    description: '품질 보증을 위한 다층적 테스트를 수행합니다.',
    visual: '✅'
  },
  {
    number: '05',
    title: '배포 및 운영',
    description: 'CI/CD 파이프라인으로 안정적인 배포를 진행합니다.',
    visual: '🚀'
  },
  {
    number: '06',
    title: '유지보수 & 지원',
    description: '24/7 모니터링과 지속적인 기술 지원을 제공합니다.',
    visual: '🛠️'
  }
]

function Capabilities({ id }) {
  const sectionRef = useRef(null)
  const [activeStep, setActiveStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${window.innerHeight * 2}`,
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const prog = self.progress
        setProgress(prog * 100)
        const newStep = Math.min(
          Math.floor(prog * steps.length),
          steps.length - 1
        )
        setActiveStep(newStep)
      }
    })

    return () => {
      trigger.kill()
    }
  }, [])

  return (
    <section id={id} ref={sectionRef} className="section capabilities">
      <div className="container">
        <div className="fade-in-section" style={{ marginBottom: 'var(--space-3xl)' }}>
          <h2 className="section-title">Our Process</h2>
          <p className="section-subtitle">
            체계적인 프로세스로 최상의 결과를 도출합니다
          </p>
        </div>

        <div className="capabilities-wrapper">
          <div className="capabilities-steps">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ height: `${progress}%` }}
              />
            </div>
            
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`capability-step ${index === activeStep ? 'active' : ''}`}
                onClick={() => setActiveStep(index)}
              >
                <div className="step-number">{step.number}</div>
                <div className="step-content">
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="capabilities-visual">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`visual-content ${index === activeStep ? 'active' : ''}`}
              >
                <div style={{ fontSize: '8rem' }}>{step.visual}</div>
                <h3 style={{ marginTop: 'var(--space-lg)', fontSize: 'var(--text-2xl)' }}>
                  {step.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Capabilities
