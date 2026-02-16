import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./ServiceDetail.css";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

/* Font Awesome */
import {
  FaSwimmingPool,
  FaDumbbell,
  FaChild,
  FaBook,
  FaUtensils,
  FaWifi,
  FaParking,
  FaLeaf,
  FaCamera,
  FaRoad,
  FaCoffee,
  FaHotel,
  FaTree,
  FaMountain,
  FaSun,
  FaStar,
  FaCheckCircle,
  FaSpinner,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserTie,
  FaLightbulb,
  FaHome,
  FaBuilding,
  FaWater,
  FaShower,
  FaSnowflake,
  FaWind,
  FaFire,
  FaFirstAid,
  FaTools,
  FaTrash,
  FaRecycle,
  FaBroadcastTower,
  FaSatelliteDish,
  FaTableTennis,
  FaBasketballBall,
  FaVolleyballBall,
  FaChess,
  FaCar,
  FaBicycle,
  FaWalking,
  FaDog,
  FaCat,
  FaUmbrellaBeach,
  FaFireExtinguisher,
  FaFilm,
  FaChair,
  FaVolumeUp,
  FaRoad as FaRoadIcon
} from "react-icons/fa";

/* Game Icons - ONLY EXISTING ICONS */
import {
  GiGate,
  GiMeditation,
  GiTennisCourt,
  GiFootprint,
  GiTempleGate,
  GiCampingTent,
  GiSecurityGate,
  GiPathDistance,
  GiBinoculars,
  GiTreehouse,
  GiCastle,
  GiStreetLight,
  GiRoad,
  GiHouse,
  GiModernCity,
  GiWaterTank,
  GiWaterDrop,
  GiWateringCan,
  GiTreeRoots,
  GiFlowerEmblem,
  GiFlowers,
  GiFountain,
  GiFireplace,
  GiFireRing,
  GiFirstAidKit,
  GiToolbox,
  GiTrashCan,
  GiTowerFlag,
  GiTabletopPlayers,
  GiBasketballBall,
  GiVolleyballBall,
  GiChessRook,
  GiCarKey,
  GiBicycle,
  GiRunningShoe,
  GiDogHouse,
  GiCat,
  GiBeachBall,
  GiExitDoor,
  GiFireExtinguisher,
  GiWaterDivinerStick,
  GiCinema, 
   GiFilmProjector,
  GiPopcorn,
  GiTicket,
  GiTheater,
} from "react-icons/gi";

/* Material Icons */
import {
  MdSecurity,
  MdSportsSoccer,
  MdOutlineRestaurant,
  MdOutlineStorefront,
  MdOutlineLandscape,
  MdOutlineLocalFireDepartment,
  MdOutlineWater,
  MdOutlineElectricBolt,
  MdOutlineToys,
  MdOutlineSpa,
  MdOutlinePool,
  MdOutlineHouse,
  MdOutlineApartment,
  MdOutlineVilla,
  MdOutlinePark,
  MdOutlineGrass,
  MdOutlineForest,
  MdOutlineFireTruck,
  MdOutlineMedicalServices,
  MdOutlineConstruction,
  MdOutlineDelete,
  MdOutlineSatelliteAlt,
  MdOutlineSportsTennis,
  MdOutlineSportsBasketball,
  MdOutlineSportsVolleyball,
  MdOutlineSports,
  MdOutlineDirectionsCar,
  MdOutlineDirectionsBike,
  MdOutlineDirectionsWalk,
  MdOutlinePets,
  MdOutlineBeachAccess,
  MdOutlineExitToApp
} from "react-icons/md";

/* Other Icons */
import {
  IoIosFitness,
  IoMdFootball,
  IoMdCar,
  IoMdHome,
  IoMdBusiness,
  IoMdWater,
  IoMdSnow,
  IoMdThermometer,
  IoMdFlame,
  IoMdMedkit,
  IoMdConstruct,
  IoMdTrash,
  IoMdRefresh,
  IoMdRadio,
  IoMdTennisball,
  IoMdBasketball,
  IoMdAmericanFootball,
  IoMdBicycle,
  IoMdWalk,
  IoMdPaw,
  IoMdUmbrella,
  IoMdExit
} from "react-icons/io";

