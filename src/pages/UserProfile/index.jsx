import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/user-context';
import Icon from '../../components/Icon';
import './styles.css';

function UserProfile() {
const navigate = useNavigate();
  const { userData, updateUserData } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  
  // Participant data using the logged-in user's details.
  const [participantData, setParticipantData] = useState({
    name: userData?.name || 'User',
    email: userData?.email || 'user@email.com',
    employeeId: userData?.employeeId || 'VIS-' + Math.floor(Math.random() * 9999).toString().padStart(4, '0'),
    department: userData?.department || 'Visitor',
    location: 'Brussels, Belgium',
    phone: userData?.phone || '+32 4** ** ** **',
    registrationDate: userData?.registrationDate || '2024-06-01',
    badge: 'Visitor',
    interests: userData?.interests || ['AI', 'Cloud Computing', 'DevOps'],
    qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(JSON.stringify({
      name: userData?.name || 'User',
      id: userData?.employeeId || 'VIS-' + Math.floor(Math.random() * 9999).toString().padStart(4, '0'),
      event: 'Tech Conference 2024',
      location: 'Brussels, Belgium',
      email: userData?.email || 'user@email.com'
    }))}`
  });

  const [editedData, setEditedData] = useState(participantData);
  const [activeTab, setActiveTab] = useState('badge');

  const eventSchedule = [
    {
      id: 1,
      time: '09:30 - 10:30',
      title: 'The Future of AI in the Corporate World',
      speaker: 'Élodie Martin',
      location: 'Main Auditorium',
      status: 'confirmed'
    },
    {
      id: 2,
      time: '11:00 - 12:00',
      title: 'Advanced Analytics: From Theory to Practice',
      location: 'Main Auditorium',
      speaker: 'Klára Novák',
      status: 'confirmed'
    },
    {
      id: 3,
      time: '14:30 - 15:30',
      title: 'Blockchain for a Sustainable Future',
      speaker: 'Matteo Ricci',
      location: 'Innovation Room',
      status: 'waitlist'
    }
  ];

  const networkingContacts = [
    {
      id: 1,
      name: 'Klára Novák',
      role: 'Senior Data Scientist',
      company: 'DataTech Solutions',
      connectedAt: '2024-06-15 10:30'
    },
    {
      id: 2,
      name: 'Matteo Ricci',
      role: 'Blockchain Architect',
      company: 'CryptoInnovate',
      connectedAt: '2024-06-15 14:45'
    }
  ];

  const handleInputChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

const saveProfile = () => {
    setParticipantData(editedData);
    updateUserData(editedData);
    setIsEditing(false);
    alert('Profile updated successfully.');
  };

  const cancelEdit = () => {
    setEditedData(participantData);
    setIsEditing(false);
  };

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.href = participantData.qrCode;
    link.download = `qr-code-${participantData.employeeId}.png`;
    link.click();
  };

  const shareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Profile — Tech Conference 2024',
        text: `${participantData.name} - ${participantData.badge}`,
        url: window.location.href
      });
    } else {
      alert('Profile copied to the clipboard.');
    }
  };

const logout = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      updateUserData({ name: '', email: '' });
      navigate('/');
    }
  };

  return (
    <div className="profile-page">
      {/* Header */}
      <header className="profile-header">
        <button 
          onClick={() => navigate(-1)}
          className="back-button"
          aria-label="Go back"
        >
          <Icon name="arrowLeft" size={20} />
        </button>
        <h1 className="page-title">My Digital Badge</h1>
        <button 
          className="edit-button"
          onClick={() => setIsEditing(!isEditing)}
          aria-label={isEditing ? 'Cancel editing' : 'Edit profile'}
        >
          <Icon name={isEditing ? 'x' : 'edit'} size={18} />
        </button>
      </header>

      {/* Profile Content */}
      <div className="profile-content">
        
        {/* Digital Badge Card */}
        <div className="badge-card">
          <div className="badge-header">
            <div className="event-info">
              <h2><Icon name="calendar" size={18} /> Tech Conference 2024</h2>
              <p>15–16 June • Brussels</p>
            </div>
            <div className="accenture-logo">
              <span>ACCENTURE</span>
            </div>
          </div>

          <div className="participant-info">
            <div className="participant-main">
              <div className="participant-avatar-placeholder">
                <div className="avatar-icon"><Icon name="user" size={24} /></div>
              </div>
              
              <div className="participant-details">
                {isEditing ? (
                  <div className="edit-participant">
                    <input
                      type="text"
                      value={editedData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="edit-input name-input"
                      placeholder="Your name"
                    />
                    <input
                      type="text"
                      value={editedData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      className="edit-input dept-input"
                      placeholder="Department"
                    />
                  </div>
                ) : (
                  <>
                    <h3 className="participant-name">{participantData.name}</h3>
                    <p className="participant-id">{participantData.employeeId}</p>
                    <p className="participant-dept">{participantData.department}</p>
                    <div className="participant-badge">
                      <span className="badge-type">{participantData.badge}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="qr-section">
              <div className="qr-code">
                <img 
                  src={participantData.qrCode} 
                  alt="Participant QR code"
                  className="qr-image"
                />
              </div>
              <div className="qr-actions">
                <button className="qr-button" onClick={downloadQRCode}>
                  <Icon name="download" size={16} /> Download
                </button>
                <button className="qr-button" onClick={shareProfile}>
                  <Icon name="share" size={16} /> Share
                </button>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="edit-actions">
              <button className="save-button" onClick={saveProfile}>
                <Icon name="check" size={16} /> Save
              </button>
              <button className="cancel-button" onClick={cancelEdit}>
                <Icon name="x" size={16} /> Cancel
              </button>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <button 
            className={`tab-button ${activeTab === 'badge' ? 'active' : ''}`}
            onClick={() => setActiveTab('badge')}
          >
            <Icon name="award" size={16} /> Badge
          </button>
          <button 
            className={`tab-button ${activeTab === 'schedule' ? 'active' : ''}`}
            onClick={() => setActiveTab('schedule')}
          >
            <Icon name="calendar" size={16} /> My Agenda
          </button>
          <button 
            className={`tab-button ${activeTab === 'contacts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacts')}
          >
            <Icon name="users" size={16} /> Contacts
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'badge' && (
            <div className="badge-tab">
              <div className="info-card">
                <h3><Icon name="list" size={18} /> Participant Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label"><Icon name="mail" size={14} /> E-mail:</span>
                    <span className="info-value">{participantData.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label"><Icon name="phone" size={14} /> Phone:</span>
                    <span className="info-value">{participantData.phone}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label"><Icon name="mapPin" size={14} /> Location:</span>
                    <span className="info-value">{participantData.location}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label"><Icon name="calendar" size={14} /> Registration:</span>
                    <span className="info-value">{new Date(participantData.registrationDate).toLocaleDateString('en-GB')}</span>
                  </div>
                </div>
              </div>

              <div className="interests-card">
                <h3><Icon name="tag" size={18} /> Interests</h3>
                <div className="interests-display">
                  {participantData.interests.map(interest => (
                    <span key={interest} className="interest-tag">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="schedule-tab">
              <h3><Icon name="calendar" size={18} /> My Personalized Agenda</h3>
              <div className="schedule-list">
                {eventSchedule.map(session => (
                  <div key={session.id} className="schedule-item">
                    <div className="schedule-time">
                      <span className="time-badge">{session.time}</span>
                    </div>
                    <div className="schedule-content">
                      <h4>{session.title}</h4>
                      <p><strong><Icon name="user" size={14} /> Speaker:</strong> {session.speaker}</p>
                      <p><strong><Icon name="mapPin" size={14} /> Location:</strong> {session.location}</p>
                      <div className={`status-badge ${session.status}`}>
                        <Icon name={session.status === 'confirmed' ? 'check' : 'clock'} size={14} /> {session.status === 'confirmed' ? 'Confirmed' : 'Waitlist'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="contacts-tab">
              <h3><Icon name="users" size={18} /> Connections Made</h3>
              <div className="contacts-list">
                {networkingContacts.map(contact => (
                  <div key={contact.id} className="contact-item">
                    <div className="contact-avatar">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${contact.name}&background=8B5CF6&color=fff&size=50`}
                        alt={contact.name}
                      />
                    </div>
                    <div className="contact-info">
                      <h4>{contact.name}</h4>
                      <p>{contact.role} - {contact.company}</p>
                      <span className="connected-date">
                        Connected on: {new Date(contact.connectedAt).toLocaleString('en-GB')}
                      </span>
                    </div>
                    <button className="contact-button">
                      <Icon name="messageCircle" size={16} /> Message
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="profile-actions">
          <button className="action-button settings">
            <Icon name="settings" size={16} /> Settings
          </button>
          <button className="action-button help">
            <Icon name="help" size={16} /> Support
          </button>
          <button className="action-button logout" onClick={logout}>
            <Icon name="logout" size={16} /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
