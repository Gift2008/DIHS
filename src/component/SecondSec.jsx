import { Row, Col, Container } from "react-bootstrap";
import nextOne from "../assets/homeone.jpg";
import nextTwo from "../assets/hometwo.jpg";
import Ayo from "../assets/Ayo.jpg";
import Ludo from "../assets/Ludo.jpg";
import Draught from "../assets/Draughts.jpg";
import ParaS from "../assets/PARA-GAMES-2.jpg";
import Chess from "../assets/chess.avif";
import Tt from "../assets/tabletennis.jpg";
import "../styles/secondsec.css";
import SLideComp from "./SLideComp";

const disciplines = [
  {
    num: "01",
    img: Chess,
    alt: "chess",
    title: "Chess",
    desc: "Tactical brilliance and strategic mastery — the royal game reimagined for Lagos.",
  },
  {
    num: "02",
    img: Tt,
    alt: "tableTennis",
    title: "Table Tennis",
    desc: "Hosting the Lagos 57 Inclusive Sports Fiesta to celebrate athletic excellence.",
  },
  {
    num: "03",
    img: Ayo,
    alt: "ayo",
    title: "Ayo",
    desc: "Preserving cultural heritage through one of Africa's most beloved strategy games.",
  },
  {
    num: "04",
    img: ParaS,
    alt: "para",
    title: "Para-sport",
    desc: "Breaking barriers — championing inclusive sport for athletes of every ability.",
  },
  {
    num: "05",
    img: Draught,
    alt: "draught",
    title: "Draughts",
    desc: "Where logic meets leisure. A game of discipline played at the highest level.",
  },
  {
    num: "06",
    img: Ludo,
    alt: "ludo",
    title: "Ludo",
    desc: "Community, competition, and connection — tradition made competitive.",
  },
];

const stats = [
  { value: "500+", label: "Athletes" },
  { value: "24+", label: "Countries" },
  { value: "12", label: "Sports" },
];

function SecondSec() {
  return (
    <div className="ss-page">
      {/* ── Since 2004 ── */}
      <section className="ss-since">
        <div className="ss-section-head">
          <p className="ss-section-title">
            Since <span>2004</span>
          </p>
        </div>
        <Row className="ss-since-row g-4 align-items-center">
          <Col xl={6} lg={6} className="ss-since-text">
            <p>
              For over two decades, we have been the heartbeat of mind-sport
              excellence in Lagos. What began as a vision to empower communities
              through strategic play has grown into a movement — training
              champions, preserving cultural heritage, and proving that
              intellect is the greatest athletic gift of all.
            </p>
            <p>
              From our first tournament to our most recent fiesta, every event
              carries the same promise: that every player, regardless of
              ability, deserves a stage worthy of their talent.
            </p>
            <a href="/aboutUs" className="ss-cta-link">
              Learn our story
              <span className="ss-cta-arrow">→</span>
            </a>
          </Col>
          <Col xl={3} lg={3} className="ss-img-col">
            <div className="ss-img-frame ss-img-frame--right">
              <img src={nextTwo} alt="event" />
              <div className="ss-img-label">Community</div>
            </div>
          </Col>
          <Col xl={3} lg={3} className="ss-img-col">
            <div className="ss-img-frame ss-img-frame--left">
              <img src={nextOne} alt="athletes" />
              <div className="ss-img-label">Excellence</div>
            </div>
          </Col>
        </Row>
      </section>

      {/* ── Disciplines ── */}
      <section className="ss-disciplines" id="disciplines">
        <div className="ss-section-head">
          <p className="ss-section-title">
            Our <span>Disciplines</span>
          </p>

          <p className="ss-section-sub">
            Six games. One purpose. Endless possibility.
          </p>
        </div>

        <div className="ss-cards-grid">
          {disciplines.map((d) => (
            <div className="ss-card" key={d.num}>
              <div className="ss-card-img-wrap">
                <img src={d.img} alt={d.alt} className="ss-card-img" />
                <div className="ss-card-overlay" />
                <span className="ss-card-num">{d.num}</span>
              </div>
              <div className="ss-card-body">
                <h4 className="ss-card-title">{d.title}</h4>
                <p className="ss-card-desc">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Donations ── */}
      <section className="ss-donate">
        <div className="ss-section-head">
          <p className="ss-section-title">Donations</p>
        </div>
        <Container>
          <div className="ss-donate-inner">
            <div className="ss-donate-img-wrap">
              <img src={ParaS} alt="Para-sports" className="ss-donate-img" />
            </div>
            <div className="ss-donate-content">
              <span className="ss-label-tag">Support Us</span>
              <h3 className="ss-donate-heading">
                Help Us Build the
                <br />
                <span>Next Generation</span>
                <br />
                of Champions
              </h3>
              <p className="ss-donate-body">
                Every contribution goes directly toward funding training
                sessions, adaptive equipment for para-athletes, and hosting
                inclusive tournaments that celebrate the full spectrum of human
                ability. No donation is too small — every naira moves the
                needle.
              </p>
              <a href="/donations" className="ss-btn-donate">
                Donate Now
                <span>→</span>
              </a>
            </div>
          </div>
        </Container>
      </section>
      {/* Upcoming Events */}
      <section className="ss-donate">
        <div className="ss-section-head">
          <p className="ss-section-title">Upcoming Events</p>
          <p className="ss-section-sub">
            Preview the experience. Explore photos and visuals from our upcoming
            showcase.
          </p>
        </div>

        <Container>
          <SLideComp />
        </Container>
      </section>
    </div>
  );
}

export default SecondSec;
