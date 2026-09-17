import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user-context';
import Icon from '../../components/Icon';
import logo from '../../assets/logo-accenture.png';
import './styles.css';

function LoggedArea() {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const displayName = userData?.name?.trim() || 'Sofia Müller';
  const firstName = displayName.split(' ')[0];

  // Function to get name initials
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleFeatureClick = (route) => {
    navigate(route);
  };

  const handleAISearch = (query) => {
    const searchTerm = query.toLowerCase();
    
    if (searchTerm.includes('speaker')) {
      navigate('/speakers');
    } else if (searchTerm.includes('event') || searchTerm.includes('agenda')) {
      navigate('/schedule');
    } else if (searchTerm.includes('certificate')) {
      navigate('/profile');
    } else {
      alert('AI: Information found about ' + query + '. This feature is under development.');
    }
  };

  return (
    <div className="logged-area">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-logo">
            <img src={logo} alt="Accenture" className="dashboard-logo" />
          </div>
          <div className="user-info">
            <div className="user-avatar">
              {getInitials(displayName)}
            </div>
            <span className="user-name">{displayName}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <section className="dashboard-hero" aria-labelledby="dashboard-title">
          <div className="dashboard-hero-icon">
            <Icon name="arrowRight" size={28} />
          </div>
          <p className="dashboard-eyebrow">Visitor experience</p>
          <h1 id="dashboard-title" className="page-title">
            Good to see you,<br />
            {firstName}.
          </h1>
          <p className="dashboard-intro">
            Your event workspace brings sessions, contacts, and essential tools together in one place.
          </p>
        </section>

        {/* AI Search Section */}
        <section className="ai-search-section">
          <h2 className="search-title">
            <span className="icon-ai-badge">
              <Icon name="robot" size={16} />
            </span> AI assistant
          </h2>
          <div className="search-container">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search events, speakers, or certificates..."
                className="search-input"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAISearch(e.target.value);
                    e.target.value = '';
                  }
                }}
              />
              <button className="search-button" aria-label="Search" onClick={(e) => {
                const input = e.target.closest('.search-bar').querySelector('.search-input');
                if (input.value) {
                  handleAISearch(input.value);
                  input.value = '';
                } else {
                  alert('Enter a search term to continue.');
                }
              }}>
                <Icon name="search" size={20} />
              </button>
            </div>
            <div className="ai-suggestions">
              <span className="suggestion-chip" onClick={() => handleAISearch('speakers')}>
                "Available speakers"
              </span>
              <span className="suggestion-chip" onClick={() => handleAISearch('AI events')}>
                "AI events"
              </span>
              <span className="suggestion-chip" onClick={() => handleAISearch('my certificates')}>
                "My certificates"
              </span>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <h2 className="stats-title">
            <Icon name="chart" size={20} /> Your progress
          </h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">3</div>
              <div className="stat-label">Registered events</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">12</div>
              <div className="stat-label">Content hours</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">8</div>
              <div className="stat-label">Connections made</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">2</div>
              <div className="stat-label">Certificates</div>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="cards-grid">
          <div className="feature-card" onClick={() => handleFeatureClick('/speakers')}>
            <div className="card-icon">
              <Icon name="users" size={32} />
            </div>
            <h3 className="card-title">Speakers</h3>
            <p className="card-description">
              Meet the experts who will share knowledge and experiences at the events.
            </p>
            <button className="card-button">View speakers</button>
          </div>

          <div className="feature-card" onClick={() => handleFeatureClick('/my-agenda')}>
            <div className="card-icon">
              <Icon name="calendar" size={32} />
            </div>
            <h3 className="card-title">My agenda</h3>
            <p className="card-description">
              View your scheduled events, confirmations, and participation history.
            </p>
            <button className="card-button">View agenda</button>
          </div>

          <div className="feature-card" onClick={() => handleFeatureClick('/qr-scanner')}>
            <div className="card-icon">
              <Icon name="qrcode" size={32} />
            </div>
            <h3 className="card-title">QR Code scanner</h3>
            <p className="card-description">
              Scan QR codes for check-in, materials, and networking at events.
            </p>
            <button className="card-button">Open scanner</button>
          </div>

          <div className="feature-card" onClick={() => handleFeatureClick('/schedule')}>
            <div className="card-icon">
              <Icon name="clock" size={32} />
            </div>
            <h3 className="card-title">Full schedule</h3>
            <p className="card-description">
              Explore all available events and discover new opportunities.
            </p>
            <button className="card-button">Explore events</button>
          </div>

          <div className="feature-card" onClick={() => handleFeatureClick('/profile')}>
            <div className="card-icon">
              <Icon name="user" size={32} />
            </div>
            <h3 className="card-title">My profile</h3>
            <p className="card-description">
              Manage your personal information and platform preferences.
            </p>
            <button className="card-button">View profile</button>
          </div>

          <div className="feature-card" onClick={() => handleFeatureClick('/faq')}>
            <div className="card-icon">
              <Icon name="help" size={32} />
            </div>
            <h3 className="card-title">FAQ</h3>
            <p className="card-description">
              Find answers to your questions about events and the platform.
            </p>
            <button className="card-button">View FAQ</button>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="action-buttons">
          <button 
            className="action-button primary"
            onClick={() => handleFeatureClick('/qr-scanner')}
          >
            <Icon name="camera" size={18} /> Scan QR code
          </button>
          <button 
            className="action-button"
            onClick={() => handleFeatureClick('/my-agenda')}
          >
            <Icon name="calendar" size={18} /> My agenda
          </button>
          <button 
            className="action-button"
            onClick={() => handleFeatureClick('/speakers')}
          >
            <Icon name="users" size={18} /> Speakers
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">
          © 2025 Accenture. All rights reserved. | Version 1.0.0
        </p>
      </footer>
    </div>
  );
}

export default LoggedArea;
