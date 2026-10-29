import "../styles/contact.css";
import { Row, Col } from "react-bootstrap";
import { FaBuilding, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { useState } from "react";

// ── WEB3FORMS ACCESS KEY ─────────────────────────────────────────────────
const WEB3FORMS_ACCESS_KEY = "9242a4cc-71f6-4d42-91c5-1a28e59b051d";

function ContactComp() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const update = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `Contact Form: ${formData.subject || "General Enquiry"} - ${formData.fullName}`,
        from_name: formData.fullName,
        replyto: formData.email,
        ...formData,
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        alert("Message sent! We'll get back to you shortly.");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        alert(data.message || "Something went wrong, try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert(
        "Could not send message. Please check your internet connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* ── Header ── */}
      <div className="contact-header">
        <h1>
          Contact <span>Us</span>
        </h1>
        <p>
          Have a question, want to partner with us, or need support?
          <br /> Reach out we'd love to hear from you.
        </p>
      </div>

      {/* ── Image + Form ── */}
      <Row className="contact-main g-4 align-items-center">
        <Col>
          <div className="contact-form-card">
            <h2>Send Us a Message</h2>

            <form onSubmit={handleSubmit}>
              <Row className="g-3">
                {/* Full Name */}
                <Col md={6}>
                  <div className="mb-1">
                    <label className="contact-label">
                      Full Name <span className="req">*</span>
                    </label>
                    <input
                      className="contact-input"
                      type="text"
                      placeholder="Your full name"
                      value={formData.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                      required
                    />
                  </div>
                </Col>

                {/* Email */}
                <Col md={6}>
                  <div className="mb-1">
                    <label className="contact-label">
                      Email Address <span className="req">*</span>
                    </label>
                    <input
                      className="contact-input"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => update("email", e.target.value)}
                      required
                    />
                  </div>
                </Col>

                {/* Phone */}
                <Col md={6}>
                  <div className="mb-1">
                    <label className="contact-label">
                      Phone Number <span className="req">*</span>
                    </label>
                    <input
                      className="contact-input"
                      type="tel"
                      placeholder="+234..."
                      value={formData.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      required
                    />
                  </div>
                </Col>

                {/* Subject */}
                <Col md={6}>
                  <div className="mb-1">
                    <label className="contact-label">
                      Subject <span className="req">*</span>
                    </label>
                    <select
                      className="contact-select"
                      value={formData.subject}
                      onChange={(e) => update("subject", e.target.value)}
                      required
                    >
                      <option value="">— Select a subject —</option>
                      <option value="membership">Membership Enquiry</option>
                      <option value="partnership">
                        Partnership & Sponsorship
                      </option>
                      <option value="para-sports">
                        Para-Sports Registration
                      </option>
                      <option value="benefit">Benefit / Support Request</option>
                      <option value="volunteer">Volunteer / Internship</option>
                      <option value="media">Media & Press</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </Col>

                {/* Message */}
                <Col md={12}>
                  <div className="mb-3">
                    <label className="contact-label">
                      Message <span className="req">*</span>
                    </label>
                    <textarea
                      className="contact-textarea"
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => update("message", e.target.value)}
                      required
                    />
                  </div>
                </Col>

                <Col md={12}>
                  <button
                    type="submit"
                    className="btn-contact-submit"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message →"}
                  </button>
                </Col>
              </Row>
            </form>
          </div>
        </Col>
      </Row>

      {/* ── Info Cards ── */}
      <div className="contact-info-row">
        <div className="contact-info-card">
          <div className="contact-info-icon">
            <FaPhoneAlt />
          </div>
          <h4>Place a Call</h4>
          <p>Mon – Fri, 9am – 5pm</p>
          <a href="tel:+2349056076601">+234 905 607 6601</a>
        </div>

        <div className="contact-info-card">
          <div className="contact-info-icon">
            <FaBuilding />
          </div>
          <h4>Visit Our Office</h4>
          <p>
            Ojokoro LCDA Secretariat,
            <br />
            Lagos State, Nigeria
          </p>
        </div>

        <div className="contact-info-card whatsapp">
          <div className="contact-info-icon">
            <FaWhatsapp />
          </div>
          <h4>WhatsApp</h4>
          <p>Chat with us directly</p>
          <a
            href="https://wa.me/2348143434178"
            target="_blank"
            rel="noreferrer"
          >
            +234 814 343 4178
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactComp;
