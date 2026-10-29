import { Nav } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import cac from "../assets/cacs.png";
import logo from "../assets/logo.png";
import "../styles/footer.css";

const socials = [
  {
    href: "#",
    icon: <FaFacebook size={18} />,
    label: "Facebook",
    cls: "fc-social--fb",
  },
  {
    href: "#",
    icon: <FaInstagram size={18} />,
    label: "Instagram",
    cls: "fc-social--ig",
  },
  {
    href: "#",
    icon: <FaTwitter size={18} />,
    label: "Twitter",
    cls: "fc-social--tw",
  },
];

const quickLinks = [
  { href: "/aboutUs", label: "The Mission" },
  { href: "/contactUs", label: "Contact Us" },
  { href: "#athletes", label: "Become an Athlete" },
  { href: "/joinus", label: "Join Us" },
];

const disciplines = [
  "Chess",
  "Table Tennis",
  "Ayo",
  "Para-sport",
  "Draughts",
  "Ludo",
];

function FooterComp() {
  const year = new Date().getFullYear();

  return (
    <footer className="fc">
      {/* ── Main grid ── */}
      <div className="fc-main">
        {/* Brand col */}
        <div className="fc-col fc-col--brand">
          <div className="fc-brand">
            <div className="fc-logo-wrap">
              <img src={logo} alt="DIHS" width="30" height="30" />
            </div>
            <span className="fc-wordmark">
              DI<span className="m">HS</span>
            </span>
          </div>
          <p className="fc-tagline">
            Empowering communities through mind-sport excellence. Rooted in
            Lagos. Built for the world.
          </p>
          <div className="fc-socials">
            {socials.map(({ href, icon, label, cls }) => (
              <Nav.Link
                key={label}
                href={href}
                className={`fc-social ${cls}`}
                aria-label={label}
              >
                {icon}
              </Nav.Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="fc-col">
          <h5 className="fc-col-heading">Contact</h5>
          <ul className="fc-contact-list">
            <li>
              <span className="fc-contact-icon">📍</span>
              <span>Lagos State, Nigeria</span>
            </li>
            <li>
              <span className="fc-contact-icon">📧</span>
              <a href="mailto:info@dihs.ng" className="fc-link">
                info@dihs.ng
              </a>
            </li>
            <li>
              <span className="fc-contact-icon">📞</span>
              <a href="tel:+2340000000" className="fc-link">
                +234 905 607 6601
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="fc-divider" />

      {/* ── Bottom bar ── */}
      <div className="fc-bottom">
        <p className="fc-copyright">© {year} DIHS. All Rights Reserved.</p>
        <div className="fc-registered">
          <img
            src={cac}
            alt="CAC Registered"
            width="22"
            height="22"
            className="fc-cac-img"
          />
          <span>CAC Registered</span>
        </div>
      </div>
    </footer>
  );
}

export default FooterComp;
