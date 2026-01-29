import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initPageAnimations } from '../utils/animations'

gsap.registerPlugin(ScrollTrigger)

function Unifier() {
  useEffect(() => {
    ScrollTrigger.refresh()
    initPageAnimations()

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  const cards = [
    {
      id: 'overview',
      title: '개요',
      description: 'Overview',
      image: 'https://images.pexels.com/photos/1098515/pexels-photo-1098515.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'modules',
      title: '모듈 소개',
      description: 'Module Introduction',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'customers',
      title: '고객 사례',
      description: 'Customer Cases',
      image: 'https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ]

  return (
    <div className="subpage-container">
      <section className="subpage-hero fade-in-section">
        <div className="subpage-hero-content">
          <h1 className="subpage-title">Unifier</h1>
          <p className="subpage-subtitle">Oracle Primavera Unifier</p>
        </div>
      </section>

      <section className="subpage-content">
        <div className="cards-grid stagger-cards">
          {cards.map((card) => (
            <div key={card.id} className="subpage-card card-item">
              <div className="subpage-card-image">
                <img src={card.image} alt={card.title} />
              </div>
              <div className="subpage-card-content">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Unifier
