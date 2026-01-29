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
          id: 'about',
          title: '회사개요',
          description: 'Company Overview',
          image: 'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'ceo',
          title: 'CEO 인사말',
          description: 'Message from CEO',
          image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'vision',
          title: '비전',
          description: 'Our Vision',
          image: 'https://images.pexels.com/photos/1098515/pexels-photo-1098515.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'business',
          title: '사업장 안내',
          description: 'Business Sites',
          image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'history',
          title: '연혁',
          description: 'History',
          image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'ci',
          title: 'CI 소개',
          description: 'CI Introduction',
          image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'location',
          title: '오시는 길',
          description: 'Location',
          image: 'https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ]
    },
    {
      path: '/ir',
      label: 'IR',
      subItems: [
        {
          id: 'financial',
          title: '재무 정보',
          description: 'Financial Information',
          image: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'reports',
          title: '보고서',
          description: 'Reports',
          image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'stock',
          title: '주가 정보',
          description: 'Stock Information',
          image: 'https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ]
    },
    {
      path: '/career',
      label: 'Career',
      subItems: [
        {
          id: 'positions',
          title: '채용 공고',
          description: 'Job Openings',
          image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'culture',
          title: '조직 문화',
          description: 'Company Culture',
          image: 'https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'benefits',
          title: '복리 후생',
          description: 'Benefits',
          image: 'https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ]
    },
    {
      path: '/community',
      label: 'Community',
      subItems: [
        {
          id: 'notice',
          title: '공지사항',
          description: 'Notice',
          image: 'https://images.pexels.com/photos/5989932/pexels-photo-5989932.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'news',
          title: '뉴스',
          description: 'News',
          image: 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          id: 'events',
          title: '이벤트',
          description: 'Events',
          image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ]
    }
  ]

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-content">
        <Link to="/" className="logo">
          <img
            src="/피식스에스씨_rgb_07.상하국문화이트.png"
            alt="Company Logo"
            style={{ height: '3.5rem', objectFit: 'contain' }}
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
