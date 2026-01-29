import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initPageAnimations } from '../utils/animations'

gsap.registerPlugin(ScrollTrigger)

function Career() {
  useEffect(() => {
    ScrollTrigger.refresh()
    initPageAnimations()

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  const positions = [
    {
      id: 'frontend-dev',
      title: 'Frontend Developer',
      department: 'Engineering',
      location: 'Seoul, Korea',
      type: 'Full-time',
      description: 'React, Vue.js 기반 웹 애플리케이션 개발'
    },
    {
      id: 'backend-dev',
      title: 'Backend Developer',
      department: 'Engineering',
      location: 'Seoul, Korea',
      type: 'Full-time',
      description: 'Node.js, Python 기반 서버 개발'
    },
    {
      id: 'product-manager',
      title: 'Product Manager',
      department: 'Product',
      location: 'Seoul, Korea',
      type: 'Full-time',
      description: '제품 기획 및 로드맵 관리'
    },
    {
      id: 'ui-designer',
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Seoul, Korea',
      type: 'Full-time',
      description: '사용자 경험 디자인 및 인터페이스 설계'
    }
  ]

  return (
    <div className="subpage-container">
      <section className="subpage-hero fade-in-section">
        <div className="subpage-hero-content">
          <h1 className="subpage-title">Career</h1>
          <p className="subpage-subtitle">채용 정보</p>
        </div>
      </section>

      <section className="subpage-content">
        <div className="positions-list stagger-cards">
          {positions.map((position) => (
            <div key={position.id} className="position-card card-item">
              <div className="position-header">
                <h3 className="position-title">{position.title}</h3>
                <span className="position-type">{position.type}</span>
              </div>
              <div className="position-meta">
                <span className="position-department">{position.department}</span>
                <span className="position-location">{position.location}</span>
              </div>
              <p className="position-description">{position.description}</p>
              <button className="position-apply">Apply Now</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Career
