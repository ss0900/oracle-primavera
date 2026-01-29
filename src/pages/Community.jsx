import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initPageAnimations } from '../utils/animations'

gsap.registerPlugin(ScrollTrigger)

function Community() {
  useEffect(() => {
    ScrollTrigger.refresh()
    initPageAnimations()

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  const posts = [
    {
      id: 1,
      title: '2024년 신입사원 환영식',
      category: '공지사항',
      date: '2024.01.15',
      views: 1523,
      author: 'HR Team'
    },
    {
      id: 2,
      title: '워크샵 참가 후기',
      category: '이벤트',
      date: '2024.01.10',
      views: 892,
      author: 'Marketing Team'
    },
    {
      id: 3,
      title: '새로운 프로젝트 시작',
      category: '프로젝트',
      date: '2024.01.05',
      views: 2341,
      author: 'Development Team'
    },
    {
      id: 4,
      title: '사내 문화 개선 제안',
      category: '자유게시판',
      date: '2023.12.28',
      views: 1876,
      author: 'Employee'
    }
  ]

  return (
    <div className="subpage-container">
      <section className="subpage-hero fade-in-section">
        <div className="subpage-hero-content">
          <h1 className="subpage-title">Community</h1>
          <p className="subpage-subtitle">소통과 나눔</p>
        </div>
      </section>

      <section className="subpage-content">
        <div className="community-board">
          <div className="board-header">
            <button className="new-post-btn">새 글 작성</button>
          </div>
          <div className="posts-list stagger-cards">
            {posts.map((post) => (
              <div key={post.id} className="post-card card-item">
                <div className="post-category">{post.category}</div>
                <h3 className="post-title">{post.title}</h3>
                <div className="post-meta">
                  <span className="post-author">{post.author}</span>
                  <span className="post-date">{post.date}</span>
                  <span className="post-views">조회 {post.views}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Community
