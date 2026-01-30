import { forwardRef } from 'react'

const ProductPanel = forwardRef(function ProductPanel({
  id,
  title,
  subtitle,
  description,
  features = [],
  ctaText = '소개서 다운로드',
  ctaUrl = '#',
  children,
  className = ''
}, ref) {
  return (
    <section
      id={id}
      ref={ref}
      className={`section product-panel ${className}`}
    >
      <div className="container">
        <div className="product-panel-grid">
          <div className="product-panel-left fade-in-section">
            <span className="product-panel-label">{subtitle}</span>
            <h2 className="product-panel-title">{title}</h2>
            <p className="product-panel-description">{description}</p>

            {features.length > 0 && (
              <ul className="product-panel-features" role="list">
                {features.map((feature, index) => (
                  <li key={index} className="product-panel-feature">
                    <span className="feature-check" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            )}

            <div className="product-panel-cta">
              <a
                href={ctaUrl}
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} ${ctaText}`}
              >
                {ctaText}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
              <a
                href={`/${id}`}
                className="btn btn-secondary"
                aria-label={`${title} 자세히 보기`}
              >
                자세히 보기
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            </div>
          </div>

          <div className="product-panel-right">
            {children}
          </div>
        </div>
      </div>
    </section>
  )
})

export default ProductPanel
