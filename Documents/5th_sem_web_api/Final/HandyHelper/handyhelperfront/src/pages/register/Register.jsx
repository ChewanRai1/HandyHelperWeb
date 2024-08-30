import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import { toast } from "react-hot-toast";
import { registerUSerApi } from "../../apis/api";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // const handlePhone = (e) => {
  //   setPhone(e.target.value);
  // };

  const validation = () => {
    let isValid = true;

    if (firstName === "") {
      setFirstNameError("First name is empty");
      isValid = false;
    } else {
      setFirstNameError("");
    }

    if (lastName === "") {
      setLastNameError("Last name is empty");
      isValid = false;
    } else {
      setLastNameError("");
    }

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
    if (phone.trim() === "") {
      setPhoneError("Please enter phone no");
      isValid = false;
    }

    return isValid;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!validation()) {
      return;
    }

    const data = {
      firstName,
      lastName,
      email,
      password,
      phone,
    };

    registerUSerApi(data)
      .then((res) => {
        console.log(res.data);
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error!");
      });
  };

  return (
    <div>
      {/* <header>
        <div className="header-container">
          <img
            src="/assets/images/logo.png"
            alt="HandyHelper Logo"
            className="logo"
          />
          <nav>
            <ul className="nav-links">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/">Other Info</a>
              </li>
              <li>
                <a href="/">Events and more</a>
              </li>
            </ul>
          </nav>
          <div className="auth-links">
            <a href="/join-as-pro" className="join-pro">
              Join as a pro
            </a>
            <a href="/explore" className="explore">
              Explore
            </a>
            <a href="/signup" className="signup">
              Sign up
            </a>
            <a href="/login" className="login">
              Log in
            </a>
          </div>
        </div>
      </header> */}
      <div className="container">
        <h1>Create your account</h1>
        <form onSubmit={handleRegister}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {firstNameError && <p className="error">{firstNameError}</p>}
          </div>
          <div>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {lastNameError && <p className="error">{lastNameError}</p>}
          </div>
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
              type="phone"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {phoneError && <p className="error">{phoneError}</p>}
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
          <p>Your password must:</p>
          <ul>
            <li>be 8 to 15 characters long</li>
            <li>not contain your name or email</li>
            <li>
              not be commonly used, easily guessed, or contain any variation of
              the word "HandyHelper"
            </li>
          </ul>
          <div>
            <button type="submit" className="create-account">
              Create Account
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
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
}

// Dummy API function for registerUserApi
// const registerUserApi = async (data) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         data: {
//           success: true,
//           message: "Registration successful",
//         },
//       });
//     }, 1000);
//   });
// };

export default Register;
