import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser"; // Import EmailJS

export const Contact = () => {
  const formInitialDetails = {
    name: "",
    email: "",
    message: "",
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Send");

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonText("Sending...");

    // Konfigurasi EmailJS
    const serviceID = "service_wyd27yq"; // Ganti dengan Service ID Anda
    const templateID = "template_s2nob7o"; // Ganti dengan Template ID Anda
    const publicKey = "x1Jpgtd5FX90iiX-k"; // Ganti dengan Public Key Anda

    emailjs
      .send(serviceID, templateID, formDetails, publicKey)
      .then(
        () => {
          Swal.fire("Sent!", "Your message has been sent.", "success");
          setFormDetails(formInitialDetails);
        },
        () => {
          Swal.fire("Error!", "Failed to send the message.", "error");
        }
      )
      .finally(() => {
        setButtonText("Send");
      });
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col xs={12} md={8} lg={6}>
            <h2 className="text-center mb-4">Contact Me</h2>
            <form onSubmit={handleSubmit}>
              <Row>
                <Col xs={12} className="mb-3">
                  <input
                    type="text"
                    value={formDetails.name}
                    placeholder="Full Name"
                    className="form-control"
                    onChange={(e) => onFormUpdate("name", e.target.value)}
                    required
                  />
                </Col>
                <Col xs={12} className="mb-3">
                  <input
                    type="email"
                    value={formDetails.email}
                    placeholder="dgtmeila.a"
                    className="form-control"
                    onChange={(e) => onFormUpdate("dgtmeila.a@gmail", e.target.value)}
                    required
                  />
                </Col>
                <Col xs={12} className="mb-3">
                  <textarea
                    rows="5"
                    value={formDetails.message}
                    placeholder="Message"
                    className="form-control"
                    onChange={(e) => onFormUpdate("message", e.target.value)}
                    required
                  ></textarea>
                </Col>
                <Col xs={12} className="text-center">
                  <Button type="submit" variant="primary">
                    {buttonText}
                  </Button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
