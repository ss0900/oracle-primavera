import gsap from 'gsap'

export const initFadeInAnimations = () => {
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
}

export const initStaggerCards = () => {
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

export const initPageAnimations = () => {
  initFadeInAnimations()
  initStaggerCards()
}
