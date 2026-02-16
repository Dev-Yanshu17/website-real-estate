import React from "react";
import "./Testimonials.css";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rohit Sharma",
      feedback: "I found my dream home thanks to this platform! Highly recommended.",
      rating: 5,
      propertyType: "Apartment",
      date: "2024-01-15"
    },
    {
      id: 2,
      name: "Priya Patel",
      feedback: "Amazing service and professional team. The process was smooth and quick.",
      rating: 4,
      propertyType: "Villa",
      date: "2024-01-10"
    },
    {
      id: 3,
      name: "Amit Desai",
      feedback: "Great property listings and easy to use search feature.",
      rating: 5,
      propertyType: "Penthouse",
      date: "2024-01-05"
    },
  ];

  // Get initials for avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase();
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Render stars
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className="star">
        {index < rating ? "★" : "☆"}
      </span>
    ));
  };

  return (
    <div className="testimonials-section">
      <div className="section-title">
        <h2>What Our Customers Say</h2>
        <p>Read experiences from satisfied homeowners who found their perfect property with us</p>
      </div>
      
      <div className="testimonials-container">
        {testimonials.map((t) => (
          <div className="testimonial-card" key={t.id}>
            {/* Optional: Customer Avatar
            <div className="customer-avatar">
              {getInitials(t.name)}
            </div>
            */}
            
            {/* Optional: Property Type
            <span className="property-type">
              {t.propertyType}
            </span>
            */}
            
            {/* Optional: Star Rating
            <div className="testimonial-rating">
              {renderStars(t.rating)}
            </div>
            */}
            
            <p>"{t.feedback}"</p>
            
            <div className="testimonial-footer">
              <h4>- {t.name}</h4>
              
              {/* Optional: Date
              <div className="testimonial-date">
                {formatDate(t.date)}
              </div>
              */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;