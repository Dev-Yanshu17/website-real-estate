import React, { useEffect, useState } from "react";
import "./FAQ.css";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/faqs")
      .then((res) => res.json())
      .then((data) => setFaqs(data));
  }, []);

  const toggleFAQ = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="faq-section">
      <div className="faq-header">
        <h2>Frequently Asked Questions</h2>
      </div>

      <div className="faq-wrapper">
        {faqs.map((faq) => (
          <div
            key={faq._id}
            className={`faq-card ${activeId === faq._id ? "active" : ""}`}
            onClick={() => toggleFAQ(faq._id)}
          >
            <div className="faq-question">
              <span>{faq.question}</span>
              <span className="icon">
                {activeId === faq._id ? "−" : "+"}
              </span>
            </div>

            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
