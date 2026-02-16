import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    location: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Phone validation: allow only digits & max 10 digits
    if (name === "phone") {
      if (!/^\d*$/.test(value)) return; // only digits
      if (value.length > 10) return; // max 10 digits
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    // Phone number validation: first digit 7,8,9 & total 10 digits
    const phoneRegex = /^[7-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      setErrorMsg(
        "Phone number must be 10 digits and start with 9, 8, or 7."
      );
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/contact",
        formData
      );
      setSuccessMsg(res.data.message);
      setFormData({
        firstName: "",
        email: "",
        phone: "",
        location: "",
      });
    } catch (error) {
      setErrorMsg(error.response?.data?.error || "Server error");
    }
  };

  return (
    <div className="contact-wrapper">
      <section className="contact-hero">
        <h1>Get Into Touch</h1>
        <p>Crafting great spaces starts with a conversation. Let's connect.</p>
      </section>

      <div className="contact-container">
        <div className="contact-info-box">
          <h2>Craft your architectural dream with us!</h2>
          <p>
            We’re here to guide you every step of the way. Whether you’re
            looking for your dream home or planning a new project, our team
            is ready to assist you.
          </p>

          <div className="info-row-for">
            <div className="info-row">
              <span>📞</span>
              <p>+0253-4065472</p>
            </div>

            <div className="info-row">
              <span>📧</span>
              <p>info@dreamdwello.com</p>
            </div>

            {/* <div className="info-row">
              <span>📍</span>
              <div>Plot no.2, main street ,NYC, USA – 10044</div>
            </div> */}
          </div>

          <h3 className="hours-title">Opening Hours</h3>
          <p>Thu – Tue 10:00 AM – 07:00 PM</p>
        </div>

        <div className="contact-form-card">
          <form className="contact-form" onSubmit={handleSubmit}>
            {successMsg && <p className="success-msg">{successMsg}</p>}
            {errorMsg && <p className="error-msg">{errorMsg}</p>}

            <div className="two-col">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="two-col">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="two-col">
              <input
                type="text"
                name="location"
                placeholder="Project Location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit">SUBMIT</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
