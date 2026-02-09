import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    // {
    //   path: "/company",
    //   label: "Company",
    //   subItems: [
    //     {
    //       id: "intro",
    //       title: "회사소개",
    //       path: "/company/intro",
    //       image:
    //         "https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=600",
    //     },
    //     {
    //       id: "ceo",
    //       title: "CEO 소개",
    //       path: "/company/ceo",
    //       image:
    //         "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600",
    //     },
    //     {
    //       id: "organization",
    //       title: "조직도",
    //       path: "/company/organization",
    //       image:
    //         "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
    //     },
    //     {
    //       id: "history",
    //       title: "회사연혁",
    //       path: "/company/history",
    //       image:
    //         "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600",
    //     },
    //     {
    //       id: "pr",
    //       title: "홍보자료",
    //       path: "/company/pr",
    //       image:
    //         "https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg?auto=compress&cs=tinysrgb&w=600",
    //     },
    //   ],
    // },
    {
      path: "/time-management",
      label: "Time Management",
      subItems: [
        {
          id: "overview",
          title: "개요",
          path: "/time-management/overview/1",
          image:
            "https://images.pexels.com/photos/1098515/pexels-photo-1098515.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          id: "advantages",
          title: "장점",
          path: "/time-management/advantages/1",
          image:
            "https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          id: "cases",
          title: "핵심 개념",
          path: "/time-management/core/1",
          image:
            "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
      ],
    },
    {
      path: "/ppm",
      label: "PPM",
      subItems: [
        {
          id: "overview",
          title: "개요",
          path: "/ppm/overview",
          image:
            "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          id: "functions",
          title: "기능 소개",
          path: "/ppm/functions/1",
          image:
            "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          id: "benefits",
          title: "도입 효과",
          path: "/ppm/benefits",
          image:
            "https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
      ],
    },
    {
      path: "/eppm",
      label: "EPPM",
      subItems: [
        {
          id: "overview",
          title: "개요",
          path: "/eppm/overview",
          image:
            "https://images.pexels.com/photos/5989932/pexels-photo-5989932.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          id: "functions",
          title: "기능 소개",
          path: "/eppm/functions/1",
          image:
            "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          id: "cases",
          title: "과정",
          path: "/eppm/process/1",
          image:
            "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
      ],
    },
    {
      path: "/opc",
      label: "OPC",
      subItems: [
        {
          id: "overview",
          title: "개요",
          path: "/opc/overview/1",
          image:
            "https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          id: "functions",
          title: "기능 소개",
          path: "/opc/functions/1",
          image:
            "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          id: "comparison",
          title: "비교",
          path: "/opc/comparison/1",
          image:
            "https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
      ],
    },
    {
      path: "/unifier",
      label: "Unifier",
      subItems: [
        {
          id: "overview",
          title: "개요",
          path: "/unifier/overview",
          image:
            "https://images.pexels.com/photos/1098515/pexels-photo-1098515.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          id: "functions",
          title: "기능 소개",
          path: "/unifier/functions/1",
          image:
            "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          id: "customers",
          title: "고객 사례",
          path: "/unifier/customers",
          image:
            "https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
      ],
    },
    {
      path: "/aconex",
      label: "Aconex",
      subItems: [
        {
          id: "overview",
          title: "개요",
          path: "/aconex/overview",
          image:
            "https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          id: "functions",
          title: "기능 소개",
          path: "/aconex/functions/1",
          image:
            "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
        {
          id: "projects",
          title: "프로젝트 사례",
          path: "/aconex/projects",
          image:
            "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=600",
        },
      ],
    },
  ];

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="container header-content">
        <Link
          to="/"
          className="logo"
          style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}
        >
          <img
            src="/피식스에스씨_rgb_06.좌우국영문화이트.png"
            alt="Company Logo"
            style={{ height: "2.5rem", objectFit: "contain" }}
          />
          <img
            src="/image.png"
            alt="Partner Logo"
            style={{ height: "2.5rem", objectFit: "contain" }}
          />
        </Link>

        <nav className="nav">
          {navLinks.map((link) => (
            <div
              key={link.path}
              className="nav-item"
              onMouseEnter={() => setActiveDropdown(link.path)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={link.path}
                className={`nav-link ${location.pathname.startsWith(link.path) ? "active" : ""}`}
                onClick={() => {
                  if (location.pathname === link.path) {
                    window.scrollTo(0, 0);
                  }
                }}
              >
                {link.label}
              </Link>

              {link.subItems && (
                <div
                  className={`mega-menu ${activeDropdown === link.path ? "show" : ""}`}
                >
                  <div className="mega-menu-grid">
                    {link.subItems.map((item) => (
                      <Link
                        key={item.id}
                        to={item.path}
                        className="mega-menu-card"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <div
                          className="mega-menu-card-bg"
                          style={{ backgroundImage: `url(${item.image})` }}
                        />
                        <div className="mega-menu-card-overlay" />
                        <span className="mega-menu-card-title">
                          {item.title}
                        </span>
                        <span className="mega-menu-card-arrow">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                          </svg>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          <Link to="/contact">
            <button
              className="btn btn-primary"
              style={{ padding: "0.5rem 1.25rem" }}
            >
              Contact Us
            </button>
          </Link>
        </nav>

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "transparent",
            border: "none",
            color: "var(--color-text-primary)",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          &#9776;
        </button>
      </div>

      <div
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
        style={{
          display: menuOpen ? "flex" : "none",
          flexDirection: "column",
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          background: "rgba(10, 10, 15, 0.98)",
          padding: "1rem",
          gap: "1rem",
        }}
      >
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="nav-link"
            onClick={() => {
              setMenuOpen(false);
              if (location.pathname === link.path) {
                window.scrollTo(0, 0);
              }
            }}
            style={{ padding: "0.75rem 1rem" }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}

export default Header;