/* COMPLETE ICON MAP - WITH EXISTING ICONS ONLY */
const iconMap = {
  // Infrastructure & Roads
  "Road": <GiRoad />,
  "Street Light": <GiStreetLight />,
  "Internal Roads": <FaRoadIcon />,
  "Wide Roads": <GiRoad />,
  "Concrete Road": <GiRoad />,
  "Tar Road": <GiRoad />,
  "Asphalt Road": <GiRoad />,
  "Street Lighting": <GiStreetLight />,
  "LED Street Lights": <FaLightbulb />,
  "Parking": <FaParking />,
  "Covered Parking": <FaParking />,
  "Car Parking": <IoMdCar />,
  "Bike Parking": <FaBicycle />,
  "Visitor Parking": <MdOutlineDirectionsCar />,
  "Underground Parking": <MdOutlineDirectionsCar />,

  // Drainage & Sewage
"Drainage System": <GiWaterDrop />,
"Underground Drainage": <GiWaterDrop />,
"Sewage System": <GiWaterTank />,
"Storm Water Drain": <GiWaterDrop />,
"Water Drainage": <GiWaterDrop />,


  // Club & Community
  "Club House": <GiTennisCourt />,
  "Community Hall": <MdOutlineHouse />,
  "Community Center": <MdOutlineHouse />,
  "Party Hall": <MdOutlineHouse />,
  "Banquet Hall": <MdOutlineHouse />,
  "Common Area": <MdOutlineHouse />,
  "Meeting Room": <MdOutlineHouse />,

 // 🎬 Movie Theater & Cinema
"Movie Theater": <GiTheater />,
"Cinema Hall": <GiTheater />,
"Movie Screen": <GiFilmProjector />,
"Popcorn & Snacks": <GiPopcorn />,
"Movie Tickets": <GiTicket />,
"Film Show": <FaFilm />,
"Comfortable Seating": <FaChair />,
"Surround Sound": <FaVolumeUp />,


  // Security
  "Security": <MdSecurity />,
  "24×7 Security": <MdSecurity />,
  "24×7 Security guard With CCTV": <MdSecurity />,
  "Security Gate": <GiSecurityGate />,
  "Entry Gate": <GiGate />,
  "Main Gate": <GiGate />,
  "Gated Community": <GiGate />,
  "CCTV": <FaCamera />,
  "CCTV Surveillance": <FaCamera />,
  "Security Guard": <MdSecurity />,

  // Children Area
"Children Play Area": <MdOutlineToys />,
"Childrens Play Area": <MdOutlineToys />,
"Children’s play area": <FaChild />,
"Children's play area": <MdOutlineToys />,
"Kids Play Area": <MdOutlineToys />,
"Kids Zone": <FaChild />,


  // Internet & Connectivity
  "WiFi": <FaWifi />,
  "High Speed Internet": <FaWifi />,
  "Broadband": <FaBroadcastTower />,
  "Satellite TV": <FaSatelliteDish />,
  "DTH Connection": <FaSatelliteDish />,

  // Water & Utilities
  "Water Supply": <MdOutlineWater />,
  "24×7 Water Supply": <MdOutlineWater />,
  "RO Water": <GiWaterDrop />,
  "Water Tank": <GiWaterTank />,
  "Overhead Tank": <GiWaterTank />,
  "Underground Tank": <GiWaterTank />,
  "Water Purifier": <GiWateringCan />,
  "Rain Water Harvesting": <GiWateringCan />,

  // Power
  "Power Backup": <MdOutlineElectricBolt />,
  "Electricity": <MdOutlineElectricBolt />,
  "24×7 Power": <MdOutlineElectricBolt />,
  "Generator": <MdOutlineElectricBolt />,
  "Inverter": <MdOutlineElectricBolt />,
  "Solar Power": <FaSun />,
  "Solar Panel": <FaSun />,

  // Recreation & Sports
  "Swimming Pool": <MdOutlinePool />,
  "Pool": <MdOutlinePool />,
  "Kids Pool": <MdOutlinePool />,
  "Gym": <FaDumbbell />,
  "Fitness Center": <IoIosFitness />,
  "Health Club": <IoIosFitness />,
  "Yoga Studio": <GiMeditation />,
  "Yoga Meditation Centre": <MdOutlineSpa />,
  "Meditation Area": <GiMeditation />,
  "Spa": <MdOutlineSpa />,
  "Steam Room": <IoMdWater />,
  "Sauna": <IoMdFlame />,

  // Indoor Games
  "Indoor Games": <MdSportsSoccer />,
  "Table Tennis": <FaTableTennis />,
  "Carrom": <GiTabletopPlayers />,
  "Chess": <FaChess />,
  "Snooker": <IoMdFootball />,
  "Billiards": <IoMdFootball />,
  "Badminton Court": <MdOutlineSportsTennis />,
  "Squash Court": <MdOutlineSportsTennis />,

  // Outdoor Games
  "Outdoor Games": <GiTennisCourt />,
  "Tennis Court": <GiTennisCourt />,
  "Basketball Court": <FaBasketballBall />,
  "Volleyball Court": <FaVolleyballBall />,
  "Football Ground": <IoMdFootball />,
  "Cricket Pitch": <IoMdFootball />,
  "Sports Complex": <MdSportsSoccer />,
  "Playground": <GiCastle />,

  // Children Area
  "Children's Play Area": <MdOutlineToys />,
  "Kids Zone": <FaChild />,
  "Kids Play Area": <MdOutlineToys />,
  "Toy Room": <MdOutlineToys />,

  // Green Areas & Gardens
  "Garden": <FaLeaf />,
  "Landscape Garden": <MdOutlineLandscape />,
  "Green Belt": <FaTree />,
  "Park": <GiTreehouse />,
  "Central Park": <MdOutlinePark />,
  "Children Park": <GiCastle />,
  "Walking Park": <MdOutlineGrass />,
  "Green Area": <GiTreeRoots />,
  "Flower Garden": <GiFlowerEmblem />,
  "Rose Garden": <GiFlowers />,
  "Fountain": <GiFountain />,
  "Water Fountain": <GiFountain />,
  "Japanese Garden": <GiTreeRoots />,
  "Rock Garden": <GiTreeRoots />,
  "Vertical Garden": <GiTreeRoots />,
  "Terrace Garden": <GiTreeRoots />,

  // Tracks & Paths
  "Jogging Track": <GiFootprint />,
  "Jogging And Cycle Track": <GiPathDistance />,
  "Walking Track": <GiFootprint />,
  "Cycle Track": <GiPathDistance />,
  "Walking Path": <MdOutlineDirectionsWalk />,
  "Jogging Path": <GiFootprint />,
  "Morning Walk Track": <GiFootprint />,

  // Library & Education
  "Library": <FaBook />,
  "Reading Room": <FaBook />,
  "Study Room": <FaBook />,
  "Computer Room": <FaBook />,
  "Tuition Center": <FaBook />,
  "Creche": <FaChild />,
  "Day Care": <FaChild />,

  // Food & Dining
  "Restaurant": <FaUtensils />,
  "Restaurant And Mini Store": <MdOutlineRestaurant />,
  "Cafeteria": <FaCoffee />,
  "Food Court": <FaUtensils />,
  "Coffee Shop": <FaCoffee />,
  "Tea Lounge": <FaCoffee />,
  "Juice Bar": <FaCoffee />,
  "Bar": <FaCoffee />,
  "Pub": <FaCoffee />,

  // Shopping
  "Mini Store": <MdOutlineStorefront />,
  "Convenience Store": <MdOutlineStorefront />,
  "Grocery Store": <MdOutlineStorefront />,
  "Medical Store": <MdOutlineMedicalServices />,
  "Chemist": <MdOutlineMedicalServices />,
  "ATM": <MdOutlineStorefront />,
  "Bank": <MdOutlineStorefront />,
  "Shopping Complex": <MdOutlineStorefront />,

  // Views & Scenery
  "Selfie Point": <FaCamera />,
  "Sunset Point": <FaSun />,
  "Mountain View": <FaMountain />,
  "View Point": <GiBinoculars />,
  "Lake View": <GiWaterDrop />,
  "River View": <GiWaterDrop />,
  "Sea View": <GiWaterDrop />,
  "Garden View": <GiFlowerEmblem />,
  "Pool View": <MdOutlinePool />,

  // Camping & Adventure
  "Night Camping Tent": <GiCampingTent />,
  "Camping Area": <GiCampingTent />,
  "Bonfire": <GiFireRing />,
  "BBQ Area": <GiFireplace />,
  "Adventure Park": <GiCampingTent />,

  // Spiritual
  "Temple": <GiTempleGate />,
  "Prayer Room": <GiTempleGate />,
  "Meditation Hall": <GiTempleGate />,
  "Church": <GiTempleGate />,
  "Mosque": <GiTempleGate />,

  // Accommodation
  "Resort": <FaHotel />,
  "Hotel": <FaHotel />,
  "Guest House": <FaHotel />,
  "Serviced Apartment": <MdOutlineApartment />,
  "Villa": <MdOutlineVilla />,
  "Bungalow": <MdOutlineHouse />,
  "Farm House": <MdOutlineHouse />,
  "Duplex": <MdOutlineHouse />,
  "Penthouse": <MdOutlineHouse />,

  // Fire & Safety
  "Fire Safety": <MdOutlineLocalFireDepartment />,
  "Fire Extinguisher": <FaFireExtinguisher />,
  "Fire Alarm": <GiFireRing />,
  "Fire Hydrant": <MdOutlineLocalFireDepartment />,
  "Fire Exit": <GiExitDoor />,
  "Emergency Exit": <GiExitDoor />,
  "First Aid": <FaFirstAid />,
  "Medical Room": <MdOutlineMedicalServices />,
  "Doctor on Call": <MdOutlineMedicalServices />,

  // Maintenance
  "Maintenance": <FaTools />,
  "Housekeeping": <IoMdConstruct />,
  "Plumbing": <GiWaterDrop />,
  "Electrical": <MdOutlineElectricBolt />,
  "Carpenter": <GiToolbox />,
  "Painting": <GiToolbox />,

  // Waste Management
  "Waste Management": <FaTrash />,
  "Garbage Collection": <GiTrashCan />,
  "Segregated Waste": <FaRecycle />,
  "Compost Pit": <FaRecycle />,
  "Dustbin": <GiTrashCan />,

  // Pet Friendly
  "Pet Friendly": <FaDog />,
  "Pet Park": <GiDogHouse />,
  "Pet Grooming": <FaDog />,
  "Pet Walking Area": <GiDogHouse />,

  // Beach & Water
  "Beach Access": <FaUmbrellaBeach />,
  "Private Beach": <GiBeachBall />,
  "Boat Club": <GiWaterDrop />,
  "Water Sports": <GiWaterDrop />,

  // AC & Cooling
  "Central AC": <FaSnowflake />,
  "Air Conditioning": <FaSnowflake />,
  "Heating": <FaFire />,
  "Geyser": <IoMdWater />,
  "Hot Water": <IoMdWater />,

  // Laundry
  "Laundry": <IoMdWater />,
  "Dry Cleaning": <IoMdWater />,
  "Ironing": <IoMdConstruct />,

  // Elevator
  "Elevator": <MdOutlineExitToApp />,
  "Lift": <MdOutlineExitToApp />,

  // Balcony & Terrace
  "Balcony": <MdOutlineExitToApp />,
  "Terrace": <MdOutlineExitToApp />,
  "Open Terrace": <MdOutlineExitToApp />,

  // Default
  "DEFAULT": <FaStar />
};

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ 
      duration: 800,
      once: true,
      offset: 100
    });
    fetchService();
  }, [id]);

  const fetchService = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/services");
      const serviceId = parseInt(id, 10);
      
      if (isNaN(serviceId)) {
        throw new Error("Invalid service ID");
      }
      
      const foundService = res.data.find(item => item.id === serviceId);
      
      if (!foundService) {
        setError("Service not found");
      } else {
        setService(foundService);
      }
    } catch (err) {
      console.error("Error fetching service", err);
      setError(err.response?.data?.message || "Failed to load service details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <FaSpinner className="spinner" />
        <p>Loading service details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Service Not Found</h2>
        <p>{error}</p>
        <button onClick={() => navigate("/")} className="back-button">
          Browse All Services
        </button>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="error-container">
        <h2>Service Not Found</h2>
        <p>The requested service could not be found.</p>
        <button onClick={() => navigate("/")} className="back-button">
          Go Back Home
        </button>
      </div>
    );
  }

  // Function to get icon for amenity
  const getAmenityIcon = (amenity) => {
    // Check exact match first
    if (iconMap[amenity]) {
      return iconMap[amenity];
    }
    
    // Check partial matches
    const amenityLower = amenity.toLowerCase();
    for (const [key, icon] of Object.entries(iconMap)) {
      if (amenityLower.includes(key.toLowerCase()) || key.toLowerCase().includes(amenityLower)) {
        return icon;
      }
    }
    
    // Return default icon if no match found
    return iconMap.DEFAULT;
  };

  return (
    <div className="detail-wrapper">
      {/* Header Banner */}
      <div className="header-section">
        <div className="service-banner" data-aos="fade-up">
          <img 
            src={service.image} 
            alt={service.title} 
            className="detail-image" 
          />
          {/* <div className="banner-overlay">
            <span className="service-category">{service.category || "Premium Service"}</span>
          </div> */}
        </div>
        
        {/* <div className="page-title" data-aos="fade-up">
          <h1>{service.title}</h1>
          <div className="title-meta">
            <span><FaMapMarkerAlt /> {service.location || "Premium Location"}</span>
            <span><FaCalendarAlt /> Added: {service.date || "Recently"}</span>
            <span><FaUserTie /> By: {service.provider || "Premium Provider"}</span>
          </div>
        </div> */}
      </div>

      {/* Main Content */}
      <div className="detail-content">
        {/* Description */}
        <div className="description-box" data-aos="fade-up">
          <p>{service.description}</p>
        </div>

        {/* Features Section */}
        <div className="features-section" data-aos="fade-up">
          <div className="section-header">
            <h2>Key Features</h2>
            <p>Discover what makes this service exceptional</p>
          </div>
          
          <div className="features-grid">
            {service.features && service.features.map((feature, index) => (
              <div className="feature-card" key={index}>
                {/* <div className="feature-icon-wrapper">
                  <FaCheckCircle className="feature-icon" />
                </div> */}
                <div className="feature-content">
                  <h4>{feature}</h4>
                  {/* <p>Premium quality feature included in this service package.</p> */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities Section */}
        <div className="amenities-section" data-aos="fade-up">
          <div className="section-header">
            <h2>Project Amenities</h2>
            {/* <p>All amenities available with this service</p> */}
          </div>
          
          <div className="amenities-grid">
            {service.amenities && service.amenities.map((amenity, index) => (
              <div className="amenity-card" key={index}>
                <div className="amenity-icon-wrapper">
                  <span className="amenity-icon">
                    {getAmenityIcon(amenity)}
                  </span>
                </div>
                <div className="amenity-text">
                  <h4>{amenity}</h4>
                  {/* <p>Available with premium quality standards</p> */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta-section" data-aos="fade-up">
          <h3>Ready to Experience Premium Service?</h3>
          <p>Contact us today to learn more about this service and how it can benefit you.</p>
          <Link to={`/inquiry/${encodeURIComponent(service.title)}`} className="cta-button">
  Inquiry
</Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
