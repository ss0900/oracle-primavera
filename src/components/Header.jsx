import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { eppmMenuItems } from "../data/eppmMenuData";
import { getAssetPath } from "../utils/assetPath";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const mobileMenuButtonRef = useRef(null);
  const mobileMenuPanelRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", menuOpen);
    return () => document.body.classList.remove("mobile-menu-open");
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleOutsidePointer = (event) => {
      const target = event.target;
      if (
        mobileMenuPanelRef.current?.contains(target) ||
        mobileMenuButtonRef.current?.contains(target)
      ) {
        return;
      }
      setMenuOpen(false);
    };

    document.addEventListener("mousedown", handleOutsidePointer);
    document.addEventListener("touchstart", handleOutsidePointer, {
      passive: true,
    });

    return () => {
      document.removeEventListener("mousedown", handleOutsidePointer);
      document.removeEventListener("touchstart", handleOutsidePointer);
    };
  }, [menuOpen]);

  const navLinks = [
    // {
    //   path: "/company",
    //   label: "Company",
    //   subItems: [
    //     {
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
          image: getAssetPath("/Process_Overview.png"),
        },
        {
          id: "advantages",
          title: "장점",
          path: "/time-management/advantages/1",
          image: getAssetPath("/Process_Advantages.png"),
        },
        {
          id: "cases",
          title: "핵심 개념",
          path: "/time-management/core/1",
          image: getAssetPath("/Process_Core_Concepts.png"),
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
          image: getAssetPath("/PPM_Overview.png"),
        },
        {
          id: "functions",
          title: "기능 소개",
          path: "/ppm/functions/1",
          image: getAssetPath("/PPM_Functions.png"),
        },
        {
          id: "benefits",
          title: "효과",
          path: "/ppm/benefits",
          image: getAssetPath("/PPM_Benefits.png"),
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
          image: getAssetPath("/OPC_Overview.png"),
        },
        {
          id: "functions",
          title: "기능 소개",
          path: "/opc/functions/1",
          image: getAssetPath("/OPC_Functions.png"),
        },
        {
          id: "comparison",
          title: "비교",
          path: "/opc/comparison/1",
          image: getAssetPath("/OPC_Comparison.png"),
        },
      ],
    },
    {
      path: "/eppm",
      label: "EPPM",
      subItems: eppmMenuItems,
    },
    {
      path: "/unifier",
      label: "Unifier",
      subItems: [
        {
          id: "overview",
          title: "개요",
          path: "/unifier/overview/1",
          image: getAssetPath("/Unifier_Overview.png"),
        },
        {
          id: "functions",
          title: "기능 소개",
          path: "/unifier/functions/1",
          image: getAssetPath("/Unifier_Functions.png"),
        },
        {
          id: "benefits",
          title: "효과",
          path: "/unifier/benefits/1",
          image: getAssetPath("/Unifier_Benefits.png"),
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
          path: "/aconex/overview/1",
          image: getAssetPath("/Aconex_Overview.png"),
        },
        {
          id: "functions",
          title: "기능 소개",
          path: "/aconex/functions/1",
          image: getAssetPath("/Aconex_Functions.png"),
        },
        {
          id: "projects",
          title: "효과",
          path: "/aconex/benefits/1",
          image: getAssetPath("/Aconex_Benefits.png"),
        },
      ],
    },
  ];

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="container header-content">
        <Link
          to="/"
          className="logo header-logo-group"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src={getAssetPath("/P6ix_SC_Logo_White.png")}
            alt="Company Logo"
            className="header-logo"
          />
          <img
            src={getAssetPath("/dividing_line.png")}
            alt=""
            aria-hidden="true"
            className="header-logo-divider"
          />
          <img
            src={getAssetPath("/Oracle_Partner_Logo.png")}
            alt="Partner Logo"
            className="header-logo partner"
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
                  if (location.pathname.startsWith(link.path)) {
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
              aria-label="프로젝트 목적 맞춤 Primavera 설계 및 PMIS-X/4D BIM/AI 연계 컨설팅 문의"
            >
              통합 컨설팅 문의
            </button>
          </Link>
        </nav>

        <button
          ref={mobileMenuButtonRef}
          className="mobile-menu-btn"
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="메뉴 열기"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu-panel"
        >
          <span className="mobile-menu-line" />
          <span className="mobile-menu-line" />
          <span className="mobile-menu-line" />
        </button>
      </div>

      <button
        type="button"
        className={`mobile-menu-backdrop ${menuOpen ? "show" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-label="메뉴 닫기"
      />

      <div
        ref={mobileMenuPanelRef}
        id="mobile-menu-panel"
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
        aria-hidden={!menuOpen}
      >
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`mobile-menu-link ${location.pathname.startsWith(link.path) ? "active" : ""}`}
            onClick={() => {
              setMenuOpen(false);
              if (location.pathname.startsWith(link.path)) {
                window.scrollTo(0, 0);
              }
            }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          to="/contact"
          className="mobile-menu-cta"
          onClick={() => setMenuOpen(false)}
        >
          통합 컨설팅 문의
        </Link>
      </div>
    </header>
  );
}

export default Header;
