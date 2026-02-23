import React, { useEffect, useState, useRef } from "react";
import "./Home.css";
import {
  FaSearch,
  FaHome,
  FaShieldAlt,
  FaAward,
  FaMapMarkerAlt,
  FaSpinner,
  FaExclamationCircle,
  FaChevronRight,
  FaChevronLeft
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  /* ================= STATE ================= */
  const [currentSlide, setCurrentSlide] = useState(0);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [testimonials, setTestimonials] = useState([]);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState("all");

  const navigate = useNavigate();

  /* ================= TOUCH SWIPE ================= */
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const isMobile = window.innerWidth <= 768;
  const cardsPerView = isMobile ? 1 : 3;
  const CARD_WIDTH = 360; // card (320) + gap (40)

  /* ================= HERO SLIDER DATA ================= */
  const slides = [
    {
      id: "slide1",
      title: "Find your dream home today.",
      subtitle: "Luxury Properties • Prime Locations • Trusted Developers"
    },
    {
      id: "slide2",
      title: "Premium Real Estate",
      subtitle: "Exclusive Listings • Best Deals • Professional Service"
    },
    {
      id: "slide3",
      title: "Live in Luxury",
      subtitle: "Modern Designs • Premium Amenities • Sustainable Living"
    }
  ];

  /* ================= FETCH PROPERTIES ================= */
useEffect(() => {
  fetchProperties(selectedStatus);
}, [selectedStatus]);

 const fetchProperties = async (status = "all") => {
  try {
    setLoading(true);

    let url = "http://localhost:5000/api/lily";

    if (status !== "all") {
      url += `?status=${status}`;
    }

    const res = await axios.get(url);

    const mapped = res.data.data.map((project) => {
      let imageUrl;

      if (project.images && project.images.length > 0) {
        const firstImage = project.images[0];
        const filename = firstImage.url.split('/').pop();
        imageUrl = `http://localhost:5000/uploads/projects/${filename}`;
      }

      if (!imageUrl) {
        imageUrl = require("../../images/slide1.jpg");
      }

      return {
        id: project.id,
        title: project.projectName,
        location: project.location,
        image: imageUrl,
        type: project.projectType,
        status: project.status
      };
    });

    setProperties(mapped);
  } catch (err) {
    setError("Failed to load properties");
  } finally {
    setLoading(false);
  }
};

  /* ================= HERO SLIDER CONTROLS ================= */
  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(handleNextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  /* ================= FETCH TESTIMONIALS ================= */
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/testimonials");
      setTestimonials(res.data.data);
    } catch {
      console.error("Failed to load testimonials");
    }
  };

  /* ================= TESTIMONIAL CONTROLS ================= */
  const handleNextTestimonial = () => {
    if (testimonialIndex < testimonials.length - cardsPerView) {
      setTestimonialIndex((prev) => prev + 1);
    }
  };

  const handlePrevTestimonial = () => {
    if (testimonialIndex > 0) {
      setTestimonialIndex((prev) => prev - 1);
    }
  };

  /* ================= TESTIMONIAL AUTO PLAY ================= */
  useEffect(() => {
    if (testimonials.length === 0) return;

    const autoPlay = setInterval(() => {
      setTestimonialIndex((prev) => {
        const maxIndex = testimonials.length - cardsPerView;

        if (prev >= maxIndex) {
          return 0; // loop back to start
        }

        return prev + 1;
      });
    }, 4000); // 4 seconds

    return () => clearInterval(autoPlay);
  }, [testimonials, cardsPerView]);


  /* ================= TOUCH EVENTS ================= */
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;

    if (distance > 60) handleNextTestimonial();   // swipe left
    if (distance < -60) handlePrevTestimonial();  // swipe right
  };

  /* ================= JSX ================= */
  return (
    <div className="home-page">

      {/* ================= HERO ================= */}
      <section className="hero-wrapper">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${slide.id} ${index === currentSlide ? "active" : ""}`}
          >
            <div className="hero-content">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
            </div>
          </div>
        ))}

        <button className="slider-btn prev-btn" onClick={handlePrevSlide}>
          <FaChevronLeft />
        </button>
        <button className="slider-btn next-btn" onClick={handleNextSlide}>
          <FaChevronRight />
        </button>
      </section>

      {/* ================= PROPERTIES ================= */}
      
        <div className="container">
          <div className="section-header">
            <h2>Featured Properties</h2>
          </div>

         <div className="status-filter-wrapper">
  <button
    className={`status-btn ${selectedStatus === "all" ? "active" : ""}`}
    onClick={() => setSelectedStatus("all")}
  >
    All
  </button>

  <button
    className={`status-btn ${selectedStatus === "active" ? "active" : ""}`}
    onClick={() => setSelectedStatus("active")}
  >
    Active
  </button>

  <button
    className={`status-btn ${selectedStatus === "completed" ? "active" : ""}`}
    onClick={() => setSelectedStatus("completed")}
  >
    Completed
  </button>

  <button
    className={`status-btn ${selectedStatus === "upcoming" ? "active" : ""}`}
    onClick={() => setSelectedStatus("upcoming")}
  >
    Upcoming
  </button>
</div>

          {loading && (
            <div className="loading-container">
              <FaSpinner className="spinner" />
              <p>Loading properties...</p>
            </div>
          )}

          {error && (
            <div className="error-container">
              <FaExclamationCircle />
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className="property-grid">
              {properties.map((property) => (
                <div className="property-card" key={property.id}>
                  <div className="property-badge">{property.type}</div>
                 <div className="property-image">
  <img 
    src={property.image} 
    alt={property.title}
    onError={(e) => {
      // Fallback to default image if the fetched image fails to load
      e.target.src = require("../../images/slide1.jpg");
    }}
  />
</div>
                  <div className="property-content">
                    <h3>{property.title}</h3>
                    <p className="property-location">
                      <FaMapMarkerAlt /> {property.location}
                    </p>
                    <button
                      className="property-btn"
                      onClick={() => navigate(`/property/${property.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      
      {/* ================= TESTIMONIALS ================= */}
     
        <div className="container">
          <div className="section-header">
            <h2>What Our Clients Say</h2>
            <p className="section-subtitle">Real feedback from happy customers</p>
          </div>

          <div className="testimonial-viewport">

            {!isMobile && (
              <button
                className="testimonial-nav left"
                onClick={handlePrevTestimonial}
                disabled={testimonialIndex === 0}
              >
                ‹
              </button>
            )}

            <div
              className="testimonial-track-wrapper"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div
                className="testimonial-track"
                style={{
                  transform: `translateX(-${testimonialIndex * CARD_WIDTH}px)`
                }}
              >
                {testimonials.map((item) => (
                  <div className="testimonial-card" key={item._id}>
                    <p className="testimonial-text">“{item.message}”</p>
                    <div className="testimonial-author">
                      <div className="author-avatar">
                        {item.name
                          .split(" ")
                          .map(w => w[0])
                          .join("")}
                      </div>
                      <div className="author-info">
                        <h4>{item.name}</h4>
                        <p>{item.designation}, {item.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {!isMobile && (
              <button
                className="testimonial-nav right"
                onClick={handleNextTestimonial}
                disabled={testimonialIndex >= testimonials.length - cardsPerView}
              >
                ›
              </button>
            )}
          </div>
        </div>
     
        {/* ================= CTA ================= */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Find Your Dream Home?</h2>
          <p>Talk to our experts for personalized property guidance</p>
          <button onClick={() => navigate("/contact")}>Contact Us </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
