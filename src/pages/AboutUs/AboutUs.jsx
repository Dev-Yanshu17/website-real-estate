import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AboutUs.css";
import { 
  FaAward, 
  FaBuilding, 
  FaHandshake, 
  FaUsers, 
  FaChartLine,
  FaCalendarAlt,
  FaCheckCircle,
  FaLeaf,
  FaHome,
  FaShieldAlt
} from "react-icons/fa";

const AboutUs = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);

    /* ================= TESTIMONIAL STATE ================= */
  const [feedback, setFeedback] = useState({
    subject: "",
    name: "",
    designation: "",
    location: "",
    message: ""
  });

  const [testimonials, setTestimonials] = useState([]);

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  /* ================= SUBMIT TESTIMONIAL ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/testimonials/add", feedback);
      alert("Thank you for your feedback!");

      setFeedback({
        subject: "",
        name: "",
        designation: "",
        location: "",
        message: ""
      });

      fetchTestimonials();
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  /* ================= FETCH TESTIMONIALS ================= */
  const fetchTestimonials = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/testimonials");
      setTestimonials(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);


  // Counter Animation (1 → 12)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const end = 12;
          const duration = 1000;

          const counter = setInterval(() => {
            start++;
            setCount(start);
            if (start === end) clearInterval(counter);
          }, duration / end);

          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Core Values
  const values = [
    {
      icon: <FaShieldAlt />,
      title: "Integrity First",
      description: "Transparent dealings and ethical practices in every project"
    },
    {
      icon: <FaAward />,
      title: "Excellence",
      description: "Uncompromising quality in design, construction, and service"
    },
    {
      icon: <FaHandshake />,
      title: "Client-Centric",
      description: "Your vision is our blueprint for success"
    },
    {
      icon: <FaLeaf />,
      title: "Sustainability",
      description: "Eco-friendly materials and energy-efficient designs"
    }
  ];

  // Milestones
  const milestones = [
    { year: "2013", title: "Founded", description: "Started with a vision to redefine luxury living" },
    { year: "2017", title: "First 100 Homes", description: "Successfully delivered our first 100 premium residences" },
    { year: "2019", title: "Commercial Expansion", description: "Ventured into commercial real estate development" },
    { year: "2024", title: "Award-Winning", description: "Recognized as 'Best Luxury Developer'" },
    { year: "2025", title: "25+ Projects", description: "Over 25 successful projects across Gujarat" }
  ];

  // Statistics
  const stats = [
    { value: "250+", label: "Happy Families" },
    { value: "95%", label: "Client Satisfaction" },
    { value: "₹500Cr+", label: "Total Investment" },
    { value: "50+", label: "Team Members" }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-overlay">
        </div>
      </section>

      {/* Introduction */}
      {/* <section className="intro-section"> */}
        <div className="container">
          <div className="intro-content">
            <div className="intro-text">
              <h2 className="section-title">
                <span className="title-decor">About DreamDwello</span> 
              </h2>
              <p className="intro-description">
                Founded in 2013, DreamDwello has emerged as one of Gujarat's most trusted 
                luxury real estate developers. We blend innovative design with impeccable 
                craftsmanship to create spaces that inspire and endure.
              </p>
              <p className="intro-description">
                Our journey began with a simple vision: to transform Gujarat's skyline 
                with developments that set new benchmarks in luxury, sustainability, 
                and community living.
              </p>
            </div>
            <div className="experience-counter" ref={counterRef}>
              <div className="counter-number">{count}</div>
              <div className="counter-label">Years of Excellence</div>
              <div className="counter-subtitle">Trusted Since 2013</div>
            </div>
          </div>
        </div>
      {/* </section> */}




{/* ----------mission & vision---------- */}

  <div className="container">
    <div className="mv-header">
      <h2>
        Our <span>Mission & Vision</span>
      </h2>
      <p>
        Guiding principles that define who we are and where we are headed
      </p>
    </div>

    <div className="mv-cards">

      {/* Mission */}
      <div className="mv-box mission">
        <div className="mv-icon">
          <FaBuilding />
        </div>
        <h3>Our Mission</h3>
        <p>
          Our mission is to simplify real estate through transparency, trust,
          and quality construction. We focus on delivering thoughtfully designed
          spaces that provide long-term value and a seamless experience for our clients.
        </p>

        <ul>
          <li>Transparent & customer-first approach</li>
          <li>Premium construction standards</li>
          <li>Timely and reliable project delivery</li>
        </ul>
      </div>

      {/* Vision */}
      <div className="mv-box vision">
        <div className="mv-icon">
          <FaChartLine />
        </div>
        <h3>Our Vision</h3>
        <p>
          Our vision is to become a trusted and forward-thinking real estate brand,
          shaping modern lifestyles and building sustainable communities for the future.
        </p>

        <ul>
          <li>Sustainable & eco-friendly developments</li>
          <li>Smart, future-ready living spaces</li>
          <li>Long-term value for communities</li>
        </ul>
      </div>

    </div>
  </div>


      {/* </section> */}

      {/* Core Values */}
      {/* <section className="values-section"> */}
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="title-decor">Our</span> Core Values
            </h2>
            {/* <p className="section-subtitle">
              The principles that guide every decision we make
            </p> */}
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div className="value-card" key={index}>
                <div className="value-icon-wrapper">
                  <div className="value-icon">{value.icon}</div>
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      {/* </section> */}

      {/* Statistics */}
      {/* <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div className="stat-item" key={index}>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

{/* Timeline - Horizontal */}
{/* <section className="timeline-section"> */}
  <div className="container">
    <div className="section-header">
      <h2 className="section-title">
        <span className="title-decor">Our</span> Journey
      </h2>
      {/* <p className="section-subtitle">
        Key milestones in our growth story
      </p> */}
    </div>
    
    <div className="timeline-container">
      <div className="timeline-line"></div>
      
      <div className="timeline-items">
        {milestones.map((milestone, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-marker">
              <div className="marker-circle"></div>
            </div>
            <div className="timeline-content">
              <div className="timeline-year">{milestone.year}</div>
              <h3 className="timeline-title">{milestone.title}</h3>
              <p className="timeline-desc">{milestone.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
{/* </section> */}

{/* ================= TESTIMONIALS ================= */}
{/* <section className="testimonial-section"> */}
  <div className="container">
    <div className="section-header">
      <h2 className="section-title">
        <span className="title-decor">Clients</span> Testimonials
      </h2>
      {/* <p className="section-subtitle">
        What our clients say about DreamDwello
      </p> */}
    </div>

    {/* ===== DISPLAY TESTIMONIALS ===== */}
    {/* <div className="values-grid">
      {testimonials.map((item) => (
        <div className="value-card" key={item._id}>
          <h3>{item.subject}</h3>
          <p>"{item.message}"</p>
          <strong>{item.name}</strong>
          <div style={{ fontSize: "0.9rem", color: "#718096" }}>
            {item.designation} • {item.location}
          </div>
        </div>
      ))}
    </div> */}

    {/* ===== ADD TESTIMONIAL FORM ===== */}
    <form className="testimonial-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={feedback.subject}
        onChange={handleChange}
        required
      />

      <div className="form-row">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={feedback.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="designation"
          placeholder="Designation"
          value={feedback.designation}
          onChange={handleChange}
          required
        />
      </div>

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={feedback.location}
        onChange={handleChange}
        required
      />

      <textarea
        name="message"
        placeholder="Your Feedback"
        rows="5"
        value={feedback.message}
        onChange={handleChange}
        required
      />

      <button type="submit" className="btn-primary">
        Submit Feedback
      </button>
    </form>
  </div>
{/* </section> */}


      {/* CTA */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Build Your Dream?</h2>
            <p>
              Partner with Gujarat's most trusted luxury real estate developer. 
              Let's create something extraordinary together.
            </p>
            <div className="cta-buttons">
              <button 
                className="btn-primary" 
                onClick={() => navigate("/projects")}
              >
                View Our Projects
              </button>
              <button 
                className="btn-secondary" 
                onClick={() => navigate("/contact")}
              >
                Contact Our Team
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;