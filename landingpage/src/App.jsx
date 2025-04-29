import React, { useRef, useEffect, useState } from "react";
import ReactModal from "react-modal";
import "./App.css";
import logo1 from "./assets/logo1.png";
import logo2 from "./assets/logo2.png";
import logo3 from "./assets/logo3.png";
import logo4 from "./assets/logo4.png";
import logo5 from "./assets/logo5.png";
import logo6 from "./assets/logo6.png";
import logo7 from "./assets/logo7.jpg";
import logo8 from "./assets/logo8.png";
import logo9 from "./assets/logo9.png";
import logo10 from "./assets/logo10.png";
import logo11 from "./assets/logo11.png";
import logo12 from "./assets/logo12.png";
import logo13 from "./assets/logo13.png";
import cmplogo from "../src/assets/brandlogo1.jpg";
import sec2 from "../src/assets/sec2.jpg";
import back1 from "../src/assets/back3.jpg";
import LeadForm from "./Components/LandingFormHandling";
import Wicon from "../src/assets/whatsappicon.png";
function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // State to track form submission
  const openModal = () => setIsModalOpen(true); // Function to open modal
  const closeModal = () => setIsModalOpen(false); // Function to close modal
  const [showBackToTop, setShowBackToTop] = useState(false);
  const scrollRef = useRef(null);

  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const section5Ref = useRef(null);
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const [activeItem, setActiveItem] = useState(0);
  const items = [
    "Static Business Plan",
    "Operation Plan",
    "Franchise Plan",
    " Marketing Sales Plan",
    "Legal Document",
  ];

  useEffect(() => {
    // Check if popup was already shown (using localStorage)
    const popupShown = localStorage.getItem('popupShown');
    
    // Show popup if not shown before or after 24 hours
    if (!popupShown || Date.now() - popupShown > 24 * 60 * 60 * 1000) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
        localStorage.setItem('popupShown', Date.now());
      }, 1000); // Show after 3 seconds
      
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveItem((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [items.length]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollStep = 1;
    const delay = 50;

    const interval = setInterval(() => {
      if (
        scrollContainer.scrollLeft >=
        scrollContainer.scrollWidth - scrollContainer.clientWidth
      ) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += scrollStep;
      }
    }, delay);

    return () => clearInterval(interval);
  }, []);

  const checkScrollPosition = () => {
    if (window.scrollY > 300) {
      setShowBackToTop(true); // Show button after 300px scroll
    } else {
      setShowBackToTop(false); // Hide button when at the top
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollPosition);
    return () => window.removeEventListener("scroll", checkScrollPosition);
  }, []);

  const handleFormSubmit = () => {
    setIsFormSubmitted(true); // Mark the form as submitted
    closeModal();
  };
  const triggerDounload = () => {
    const link = document.createElement("a");
    link.href = "/Franchise Readiness Checklist.pdf"; // Replace with the correct file path
    link.download = "Franchise Readiness Checklist.pdf"; // Set the file name for download
    document.body.appendChild(link);
    link.click(); // Trigger the download
    document.body.removeChild(link);
  };
  const handleDownloadClick = (e) => {
    if (isFormSubmitted) {
      triggerDounload();
    } else {
      setIsModalOpen(true);
    }
  };
  return (
    <>
      <a
        href="https://wa.me/917449213799"
        class="whatsapp-fixed"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={Wicon} alt="WhatsApp" loading="lazy" />
        <span>Ask Our Experts?</span>
      </a>
      <nav className="navbar">
        <div className="navbar-header">
          <div className="navbar-logo">
            <img src={cmplogo} alt="Logo" className="logo" loading="lazy" />
          </div>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="menu-icon">&#9776;</span>
          </button>
        </div>

        <ul className={`navbar-menu ${menuOpen ? "open" : ""}`}>
          <li>
            <a onClick={() => scrollToSection(section5Ref)}>About Us</a>
          </li>
          <li>
            <a onClick={() => scrollToSection(section1Ref)}>Why Mr Franchise</a>
          </li>
          <li>
            <a onClick={() => scrollToSection(section2Ref)}>What you get</a>
          </li>
          <li>
            <a onClick={() => scrollToSection(section3Ref)}>Download </a>
          </li>
          <li>
            <a onClick={() => scrollToSection(section4Ref)}>
              Associates Partners
            </a>
          </li>
          <li>
            <a onClick={openModal}>Contact us</a>
          </li>
        </ul>
      </nav>
      {/* Modal for Lead Form */}
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
      >
        <button
          className="close-modal"
          onClick={closeModal}
          aria-label="Close modal"
        >
          ×
        </button>
        {/* <h2 className="modal-title">Free Franchise Consultation</h2> */}
        <div className="modal-content">
        <h1>Franchise Your Business With Expert Support</h1>
          <h3>
            Turn your <b style={{ color: "orange" }}>Successful Business </b>
            into a <br /> <b style={{ color: "orange" }}>
              Scalable Franchise
            </b>
            with <b style={{ color: "orange" }}>MR FRANCHISE</b>
          </h3>
          <LeadForm onSuccess={handleFormSubmit} />
        </div>
      </ReactModal>
      {/* Section 1: Hero and Banner */}

      <div
        className="section-1"
        style={{
          backgroundImage: `url(${back1})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "400px",
          opacity: " 0.9",
        }}
      >
        <div className="hero-section">
          <h1>Franchise Your Business With Expert Support</h1>
          <h3>
            Turn your <b style={{ color: "orange" }}>Successful Business </b>
            into a <br /> <b style={{ color: "orange" }}>
              Scalable Franchise
            </b>{" "}
            with <b style={{ color: "orange" }}>MR FRANCHISE</b>
          </h3>
          <button
            style={{
              backgroundColor: "#27d808",
              color: "white",
              marginTop: "20px",
              fontSize: "1.5rem",
            }}
            onClick={openModal}
          >
            Free Franchise Consultation ➔
          </button>
        </div>
      </div>

      <div className="banner-section" ref={section2Ref}>
        <div className="banner">
          <h3>What You'll Get?</h3>
          <ul>
            {items.map((item, index) => (
              <li
                key={index}
                className={index === activeItem ? "pulse-active" : ""}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="section-2" ref={section1Ref}>
        <div
          style={{
            display: "flex",
            backgroundImage: `url(${sec2})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          className="main-section"
        >
          <div className="mind-map-container">
            <div className="mind-map-header">
              <h3 className="mind-map-title">Why Mr Franchise?</h3>
            </div>
            <div className="mind-map-wrapper">
              <div className="mind-map-body">
                <div className="mind-map-nodes">
                  <div className="mind-map-node node-1">
                    <div className="node-icon">✓</div>
                    <h4 className="node-title">50+ Tamil Nadu Brands Helped</h4>
                  </div>
                  <div className="mind-map-node node-2">
                    <div className="node-icon">✓</div>
                    <h4 className="node-title">
                      10+ Years of Franchise Experience
                    </h4>
                  </div>
                  <div className="mind-map-node node-3">
                    <div className="node-icon">✓</div>
                    <h4 className="node-title">
                      25+ Years of Sales and Business Development
                    </h4>
                  </div>
                  <div className="mind-map-node node-4">
                    <div className="node-icon">✓</div>
                    <h4 className="node-title">
                      Strong Regional Investor Base
                    </h4>
                  </div>
                  <div className="mind-map-node node-5">
                    <div className="node-icon">✓</div>
                    <h4 className="node-title">
                      Local & Scalable Advisory Services
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <LeadForm className="lead-form" onSuccess={handleFormSubmit} />
          </div>
        </div>
      </div>

      {/* Section 3: Partners and About */}
      <div className="section-3">
        <div className="partners-section" ref={section4Ref}>
          <h1>Associates Partner Brands</h1>
          <div className="partners" ref={scrollRef}>
            {[
              logo1,
              logo2,
              logo3,
              logo4,
              logo5,
              logo6,
              logo7,
              logo8,
              logo9,
              logo10,
              logo11,
              logo12,
              logo13,
            ].map((logo, i) => (
              <img key={i} src={logo} alt={`Logo ${i + 1}`} loading="lazy" />
            ))}
          </div>
        </div>
        <hr />

        <div className="about-section" ref={section5Ref}>
          <div className="company-description">
            <h2>About Us</h2>

            <div className="company-stats">
              <div className="stat-item">
                <div className="stat-number">25+</div>
                <div className="stat-label">
                  Years <br />
                  In Sales <br /> Marketing
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-number">10+</div>
                <div className="stat-label">
                  {" "}
                  Years <br /> In Business <br /> Development
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">
                  Franchise <br />
                  Launched <br /> Consulted
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-number">7+</div>
                <div className="stat-label">
                  Years <br /> Franchise <br /> Consultation{" "}
                </div>
              </div>
            </div>
            <div className="company-stats-2">
              <div className="stat-item-2">
                <div className="stat-number-2">7+</div>
                <div className="stat-label-2">
                  Years <br /> Franchise <br /> Exhibitions
                </div>
              </div>
              <div className="stat-item-2">
                <div className="stat-number-2">2+</div>
                <div className="stat-label-2">
                  Lead Generation <br /> Platform <br />{" "}
                  <a style={{ color: "orange" }}>"www.MrFranchise.in"</a>
                </div>
              </div>
              <div className="stat-item-2">
                <div className="stat-number-2">2+</div>
                <div className="stat-label-2">
                  Years In <br /> Franchise <br /> Recruitment
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />

      <div className="franchise-checklist" ref={section3Ref}>
        <h3>Franchise Readiness Checklist</h3>
        <a className="download-btn" onClick={handleDownloadClick}>
          Download Checklist
        </a>
      </div>

      {showBackToTop && (
        <button
          className="back-to-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          &#8679;
        </button>
      )}

      <footer>© 2025 Mr Franchise.in | All Rights Reserved</footer>
    </>
  );
}

export default App;
