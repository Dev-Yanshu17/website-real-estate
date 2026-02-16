import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../images/logo_removed_bg.png";
import { FaPhoneAlt } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ================= RESPONSIVE ================= */
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ================= SCROLL COLOR ================= */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= ROUTE BASED WHITE NAV ================= */
  const whiteBgRoutes = [
    "/terms-conditions",
    "/privacy",
    "/faq",
    "/contact"
  ];
  const isWhiteBg = whiteBgRoutes.includes(location.pathname);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/projects", label: "Projects" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  const handleLogoClick = () => {
    setMenuOpen(false);
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
   // In your Navbar component, update the className:
<nav
  className={`navbar ${isWhiteBg || scrolled ? "navbar-white" : ""} ${scrolled ? "scrolled" : ""}`}
>
      {/* LOGO */}
      <div className="logo" onClick={handleLogoClick}>
        <img src={logo} alt="DreamDwello Logo" className="logo-icon" />
        <div className="typing-container">
          <span className="typing-text">Find your dream home today.</span>
        </div>
      </div>

      {/* DESKTOP VIEW */}
      {!isMobile ? (
        <>
          {/* NAV LINKS */}
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={location.pathname === item.path ? "active" : ""}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* RIGHT SIDE ACTIONS */}
          <div className="nav-actions">
            <a href="tel:+917859845311" className="call-box">
              <FaPhoneAlt className="contact-icon" />
              <div className="call-text">
                <span className="call-number">+7859845311</span>
                <span>Call for Inquiry</span>
              </div>
            </a>
          </div>
        </>
      ) : (
        <>
          {/* HAMBURGER */}
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* MOBILE MENU */}
          <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={location.pathname === item.path ? "active" : ""}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </nav>
  );
};

export default Navbar;
