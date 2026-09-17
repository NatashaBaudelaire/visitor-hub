import React from "react";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Existing pages
import LoginViaEmail from "./pages/Login/LoginViaEmail";
import LoginViaCode from "./pages/Login/LoginViaCode";
import Loading from "./pages/Loading";
import Welcome from "./pages/Welcome";
import LoggedArea from "./pages/LoggedArea";
import Speakers from "./pages/Speakers";
import Schedule from "./pages/Schedule";
import MyAgenda from "./pages/MyAgenda";
import UserProfile from "./pages/UserProfile";
import QRScanner from "./pages/QRScanner";
import FAQ from "./pages/FAQ";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <Routes>
        {/* Login flow */}
        <Route path="/" element={<LoginViaEmail />} />
        <Route path="/login-code" element={<LoginViaCode />} />

        {/* Post-login flow (protected) */}
        <Route path="/loading" element={<ProtectedRoute><Loading /></ProtectedRoute>} />
        <Route path="/welcome" element={<ProtectedRoute><Welcome /></ProtectedRoute>} />
        
        {/* Main dashboard */}
        <Route path="/home" element={<ProtectedRoute><LoggedArea /></ProtectedRoute>} />
        
        {/* Features */}
        <Route path="/speakers" element={<ProtectedRoute><Speakers /></ProtectedRoute>} />
        <Route path="/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
        <Route path="/my-agenda" element={<ProtectedRoute><MyAgenda /></ProtectedRoute>} />
        <Route path="/qr-scanner" element={<ProtectedRoute><QRScanner /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path="/faq" element={<ProtectedRoute><FAQ /></ProtectedRoute>} />
      </Routes>
    </UserProvider>
  );
}

export default App;