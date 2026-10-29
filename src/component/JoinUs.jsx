import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../styles/JoinUs.css";
import axios from "axios";

// ── PASTE YOUR WEB3FORMS ACCESS KEY HERE ─────────────────────────────────
const WEB3FORMS_ACCESS_KEY = "9242a4cc-71f6-4d42-91c5-1a28e59b051d";

// ── DEADLINE ─────────────────────────────────────────────────────────────
const REGISTRATION_DEADLINE = "2029-12-31"; // Format: YYYY-MM-DD

const isDeadlinePassed = () => {
  const today = new Date();
  const deadline = new Date(REGISTRATION_DEADLINE);
  deadline.setHours(23, 59, 59, 999);
  return today > deadline;
};

const STEPS = [
  "Personal Info",
  "Location",
  "Identity",
  "Disability Profile",
  "Socio-Economic",
  "Emergency Contact",
  "Benefits Request",
  "Consent & Declaration",
];

const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

const INITIAL_FORM = {
  fullName: "",
  gender: "",
  dateOfBirth: "",
  maritalStatus: "",
  bloodGroup: "",

  stateOfOrigin: "",
  stateOfResidence: "",
  lga: "",
  lcda: "",
  residentialAddress: "",
  nearestLandmark: "",

  lassraId: "",
  lasodaId: "",
  nin: "",

  disabilityType: [],
  disabilityTypeOther: "",
  natureOfDisability: "",
  assistiveDevices: "",

  highestQualification: "",
  employmentStatus: "",
  vocationSkill: "",

  nextOfKinName: "",
  nextOfKinRelationship: "",
  nextOfKinPhone: "",

  mobilityAids: [],
  educationSupport: [],
  academicLevel: "",
  institutionName: "",
  economicSupport: [],
  socialProtection: [],

  consentDataUsage: "",
  consentThirdParty: "",
  consentCommunication: "",
  declarationDate: "",
  signatureAcknowledged: false,
  assistantName: "",
  assistantRelationship: "",
};

