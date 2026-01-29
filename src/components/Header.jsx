import { useState, useEffect } from 'react'

function Header({ sections, onNavigate }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-content">
        <div className="logo" onClick={() => onNavigate('hero')}>
          <img
            src="/피식스에스씨_rgb_03.상하국문.png"
            alt="Company Logo"
            style={{ height: '2.5rem', objectFit: 'contain' }}
          />
        </div>

        <nav className="nav">
          {sections.slice(1).map((section) => (
            <a 
              key={section.id}
              className="nav-link"
              onClick={(e) => {
                e.preventDefault()
                onNavigate(section.id)
              }}
              href={`#${section.id}`}
            >
              {section.label}
            </a>
          ))}
          <button className="btn btn-primary" style={{ padding: '0.5rem 1.25rem' }}>
            Contact Us
          </button>
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

      {/* Mobile Menu */}
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
        {sections.map((section) => (
          <a 
            key={section.id}
            className="nav-link"
            onClick={(e) => {
              e.preventDefault()
              onNavigate(section.id)
              setMenuOpen(false)
            }}
            href={`#${section.id}`}
            style={{ padding: '0.75rem 1rem' }}
          >
            {section.label}
          </a>
        ))}
      </div>
    </header>
  )
}

export default Header
