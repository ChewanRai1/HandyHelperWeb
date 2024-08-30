import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Scroll to the projects section
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // const user = JSON.parse(localStorage.getItem("user"));

  // const [userId, setUserId] = useState(
  //   JSON.parse(localStorage.getItem("user"))._id
  // );
  // ---
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  // console.log(userId);
  ///---
  // Safely parse the user data from localStorage or set to null
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return null;
    }
  });

  //Logout function
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  // Inline styles for reducing navbar height
  const navbarStyles = {
    padding: "5px 15px", // Adjust the padding to reduce height
  };

  const brandImageStyles = {
    height: "25px", // Reduce the logo size
  };

  const navLinkStyles = {
    padding: "5px 10px", // Adjust padding for links
    fontSize: "16px", // Adjust font size if needed
  };

  const buttonStyles = {
    padding: "5px 10px", // Adjust padding for buttons
    fontSize: "14px", // Adjust font size if needed
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-white" style={navbarStyles}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          <img
            src="/assets/images/logo.png"
            alt="Your Logo"
            style={brandImageStyles}
            className="d-inline-block align-top me-2"
          />{" "}
          HandyHelper
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="#"
                style={navLinkStyles}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="#"
                style={navLinkStyles}
                onClick={scrollToProjects}
              >
                Services
              </Link>
            </li>
          </ul>
          <div className="d-flex justify-content-end">
            {user ? (
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={buttonStyles}
                >
                  Welcome, {user.firstName}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={`/getprofile`}>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`/favorites`}>
                      Favorites
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="dropdown-item"
                      href="#"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="auth-links">
                <Link
                  to="/join-as-pro"
                  className="join-pro"
                  style={navLinkStyles}
                >
                  Join as a pro
                </Link>
                <Link
                  to="/Register"
                  className="btn btn-outline-danger me-2"
                  type="submit"
                  style={buttonStyles}
                >
                  Sign up
                </Link>
                <Link
                  to="/Login"
                  className="btn btn-outline-success"
                  type="submit"
                  style={buttonStyles}
                >
                  Log in
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   // Initialize user state with parsed localStorage data or null
//   const [user, setUser] = useState(() => {
//     const savedUser = localStorage.getItem("user");
//     return savedUser ? JSON.parse(savedUser) : null;
//   });

//   // Logout function
//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/login";
//   };

//   return (
//     <nav className="navbar navbar-expand-lg bg-body-white">
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="#">
//           <img
//             src="/assets/images/logo.png"
//             alt="Your Logo"
//             height="30"
//             className="d-inline-block align-top me-2"
//           />{" "}
//           HandyHelper
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//             <li className="nav-item">
//               <Link className="nav-link active" aria-current="page" to="#">
//                 Home
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="#">
//                 Products
//               </Link>
//             </li>
//           </ul>
//           <form className="d-flex" role="search">
//             {user ? (
//               <div className="dropdown">
//                 <button
//                   className="btn btn-secondary dropdown-toggle"
//                   type="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   Welcome, {user.firstName}
//                 </button>
//                 <ul className="dropdown-menu">
//                   <li>
//                     <Link className="dropdown-item" to={`/getprofile`}>
//                       Profile
//                     </Link>
//                   </li>
//                   <li>
//                     <a className="dropdown-item" href="#">
//                       Settings
//                     </a>
//                   </li>
//                   <li>
//                     <button
//                       onClick={handleLogout}
//                       className="dropdown-item"
//                       href="#"
//                     >
//                       Logout
//                     </button>
//                   </li>
//                 </ul>
//               </div>
//             ) : (
//               <div className="auth-links">
//                 <Link to="/join-as-pro" className="join-pro">
//                   Join as a pro
//                 </Link>
//                 <Link
//                   to={"/Register"}
//                   className="btn btn-outline-danger me-2"
//                   type="submit"
//                 >
//                   Sign up
//                 </Link>
//                 <Link
//                   to={"/Login"}
//                   className="btn btn-outline-success"
//                   type="submit"
//                 >
//                   Log in
//                 </Link>
//               </div>
//             )}
//           </form>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
