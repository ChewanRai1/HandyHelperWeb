// import React from "react";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import "./Homepage.css";

// const Homepage = () => {
//   return (
//     <div>
//       <Navbar />
//       <main className="main-content">
//         <div className="search-bar">
//           <select>
//             <option>HIRE A PRO</option>
//             <option>FIND CUSTOMERS</option>
//           </select>
//           {/* <div className="search-bar"> */}
//           <div className="search-options">
//             <span className="hire-pro">HIRE A PRO</span>
//             <span className="find-customers">FIND CUSTOMERS</span>
//           </div>
//           <div className="search-fields">
//             <select className="search-dropdown">
//               <option>When?</option>
//               {/* Additional options */}
//             </select>
//             <input
//               type="text"
//               className="search-input"
//               placeholder="What's on your to do list?"
//             />
//             <div className="location-input">
//               <span className="location-icon">📍</span>
//               <input type="text" placeholder="Location" />
//             </div>
//             <button className="search-button">🔍</button>
//           </div>
//           <div className="search-suggestions">
//             Try searching for a<a href="#">Plumber</a>,{""}
//             <a href="#">Cleaner</a>,<a href="#">Carpenter</a> or{""}
//             <a href="#">Electrician</a>
//           </div>
//           {/* </div> */}
//         </div>
//         <div className="images">
//           <img
//             src="/assets/images/kitchen.jpg"
//             alt="Kitchen"
//             className="image"
//           />
//           <div className="illustration">
//             <img src="/assets/images/illustration.jpg" alt="Illustration" />
//           </div>
//         </div>
//         <div className="app-promotion">
//           <h2>Get the app. Get things done.</h2>
//           <a href="https://play.google.com/store/games" target="_blank">
//             <img src="/assets/images/appstore.png" alt="App Store" />
//           </a>
//           <a href="https://www.apple.com/app-store/" target="_blank">
//             <img src="/assets/images/googleplay.png" alt="Google Play" />
//           </a>
//         </div>
//         <div id="projects" className="container">
//           <h2>Explore more projects.</h2>
//         </div>
//         <div class="container">
//           <h2>Explore more projects.</h2>
//           <div class="project-grid">
//             <div class="project">
//               <img
//                 src="/assets/images/essential.png"
//                 alt="Essentials Home Service"
//               />
//               <h3>Essentials Home Service</h3>
//             </div>
//             <div class="project">
//               <img src="/assets/images/outdoor.png" alt="Outdoor upkeep" />
//               <h3>Outdoor upkeep</h3>
//             </div>
//             <div class="project">
//               <img src="/assets/images/learn.png" alt="Learn Something New" />
//               <h3>Learn Something New</h3>
//             </div>
//           </div>

//           <h2>Browse by category</h2>
//           <div class="categories">
//             <div class="category">Home Maintenance</div>
//             <div class="category">Home Modelling</div>
//             <div class="category">Weddings</div>
//             <div class="category">Events</div>
//           </div>

//           <div class="weddings-section">
//             <div class="weddings-header">
//               <h3>
//                 You're getting married! Let's get you some help. Here's
//                 everything you need for the big day.
//               </h3>
//               <a href="#">See all weddings</a>
//             </div>
//             <div class="wedding-gallery">
//               {/* <div class="wedding-image">
//                 <img src="/assets/images/wed.png" alt="Wedding Photo 1" />
//               </div> */}
//               <div class="wedding-image">
//                 <img src="/assets/images/wed1.png" alt="Wedding Photo 2" />
//               </div>
//               <div class="wedding-image">
//                 <img src="/assets/images/wed2.png" alt="Wedding Photo 3" />
//               </div>
//               <div class="wedding-image">
//                 <img src="/assets/images/wed3.png" alt="Wedding Photo 4" />
//               </div>
//             </div>
//           </div>

//           <h2>Services you might also like</h2>
//           <div class="service-grid">
//             <div class="service">
//               <img
//                 src="/assets/images/IT.png"
//                 alt="Freelance IT Professionals"
//               />
//               <h3>Freelance IT Professionals</h3>
//             </div>
//             <div class="service">
//               <img src="/assets/images/handy.png" alt="Handyman" />
//               <h3>Handyman</h3>
//             </div>
//             <div class="service">
//               <img src="/assets/images/contractors.png" alt="Contractors" />
//               <h3>Contractors</h3>
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default Homepage;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getAllServices } from "../../apis/api";
import "./Homepage.css";

const Homepage = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);
  const navigate = useNavigate(); // Hook to navigate to different routes
  // Function to handle navigation based on the selected option or click event
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Handle change from dropdown
  const handleSelectChange = (event) => {
    const value = event.target.value;
    if (value === "HIRE A PRO") {
      handleNavigation("/");
    } else if (value === "BE A PRO") {
      handleNavigation("/pro/dashboard");
    }
  };
  useEffect(() => {
    getAllServices()
      .then((res) => {
        if (res.data && res.data.services) {
          setServices(res.data.services);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch services:", error);
      });
  }, []);
  const handleSearch = () => {
    const filtered = services.filter((service) =>
      service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredServices(filtered);
    // Scroll to the "Explore more services" section
    const exploreSection = document.getElementById("projects");
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div>
      <Navbar />
      <main className="main-content">
        {/* Search bar added here */}
        <div className="search-bar">
          <select onChange={handleSelectChange}>
            <option>HIRE A PRO</option>
            <option>BE A PRO</option>
          </select>
          <div className="search-options">
            <span
              className="hire-pro"
              onClick={() => handleNavigation("/")}
              style={{ cursor: "pointer" }} // Makes the span look clickable
            >
              HIRE A PRO
            </span>
            <span
              className="find-customers"
              onClick={() => handleNavigation("/pro/dashboard")}
              style={{ cursor: "pointer" }} // Makes the span look clickable
            >
              BE A PRO
            </span>
          </div>
          {/* Search functionality */}
          <div className="search-fields">
            <input
              type="text"
              className="search-input"
              placeholder="What's on your to do list?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button" onClick={handleSearch}>
              🔍
            </button>
          </div>
          <div className="search-suggestions">
            Try searching for a <a href="#">Plumber</a>, <a href="#">Cleaner</a>
            , <a href="#">Carpenter</a> or <a href="#">Electrician</a>
          </div>
        </div>

        {/* //         </div> */}
        <div className="images">
          <img
            src="/assets/images/kitchen.jpg"
            alt="Kitchen"
            className="image"
          />
          <div className="illustration">
            <img src="/assets/images/illustration.jpg" alt="Illustration" />
          </div>
        </div>

        <div className="app-promotion">
          <h2>Get the app. Get things done.</h2>
          <a href="https://play.google.com/store/games" target="_blank">
            <img src="/assets/images/appstore.png" alt="App Store" />
          </a>
          <a href="https://www.apple.com/app-store/" target="_blank">
            <img src="/assets/images/googleplay.png" alt="Google Play" />
          </a>
        </div>

        <div id="projects" className="container">
          <h2>Explore more services</h2>
        </div>
        {/* Services displayed in two columns */}
        <div className="service-grid">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <div key={service._id} className="service-item">
                <Link to={`/service/${service._id}`}>
                  <img
                    src={`http://localhost:9000/uploads/${service.serviceImage}`}
                    alt={service.serviceName}
                    className="image"
                  />
                  <h3>{service.serviceName}</h3>
                  <p>NPR {service.servicePrice}</p>
                </Link>
              </div>
            ))
          ) : (
            <p>No services found for your search.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;
