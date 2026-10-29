import { useState, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../assets/logo.png";
import "../styles/navbar.css";

const navLinks = [
  { href: "/aboutUs", label: "The Mission" },
  { href: "/contactUs", label: "Contact Us" },
  { href: "/athletes", label: "Become an Athlete" },
  { href: "/joinus", label: "Join Us", cta: true },
];

function NavbarComp() {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      fixed="top"
      expanded={expanded}
      onToggle={setExpanded}
      className={`nb ${scrolled ? "nb--scrolled" : ""}`}
    >
      <Container className="nb-container">
        {/* Brand */}
        <Navbar.Brand href="/" className="nb-brand">
          <div className="nb-logo-wrap">
            <img src={logo} alt="DIHS logo" width="36" height="36" />
          </div>
          <span className="nb-wordmark">
            DI<span className="m">HS</span>
          </span>
        </Navbar.Brand>

        {/* Hamburger */}
        <Navbar.Toggle aria-controls="nb-nav" className="nb-toggle">
          <span
            className={`nb-toggle-bar ${expanded ? "nb-toggle-bar--open" : ""}`}
          />
          <span
            className={`nb-toggle-bar ${expanded ? "nb-toggle-bar--open" : ""}`}
          />
          <span
            className={`nb-toggle-bar ${expanded ? "nb-toggle-bar--open" : ""}`}
          />
        </Navbar.Toggle>

        {/* Links */}
        <Navbar.Collapse id="nb-nav" className="nb-collapse">
          <Nav className="nb-links ms-auto">
            {navLinks.map(({ href, label, cta }) =>
              cta ? (
                <Nav.Link
                  key={href}
                  href={href}
                  className="nb-link nb-link--cta"
                >
                  {label}
                </Nav.Link>
              ) : (
                <Nav.Link key={href} href={href} className="nb-link">
                  {label}
                </Nav.Link>
              ),
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
