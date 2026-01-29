import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initPageAnimations } from '../utils/animations'

gsap.registerPlugin(ScrollTrigger)

function PPM() {
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
      image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'features',
      title: '주요 기능',
      description: 'Main Features',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'benefits',
      title: '도입 효과',
      description: 'Benefits',
      image: 'https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ]

  return (
    <div className="subpage-container">
      <section className="subpage-hero fade-in-section">
        <div className="subpage-hero-content">
          <h1 className="subpage-title">PPM</h1>
          <p className="subpage-subtitle">Project Portfolio Management</p>
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

export default PPM
