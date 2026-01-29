import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initPageAnimations } from '../utils/animations'

gsap.registerPlugin(ScrollTrigger)

function EPPM() {
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
      image: 'https://images.pexels.com/photos/5989932/pexels-photo-5989932.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'solution',
      title: '솔루션 특징',
      description: 'Solution Features',
      image: 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'cases',
      title: '구축 사례',
      description: 'Implementation Cases',
      image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ]

  return (
    <div className="subpage-container">
      <section className="subpage-hero fade-in-section">
        <div className="subpage-hero-content">
          <h1 className="subpage-title">EPPM</h1>
          <p className="subpage-subtitle">Enterprise Project Portfolio Management</p>
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

export default EPPM
