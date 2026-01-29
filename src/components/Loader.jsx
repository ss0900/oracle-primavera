function Loader({ isLoading }) {
  return (
    <div className={`loader ${!isLoading ? 'hidden' : ''}`}>
      <div className="loader-content">
        <div className="loader-logo">
          <img
            src="/피식스에스씨_rgb_06.좌우국영문화이트.png"
            alt="Company Logo"
            style={{ height: '6.5rem', objectFit: 'contain' }}
          />
        </div>
        <div className="loader-bar">
          <div className="loader-progress" />
        </div>
      </div>
    </div>
  )
}

export default Loader
