// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "../../App.css";
// import { toast } from "react-toastify";
// import { loginUSerApi } from "../../apis/api";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate(); // Use useNavigate instead of useHistory

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   const validation = () => {
//     let isValid = true;

//     if (email === "" || !email.includes("@")) {
//       setEmailError("Email is empty or forgot to put @");
//       isValid = false;
//     } else {
//       setEmailError("");
//     }

//     if (password === "") {
//       setPasswordError("Password is Empty");
//       isValid = false;
//     } else {
//       setPasswordError("");
//     }

//     return isValid;
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (!validation()) {
//       return;
//     }

//     const data = {
//       email: email,
//       password: password,
//     };

//     loginUSerApi(data).then((res) => {
//       console.log(res.data);
//       if (res.data.success === false) {
//         console.log("Inside false success");
//         toast.error(res.data.message);
//       } else {
//         toast.success(res.data.message);
//         localStorage.setItem("token", res.data.token);
//         const convertedData = JSON.stringify(res.data.userData);
//         localStorage.setItem("user", convertedData);
//         //Redirect to homepage after login succesfully
//         navigate("/");
//       }
//     });
//   };

//   return (
//     <div>
//       {/* <header>
//         <div className="header-container">
//           <img
//             src="/assets/images/logo.png"
//             alt="HandyHelper Logo"
//             className="logo"
//           />
//           <nav>
//             <ul className="nav-links">
//               <li>
//                 <a href="/">Home</a>
//               </li>
//               <li>
//                 <a href="/">Other Info</a>
//               </li>
//               <li>
//                 <a href="/">Events and more</a>
//               </li>
//             </ul>
//           </nav>
//           <div className="auth-links">
//             <a href="/join-as-pro" className="join-pro">
//               Join as a pro
//             </a>
//             <a href="/explore" className="explore">
//               Explore
//             </a>
//             <a href="/register" className="signup">
//               Sign up
//             </a>
//             <a href="/login" className="login">
//               Log in
//             </a>
//           </div>
//         </div>
//       </header> */}
//       <div className="container">
//         <h1>Welcome back</h1>
//         <form onSubmit={handleLogin}>
//           <div>
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             {emailError && <p className="error">{emailError}</p>}
//           </div>
//           <div>
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             {passwordError && <p className="error">{passwordError}</p>}
//           </div>
//           <div>
//             <input type="checkbox" id="rememberMe" />
//             <label htmlFor="rememberMe">Remember me</label>
//             <a href="/" className="forgot-password">
//               Forgot password?
//             </a>
//           </div>
//           <div>
//             <button type="submit">Log in</button>
//           </div>
//         </form>
//         <hr />
//         <div className="signup-options">
//           <p>Or</p>
//           <button className="facebook">Sign up with Facebook</button>
//           <button className="google">Sign up with Google</button>
//         </div>
//         <div>
//           Don't have an account? <Link to="/register">Sign up</Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";
import { toast } from "react-hot-toast";
import { loginUSerApi } from "../../apis/api";

function Login() {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validation = () => {
    let isValid = true;

    if (email === "" || !email.includes("@")) {
      setEmailError("Email is empty or forgot to put @");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (password === "") {
      setPasswordError("Password is Empty");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validation()) {
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    loginUSerApi(data)
      .then((res) => {
        if (!res || !res.data) {
          toast.error("Unexpected error occurred. Please try again.");
          return;
        }

        if (res.data.success === false) {
          toast.error(res.data.message || "Login failed. Please try again.");
        } else {
          toast.success(res.data.message);

          // Store token in localStorage
          localStorage.setItem("token", res.data.token);

          // Store user data in localStorage (optional)
          const convertedData = JSON.stringify(res.data.userData);
          localStorage.setItem("user", convertedData);

          // Redirect to homepage after login successfully
          navigate("/");
        }
      })
      .catch((error) => {
        toast.error(
          "Login failed due to a network issue. Please try again later."
        );
        console.error("Login error:", error);
      });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome back to HandyHelper</h1>
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="error">{emailError}</p>}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className="error">{passwordError}</p>}
          </div>
          <div className="login-options">
            {/* <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Remember me</label> */}
            <Link to="/forgot_password" className="forgot-password">
              Forgot password?
            </Link>
          </div>
          <div>
            <button type="submit" className="login-button">
              Log in
            </button>
          </div>
        </form>
        <hr />
        <div className="signup-options">
          <p>Or</p>
          <button className="facebook">Sign up with Facebook</button>
          <button className="google">Sign up with Google</button>
        </div>
        <div>
          Don't have an account? <Link to="/register">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
