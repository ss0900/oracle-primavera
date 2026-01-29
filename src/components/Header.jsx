import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '/company', label: 'Company' },
    { path: '/ir', label: 'IR' },
    { path: '/career', label: 'Career' },
    { path: '/community', label: 'Community' }
  ]

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-content">
        <Link to="/" className="logo">
          <img
            src="/피식스에스씨_rgb_03.상하국문.png"
            alt="Company Logo"
            style={{ height: '3.5rem', objectFit: 'contain' }}
          />
        </Link>

        <nav className="nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.label}
            </Link>
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
