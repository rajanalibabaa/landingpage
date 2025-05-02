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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  // const [position, setPosition] = useState({ x: 0, y: 0 });
  const openModal = () => setIsModalOpen(true); // Function to open modal
  const closeModal = () => setIsModalOpen(false); // Function to close modal
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const section5Ref = useRef(null);
  const scrollRef = useRef(null);
  const ref = useRef(null);

  // const draggingRef = useRef(false);
  // const positionRef = useRef(position);
  
  const items = [
    "Static Business Plan",
    "Operation Plan",
    "Franchise Plan",
    " Marketing Sales Plan",
    "Legal Document",
  ];

  // useEffect(() => {
  //   const saved = localStorage.getItem("whatsappPosition");
  //   if (saved) {
  //     setPosition(JSON.parse(saved));
  //   }
  // }, []);

//   const handleMouseDown = (e) => {
//     draggingRef.current = true;
//     const startX = e.clientX;
//     const startY = e.clientY;
//     const origX = positionRef.current.x;
//     const origY = positionRef.current.y;

//     const handleMouseMove = (e) => {
//       if (!draggingRef.current) return;
//       const newX = origX + (e.clientX - startX);
//       const newY = origY + (e.clientY - startY);
//       const newPos = { x: newX, y: newY };
//       setPosition(newPos);
//       positionRef.current = newPos;    };

//     const handleMouseUp = () => {
//       draggingRef.current = false;
//       localStorage.setItem("whatsappPosition", JSON.stringify(positionRef.current));
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", handleMouseUp);
//     };

//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("mouseup", handleMouseUp);
//   };

// useEffect(()=>{
//   positionRef.current=position;
// },[position])

  useEffect(() => {
    setIsModalOpen(true);
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

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFormSubmit = () => {
    setIsFormSubmitted(true);
    setIsModalOpen(false);
  };

  const triggerDownload = () => {
    const link = document.createElement("a");
    link.href = "/Franchise Readiness Checklist.pdf";
    link.download = "Franchise Readiness Checklist.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadClick = () => {
    isFormSubmitted ? triggerDownload() : setIsModalOpen(true);
  };
  
  return (
    <>
   {/* <div
        ref={ref}
        className="whatsapp-fixed"
        onMouseDown={handleMouseDown}
        style={{
          position: "fixed",
          left: position.x,
          top: position.y,
          cursor: "grab",
          zIndex: 1000,
        }}
      > */}
        <a
                className="whatsapp-fixed"

          href="https://wa.me/917449213799"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Wicon} alt="WhatsApp" loading="lazy" />
          <span>Ask Our Experts?</span>
        </a>
      {/* </div> */}
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
            <a onClick={() => {scrollToSection(section5Ref), setMenuOpen(false)}}>About Us</a>
          </li>
          <li>
            <a onClick={() => {scrollToSection(section1Ref), setMenuOpen(false)}}>Why Mr Franchise</a>
          </li>
          <li>
            <a onClick={() => {scrollToSection(section2Ref), setMenuOpen(false)}}>What you get</a>
          </li>
          <li>
            <a onClick={() => {scrollToSection(section3Ref), setMenuOpen(false)}}>Download </a>
          </li>
          <li>
            <a onClick={() => {scrollToSection(section4Ref), setMenuOpen(false)}}>
              Associate Partners
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
          
          <img src={cmplogo} alt="Logo Brand" style={{ width: "150px", height: "100px", margin: "auto" }} />
        <h1 style={{ textAlign: "center" ,marginTop:"0"}}>Franchise Your Business With Expert Support</h1>
          <h3 style={{ textAlign: "center",marginTop:"0" }}>
            Turn your <b style={{ color: "orange" }}>Successful Business </b>
            into a <b style={{ color: "orange" }}> Scalable Franchise </b> with <b style={{ color: "orange" }}><br />MR FRANCHISE</b>
          </h3>
           <div className="modal-form">
          <LeadForm onSuccess={handleFormSubmit} />
          </div>
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
          <div className="lead-form-container">
            <LeadForm className="lead-form" onSuccess={handleFormSubmit} />
          </div>
        </div>
      </div>

      {/* Section 3: Partners and About */}
      <div className="section-3"><div className="section-3">
  <div className="partners-section" ref={section4Ref}>
    <h1>Associates Partner Brands</h1>
    <div className="partners-container">
      <div className="partners" ref={scrollRef}>
        {[
          logo1, logo2, logo3, logo4, logo5,
          logo6, logo7, logo8, logo9, logo10,
          logo11, logo12, logo13,
          // Duplicate for seamless looping
          logo1, logo2, logo3, logo4, logo5,
          logo6, logo7, logo8, logo9, logo10,
          logo11, logo12, logo13
        ].map((logo, i) => (
          <div 
            key={i} 
            className="partner-item"
            style={{ '--delay': i * 0.2 + 's' }}
          >
            <img src={logo} alt={`Logo ${i % 13 + 1}`} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
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
