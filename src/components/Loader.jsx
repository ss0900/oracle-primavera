function Loader({ isLoading }) {
  return (
    <div className={`loader ${!isLoading ? 'hidden' : ''}`}>
      <div className="loader-content">
        <div className="loader-logo">
          NEXON<span style={{ opacity: 0.6 }}>Tech</span>
        </div>
        <div className="loader-bar">
          <div className="loader-progress" />
        </div>
      </div>
    </div>
  )
}

export default Loader
