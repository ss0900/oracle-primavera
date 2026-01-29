import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const locations = [
  {
    id: 'seoul',
    name: 'Seoul HQ',
    country: '대한민국',
    x: 76,
    y: 38,
    info: '본사 및 R&D 센터',
    employees: 150,
    established: 2008
  },
  {
    id: 'tokyo',
    name: 'Tokyo Office',
    country: '일본',
    x: 80,
    y: 40,
    info: '아시아 파트너십 허브',
    employees: 25,
    established: 2015
  },
  {
    id: 'singapore',
    name: 'Singapore Office',
    country: '싱가포르',
    x: 70,
    y: 55,
    info: '동남아시아 비즈니스 센터',
    employees: 30,
    established: 2018
  },
  {
    id: 'sanfrancisco',
    name: 'San Francisco Office',
    country: '미국',
    x: 15,
    y: 42,
    info: 'AI/ML 연구소',
    employees: 40,
    established: 2020
  },
  {
    id: 'berlin',
    name: 'Berlin Office',
    country: '독일',
    x: 51,
    y: 35,
    info: '유럽 비즈니스 센터',
    employees: 20,
    established: 2022
  }
]

function GlobalMap({ id }) {
  const [activeLocation, setActiveLocation] = useState(null)
  const [hoveredLocation, setHoveredLocation] = useState(null)
  const [visibleMarkers, setVisibleMarkers] = useState([])
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 60%',
      onEnter: () => {
        // Sequentially show markers
        locations.forEach((loc, index) => {
          setTimeout(() => {
            setVisibleMarkers(prev => [...prev, loc.id])
          }, index * 300)
        })
      }
    })

    return () => {
      trigger.kill()
    }
  }, [])

  return (
    <section 
      id={id}
      ref={sectionRef}
      className="section" 
      style={{ background: 'var(--color-bg-secondary)' }}
    >
      <div className="container">
        <div className="fade-in-section" style={{ textAlign: 'center', marginBottom: 'var(--space-4xl)' }}>
          <h2 className="section-title">Global Presence</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            전 세계 5개 거점에서 글로벌 서비스를 제공합니다
          </p>
        </div>

        <div className="global-wrapper">
          <div className="map-container">
            {/* Simple SVG World Map */}
            <svg 
              viewBox="0 0 100 60" 
              className="map-svg"
              style={{ 
                background: 'rgba(255,255,255,0.02)',
                borderRadius: 'var(--radius-xl)'
              }}
            >
              {/* Simplified world continents */}
              <defs>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(0, 212, 255, 0.1)" />
                  <stop offset="100%" stopColor="rgba(124, 58, 237, 0.1)" />
                </linearGradient>
              </defs>
              
              {/* North America */}
              <path 
                d="M5,20 Q15,15 25,20 Q30,25 25,35 Q20,45 10,40 Q5,35 5,20Z"
                fill="url(#mapGradient)"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.2"
              />
              
              {/* South America */}
              <path 
                d="M20,45 Q25,42 30,48 Q28,58 22,58 Q18,55 20,45Z"
                fill="url(#mapGradient)"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.2"
              />
              
              {/* Europe */}
              <path 
                d="M45,18 Q55,15 58,22 Q55,28 48,30 Q42,28 45,18Z"
                fill="url(#mapGradient)"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.2"
              />
              
              {/* Africa */}
              <path 
                d="M48,32 Q55,30 58,38 Q56,50 50,52 Q45,48 48,32Z"
                fill="url(#mapGradient)"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.2"
              />
              
              {/* Asia */}
              <path 
                d="M60,15 Q75,12 85,20 Q88,30 82,38 Q75,42 68,38 Q62,32 60,15Z"
                fill="url(#mapGradient)"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.2"
              />
              
              {/* Australia */}
              <path 
                d="M78,48 Q85,45 88,50 Q86,55 80,55 Q76,52 78,48Z"
                fill="url(#mapGradient)"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.2"
              />

              {/* Connection lines */}
              {locations.map((loc, i) => 
                locations.slice(i + 1).map((loc2, j) => (
                  <line
                    key={`${loc.id}-${loc2.id}`}
                    x1={loc.x}
                    y1={loc.y}
                    x2={loc2.x}
                    y2={loc2.y}
                    stroke="rgba(0, 212, 255, 0.1)"
                    strokeWidth="0.1"
                    strokeDasharray="0.5,0.5"
                    style={{
                      opacity: visibleMarkers.includes(loc.id) && visibleMarkers.includes(loc2.id) ? 1 : 0,
                      transition: 'opacity 0.5s'
                    }}
                  />
                ))
              )}

              {/* Location markers */}
              {locations.map((loc) => (
                <g 
                  key={loc.id}
                  className={`map-marker ${activeLocation === loc.id ? 'active' : ''}`}
                  style={{
                    opacity: visibleMarkers.includes(loc.id) ? 1 : 0,
                    transition: 'all 0.5s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={() => setHoveredLocation(loc.id)}
                  onMouseLeave={() => setHoveredLocation(null)}
                  onClick={() => setActiveLocation(loc.id === activeLocation ? null : loc.id)}
                >
                  {/* Pulse effect */}
                  <circle 
                    cx={loc.x} 
                    cy={loc.y} 
                    r={hoveredLocation === loc.id || activeLocation === loc.id ? 3 : 1.5}
                    fill="rgba(0, 212, 255, 0.3)"
                    style={{ transition: 'r 0.3s' }}
                  >
                    <animate 
                      attributeName="r" 
                      from="1.5" 
                      to="3" 
                      dur="2s" 
                      repeatCount="indefinite"
                    />
                    <animate 
                      attributeName="opacity" 
                      from="0.5" 
                      to="0" 
                      dur="2s" 
                      repeatCount="indefinite"
                    />
                  </circle>
                  
                  {/* Main dot */}
                  <circle 
                    cx={loc.x} 
                    cy={loc.y} 
                    r={hoveredLocation === loc.id || activeLocation === loc.id ? 1.2 : 0.8}
                    fill="var(--color-accent)"
                    style={{ transition: 'r 0.3s' }}
                  />
                  
                  {/* Label on hover */}
                  {(hoveredLocation === loc.id || activeLocation === loc.id) && (
                    <text
                      x={loc.x}
                      y={loc.y - 3}
                      textAnchor="middle"
                      fill="white"
                      fontSize="2"
                      fontFamily="var(--font-body)"
                    >
                      {loc.name}
                    </text>
                  )}
                </g>
              ))}
            </svg>
          </div>

          <div className="location-cards">
            {locations.map((loc) => (
              <div
                key={loc.id}
                className={`location-card ${activeLocation === loc.id ? 'active' : ''}`}
                onMouseEnter={() => setHoveredLocation(loc.id)}
                onMouseLeave={() => setHoveredLocation(null)}
                onClick={() => setActiveLocation(loc.id === activeLocation ? null : loc.id)}
              >
                <div className="location-name">{loc.name}</div>
                <div className="location-info">{loc.country} • {loc.info}</div>
                {activeLocation === loc.id && (
                  <div style={{ 
                    marginTop: 'var(--space-md)',
                    paddingTop: 'var(--space-md)',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 'var(--space-sm)',
                    fontSize: 'var(--text-sm)'
                  }}>
                    <div>
                      <div style={{ color: 'var(--color-text-muted)' }}>인원</div>
                      <div style={{ color: 'var(--color-accent)' }}>{loc.employees}명</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--color-text-muted)' }}>설립</div>
                      <div style={{ color: 'var(--color-accent)' }}>{loc.established}년</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default GlobalMap
