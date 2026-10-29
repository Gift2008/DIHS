import "../styles/about.css";
import { Row, Col } from "react-bootstrap";
import founder from "../assets/ceo.jpg";

function AboutComp() {
  return (
    <>
      <div className="about-container">
        <div className="about-content">
          {/* ── Header ── */}
          <header className="about-header">
            <h1>
              Despair <span>Me Not</span>
            </h1>
            <p>
              From the sport field to the boardroom, we empower our members to
              be active, <br />
              tax-paying, and valued contributors to a greater Nigeria.
            </p>
          </header>

          {/* ── About Us ── */}
          <section className="about-section mission-section">
            <h2 className="section-title">About Us</h2>
            <p>
              Disability is not unproductivity. At DIHS, we are a dynamic
              Skills-Hub & Rehabilitation Center dedicated to transforming the
              lives of Persons with Disabilities (PWDs) across Nigeria. We
              believe that while impairment may exist, the real "disability" is
              a society with barriers. We are here to break them.
            </p>
          </section>

          {/* ── What We Do ── */}
          <section className="about-section values-section">
            <h2 className="section-title">
              What Do We Do At <span>DIHS</span> ?
            </h2>
            <div className="value-cards">
              <div className="card">
                <h3>🚀 Entrepreneurial Excellence</h3>
                <p>
                  Turning talent into sustainable business through vocational
                  training.
                </p>
              </div>
              <div className="card">
                <h3>🏆 Para-Sports & Culture</h3>
                <p>
                  The Inclusive Lagos 57 and Inter LGA's and LCDA board Sports &
                  Games fiesta.
                </p>
              </div>
              <div className="card">
                <h3>⚖ Policy Into Practice</h3>
                <p>
                  Leading the Ojokoro Catalyst movement to ensure inclusive laws
                  become a daily reality in governance.
                </p>
              </div>
            </div>
          </section>

          {/* ── Mission Statement ── */}
          <section>
            <h2 className="section-title">Mission Statement</h2>
            <p>
              To empower persons with disabilities by championing their economic
              and social value through advocacy, inclusive employment
              initiatives, and community support, ensuring every individual is
              recognized as an active and vital contributor to the development
              of a better Nigeria.
            </p>
          </section>

          {/* ── Economical Societal Value ── */}
          <section>
            <h2 className="section-title">Economical Societal Value</h2>
            <p>
              Living with a disability doesn't change our value — it highlights
              our resilience. We are proud contributors to the growth of Lagos
              and Nigeria. From gainfully employed professionals to innovative
              entrepreneurs, we are taxpayers, family providers, and law-abiding
              citizens. We don't want to be seen as a "burden". We are educated,
              capable, and ready to work alongside everyone else to build a
              better Nigeria. Let's shift the narrative from pity to
              empowerment.
            </p>
          </section>

          {/* ── Founder & CEO ── */}
          <section>
            <h3 className="section-title">
              Founder & <span>CEO</span>
            </h3>
            <Row className="align-items-center g-4">
              <Col md="auto">
                <img src={founder} alt="Founder & CEO" className="ceoPic" />
              </Col>
              <Col
                style={{
                  padding: "20px",
                }}
              >
                <p>
                  Apostle Ojo E. Bamidele, known as{" "}
                  <strong style={{ color: "var(--accent)" }}>
                    'AKANDAGBAJUMO OMO IYA ABIYE'
                  </strong>
                  , is a born teacher, seasoned lecturer and staunch politician
                  who takes great delight in empowering people living with
                  disability (PWDs). By virtue of supernatural conglomeration in
                  political institution, Ojo is the Local Government Special
                  Leader in Ojokoro L.C.D.A, Secretary-General of Conference 57
                  Special Leaders (APC), Lagos State, and an associate member of
                  the Institute of Strategies Customers Service and Trade
                  Management of Nigeria (ISCTM).
                </p>
                <p>
                  Apostle Ojo is a product of Ekiti State University, Ado-Ekiti,
                  Olabisi Onabanjo University Consult, and Federal College of
                  Education, Osiele, Abeokuta, studied Guidance/Counselling &
                  English, Computer Science and Business Education. He is also a
                  part-time lecturer and Center Coordinator at Igbajo
                  Polytechnic, Osun State, a Radio Freelancer presenting the
                  MARO-MI-PIN (Despair Me Not) program, and an Apostle in the
                  Cherubim & Seraphim vineyard.
                </p>
                <p>
                  Despite his disability, Senior Apostle Ojo is happily married
                  to Ife-Yemi M. Ojo and the union is blessed with divine
                  children.
                </p>
              </Col>
            </Row>
          </section>
        </div>
      </div>
    </>
  );
}

export default AboutComp;
