import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/user-context';
import Icon from '../../components/Icon';
import logo from '../../assets/logo-accenture.png';
import './styles.css';

function Welcome() {
  const navigate = useNavigate();
  const { userData } = useUser();

  const handleJoinUs = () => {
    navigate('/home');
  };

  const displayName = userData.name.trim() || 'Sofia Müller';
  const firstName = displayName.split(' ')[0];

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <header className="welcome-header">
          <img src={logo} alt="Accenture" className="welcome-logo" />
          <div className="welcome-status">
            <span className="status-dot"></span>
            <span>Visitor experience</span>
          </div>
        </header>
        
        <div className="welcome-main">
          <div className="title-with-symbol">
            <div className="welcome-symbol"><Icon name="arrowRight" size={34} /></div>
            <h1 className="welcome-title">
              Welcome to<br />
              the Accenture Hub,<br />
              {firstName}!
            </h1>
          </div>
          
          <p className="welcome-message">
            Your digital concierge for a simpler, safer, and more personalized visit experience.
          </p>
          
          <button className="join-button" onClick={handleJoinUs}>
            Access platform
            <Icon name="arrowRight" size={18} />
          </button>
        </div>
      </div>
      
      <div className="welcome-note">
        <p>Personalized for your visit location</p>
      </div>
    </div>
  );
}

export default Welcome;