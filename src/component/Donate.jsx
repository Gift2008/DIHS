import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import "../styles/donate.css";
function Donate() {
  return (
    <div>
      <div className="cont">
        <div className="center">
          <h1>Transfer</h1>
          <p>
            <b>Account Name:</b> <span>John Doae</span>
          </p>
          <p>
            <b>Account Number:</b> <span>090 221 222 323 444</span>
          </p>
          <Row className="btns">
            <Col>
              {" "}
              <a href={-1}>
                {" "}
                <Button>Go Back</Button>
              </a>
            </Col>
            <Col>
              {" "}
              <a href="">
                <Button> Share Receipt </Button>
              </a>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Donate;
