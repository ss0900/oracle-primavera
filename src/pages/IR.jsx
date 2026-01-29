import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initPageAnimations } from '../utils/animations'

gsap.registerPlugin(ScrollTrigger)

function IR() {
  useEffect(() => {
    ScrollTrigger.refresh()
    initPageAnimations()

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  const irReports = [
    {
      id: 'annual-2023',
      title: '2023 연간 보고서',
      description: 'Annual Report 2023',
      date: '2024.03.15',
      type: 'Annual Report'
    },
    {
      id: 'quarterly-q4',
      title: 'Q4 실적 발표',
      description: 'Q4 2023 Earnings',
      date: '2024.02.01',
      type: 'Quarterly Report'
    },
    {
      id: 'investor-presentation',
      title: '투자자 프레젠테이션',
      description: 'Investor Presentation',
      date: '2024.01.20',
      type: 'Presentation'
    },
    {
      id: 'financial-overview',
      title: '재무 현황',
      description: 'Financial Overview',
      date: '2023.12.31',
      type: 'Financial Data'
    }
  ]

  return (
    <div className="subpage-container">
      <section className="subpage-hero fade-in-section">
        <div className="subpage-hero-content">
          <h1 className="subpage-title">IR</h1>
          <p className="subpage-subtitle">투자자 정보</p>
        </div>
      </section>

      <section className="subpage-content">
        <div className="reports-list stagger-cards">
          {irReports.map((report) => (
            <div key={report.id} className="report-card card-item">
              <div className="report-type">{report.type}</div>
              <h3 className="report-title">{report.title}</h3>
              <p className="report-description">{report.description}</p>
              <div className="report-footer">
                <span className="report-date">{report.date}</span>
                <button className="report-download">Download</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default IR
