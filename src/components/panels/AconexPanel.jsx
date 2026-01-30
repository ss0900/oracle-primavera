import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const projectNodes = [
  {
    id: 'owner',
    label: 'Owner',
    x: 50,
    y: 20,
    description: '프로젝트 발주처'
  },
  {
    id: 'consultant',
    label: 'Consultant',
    x: 25,
    y: 40,
    description: '설계 및 감리'
  },
  {
    id: 'contractor',
    label: 'Contractor',
    x: 75,
    y: 40,
    description: '시공사'
  },
  {
    id: 'subcontractor',
    label: 'Sub-contractors',
    x: 15,
    y: 65,
    description: '하도급 업체'
  },
  {
    id: 'supplier',
    label: 'Suppliers',
    x: 50,
    y: 65,
    description: '자재 공급사'
  },
  {
    id: 'vendor',
    label: 'Vendors',
    x: 85,
    y: 65,
    description: '장비 업체'
  }
]

const connections = [
  ['owner', 'consultant'],
  ['owner', 'contractor'],
  ['consultant', 'subcontractor'],
  ['consultant', 'supplier'],
  ['contractor', 'supplier'],
  ['contractor', 'vendor'],
  ['subcontractor', 'supplier']
]

const features = [
  {
    title: 'Document Control',
    description: '도면, 문서의 버전 관리 및 배포'
  },
  {
    title: 'Workflow Management',
    description: '승인 프로세스 자동화'
  },
  {
    title: 'Mail & Correspondence',
    description: '공식 서신 및 RFI 관리'
  },
  {
    title: 'Field Collaboration',
    description: '현장-사무소 실시간 협업'
  }
]

function AconexPanel({ id }) {
  const [activeNode, setActiveNode] = useState(null)
  const [visibleNodes, setVisibleNodes] = useState([])
  const [activeFeature, setActiveFeature] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 60%',
      onEnter: () => {
        projectNodes.forEach((node, index) => {
          setTimeout(() => {
            setVisibleNodes(prev => [...prev, node.id])
          }, index * 200)
        })
      }
    })

    return () => {
      trigger.kill()
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const getNodePosition = (nodeId) => {
    const node = projectNodes.find(n => n.id === nodeId)
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 }
  }

  return (
    <section
      id={id}
      ref={sectionRef}
      className="section aconex-panel"
    >
      <div className="container">
        <div className="aconex-grid">
          <div className="aconex-left fade-in-section">
            <span className="product-panel-label">Connected Construction</span>
            <h2 className="product-panel-title">Oracle Aconex</h2>
            <p className="product-panel-description">
              건설 프로젝트의 모든 이해관계자를 연결하는 협업 플랫폼입니다.
              문서 관리, 워크플로우, 커뮤니케이션을 하나로 통합하여 프로젝트 효율을 극대화합니다.
            </p>

            <div className="aconex-features">
              {features.map((feature, index) => (
                <button
                  key={index}
                  className={`aconex-feature ${activeFeature === index ? 'active' : ''}`}
                  onClick={() => setActiveFeature(index)}
                  aria-label={feature.title}
                  aria-pressed={activeFeature === index}
                >
                  <div className="aconex-feature-indicator" />
                  <div className="aconex-feature-content">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* <div className="product-panel-cta">
              <a
                href="#"
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Oracle Aconex 소개서 다운로드"
              >
                소개서 다운로드
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            </div> */}
          </div>

          <div className="aconex-right">
            <div className="aconex-network">
              <svg
                viewBox="0 0 100 80"
                className="aconex-svg"
                role="img"
                aria-label="Aconex 프로젝트 협업 네트워크 다이어그램"
              >
                <defs>
                  <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(0, 212, 255, 0.4)" />
                    <stop offset="100%" stopColor="rgba(124, 58, 237, 0.4)" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {connections.map(([from, to], index) => {
                  const fromPos = getNodePosition(from)
                  const toPos = getNodePosition(to)
                  const isVisible = visibleNodes.includes(from) && visibleNodes.includes(to)
                  const isActive = activeNode === from || activeNode === to

                  return (
                    <line
                      key={`${from}-${to}`}
                      x1={fromPos.x}
                      y1={fromPos.y}
                      x2={toPos.x}
                      y2={toPos.y}
                      stroke={isActive ? 'url(#connectionGradient)' : 'rgba(255,255,255,0.1)'}
                      strokeWidth={isActive ? '0.8' : '0.4'}
                      strokeDasharray={isActive ? 'none' : '1,1'}
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transition: 'all 0.5s ease',
                        transitionDelay: `${index * 0.1}s`
                      }}
                    />
                  )
                })}

                {projectNodes.map((node) => {
                  const isVisible = visibleNodes.includes(node.id)
                  const isActive = activeNode === node.id

                  return (
                    <g
                      key={node.id}
                      className="aconex-node"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transition: 'opacity 0.5s ease'
                      }}
                    >
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isActive ? 6 : 4}
                        fill="transparent"
                        stroke="rgba(0, 212, 255, 0.3)"
                        strokeWidth="0.5"
                        style={{ transition: 'all 0.3s ease' }}
                      >
                        {isActive && (
                          <animate
                            attributeName="r"
                            from="4"
                            to="8"
                            dur="1.5s"
                            repeatCount="indefinite"
                          />
                        )}
                        {isActive && (
                          <animate
                            attributeName="opacity"
                            from="0.5"
                            to="0"
                            dur="1.5s"
                            repeatCount="indefinite"
                          />
                        )}
                      </circle>

                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isActive ? 3 : 2}
                        fill="var(--color-accent)"
                        filter={isActive ? 'url(#glow)' : 'none'}
                        style={{
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={() => setActiveNode(node.id)}
                        onMouseLeave={() => setActiveNode(null)}
                        onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
                        role="button"
                        tabIndex={0}
                        aria-label={`${node.label}: ${node.description}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            setActiveNode(activeNode === node.id ? null : node.id)
                          }
                        }}
                      />

                      <text
                        x={node.x}
                        y={node.y - 6}
                        textAnchor="middle"
                        fill={isActive ? 'var(--color-accent)' : 'rgba(255,255,255,0.7)'}
                        fontSize="3"
                        fontFamily="var(--font-body)"
                        style={{ transition: 'fill 0.3s ease' }}
                      >
                        {node.label}
                      </text>
                    </g>
                  )
                })}

                <text
                  x="50"
                  y="45"
                  textAnchor="middle"
                  fill="rgba(0, 212, 255, 0.3)"
                  fontSize="5"
                  fontFamily="var(--font-display)"
                  fontWeight="bold"
                >
                  ACONEX
                </text>
              </svg>

              {activeNode && (
                <div
                  className="aconex-tooltip"
                  role="tooltip"
                >
                  <h5>{projectNodes.find(n => n.id === activeNode)?.label}</h5>
                  <p>{projectNodes.find(n => n.id === activeNode)?.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AconexPanel
