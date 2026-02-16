import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Project.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${BASE_URL}/api/lily`);

      const mapped = res.data.data.map((project) => {
        // ===== IMAGES =====
        let images = [];

        if (project.images?.length) {
          images = project.images.map((img) => {
            let url = img.url || img;

            if (url.startsWith("http")) return url;

            if (url.startsWith("/uploads")) {
              const file = url.split("/").pop();
              return `${BASE_URL}/uploads/projects/${file}`;
            }

            return `${BASE_URL}${url}`;
          });
        }

        if (!images.length) {
          images = [
            "https://via.placeholder.com/400x250/cccccc/969696?text=Project+Image"
          ];
        }

        // ===== FLOOR PLANS =====
        const floorPlans =
          project.floorPlans?.map((fp) => {
            let url = fp.url || fp;
            if (url.startsWith("/uploads")) {
              const file = url.split("/").pop();
              return `${BASE_URL}/uploads/projects/${file}`;
            }
            return url.startsWith("http") ? url : `${BASE_URL}${url}`;
          }) || [];

        return {
          id: project.id,
          projectName: project.projectName,
          projectType: project.projectType,

          // ✅ STEP-6 FIX — safely pull address
          location: project.location || "Location not specified",


          amenities: project.amenities || [],
          images,
          floorPlans,
          totalWings: project.totalWings,
          totalFloors: project.totalFloors,
          perFloorHouse: project.perFloorHouse,
          totalPlots: project.totalPlots,
          totalHouse: project.totalHouse
        };
      });

      setProjects(mapped);
    } catch (err) {
      console.error(err);
      setError("Failed to load projects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (e) => {
    e.target.src =
      "https://via.placeholder.com/400x250/cccccc/969696?text=Image+Not+Found";
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>{error}</h3>
        <button onClick={fetchProjects} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  if (!projects.length) {
    return (
      <div className="no-projects-container">
        <h3>No projects available</h3>
        <p>Check back later for new property listings.</p>
      </div>
    );
  }

  return (
    <div className="project-container">
      <div className="project-header">
        <h1>Find Your Dream Home Today</h1>
        <p>Explore our premium collection of residential projects</p>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <div
            className="project-card"
            key={project.id}
            data-aos="fade-up"
          >
            {/* ===== IMAGE SLIDER ===== */}
            <div className="project-image-container">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                className="project-swiper"
              >
                {project.images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={img}
                      alt={project.projectName}
                      className="project-image"
                      onClick={() =>
                        navigate(`/property/${project.id}`)
                      }
                      onError={handleImageError}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="project-badge">
                {project.projectType}
              </div>
            </div>

            {/* ===== PROJECT INFO ===== */}
            <div className="project-content">
              <h3 className="project-name">
                {project.projectName}
              </h3>

              <div className="project-info">
                <div className="info-item">
                  <FaMapMarkerAlt />
                  <span>{project.location}</span>
                </div>
              </div>

              <button
                className="view-details-btn"
                onClick={() =>
                  navigate(`/property/${project.id}`)
                }
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
