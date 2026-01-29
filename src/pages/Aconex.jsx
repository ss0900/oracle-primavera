import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initPageAnimations } from '../utils/animations'

gsap.registerPlugin(ScrollTrigger)

function Aconex() {
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
      image: 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'features',
      title: '기능 안내',
      description: 'Feature Guide',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'projects',
      title: '프로젝트 사례',
      description: 'Project Cases',
      image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ]

  return (
    <div className="subpage-container">
      <section className="subpage-hero fade-in-section">
        <div className="subpage-hero-content">
          <h1 className="subpage-title">Aconex</h1>
          <p className="subpage-subtitle">Oracle Aconex</p>
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

export default Aconex
