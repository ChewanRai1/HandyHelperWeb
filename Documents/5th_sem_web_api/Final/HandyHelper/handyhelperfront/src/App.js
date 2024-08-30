import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import "./App.css";
// import { ToastContainer } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";
// import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Homepage from "./pages/homepage/Homepage";
import UserUpdate from "./pages/profile/Profile";
import UserRoutes from "./pages/protected/UserRoutes";
import Profile from "./pages/profile/Profile";
import ChangePassword from "./pages/password/ChangePassword";
import ProRoutes from "./pages/protected/ProRoutes";
import ProDashboard from "./pages/pro/ProDashboard";
import ForgotPassword from "./pages/forgot_password/ForgotPassword";
import ProUpdate from "./pages/pro/ProUpdate";
import ServiceDetailPage from "./pages/serviceDetail/ServiceDetailPage";
import FavoritePage from "./pages/favorite/FavoritePage";
function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/getprofile" element={<Profile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/pro/dashboard" element={<ProDashboard />} />
          <Route path="/pro/update/:id" element={<ProUpdate />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/service/:id" element={<ServiceDetailPage />} />
          <Route path="/favorites" element={<FavoritePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
