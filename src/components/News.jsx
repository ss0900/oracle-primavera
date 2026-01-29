import { useRef, useState, useEffect } from 'react'

const newsItems = [
  {
    id: 1,
    category: '보도자료',
    title: 'NEXON Tech, AI 기반 클라우드 플랫폼 출시',
    date: '2024.01.15',
    image: null
  },
  {
    id: 2,
    category: '공지',
    title: '2024년 상반기 신입/경력 개발자 공개채용',
    date: '2024.01.10',
    image: null
  },
  {
    id: 3,
    category: '블로그',
    title: '마이크로서비스 아키텍처 전환 사례 연구',
    date: '2024.01.05',
    image: null
  },
  {
    id: 4,
    category: '보도자료',
    title: '글로벌 파트너십 확대: 베를린 오피스 오픈',
    date: '2023.12.20',
    image: null
  },
  {
    id: 5,
    category: '블로그',
    title: 'Kubernetes 보안 베스트 프랙티스',
    date: '2023.12.15',
    image: null
  },
  {
    id: 6,
    category: '공지',
    title: '연말연시 고객지원 운영 안내',
    date: '2023.12.10',
    image: null
  }
]

const filters = ['전체', '보도자료', '공지', '블로그']

function News({ id }) {
  const [activeFilter, setActiveFilter] = useState('전체')
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const sliderRef = useRef(null)

  const filteredNews = activeFilter === '전체' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeFilter)

  const handleMouseDown = (e) => {
    if (!sliderRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - sliderRef.current.offsetLeft)
    setScrollLeft(sliderRef.current.scrollLeft)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !sliderRef.current) return
    e.preventDefault()
    const x = e.pageX - sliderRef.current.offsetLeft
    const walk = (x - startX) * 2
    sliderRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  // Generate gradient background for cards without images
  const getGradient = (index) => {
    const gradients = [
      'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      'linear-gradient(135deg, #1e1e2f 0%, #2d2d44 100%)',
      'linear-gradient(135deg, #141e30 0%, #243b55 100%)',
      'linear-gradient(135deg, #200122 0%, #6f0000 100%)',
      'linear-gradient(135deg, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%)',
    ]
    return gradients[index % gradients.length]
  }

  return (
    <section 
      id={id}
      className="section" 
      style={{ background: 'var(--color-bg-secondary)' }}
    >
      <div className="container">
        <div className="fade-in-section" style={{ marginBottom: 'var(--space-3xl)' }}>
          <h2 className="section-title">News & Updates</h2>
          <p className="section-subtitle">
            최신 소식과 인사이트를 전해드립니다
          </p>
        </div>

        <div className="news-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div 
          className="news-container"
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            overflow: 'auto',
            cursor: isDragging ? 'grabbing' : 'grab',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <div 
            className="news-slider"
            style={{ 
              width: 'max-content',
              paddingBottom: 'var(--space-md)'
            }}
          >
            {filteredNews.map((item, index) => (
              <div key={item.id} className="news-card">
                <div 
                  className="news-image"
                  style={{ background: getGradient(index) }}
                >
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                    opacity: 0.3
                  }}>
                    {item.category === '보도자료' ? '📰' : 
                     item.category === '공지' ? '📢' : '📝'}
                  </div>
                </div>
                <div className="news-content">
                  <div className="news-category">{item.category}</div>
                  <h4 className="news-title">{item.title}</h4>
                  <div className="news-date">{item.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ 
          textAlign: 'center', 
          marginTop: 'var(--space-2xl)',
          color: 'var(--color-text-muted)',
          fontSize: 'var(--text-sm)'  
        }}>
          ← 드래그하여 더 보기 →
        </div>
      </div>
    </section>
  )
}

export default News
