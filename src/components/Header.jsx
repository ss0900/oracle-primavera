import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const primaveraProducts = [
  {
    id: 'ppm',
    title: 'P6 PPM',
    subtitle: 'Professional Project Management',
    path: '/ppm',
    description: '대규모 프로젝트 일정/자원 관리',
    color: '#00d4ff'
  },
  {
    id: 'eppm',
    title: 'P6 EPPM',
    subtitle: 'Enterprise Portfolio Management',
    path: '/eppm',
    description: '전사 프로젝트 포트폴리오 관리',
    color: '#7c3aed'
  },
  {
    id: 'opc',
    title: 'Primavera Cloud',
    subtitle: 'Oracle Primavera Cloud',
    path: '/opc',
    description: 'SaaS 기반 클라우드 솔루션',
    color: '#10b981'
  },
  {
    id: 'unifier',
    title: 'Unifier',
    subtitle: 'Project Controls',
    path: '/unifier',
    description: '비용/계약/문서 통합 관리',
    color: '#f59e0b'
  },
  {
    id: 'aconex',
    title: 'Aconex',
    subtitle: 'Connected Construction',
    path: '/aconex',
    description: '협업 플랫폼 & 문서 관리',
    color: '#ec4899'
  }
]

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [primaveraMenuOpen, setPrimaveraMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    {
      path: '/company',
      label: 'Company',
      subItems: [
        {
          id: 'intro',
          title: '회사소개',
          path: '/company/intro',
          image: 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          id: 'ceo',
          title: 'CEO 소개',
          path: '/company/ceo',
          image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          id: 'organization',
          title: '조직도',
          path: '/company/organization',
          image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          id: 'history',
          title: '회사연혁',
          path: '/company/history',
          image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          id: 'pr',
          title: '홍보자료',
          path: '/company/pr',
          image: 'https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg?auto=compress&cs=tinysrgb&w=600'
        }
      ]
    },
    {
      path: '/time-management',
      label: 'Time Management',
      subItems: [
        {
          id: 'overview',
          title: '개요',
          path: '/time-management/overview',
          image: 'https://images.pexels.com/photos/1098515/pexels-photo-1098515.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          id: 'features',
          title: '기능 소개',
          path: '/time-management/features',
          image: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
          id: 'cases',
          title: '적용 사례',
          path: '/time-management/cases',
          image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600'
        }
      ]
    }
  ]

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-content">
        <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <img
            src="/피식스에스씨_rgb_06.좌우국영문화이트.png"
            alt="Company Logo"
            style={{ height: '2.5rem', objectFit: 'contain' }}
          />
          <img
            src="/image.png"
            alt="Partner Logo"
            style={{ height: '2.5rem', objectFit: 'contain' }}
          />
        </Link>

        <nav className="nav">
          {navLinks.map((link) => (
            <div
              key={link.path}
              className="nav-item"
              onMouseEnter={() => setActiveDropdown(link.path)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={link.path}
                className={`nav-link ${location.pathname.startsWith(link.path) ? 'active' : ''}`}
              >
                {link.label}
              </Link>

              {link.subItems && (
                <div className={`mega-menu ${activeDropdown === link.path ? 'show' : ''}`}>
                  <div className="mega-menu-grid">
                    {link.subItems.map((item) => (
                      <Link
                        key={item.id}
                        to={item.path}
                        className="mega-menu-card"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <div
                          className="mega-menu-card-bg"
                          style={{ backgroundImage: `url(${item.image})` }}
                        />
                        <div className="mega-menu-card-overlay" />
                        <span className="mega-menu-card-title">{item.title}</span>
                        <span className="mega-menu-card-arrow">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                          </svg>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          <div
            className="nav-item"
            onMouseEnter={() => setPrimaveraMenuOpen(true)}
            onMouseLeave={() => setPrimaveraMenuOpen(false)}
          >
            <button
              className={`nav-link primavera-trigger ${primaveraMenuOpen ? 'active' : ''}`}
              aria-expanded={primaveraMenuOpen}
              aria-haspopup="true"
            >
              Primavera
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{
                  marginLeft: '4px',
                  transform: primaveraMenuOpen ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.2s ease'
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <div className={`primavera-mega-menu ${primaveraMenuOpen ? 'show' : ''}`}>
              <div className="primavera-mega-content">
                <div className="primavera-mega-header">
                  <h3>Oracle Primavera Solutions</h3>
                  <p>건설 프로젝트 관리의 글로벌 표준</p>
                </div>
                <div className="primavera-products-grid">
                  {primaveraProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={product.path}
                      className="primavera-product-tile"
                      onClick={() => setPrimaveraMenuOpen(false)}
                      style={{ '--tile-color': product.color }}
                    >
                      <div className="tile-indicator" />
                      <div className="tile-content">
                        <h4>{product.title}</h4>
                        <span className="tile-subtitle">{product.subtitle}</span>
                        <p>{product.description}</p>
                      </div>
                      <span className="tile-arrow">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Link to="/contact">
            <button className="btn btn-primary" style={{ padding: '0.5rem 1.25rem' }}>
              Contact Us
            </button>
          </Link>
        </nav>

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={menuOpen}
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            color: 'var(--color-text-primary)',
            fontSize: '1.5rem',
            cursor: 'pointer'
          }}
        >
          &#9776;
        </button>
      </div>

      <div
        className={`mobile-menu ${menuOpen ? 'open' : ''}`}
        style={{
          display: menuOpen ? 'flex' : 'none',
          flexDirection: 'column',
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'rgba(10, 10, 15, 0.98)',
          padding: '1rem',
          gap: '1rem'
        }}
      >
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="nav-link"
            onClick={() => setMenuOpen(false)}
            style={{ padding: '0.75rem 1rem' }}
          >
            {link.label}
          </Link>
        ))}
        <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '0.5rem' }}>
          <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', display: 'block' }}>
            Primavera Solutions
          </span>
          {primaveraProducts.map((product) => (
            <Link
              key={product.id}
              to={product.path}
              className="nav-link"
              onClick={() => setMenuOpen(false)}
              style={{ padding: '0.5rem 0', display: 'block' }}
            >
              {product.title}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Header
