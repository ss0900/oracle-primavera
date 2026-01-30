import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import HeroVideo from '../components/HeroVideo'
import PPMPanel from '../components/panels/PPMPanel'
import EPPMPanel from '../components/panels/EPPMPanel'
import OPCPanel from '../components/panels/OPCPanel'
import UnifierPanel from '../components/panels/UnifierPanel'
import AconexPanel from '../components/panels/AconexPanel'
import SectionIndicator from '../components/SectionIndicator'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const sections = [
  { id: 'hero', label: 'Main' },
  { id: 'ppm', label: 'P6 PPM' },
  { id: 'eppm', label: 'P6 EPPM' },
  { id: 'opc', label: 'OPC' },
  { id: 'unifier', label: 'Unifier' },
  { id: 'aconex', label: 'Aconex' }
]

function Home() {
  const [activeSection, setActiveSection] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const containerRef = useRef(null)
  const isAnimatingRef = useRef(false)
  const currentSectionRef = useRef(0)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const scrollToSection = useCallback((sectionId) => {
    const sectionIndex = sections.findIndex(s => s.id === sectionId)
    if (sectionIndex === -1) return

    const panels = gsap.utils.toArray('.panel')
    if (!panels[sectionIndex]) return

    currentSectionRef.current = sectionIndex
    setActiveSection(sectionIndex)

    if (prefersReducedMotion) {
      panels[sectionIndex].scrollIntoView({ behavior: 'auto' })
    } else {
      isAnimatingRef.current = true
      gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: panels[sectionIndex], autoKill: false },
        ease: 'power3.inOut',
        onComplete: () => {
          setTimeout(() => {
            isAnimatingRef.current = false
          }, 100)
        }
      })
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion) {
      initAnimations()
      return () => {
        ScrollTrigger.getAll().forEach(t => t.kill())
      }
    }

    const panels = gsap.utils.toArray('.panel')

    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          currentSectionRef.current = i
          setActiveSection(i)
        },
        onEnterBack: () => {
          currentSectionRef.current = i
          setActiveSection(i)
        }
      })
    })

    const handleWheel = (e) => {
      if (isAnimatingRef.current) {
        e.preventDefault()
        return
      }

      const delta = e.deltaY
      const threshold = 50

      if (Math.abs(delta) < threshold) return

      e.preventDefault()
      isAnimatingRef.current = true

      let nextSection = currentSectionRef.current

      if (delta > 0 && currentSectionRef.current < panels.length - 1) {
        nextSection = currentSectionRef.current + 1
      } else if (delta < 0 && currentSectionRef.current > 0) {
        nextSection = currentSectionRef.current - 1
      } else {
        isAnimatingRef.current = false
        return
      }

      currentSectionRef.current = nextSection
      setActiveSection(nextSection)

      gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: panels[nextSection], autoKill: false },
        ease: 'power3.inOut',
        onComplete: () => {
          setTimeout(() => {
            isAnimatingRef.current = false
          }, 100)
        }
      })
    }

    let touchStartY = 0

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e) => {
      if (isAnimatingRef.current) return

      const touchEndY = e.changedTouches[0].clientY
      const delta = touchStartY - touchEndY
      const threshold = 50

      if (Math.abs(delta) < threshold) return

      isAnimatingRef.current = true

      let nextSection = currentSectionRef.current

      if (delta > 0 && currentSectionRef.current < panels.length - 1) {
        nextSection = currentSectionRef.current + 1
      } else if (delta < 0 && currentSectionRef.current > 0) {
        nextSection = currentSectionRef.current - 1
      } else {
        isAnimatingRef.current = false
        return
      }

      currentSectionRef.current = nextSection
      setActiveSection(nextSection)

      gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: panels[nextSection], autoKill: false },
        ease: 'power3.inOut',
        onComplete: () => {
          setTimeout(() => {
            isAnimatingRef.current = false
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
  }, [prefersReducedMotion])

  const initAnimations = () => {
    if (prefersReducedMotion) return

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
            start: 'top 75%'
          }
        }
      )
    })
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
          <HeroVideo id="hero" scrollToSection={scrollToSection} />
        </section>
        <section className="panel">
          <PPMPanel id="ppm" />
        </section>
        <section className="panel">
          <EPPMPanel id="eppm" isActive={activeSection === 2} />
        </section>
        <section className="panel">
          <OPCPanel id="opc" />
        </section>
        <section className="panel">
          <UnifierPanel id="unifier" />
        </section>
        <section className="panel">
          <AconexPanel id="aconex" />
        </section>
      </main>
    </>
  )
}

export default Home
