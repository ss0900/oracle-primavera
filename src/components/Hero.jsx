import { useEffect, useRef } from 'react'

function Hero({ id, scrollToSection }) {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let particles = []
    let width = window.innerWidth
    let height = window.innerHeight

    // Set canvas size
    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }
    resize()
    window.addEventListener('resize', resize)

    // Particle class
    class Particle {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.opacity = Math.random() * 0.5 + 0.2
        this.hue = Math.random() * 60 + 180 // Cyan to purple range
      }

      update() {
        // Mouse interaction
        const dx = mouseRef.current.x - this.x
        const dy = mouseRef.current.y - this.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (dist < 200) {
          const force = (200 - dist) / 200
          this.x -= dx * force * 0.02
          this.y -= dy * force * 0.02
        }

        this.x += this.speedX
        this.y += this.speedY

        // Wrap around edges
        if (this.x < 0) this.x = width
        if (this.x > width) this.x = 0
        if (this.y < 0) this.y = height
        if (this.y > height) this.y = 0
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${this.hue}, 100%, 60%, ${this.opacity})`
        ctx.fill()
      }
    }

    // Create particles
    const particleCount = Math.min(150, Math.floor((width * height) / 10000))
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Draw connections
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 120) {
            const opacity = (1 - dist / 120) * 0.15
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw gradient background effect
      const gradient = ctx.createRadialGradient(
        mouseRef.current.x || width / 2,
        mouseRef.current.y || height / 2,
        0,
        width / 2,
        height / 2,
        width
      )
      gradient.addColorStop(0, 'rgba(0, 212, 255, 0.03)')
      gradient.addColorStop(0.5, 'rgba(124, 58, 237, 0.02)')
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      particles.forEach(p => {
        p.update()
        p.draw()
      })

      drawConnections()
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <section id={id} className="hero">
      <div className="hero-bg">
        <canvas ref={canvasRef} className="hero-canvas" />
      </div>

      <div className="container hero-content">
        <h1 className="hero-title">
          <span style={{ display: 'block' }}>혁신으로 미래를</span>
          <span className="gradient-text">디자인합니다</span>
        </h1>
        
        <p className="hero-subtitle">
          최첨단 기술과 창의적 솔루션으로 비즈니스의 디지털 전환을 
          이끌어가는 글로벌 IT 기업입니다.
        </p>

        <div className="hero-cta">
          <button 
            className="btn btn-primary"
            onClick={() => scrollToSection('services')}
          >
            서비스 알아보기
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => scrollToSection('contact')}
          >
            문의하기
          </button>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>Scroll Down</span>
        <div className="scroll-indicator-icon"></div>
      </div>
    </section>
  )
}

export default Hero