function JoinUs() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  const update = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const toggleArray = (field, value) =>
    setFormData((prev) => {
      const arr = prev[field];
      return {
        ...prev,
        [field]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });

  const progress = Math.round(((step + 1) / STEPS.length) * 100);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      // Format arrays into clean comma-separated strings for readable email formatting
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New DIHS Registration Submission - ${formData.fullName || "Applicant"}`,
        from_name: "DIHS Registration Portal",
        ...formData,
        disabilityType: formData.disabilityType.join(", "),
        mobilityAids: formData.mobilityAids.join(", "),
        educationSupport: formData.educationSupport.join(", "),
        economicSupport: formData.economicSupport.join(", "),
        socialProtection: formData.socialProtection.join(", "),
      };

      const res = await axios.post(
        "https://api.web3forms.com/submit",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      if (res.data.success) {
        setSubmitted(true);
      } else {
        alert(
          res.data.message ||
            "Failed to submit application. Please check your key.",
        );
      }
    } catch (error) {
      alert(
        "An error occurred while submitting the form. Please try again later.",
      );
      console.error("Submission Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ── Deadline screen ──────────────────────────────────────────────────────
  if (isDeadlinePassed()) {
    return (
      <div className="reg-page">
        <Container>
          <div className="reg-card reg-status-screen">
            <div className="reg-status-icon">🔒</div>
            <h2 className="reg-status-title closed">Registration Closed</h2>
            <p className="reg-status-body">
              The registration deadline was{" "}
              <strong className="text-light">{REGISTRATION_DEADLINE}</strong>.
              <br />
              Applications are no longer being accepted.
            </p>
            <p className="reg-status-note">
              Please contact the organizers for further assistance.
            </p>
          </div>
        </Container>
      </div>
    );
  }

  // ── Success screen ───────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="reg-page">
        <Container>
          <div className="reg-card reg-status-screen">
            <div className="reg-status-icon">✅</div>
            <h2 className="reg-status-title success">
              Registration Submitted!
            </h2>
            <p className="reg-status-body">
              Thank you,{" "}
              <strong className="text-light">
                {formData.fullName || "Applicant"}
              </strong>
              .<br />
              Your application has been received and emailed to our
              administration team.
            </p>
            <p className="reg-status-note">
              Please attach your LASSRA card, NIN slip, and any required
              supporting documents when contacted.
            </p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="reg-page">
      <Container>
        {/* Header */}
        <div className="reg-header">
          <div className="reg-badge">
            <span className="reg-badge-text">DIHS</span>
          </div>
          <h1 className="reg-title">Membership Registration</h1>
          <p className="reg-deadline">
            Registration Deadline: <span>{REGISTRATION_DEADLINE}</span>
          </p>
        </div>

        {/* Step Pills */}
        <div className="reg-steps">
          {STEPS.map((s, i) => (
            <button
              key={i}
              className={`step-pill ${i === step ? "active" : i < step ? "done" : ""}`}
              onClick={() => setStep(i)}
            >
              {i < step ? `✓ ${s}` : s}
            </button>
          ))}
        </div>

        {/* Progress */}
        <div className="reg-progress-track">
          <div
            className="reg-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Card */}
        <div className="reg-card">
          <p className="reg-step-label">
            Step {step + 1} of {STEPS.length} — {STEPS[step]}
          </p>

          {/* ── STEP 1: Personal Info ── */}
          {step === 0 && (
            <>
              <h2 className="reg-section-title">Personal Information</h2>

              <Form.Group className="mb-3">
                <Form.Label className="reg-label">
                  Full Name <span className="required">*</span>
                </Form.Label>
                <Form.Control
                  className="reg-input"
                  placeholder="As it appears on official documents"
                  value={formData.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="reg-label">Gender</Form.Label>
                <div className="reg-radio-group">
                  {["Male", "Female"].map((g) => (
                    <Form.Check
                      key={g}
                      type="radio"
                      id={`gender-${g}`}
                      label={g}
                      name="gender"
                      checked={formData.gender === g}
                      onChange={() => update("gender", g)}
                    />
                  ))}
                </div>
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="reg-label">Date of Birth</Form.Label>
                    <Form.Control
                      className="reg-input"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => update("dateOfBirth", e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="reg-label">Blood Group</Form.Label>
                    <Form.Control
                      className="reg-input"
                      placeholder="e.g. O+, A-"
                      value={formData.bloodGroup}
                      onChange={(e) => update("bloodGroup", e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label className="reg-label">Marital Status</Form.Label>
                <div className="reg-radio-group">
                  {["Single", "Married", "Widowed", "Divorced"].map((s) => (
                    <Form.Check
                      key={s}
                      type="radio"
                      id={`marital-${s}`}
                      label={s}
                      name="maritalStatus"
                      checked={formData.maritalStatus === s}
                      onChange={() => update("maritalStatus", s)}
                    />
                  ))}
                </div>
              </Form.Group>
            </>
          )}

          {/* ── STEP 2: Location ── */}
          {step === 1 && (
            <>
              <h2 className="reg-section-title">Location & Residency</h2>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="reg-label">
                      State of Origin
                    </Form.Label>
                    <Form.Select
                      className="reg-select"
                      value={formData.stateOfOrigin}
                      onChange={(e) => update("stateOfOrigin", e.target.value)}
                    >
                      <option value="">— Select —</option>
                      {NIGERIAN_STATES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="reg-label">
                      State of Residence
                    </Form.Label>
                    <Form.Select
                      className="reg-select"
                      value={formData.stateOfResidence}
                      onChange={(e) =>
                        update("stateOfResidence", e.target.value)
                      }
                    >
                      <option value="">— Select —</option>
                      {NIGERIAN_STATES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="reg-label">LGA</Form.Label>
                    <Form.Control
                      className="reg-input"
                      placeholder="Local Government Area"
                      value={formData.lga}
                      onChange={(e) => update("lga", e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="reg-label">
                      LCDA (if applicable)
                    </Form.Label>
                    <Form.Control
                      className="reg-input"
                      placeholder="Local Council Development Area"
                      value={formData.lcda}
                      onChange={(e) => update("lcda", e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label className="reg-label">
                  Residential Address
                </Form.Label>
                <Form.Control
                  className="reg-input"
                  placeholder="Full house number and street name"
                  value={formData.residentialAddress}
                  onChange={(e) => update("residentialAddress", e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="reg-label">Nearest Landmark</Form.Label>
                <Form.Control
                  className="reg-input"
                  placeholder="e.g. Popular bus stop, school, or church"
                  value={formData.nearestLandmark}
                  onChange={(e) => update("nearestLandmark", e.target.value)}
                />
              </Form.Group>
            </>
          )}

          {/* ── STEP 3: Identity ── */}
          {step === 2 && (
            <>
              <h2 className="reg-section-title">
                Official Identity & Government Records
              </h2>
              <p className="reg-hint mb-4">
                These IDs are critical for accessing state social welfare and
                legal protections.
              </p>
              <Form.Group className="mb-3">
                <Form.Label className="reg-label">LASSRA ID</Form.Label>
                <Form.Control
                  className="reg-input"
                  placeholder="Lagos State Resident Registration Agency ID"
                  value={formData.lassraId}
                  onChange={(e) => update("lassraId", e.target.value)}
                />
                <p className="reg-hint">
                  Required for all residents staying in Lagos for 3+ months.
                </p>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="reg-label">
                  LASODA ID Card Number
                </Form.Label>
                <Form.Control
                  className="reg-input"
                  placeholder="Official ID for Persons with Disabilities in Lagos State"
                  value={formData.lasodaId}
                  onChange={(e) => update("lasodaId", e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="reg-label">
                  NIN (National Identification Number)
                </Form.Label>
                <Form.Control
                  className="reg-input"
                  placeholder="11-digit NIN"
                  maxLength={11}
                  value={formData.nin}
                  onChange={(e) => update("nin", e.target.value)}
                />
              </Form.Group>
            </>
          )}

          {/* ── STEP 4: Disability Profile ── */}
          {step === 3 && (
            <>
              <h2 className="reg-section-title">Disability Profile</h2>
              <Form.Group className="mb-3">
                <Form.Label className="reg-label">
                  Type of Disability (select all that apply)
                </Form.Label>
                <div className="reg-check-group reg-check-stack">
                  {[
                    "Physical/Mobility (e.g. Polio, Amputation, Spinal Cord Injury)",
                    "Visual (Blind or Partially Sighted)",
                    "Hearing/Speech (Deaf or Hard of Hearing)",
                    "Intellectual/Developmental (e.g. Down Syndrome, Autism)",
                    "Albinism",
                  ].map((d) => (
                    <Form.Check
                      key={d}
                      type="checkbox"
                      id={`dis-${d}`}
                      label={d}
                      checked={formData.disabilityType.includes(d)}
                      onChange={() => toggleArray("disabilityType", d)}
                    />
                  ))}
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="reg-label">Other (specify)</Form.Label>
                <Form.Control
                  className="reg-input"
                  placeholder="Describe other disability type"
                  value={formData.disabilityTypeOther}
                  onChange={(e) =>
                    update("disabilityTypeOther", e.target.value)
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="reg-label">
                  Nature of Disability
                </Form.Label>
                <div className="reg-radio-group">
                  {[
                    "Congenital (From Birth)",
                    "Acquired (Accident/Illness)",
                  ].map((n) => (
                    <Form.Check
                      key={n}
                      type="radio"
                      id={`nature-${n}`}
                      label={n}
                      name="natureOfDisability"
                      checked={formData.natureOfDisability === n}
                      onChange={() => update("natureOfDisability", n)}
                    />
                  ))}
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="reg-label">
                  Assistive Devices Used
                </Form.Label>
                <Form.Control
                  className="reg-input"
                  placeholder="e.g. Wheelchair, Crutches, White Cane, Hearing Aid"
                  value={formData.assistiveDevices}
                  onChange={(e) => update("assistiveDevices", e.target.value)}
                />
              </Form.Group>
            </>
          )}

          {/* ── STEP 5: Socio-Economic ── */}
          {step === 4 && (
            <>
              <h2 className="reg-section-title">Socio-Economic Status</h2>
              <Form.Group className="mb-3">
                <Form.Label className="reg-label">
                  Highest Educational Qualification
                </Form.Label>
                <Form.Select
                  className="reg-select"
                  value={formData.highestQualification}
                  onChange={(e) =>
                    update("highestQualification", e.target.value)
                  }
                >
                  <option value="">— Select —</option>
                  {[
                    "No Formal Education",
                    "FSLC",
                    "SSCE/WAEC",
                    "NCE",
                    "OND",
                    "HND/B.Sc",
                    "Masters",
                    "PhD",
                  ].map((q) => (
                    <option key={q}>{q}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="reg-label">Employment Status</Form.Label>
                <div className="reg-radio-group">
                  {["Employed", "Self-Employed", "Unemployed", "Student"].map(
                    (s) => (
                      <Form.Check
                        key={s}
                        type="radio"
                        id={`emp-${s}`}
                        label={s}
                        name="employmentStatus"
                        checked={formData.employmentStatus === s}
                        onChange={() => update("employmentStatus", s)}
                      />
                    ),
                  )}
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="reg-label">
                  Vocation / Skill Area
                </Form.Label>
                <Form.Control
                  className="reg-input"
                  placeholder="e.g. Tailoring, ICT, Shoe-making"
                  value={formData.vocationSkill}
                  onChange={(e) => update("vocationSkill", e.target.value)}
                />
              </Form.Group>
            </>
          )}

          {/* ── STEP 6: Emergency Contact ── */}
          {step === 5 && (
            <>
              <h2 className="reg-section-title">Emergency & Support Contact</h2>
              <Form.Group className="mb-3">
                <Form.Label className="reg-label">
                  Next of Kin — Full Name
                </Form.Label>
                <Form.Control
                  className="reg-input"
                  placeholder="Full name"
                  value={formData.nextOfKinName}
                  onChange={(e) => update("nextOfKinName", e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="reg-label">
                  Relationship to Applicant
                </Form.Label>
                <Form.Control
                  className="reg-input"
                  placeholder="e.g. Spouse, Sibling, Parent"
                  value={formData.nextOfKinRelationship}
                  onChange={(e) =>
                    update("nextOfKinRelationship", e.target.value)
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="reg-label">
                  Next of Kin Phone Number
                </Form.Label>
                <Form.Control
                  className="reg-input"
                  type="tel"
                  placeholder="+234..."
                  value={formData.nextOfKinPhone}
                  onChange={(e) => update("nextOfKinPhone", e.target.value)}
                />
              </Form.Group>
            </>
          )}

          {/* ── STEP 7: Benefits ── */}
          {step === 6 && (
            <>
              <h2 className="reg-section-title">
                Disability Support & Benefit Request
              </h2>

              <p className="reg-sub-title">
                Mobility & Assistive Devices Needed
              </p>
              <div className="reg-check-group reg-check-stack mb-3">
                {[
                  "Manual Wheelchair / Folding Sports Wheelchair",
                  "Motorized / Electric Wheelchair",
                  "Arm Crutches / Walking Sticks / 4-Legged Walking Aids",
                  "Guide Canes (for the blind)",
                  "Hearing Aids",
                  "CP Chairs / Motorized Recliner Chairs",
                  "Financial support for prosthetic limbs",
                ].map((d) => (
                  <Form.Check
                    key={d}
                    type="checkbox"
                    id={`mob-${d}`}
                    label={d}
                    checked={formData.mobilityAids.includes(d)}
                    onChange={() => toggleArray("mobilityAids", d)}
                  />
                ))}
              </div>

              <div className="reg-divider" />
              <p className="reg-sub-title">Educational Support</p>
              <div className="reg-check-group reg-check-stack mb-3">
                {[
                  "Handicapped Scholarship Award (tertiary institutions)",
                  "Special Scholarship for Inclusion",
                  "Bursary Award (public polytechnics/universities)",
                ].map((d) => (
                  <Form.Check
                    key={d}
                    type="checkbox"
                    id={`edu-${d}`}
                    label={d}
                    checked={formData.educationSupport.includes(d)}
                    onChange={() => toggleArray("educationSupport", d)}
                  />
                ))}
              </div>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="reg-label">
                      Academic Level
                    </Form.Label>
                    <Form.Select
                      className="reg-select"
                      value={formData.academicLevel}
                      onChange={(e) => update("academicLevel", e.target.value)}
                    >
                      <option value="">— Select —</option>
                      {["Primary", "Secondary", "Tertiary", "Postgraduate"].map(
                        (l) => (
                          <option key={l}>{l}</option>
                        ),
                      )}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="reg-label">
                      Name of Institution
                    </Form.Label>
                    <Form.Control
                      className="reg-input"
                      placeholder="School name"
                      value={formData.institutionName}
                      onChange={(e) =>
                        update("institutionName", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="reg-divider" />
              <p className="reg-sub-title">Economic Empowerment</p>
              <div className="reg-check-group reg-check-stack mb-3">
                {[
                  "Business Registration (free CAC certificate)",
                  "Work Tools (tailoring, hair dryers, ICT tools, etc.)",
                  "Entrepreneurship Grant (seed capital)",
                  "Financial Record Keeping / Vocational Training",
                ].map((d) => (
                  <Form.Check
                    key={d}
                    type="checkbox"
                    id={`eco-${d}`}
                    label={d}
                    checked={formData.economicSupport.includes(d)}
                    onChange={() => toggleArray("economicSupport", d)}
                  />
                ))}
              </div>

              <div className="reg-divider" />
              <p className="reg-sub-title">Social Protection & Medical Aid</p>
              <div className="reg-check-group reg-check-stack mb-3">
                {[
                  "Elderly Cash Support (60+ with disability)",
                  "Medical Procedure Grant (surgery/long-term treatment)",
                  "Free Medical Outreach / Primary Healthcare Access",
                ].map((d) => (
                  <Form.Check
                    key={d}
                    type="checkbox"
                    id={`soc-${d}`}
                    label={d}
                    checked={formData.socialProtection.includes(d)}
                    onChange={() => toggleArray("socialProtection", d)}
                  />
                ))}
              </div>
            </>
          )}

          {/* ── STEP 8: Consent & Declaration ── */}
          {step === 7 && (
            <>
              <h2 className="reg-section-title">Consent & Declaration</h2>
              <div className="reg-info-box">
                By completing this form, you understand that your personal
                information — including LASSRA ID, LASODA ID, and health details
                — will be collected and processed for membership registration,
                benefit eligibility verification, and coordination with Lagos
                State Government.
              </div>

              <Form.Group className="mb-3">
                <Form.Label className="reg-label">
                  Data Usage Consent
                </Form.Label>
                <div className="reg-radio-group">
                  {["Yes", "No"].map((v) => (
                    <Form.Check
                      key={v}
                      type="radio"
                      id={`dataUsage-${v}`}
                      label={v}
                      name="consentDataUsage"
                      checked={formData.consentDataUsage === v}
                      onChange={() => update("consentDataUsage", v)}
                    />
                  ))}
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="reg-label">
                  Third-Party Sharing (LASODA / LASSRA / Medical providers)
                </Form.Label>
                <div className="reg-radio-group">
                  {["Yes", "No"].map((v) => (
                    <Form.Check
                      key={v}
                      type="radio"
                      id={`thirdParty-${v}`}
                      label={v}
                      name="consentThirdParty"
                      checked={formData.consentThirdParty === v}
                      onChange={() => update("consentThirdParty", v)}
                    />
                  ))}
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="reg-label">
                  Communication Consent (SMS, Email, Phone)
                </Form.Label>
                <div className="reg-radio-group">
                  {["Yes", "No"].map((v) => (
                    <Form.Check
                      key={v}
                      type="radio"
                      id={`comm-${v}`}
                      label={v}
                      name="consentCommunication"
                      checked={formData.consentCommunication === v}
                      onChange={() => update("consentCommunication", v)}
                    />
                  ))}
                </div>
              </Form.Group>

              <div className="reg-divider" />
              <p className="reg-sub-title">Declaration</p>
              <p className="reg-hint mb-3" style={{ lineHeight: "1.7" }}>
                I hereby certify that the information provided is true and that
                I am a resident of the stated LGA/LCDA. I agree to abide by the
                constitution of this organization and the provisions of the
                Lagos State Special People's Law.
              </p>

              <Form.Group className="mb-3">
                <Form.Label className="reg-label">
                  Date of Declaration
                </Form.Label>
                <Form.Control
                  className="reg-input"
                  type="date"
                  value={formData.declarationDate}
                  onChange={(e) => update("declarationDate", e.target.value)}
                  style={{ maxWidth: "240px" }}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Check
                  className="v"
                  type="checkbox"
                  id="signatureAcknowledged"
                  label="I confirm I have provided this information voluntarily and that it is accurate to the best of my knowledge. (This serves as my digital signature/acknowledgment.)"
                  checked={formData.signatureAcknowledged}
                  onChange={(e) =>
                    update("signatureAcknowledged", e.target.checked)
                  }
                />
              </Form.Group>

              <div className="reg-divider" />
              <p className="reg-sub-title">For Office / Assistant Use Only</p>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="reg-label">
                      Name of Assistant / Recorder
                    </Form.Label>
                    <Form.Control
                      className="reg-input"
                      placeholder="Full name"
                      value={formData.assistantName}
                      onChange={(e) => update("assistantName", e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="reg-label">
                      Relationship to Applicant
                    </Form.Label>
                    <Form.Control
                      className="reg-input"
                      placeholder="e.g. Social Worker, Relative"
                      value={formData.assistantRelationship}
                      onChange={(e) =>
                        update("assistantRelationship", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
            </>
          )}
          {/* Navigation */}
          <div className="reg-nav">
            <Button
              className="btn-reg-back"
              disabled={step === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
            >
              ← Back
            </Button>

            {step < STEPS.length - 1 ? (
              <Button
                className="btn-reg-next"
                onClick={() =>
                  setStep((s) => Math.min(STEPS.length - 1, s + 1))
                }
              >
                Continue →
              </Button>
            ) : (
              <Button
                className="btn-reg-submit"
                disabled={!formData.signatureAcknowledged}
                onClick={handleSubmit}
              >
                Submit Registration ✓
              </Button>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
export default JoinUs;
