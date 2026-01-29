import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
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
          description: 'Company Introduction',
          image: 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'ceo',
          title: 'CEO 소개',
          description: 'CEO Profile',
          image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'organization',
          title: '조직도',
          description: 'Organization Chart',
          image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'history',
          title: '회사연혁',
          description: 'Company History',
          image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'pr',
          title: '홍보자료',
          description: 'PR Materials',
          image: 'https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg?auto=compress&cs=tinysrgb&w=400'
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
          description: 'Overview',
          image: 'https://images.pexels.com/photos/1098515/pexels-photo-1098515.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'features',
          title: '기능 소개',
          description: 'Features',
          image: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'cases',
          title: '적용 사례',
          description: 'Case Studies',
          image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ]
    },
    {
      path: '/ppm',
      label: 'PPM',
      subItems: [
        {
          id: 'overview',
          title: '개요',
          description: 'Overview',
          image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'features',
          title: '주요 기능',
          description: 'Main Features',
          image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'benefits',
          title: '도입 효과',
          description: 'Benefits',
          image: 'https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ]
    },
    {
      path: '/eppm',
      label: 'EPPM',
      subItems: [
        {
          id: 'overview',
          title: '개요',
          description: 'Overview',
          image: 'https://images.pexels.com/photos/5989932/pexels-photo-5989932.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'solution',
          title: '솔루션 특징',
          description: 'Solution Features',
          image: 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'cases',
          title: '구축 사례',
          description: 'Implementation Cases',
          image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ]
    },
    {
      path: '/opc',
      label: 'OPC',
      subItems: [
        {
          id: 'overview',
          title: '개요',
          description: 'Overview',
          image: 'https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'core',
          title: '핵심 기능',
          description: 'Core Features',
          image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'application',
          title: '활용 방안',
          description: 'Application',
          image: 'https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ]
    },
    {
      path: '/unifier',
      label: 'Unifier',
      subItems: [
        {
          id: 'overview',
          title: '개요',
          description: 'Overview',
          image: 'https://images.pexels.com/photos/1098515/pexels-photo-1098515.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'modules',
          title: '모듈 소개',
          description: 'Module Introduction',
          image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'customers',
          title: '고객 사례',
          description: 'Customer Cases',
          image: 'https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ]
    },
    {
      path: '/aconex',
      label: 'Aconex',
      subItems: [
        {
          id: 'overview',
          title: '개요',
          description: 'Overview',
          image: 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'features',
          title: '기능 안내',
          description: 'Feature Guide',
          image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'projects',
          title: '프로젝트 사례',
          description: 'Project Cases',
          image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=400'
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
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.label}
              </Link>

              {link.subItems && (
                <div className={`dropdown-menu ${activeDropdown === link.path ? 'show' : ''}`}>
                  <div className="dropdown-grid">
                    {link.subItems.map((item) => (
                      <div key={item.id} className="dropdown-card">
                        <div className="dropdown-card-image">
                          <img src={item.image} alt={item.title} />
                        </div>
                        <div className="dropdown-card-content">
                          <h4>{item.title}</h4>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link to="/contact">
            <button className="btn btn-primary" style={{ padding: '0.5rem 1.25rem' }}>
              Contact Us
            </button>
          </Link>
        </nav>

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            color: 'var(--color-text-primary)',
            fontSize: '1.5rem',
            cursor: 'pointer'
          }}
        >
          ☰
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
      </div>
    </header>
  )
}

export default Header
