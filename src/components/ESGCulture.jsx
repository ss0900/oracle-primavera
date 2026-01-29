import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const esgItems = [
  {
    id: 'environment',
    title: 'Environment',
    subtitle: '환경',
    description: '탄소중립 목표 달성과 친환경 기술 개발을 통해 지속가능한 미래를 만들어갑니다.',
    icon: '🌱',
    color: '#10b981',
    actions: [
      '재생에너지 100% 사용',
      '탄소배출 50% 감축',
      '친환경 데이터센터 운영'
    ]
  },
  {
    id: 'social',
    title: 'Social',
    subtitle: '사회',
    description: '다양성과 포용성을 존중하며, 지역사회와 함께 성장하는 기업이 되겠습니다.',
    icon: '🤝',
    color: '#00d4ff',
    actions: [
      'IT 교육 소외계층 지원',
      '지역사회 기술 봉사',
      '다양성 및 포용 프로그램'
    ]
  },
  {
    id: 'governance',
    title: 'Governance',
    subtitle: '지배구조',
    description: '투명한 경영과 윤리적 비즈니스 관행으로 신뢰받는 기업을 지향합니다.',
    icon: '⚖️',
    color: '#7c3aed',
    actions: [
      '이사회 독립성 강화',
      '반부패 정책 이행',
      '정보보안 거버넌스'
    ]
  }
]

function ESGCulture({ id }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = section.querySelectorAll('.esg-card')
    
    gsap.fromTo(cards,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        }
      }
    )
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
          <h2 className="section-title">ESG & Culture</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            지속가능한 가치 창출을 위한 우리의 약속
          </p>
        </div>

        <div className="esg-grid">
          {esgItems.map((item) => (
            <div key={item.id} className="esg-card">
              <div 
                className="esg-icon"
                style={{ 
                  fontSize: '4rem',
                  filter: `drop-shadow(0 0 20px ${item.color}40)`
                }}
              >
                {item.icon}
              </div>
              
              <h3 className="esg-title">
                {item.title}
                <span style={{ 
                  display: 'block', 
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-muted)',
                  fontWeight: 400,
                  marginTop: 'var(--space-xs)'
                }}>
                  {item.subtitle}
                </span>
              </h3>
              
              <p className="esg-desc">{item.description}</p>
              
              <div className="esg-actions">
                <div style={{ 
                  fontWeight: 600, 
                  marginBottom: 'var(--space-sm)',
                  color: item.color 
                }}>
                  우리가 실천하는 일
                </div>
                <ul style={{ 
                  listStyle: 'none', 
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-xs)'
                }}>
                  {item.actions.map((action, i) => (
                    <li key={i} style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: 'var(--space-sm)'
                    }}>
                      <span style={{ color: item.color }}>✓</span>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ESGCulture
