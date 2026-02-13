import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import HeroVideo from '../components/HeroVideo'
import PpmMenuSection from '../components/panels/PpmMenuSection'
import EppmMenuSection from '../components/panels/EppmMenuSection'
import HomeOpcSection from '../components/panels/HomeOpcSection'
import UnifierMenuSection from '../components/panels/UnifierMenuSection'
import AconexMenuSection from '../components/panels/AconexMenuSection'
import SectionIndicator from '../components/SectionIndicator'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const sections = [
  { id: 'hero', label: 'Main' },
  { id: 'ppm', label: 'PPM' },
  { id: 'opc', label: 'OPC' },
  { id: 'eppm', label: 'P6 EPPM' },
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
    const footerSection = document.querySelector('.footer')
    const snapTargets = footerSection ? [...panels, footerSection] : panels
    const lastPanelIndex = panels.length - 1
    const lastSnapIndex = snapTargets.length - 1

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

    if (footerSection) {
      ScrollTrigger.create({
        trigger: footerSection,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          currentSectionRef.current = lastSnapIndex
          setActiveSection(lastPanelIndex)
        },
        onEnterBack: () => {
          currentSectionRef.current = lastSnapIndex
          setActiveSection(lastPanelIndex)
        }
      })
    }

    const snapToIndex = (targetIndex) => {
      const target = snapTargets[targetIndex]
      if (!target) return

      currentSectionRef.current = targetIndex
      setActiveSection(Math.min(targetIndex, lastPanelIndex))

      gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: target, autoKill: false },
        ease: 'power3.inOut',
        onComplete: () => {
          setTimeout(() => {
            isAnimatingRef.current = false
          }, 100)
        }
      })
    }

    const handleWheel = (e) => {
      if (isAnimatingRef.current) {
        e.preventDefault()
        return
      }

      const delta = e.deltaY
      const threshold = 50

      if (Math.abs(delta) < threshold) return

      let nextSection = currentSectionRef.current

      if (delta > 0 && currentSectionRef.current < lastSnapIndex) {
        nextSection = currentSectionRef.current + 1
      } else if (delta < 0 && currentSectionRef.current > 0) {
        nextSection = currentSectionRef.current - 1
      } else {
        return
      }

      e.preventDefault()
      isAnimatingRef.current = true
      snapToIndex(nextSection)
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

      if (delta > 0 && currentSectionRef.current < lastSnapIndex) {
        nextSection = currentSectionRef.current + 1
      } else if (delta < 0 && currentSectionRef.current > 0) {
        nextSection = currentSectionRef.current - 1
      } else {
        isAnimatingRef.current = false
        return
      }

      snapToIndex(nextSection)
    }

    const shouldHijackScroll = !window.matchMedia('(hover: none), (pointer: coarse)').matches

    if (shouldHijackScroll) {
      window.addEventListener('wheel', handleWheel, { passive: false })
      window.addEventListener('touchstart', handleTouchStart, { passive: true })
      window.addEventListener('touchend', handleTouchEnd, { passive: true })
    }

    initAnimations()

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      if (shouldHijackScroll) {
        window.removeEventListener('wheel', handleWheel)
        window.removeEventListener('touchstart', handleTouchStart)
        window.removeEventListener('touchend', handleTouchEnd)
      }
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
          <PpmMenuSection id="ppm" />
        </section>
        <section className="panel">
          <HomeOpcSection id="opc" />
        </section>
        <section className="panel">
          <EppmMenuSection id="eppm" />
        </section>
        <section className="panel">
          <UnifierMenuSection id="unifier" />
        </section>
        <section className="panel">
          <AconexMenuSection id="aconex" />
        </section>
      </main>
    </>
  )
}

export default Home
