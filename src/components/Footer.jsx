function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <img
                src="/피식스에스씨_rgb_06.좌우국영문화이트.png"
                alt="P6ix SC Logo"
                className="footer-logo-img"
              />
            </div>
            <p className="footer-desc">
              공정·공기·원가·안전·BIM 등 건설 현장 운영을 <br />
              <span style={{ whiteSpace: "nowrap" }}>
                데이터/AI와 PMIS(예: PMIS X)로 고도화하는 ‘스마트건설’
                솔루션·컨설팅 전문기업입니다.
              </span>
            </p>
          </div>
          {/* <div className="footer-column">
            <h4>Company</h4>
            <ul className="footer-links">
              <li>
                <a href="#about">회사소개</a>
              </li>
              <li>
                <a href="#history">연혁</a>
              </li>
              <li>
                <a href="#leadership">경영진</a>
              </li>
              <li>
                <a href="#locations">오시는 길</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Services</h4>
            <ul className="footer-links">
              <li>
                <a href="#cloud">클라우드 솔루션</a>
              </li>
              <li>
                <a href="#ai">AI & 머신러닝</a>
              </li>
              <li>
                <a href="#security">사이버 보안</a>
              </li>
              <li>
                <a href="#consulting">IT 컨설팅</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Resources</h4>
            <ul className="footer-links">
              <li>
                <a href="#blog">기술 블로그</a>
              </li>
              <li>
                <a href="#case-studies">성공 사례</a>
              </li>
              <li>
                <a href="#news">뉴스룸</a>
              </li>
              <li>
                <a href="#career">채용</a>
              </li>
            </ul>
          </div> */}
          <p className="footer-desc footer-contact">
            <span style={{ whiteSpace: "nowrap" }}>
              서울특별시 금천구 가산디지털1로 128, STX V - Tower 910호
            </span>{" "}
            <br />
            Tel : 02-6337-1771 <br />
            Fax : 02-3281-4067 <br />
            Mail : p6ix@p6ix.co.kr
          </p>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            Copyright © {currentYear}. P6ixSC. All Rights Reserved.
          </div>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="Facebook">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.19 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.25.2 2.25.2v2.48H15.2c-1.25 0-1.64.78-1.64 1.58v1.9h2.79l-.45 2.91h-2.34V22c4.78-.75 8.44-4.92 8.44-9.94z" />
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="YouTube">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
