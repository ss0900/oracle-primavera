function Contact({ id }) {
  return (
    <section 
      id={id}
      className="section" 
      style={{ background: 'var(--color-bg-primary)' }}
    >
      <div className="container">
        <div className="fade-in-section" style={{ textAlign: 'center', marginBottom: 'var(--space-4xl)' }}>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            비즈니스 문의 및 채용 정보를 확인하세요
          </p>
        </div>

        <div className="contact-grid stagger-cards">
          <div className="contact-card card-item">
            <div className="contact-icon">💼</div>
            <h3 className="contact-title">비즈니스 문의</h3>
            <p className="contact-desc">
              프로젝트 협업, 파트너십, 서비스 문의 등<br />
              비즈니스 관련 문의를 기다립니다.
            </p>
            <button className="btn btn-primary" style={{ width: '100%' }}>
              문의하기
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <div style={{ 
              marginTop: 'var(--space-lg)',
              paddingTop: 'var(--space-lg)',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-muted)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
                <span>📧</span>
                <span>business@nexontech.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                <span>📞</span>
                <span>02-1234-5678</span>
              </div>
            </div>
          </div>

          <div className="contact-card card-item">
            <div className="contact-icon" style={{ background: 'var(--gradient-secondary)' }}>🚀</div>
            <h3 className="contact-title">채용 안내</h3>
            <p className="contact-desc">
              함께 성장할 인재를 찾습니다.<br />
              다양한 포지션에서 함께할 분을 기다립니다.
            </p>
            <button className="btn btn-secondary" style={{ width: '100%' }}>
              채용 공고 보기
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <div style={{ 
              marginTop: 'var(--space-lg)',
              paddingTop: 'var(--space-lg)',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-muted)'
            }}>
              <div style={{ marginBottom: 'var(--space-sm)' }}>
                <span style={{ color: 'var(--color-accent)' }}>현재 채용 중인 포지션</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xs)' }}>
                {['프론트엔드', '백엔드', 'DevOps', 'AI/ML'].map((tag) => (
                  <span 
                    key={tag}
                    style={{
                      padding: '4px 8px',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: 'var(--text-xs)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
