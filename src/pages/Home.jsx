import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import Hero from '../components/Hero'
import WhatWeDo from '../components/WhatWeDo'
import Capabilities from '../components/Capabilities'
import Metrics from '../components/Metrics'
import GlobalMap from '../components/GlobalMap'
import ESGCulture from '../components/ESGCulture'
import News from '../components/News'
import Contact from '../components/Contact'
import SectionIndicator from '../components/SectionIndicator'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

function Home() {
  const [activeSection, setActiveSection] = useState(0)
  const containerRef = useRef(null)

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'metrics', label: 'Metrics' },
    { id: 'global', label: 'Global' },
    { id: 'esg', label: 'ESG' },
    { id: 'news', label: 'News' },
    { id: 'contact', label: 'Contact' }
  ]

  useEffect(() => {
    const panels = gsap.utils.toArray('.panel')

    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: 'top top',
        end: 'bottom top',
        snap: {
          snapTo: 1,
          duration: { min: 0.3, max: 0.6 },
          delay: 0,
          ease: 'power2.inOut'
        },
        onEnter: () => setActiveSection(i),
        onEnterBack: () => setActiveSection(i),
      })
    })

    ScrollTrigger.create({
      snap: {
        snapTo: 1 / (panels.length - 1),
        duration: { min: 0.4, max: 0.8 },
        delay: 0.1,
        ease: 'power2.inOut',
        inertia: false
      },
      end: () => '+=' + (panels.length - 1) * window.innerHeight
    })

    let currentSection = 0
    let isAnimating = false

    const handleWheel = (e) => {
      if (isAnimating) {
        e.preventDefault()
        return
      }

      const delta = e.deltaY
      const threshold = 50

      if (Math.abs(delta) < threshold) return

      e.preventDefault()
      isAnimating = true

      if (delta > 0 && currentSection < panels.length - 1) {
        currentSection++
      } else if (delta < 0 && currentSection > 0) {
        currentSection--
      } else {
        isAnimating = false
        return
      }

      setActiveSection(currentSection)

      gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: panels[currentSection], autoKill: false },
        ease: 'power3.inOut',
        onComplete: () => {
          setTimeout(() => {
            isAnimating = false
          }, 100)
        }
      })
    }

    let touchStartY = 0
    let touchEndY = 0

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e) => {
      if (isAnimating) return

      touchEndY = e.changedTouches[0].clientY
      const delta = touchStartY - touchEndY
      const threshold = 50

      if (Math.abs(delta) < threshold) return

      isAnimating = true

      if (delta > 0 && currentSection < panels.length - 1) {
        currentSection++
      } else if (delta < 0 && currentSection > 0) {
        currentSection--
      } else {
        isAnimating = false
        return
      }

      setActiveSection(currentSection)

      gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: panels[currentSection], autoKill: false },
        ease: 'power3.inOut',
        onComplete: () => {
          setTimeout(() => {
            isAnimating = false
          }, 100)
        }
      })
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    initAnimations()

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  const initAnimations = () => {
    gsap.utils.toArray('.fade-in-section').forEach((section) => {
      gsap.fromTo(section,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })

    gsap.utils.toArray('.stagger-cards').forEach((container) => {
      const cards = container.querySelectorAll('.card-item')
      gsap.fromTo(cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 75%',
          }
        }
      )
    })
  }

  const scrollToSection = (sectionId) => {
    const sectionIndex = sections.findIndex(s => s.id === sectionId)
    if (sectionIndex === -1) return

    const panels = gsap.utils.toArray('.panel')
    if (panels[sectionIndex]) {
      setActiveSection(sectionIndex)
      gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: panels[sectionIndex], autoKill: false },
        ease: 'power3.inOut'
      })
    }
  }

  return (
    <>
      <SectionIndicator
        sections={sections}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      <main ref={containerRef}>
        <section className="panel">
          <Hero id="hero" scrollToSection={scrollToSection} />
        </section>
        <section className="panel">
          <WhatWeDo id="services" />
        </section>
        <section className="panel">
          <Capabilities id="capabilities" />
        </section>
        <section className="panel">
          <Metrics id="metrics" />
        </section>
        <section className="panel">
          <GlobalMap id="global" />
        </section>
        <section className="panel">
          <ESGCulture id="esg" />
        </section>
        <section className="panel">
          <News id="news" />
        </section>
        <section className="panel">
          <Contact id="contact" />
        </section>
      </main>
    </>
  )
}

export default Home
