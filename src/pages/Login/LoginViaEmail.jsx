import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/user-context';
import { fakeSendCode } from '../../services/authService';
import Icon from '../../components/Icon';
import "./styles.css";
import logo from "../../assets/logo-accenture.png"; 

function LoginViaEmail() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { updateUserData } = useUser();

  const handleContinue = (e) => {
    e.preventDefault();
    
    if (name.trim() && email.trim()) {
      const cleanEmail = email.trim();
      updateUserData({ name: name.trim(), email: cleanEmail });
      fakeSendCode(cleanEmail);
      navigate("/login-code");
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-shell">
        <header className="login-header">
          <img src={logo} alt="Accenture" className="accenture-logo" />
          <div className="login-status"><span></span>Secure sign-in</div>
        </header>

        <main className="login-main">
          <form className="login-card" onSubmit={handleContinue}>
            <div className="login-title-row">
              <div className="login-symbol"><Icon name="arrowRight" size={26} /></div>
              <p className="login-eyebrow">Visitor experience</p>
              <h1 className="login-title">Welcome to the<br />Accenture.</h1>
            </div>
            <p className="login-subtitle">Sign in to access your personalised event workspace.</p>

            <div className="input-group">
              <label>
                Full name
                <input type="text" className="login-input" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} required />
              </label>
              <label>
                Work email
                <input type="email" className="login-input" placeholder="name@accenture.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </label>
            </div>

            <button className="login-button" type="submit">
              Continue <Icon name="arrowRight" size={18} />
            </button>
          </form>
        </main>
        <p className="login-note">Your access is protected by corporate verification.</p>
      </div>
    </div>
  );
}

export default LoginViaEmail;
