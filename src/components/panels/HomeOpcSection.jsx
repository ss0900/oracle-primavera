import { Link } from 'react-router-dom'

const opcHomeMenuCards = [
  {
    key: 'overview',
    title: '개요',
    href: '/opc/overview/1',
    imageSrc: encodeURI('/OPC 개요.png')
  },
  {
    key: 'functions',
    title: '기능 소개',
    href: '/opc/functions/1',
    imageSrc: encodeURI('/OPC 기능 소개.png')
  },
  {
    key: 'comparison',
    title: '비교',
    href: '/opc/comparison/1',
    imageSrc: encodeURI('/OPC 비교.png')
  }
]

function HomeOpcSection({ id }) {
  return (
    <section id={id} className="section home-opc-menu-section">
      <div className="container home-opc-menu-container">
        <header className="home-opc-menu-header fade-in-section">
          <h2 className="home-opc-menu-title">Primavera P6 Cloud</h2>
          <p className="home-opc-menu-subcopy">OPC 하위 메뉴를 빠르게 살펴보세요.</p>
        </header>

        <div className="home-opc-menu-grid stagger-cards">
          {opcHomeMenuCards.map((card) => (
            <article
              key={card.key}
              className={`home-opc-menu-card card-item ${card.key === 'functions' ? 'is-head-bottom' : ''}`}
            >
              <div className="home-opc-menu-item-head">
                <h3 className="home-opc-menu-item-title">{card.title}</h3>
                <Link
                  to={card.href}
                  className="home-opc-menu-item-cta"
                  aria-label={`OPC ${card.title} 페이지로 이동`}
                >
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M8 16L16 8M16 8H10M16 8V14"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>

              <Link
                to={card.href}
                className="home-opc-menu-card-link"
                aria-label={`OPC ${card.title} 페이지로 이동`}
              >
                <img
                  className="home-opc-menu-card-image"
                  src={card.imageSrc}
                  alt={`${card.title} 썸네일`}
                  loading="lazy"
                />
                <div className="home-opc-menu-card-overlay" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeOpcSection
