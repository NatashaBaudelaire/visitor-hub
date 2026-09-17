import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import logo from '../../assets/logo-accenture.png';
import './styles.css';

function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading for 3 seconds
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="loading-container">
      <div className="loading-shell">
        <header className="loading-header">
          <img src={logo} alt="Accenture" className="loading-logo" />
          <div className="loading-status"><span></span>Preparing workspace</div>
        </header>
        <main className="loading-content">
          <div className="loading-title-row">
            <div className="loading-symbol"><Icon name="arrowRight" size={28} /></div>
            <p className="loading-eyebrow">Visitor experience</p>
            <h1 className="loading-text">Getting things ready.</h1>
          </div>
          <p className="loading-subtitle">We are preparing your personalised event workspace.</p>
          <div className="loading-progress" role="status" aria-label="Loading"><span></span></div>
        </main>
        <p className="loading-note">This will only take a moment.</p>
      </div>
    </div>
  );
}

export default Loading;
