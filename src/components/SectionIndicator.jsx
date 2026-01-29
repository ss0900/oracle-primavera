function SectionIndicator({ sections, activeSection, onNavigate }) {
  return (
    <div className="section-indicator">
      {sections.map((section, index) => (
        <div
          key={section.id}
          className={`section-dot ${index === activeSection ? 'active' : ''}`}
          data-label={section.label}
          onClick={() => onNavigate(section.id)}
        />
      ))}
    </div>
  )
}

export default SectionIndicator
