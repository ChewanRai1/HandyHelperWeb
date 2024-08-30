import React from "react";

const Footer = () => {
  const footerStyles = {
    backgroundColor: "#1b3818",
    color: "white",
    padding: "20px 0",
  };

  const footerContainerStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const footerSectionStyles = {
    flex: 1,
    padding: "0 20px",
  };

  const footerLogoImgStyles = {
    width: "150px",
  };

  const linkStyles = {
    color: "white",
    textDecoration: "none",
  };

  return (
    <footer style={footerStyles}>
      <div className="container">
        <div style={footerContainerStyles}>
          <div style={footerSectionStyles}>
            <h4>About Us</h4>
            <ul className="list-unstyled">
              <li><a href="#" style={linkStyles}>Company</a></li>
              <li><a href="#" style={linkStyles}>Careers</a></li>
              <li><a href="#" style={linkStyles}>News</a></li>
            </ul>
          </div>
          <div style={footerSectionStyles}>
            <h4>Support</h4>
            <ul className="list-unstyled">
              <li><a href="#" style={linkStyles}>Contact Us</a></li>
              <li><a href="#" style={linkStyles}>Knowledge Base</a></li>
              <li><a href="#" style={linkStyles}>Product Help Center</a></li>
            </ul>
          </div>
          <div style={footerSectionStyles}>
            <h4>Become a Partner</h4>
            <ul className="list-unstyled">
              <li><a href="#" style={linkStyles}>Agencies</a></li>
              <li><a href="#" style={linkStyles}>Associations</a></li>
              <li><a href="#" style={linkStyles}>Franchises</a></li>
              <li><a href="#" style={linkStyles}>Affiliates</a></li>
              <li><a href="#" style={linkStyles}>Offers</a></li>
            </ul>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <img src="assets/images/logo.png" alt="Logo" style={footerLogoImgStyles} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;