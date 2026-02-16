import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// ================= PAGES =================
import Home from "./pages/Home/Home";
import Services from "./pages/Services/Services";
import ServiceDetail from "./pages/Services/ServiceDetail";
import Contact from "./pages/Contact/Contact";
import About from "./pages/AboutUs/AboutUs";
import FAQ from "./pages/FAQ/FAQ";
import Project from "./pages/Project/Project";
import Blog from "./pages/Blog/Blog";
import ProjectDetails from "./pages/Project/ProjectDetails"; 


// ================= COMPONENTS =================
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Footer/Header";
import ScrollUpButton from "./components/ScrollUpButton/ScrollUpButton";
import TermsConditions from "./components/TermsConditions/TermsConditions";

// ================= UTILITIES =================
import ScrollToTop from "./ScrollToTop"; 

function App() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <BrowserRouter>
      {/* Scroll to top on route change */}
      <ScrollToTop />

      {/* Navbar */}
      <Navbar />

      {/* Floating bottom-right scroll button */}
      <ScrollUpButton />

      {/* App Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/property/:id" element={<ProjectDetails />} /> 
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>

      {/* Footer */}
      <Header />
    </BrowserRouter>
  );
}

export default App;
