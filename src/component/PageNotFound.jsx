import { FaArrowCircleLeft } from "react-icons/fa";
import "../styles/Pagenotfound.css";
function PageNotFound() {
  return (
    <>
      <div style={{ marginTop: "60px" }} className="fourofour">
        <h1>404</h1>
        <h3>Page not found!</h3>
        <a
          href="/"
          style={{ textDecoration: "none", color: "var(--accent-dark)" }}
        >
          {" "}
          <FaArrowCircleLeft /> Go Back
        </a>
      </div>
    </>
  );
}

export default PageNotFound;
