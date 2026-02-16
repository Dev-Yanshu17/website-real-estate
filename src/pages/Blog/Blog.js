import React from "react";
import "./Blog.css";

const blogs = [
  {
    id: 1,
    title: "Top 5 Real Estate Investment Tips for 2026",
    image: "https://assets-news.housing.com/news/wp-content/uploads/2021/11/25203239/Indian-property-market-shutterstock_1700575657-1200x700-compressed.jpg",
    excerpt: "Learn how to maximize your returns and choose the best properties for investment in the current market. Expert insights on location analysis, property valuation, and ROI strategies.",
    link: "https://www.investopedia.com/investing/simple-ways-invest-real-estate/",
    date: "Jan 15, 2026",
    readTime: "5 min read",
    tags: ["Investment", "Tips", "Market Trends"],
    author: {
      name: "Rajesh Mehta",
      role: "Investment Advisor"
    }
  },
  {
    id: 2,
    title: "Modern Home Design Trends for 2026",
    image: "https://lambiehomes.com/wp-content/uploads/2025/01/ADP_8771-1024x682.jpg",
    excerpt: "Discover the latest interior design trends that make homes functional, stylish, and sustainable. From smart home integration to eco-friendly materials.",
    link: "https://www.homedit.com/category/architecture/",
    date: "Jan 12, 2026",
    readTime: "7 min read",
    tags: ["Design", "Interior", "Trends"],
    author: {
      name: "Priya Sharma",
      role: "Interior Designer"
    }
  },
  {
    id: 3,
    title: "How to Sell Your Property Fast in Today's Market",
    image: "https://images.agentloft.com/rr-images/uploads/rr-blogs-migrated/Sell-Buy-Same-Time.png",
    excerpt: "A comprehensive step-by-step guide to attract genuine buyers and sell your property quickly. Pricing strategies, staging tips, and negotiation tactics.",
    link: "https://www.ghar.tv/blog/complete-guide-to-selling-your-property-fast-in-india-expert-tips-strategies/artid3471",
    date: "Jan 10, 2026",
    readTime: "8 min read",
    tags: ["Selling", "Guide", "Market"],
    author: {
      name: "Amit Patel",
      role: "Real Estate Consultant"
    }
  },
];

const Blog = () => {
  // Get initials for author avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <section className="blog-section">
      <div className="blog-container">
        <h2 className="section-title">Real Estate Insights</h2>
        <p className="section-subtitle">
          Latest trends, investment tips, and market insights from real estate experts
        </p>

        <div className="blog-grid">
          {blogs.map((blog) => (
            <div className="blog-card" key={blog.id}>
              {/* Date Badge */}
              <div className="blog-date">
                {blog.date}
                <span style={{marginLeft: '0.5rem', fontSize: '0.8rem', opacity: 0.8}}>
                  • {blog.readTime}
                </span>
              </div>
              
              {/* Blog Image */}
              <img
                src={blog.image}
                alt={blog.title}
                className="blog-image"
                loading="lazy"
              />

              <div className="blog-content">
                {/* Tags */}
                <div className="blog-tags">
                  {blog.tags.map((tag, index) => (
                    <span key={index} className="blog-tag">{tag}</span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="blog-title">{blog.title}</h3>
                
                {/* Excerpt */}
                <p className="blog-excerpt">{blog.excerpt}</p>

                {/* Read More Button */}
                <a
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-btn"
                >
                  Read Full Article
                </a>

                {/* Author Info */}
                <div className="blog-author">
                  <div className="author-avatar">
                    {getInitials(blog.author.name)}
                  </div>
                  <div className="author-info">
                    <h4>{blog.author.name}</h4>
                    <p>{blog.author.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div style={{textAlign: 'center'}}>
          <a 
            href="#all-blogs" 
            className="view-all-btn"
          >
            View All Articles
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;