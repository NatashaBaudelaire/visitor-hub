import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import './styles.css';

function QRScanner() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [error, setError] = useState(null);
  const streamRef = useRef(null);

  // Simulate a QR scan because the development environment has no real camera access.
  const simulateQRScan = () => {
    const mockQRData = [
      {
        type: 'event_checkin',
        data: {
          eventName: 'Tech Conference 2024',
          location: 'Main Auditorium',
          time: '09:30 - 10:30',
          speaker: 'Élodie Martin',
          presentation: 'The Future of AI in the Corporate World'
        }
      },
      {
        type: 'networking',
        data: {
          name: 'Klára Novák',
          role: 'Data Scientist',
          company: 'AI Corp',
          email: 'maria.santos@aicorp.com',
          linkedin: 'linkedin.com/in/mariasantos'
        }
      },
      {
        type: 'feedback',
        data: {
          sessionId: 'session_001',
          sessionName: 'Blockchain for Sustainability',
          feedbackUrl: 'https://feedback.accenture.com/session_001'
        }
      }
    ];

    const randomData = mockQRData[Math.floor(Math.random() * mockQRData.length)];
    setScannedData(randomData);
    setIsScanning(false);
  };

  const startScanning = async () => {
    try {
      setError(null);
      setScannedData(null);
      setIsScanning(true);

      // In a real environment, this would use navigator.mediaDevices.getUserMedia.
      // For this demo, simulate the process.
      setTimeout(() => {
        simulateQRScan();
      }, 2000);

} catch {
      setError('Unable to access the camera. Verify the required permissions.');
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    setIsScanning(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const resetScanner = () => {
    setScannedData(null);
    setError(null);
    setIsScanning(false);
  };

  const handleAction = (action, data) => {
    switch (action) {
      case 'checkin':
        alert(`Check-in completed for: ${data.presentation}`);
        break;
      case 'add_contact':
        alert(`Contact added: ${data.name}`);
        break;
      case 'open_feedback':
        alert(`Opening feedback form for: ${data.sessionName}`);
        break;
      case 'share':
        navigator.share?.({
          title: 'QR Code Scan Result',
          text: JSON.stringify(data, null, 2)
        }) || alert('Data copied.');
        break;
      default:
        break;
    }
  };

  const renderScannedResult = () => {
    if (!scannedData) return null;

    switch (scannedData.type) {
      case 'event_checkin':
        return (
          <div className="result-card event-card">
            <div className="result-header">
              <h3><Icon name="calendar" size={18} /> Event Check-In</h3>
            </div>
            <div className="result-content">
              <h4>{scannedData.data.eventName}</h4>
              <div className="event-details">
                <p><strong><Icon name="mapPin" size={14} /> Location:</strong> {scannedData.data.location}</p>
                <p><strong><Icon name="clock" size={14} /> Time:</strong> {scannedData.data.time}</p>
                <p><strong><Icon name="user" size={14} /> Speaker:</strong> {scannedData.data.speaker}</p>
                <p><strong><Icon name="list" size={14} /> Presentation:</strong> {scannedData.data.presentation}</p>
              </div>
              <div className="result-actions">
                <button 
                  className="action-button primary"
                  onClick={() => handleAction('checkin', scannedData.data)}
                >
                  <Icon name="check" size={16} /> Complete Check-In
                </button>
                <button 
                  className="action-button secondary"
                  onClick={() => handleAction('share', scannedData.data)}
                >
                  <Icon name="share" size={16} /> Share
                </button>
              </div>
            </div>
          </div>
        );

      case 'networking':
        return (
          <div className="result-card contact-card">
            <div className="result-header">
              <h3><Icon name="user" size={18} /> Professional Contact</h3>
            </div>
            <div className="result-content">
              <h4>{scannedData.data.name}</h4>
              <div className="contact-details">
                <p><strong><Icon name="user" size={14} /> Role:</strong> {scannedData.data.role}</p>
                <p><strong><Icon name="users" size={14} /> Company:</strong> {scannedData.data.company}</p>
                <p><strong><Icon name="mail" size={14} /> E-mail:</strong> {scannedData.data.email}</p>
                <p><strong><Icon name="linkedin" size={14} /> LinkedIn:</strong> {scannedData.data.linkedin}</p>
              </div>
              <div className="result-actions">
                <button 
                  className="action-button primary"
                  onClick={() => handleAction('add_contact', scannedData.data)}
                >
                  <Icon name="user" size={16} /> Add Contact
                </button>
                <button 
                  className="action-button secondary"
                  onClick={() => handleAction('share', scannedData.data)}
                >
                  <Icon name="share" size={16} /> Share
                </button>
              </div>
            </div>
          </div>
        );

      case 'feedback':
        return (
          <div className="result-card feedback-card">
            <div className="result-header">
              <h3><Icon name="messageCircle" size={18} /> Session Feedback</h3>
            </div>
            <div className="result-content">
              <h4>{scannedData.data.sessionName}</h4>
              <p>Your opinion matters. Rate this session and help us improve.</p>
              <div className="result-actions">
                <button 
                  className="action-button primary"
                  onClick={() => handleAction('open_feedback', scannedData.data)}
                >
                  <Icon name="star" size={16} /> Rate Session
                </button>
                <button 
                  className="action-button secondary"
                  onClick={() => handleAction('share', scannedData.data)}
                >
                  <Icon name="share" size={16} /> Share
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="result-card generic-card">
            <div className="result-header">
              <h3><Icon name="qrcode" size={18} /> QR Code Identified</h3>
            </div>
            <div className="result-content">
              <pre>{JSON.stringify(scannedData, null, 2)}</pre>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="qr-scanner-page">
      {/* Header */}
      <header className="scanner-header">
        <button 
          onClick={() => navigate(-1)}
          className="back-button"
          aria-label="Go back"
        >
          <Icon name="arrowLeft" size={20} />
        </button>
        <h1 className="page-title">QR Code Scanner</h1>
        <div className="header-decoration"></div>
      </header>

      {/* Content */}
      <div className="scanner-content">
        {!scannedData && (
          <div className="scanner-intro">
              <h2><Icon name="camera" size={22} /> Scan a QR Code</h2>
            <p>Point your camera at a QR code to check in, network, or submit feedback.</p>
          </div>
        )}

        {/* Scanner Area */}
        <div className="scanner-area">
          {!isScanning && !scannedData && (
            <div className="scanner-placeholder">
              <div className="scanner-icon"><Icon name="camera" size={40} /></div>
              <p>Select to start the scanner</p>
              <button className="start-scan-button" onClick={startScanning}>
                <Icon name="search" size={16} /> Start Scanner
              </button>
            </div>
          )}

          {isScanning && (
            <div className="scanning-active">
              <div className="scanning-frame">
                <div className="scanning-corners">
                  <div className="corner top-left"></div>
                  <div className="corner top-right"></div>
                  <div className="corner bottom-left"></div>
                  <div className="corner bottom-right"></div>
                </div>
                <div className="scanning-line"></div>
              </div>
              <p className="scanning-text"><Icon name="search" size={16} /> Looking for a QR code...</p>
              <button className="stop-scan-button" onClick={stopScanning}>
                <Icon name="x" size={16} /> Stop Scanner
              </button>
            </div>
          )}

          {error && (
            <div className="scanner-error">
              <p><Icon name="x" size={16} /> {error}</p>
              <button className="retry-button" onClick={startScanning}>
                <Icon name="arrowLeft" size={16} /> Try Again
              </button>
            </div>
          )}

          {/* Results */}
          {renderScannedResult()}
        </div>

        {scannedData && (
          <div className="scanner-actions">
            <button className="reset-button" onClick={resetScanner}>
              <Icon name="qrcode" size={16} /> Scan Again
            </button>
          </div>
        )}

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3><Icon name="award" size={18} /> Quick Actions</h3>
          <div className="actions-grid">
            <button className="quick-action-button" onClick={() => simulateQRScan()}>
              <Icon name="calendar" size={16} /> Simulate Check-In
            </button>
            <button className="quick-action-button" onClick={() => navigate('/schedule')}>
              <Icon name="calendar" size={16} /> View Schedule
            </button>
            <button className="quick-action-button" onClick={() => navigate('/speakers')}>
              <Icon name="users" size={16} /> Speakers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QRScanner;
