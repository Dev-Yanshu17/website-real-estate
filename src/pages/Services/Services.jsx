import React, { useEffect, useState } from "react";
import "./Services.css";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/services");
      setServices(res.data);
    } catch (error) {
      console.error("Error fetching services", error);
    }
  };

  return (
    <section className="service-wrapper">
      <div className="service-hero" data-aos="fade-up">
        <h1>Our Construction Services</h1>
        <p>We provide premium construction & architectural solutions.</p>
      </div>

      <div className="services-container">
        {services.map((service, index) => (
          <div
            className="service-card"
            key={service.id}
            data-aos="fade-up"
            data-aos-delay={(index % 3) * 100}
          >
            <div className="service-card-image">
              <img src={service.image} alt={service.title} />
            </div>
            <h3>{service.title}</h3>
            <p>{service.shortDesc}</p>

            {/* <h4>Amenities:</h4>
            <ul>
              {service.amenities.map((amenity, idx) => (
                <li key={idx}>{amenity}</li>
              ))}
            </ul> */}

            <Link to={`/services/${service.id}`} className="learn-more-btn">
              Learn More
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
