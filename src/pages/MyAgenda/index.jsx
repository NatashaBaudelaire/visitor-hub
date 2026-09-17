import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import './styles.css';

function MyAgenda() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const myEvents = {
    upcoming: [
      {
        id: 1,
        title: "The Future of AI in the Corporate World",
        date: "2025-03-15",
        time: "09:30 - 10:30",
        location: "Main Auditorium",
        speaker: "Élodie Martin",
        status: "confirmed",
        description: "How artificial intelligence is transforming business and creating new growth opportunities.",
        attendees: 250,
        materials: true
      },
      {
        id: 2,
        title: "Advanced Analytics: From Theory to Practice",
        date: "2025-03-15",
        time: "11:00 - 12:00",
        location: "Main Auditorium",
        speaker: "Klára Novák",
        status: "confirmed",
        description: "Advanced data analysis techniques to transform information into actionable insights.",
        attendees: 180,
        materials: false
      },
      {
        id: 3,
        title: "Blockchain for a Sustainable Future",
        date: "2025-03-15",
        time: "14:30 - 15:30",
        location: "Innovation Room",
        speaker: "Matteo Ricci",
        status: "waitlist",
        description: "How blockchain technology can accelerate corporate sustainability initiatives.",
        attendees: 120,
        materials: true
      },
      {
        id: 4,
        title: "DevOps in the Cloud Era",
        date: "2025-03-16",
        time: "09:00 - 10:00",
        location: "Technical Room",
        speaker: "Henrik Larsson",
        status: "confirmed",
        description: "Best practices for implementing DevOps in hybrid cloud and container environments.",
        attendees: 150,
        materials: true
      }
    ],
    past: [
      {
        id: 5,
        title: "AI Applied to Business",
        date: "2025-02-20",
        time: "09:30 - 11:00",
        location: "Main Auditorium",
        speaker: "Élodie Martin",
        status: "attended",
        description: "Workshop on the practical implementation of AI in business processes.",
        attendees: 200,
        certificate: true,
        rating: 5
      },
      {
        id: 6,
        title: "Data Analysis with Python",
        date: "2025-02-15",
        time: "14:00 - 16:00",
        location: "Lab Tech",
        speaker: "Klára Novák",
        status: "attended",
        description: "Practical data analysis course using Python and specialized libraries.",
        attendees: 80,
        certificate: true,
        rating: 4
      }
    ]
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return 'check';
      case 'waitlist': return 'clock';
      case 'attended': return 'award';
      case 'cancelled': return 'x';
      default: return 'calendar';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Confirmed';
      case 'waitlist': return 'Waitlist';
      case 'attended': return 'Attended';
      case 'cancelled': return 'Cancelled';
      default: return 'Scheduled';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#10B981';
      case 'waitlist': return '#F59E0B';
      case 'attended': return '#6366F1';
      case 'cancelled': return '#EF4444';
      default: return '#8B5CF6';
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDaysUntil = (dateStr) => {
    const eventDate = new Date(dateStr);
    const today = new Date();
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays > 0) return `In ${diffDays} days`;
    return 'Past';
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const handleCancelEvent = () => {
    alert('Event cancelled. You will receive an email confirmation.');
    closeModal();
  };

  const handleDownloadCertificate = () => {
    alert('Certificate downloaded successfully.');
  };

  return (
    <div className="my-agenda-page">
      {/* Header */}
      <header className="agenda-header">
        <button 
          onClick={() => navigate(-1)}
          className="back-button"
          aria-label="Go back"
        >
          <Icon name="arrowLeft" size={20} />
        </button>
        <h1 className="page-title">My Agenda</h1>
        <div className="header-decoration"></div>
      </header>

      {/* Content */}
      <div className="agenda-content">
        {/* Stats Cards */}
        <div className="agenda-stats">
          <div className="stat-card">
            <div className="stat-icon"><Icon name="calendar" size={24} /></div>
            <div className="stat-info">
              <div className="stat-number">{myEvents.upcoming.length}</div>
              <div className="stat-label">Upcoming events</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><Icon name="award" size={24} /></div>
            <div className="stat-info">
              <div className="stat-number">{myEvents.past.length}</div>
              <div className="stat-label">Attendances</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><Icon name="award" size={24} /></div>
            <div className="stat-info">
              <div className="stat-number">
                {myEvents.past.filter(e => e.certificate).length}
              </div>
              <div className="stat-label">Certificates</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="agenda-tabs">
          <button 
            className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            <Icon name="calendar" size={16} /> Upcoming ({myEvents.upcoming.length})
          </button>
          <button 
            className={`tab-button ${activeTab === 'past' ? 'active' : ''}`}
            onClick={() => setActiveTab('past')}
          >
            <Icon name="list" size={16} /> History ({myEvents.past.length})
          </button>
        </div>

        {/* Events List */}
        <div className="events-list">
          {myEvents[activeTab].map(event => (
            <div 
              key={event.id} 
              className="event-card"
              onClick={() => handleEventClick(event)}
            >
              <div className="event-header">
                <div className="event-date">
                  <div className="date-main">{formatDate(event.date)}</div>
                  {activeTab === 'upcoming' && (
                    <div className="date-countdown">{getDaysUntil(event.date)}</div>
                  )}
                </div>
                <div 
                  className="event-status" 
                  style={{ backgroundColor: getStatusColor(event.status) }}
                >
                  <Icon name={getStatusIcon(event.status)} size={14} /> {getStatusText(event.status)}
                </div>
              </div>

              <div className="event-content">
                <h3 className="event-title">{event.title}</h3>
                <div className="event-details">
                  <p className="event-speaker"><Icon name="user" size={14} /> {event.speaker}</p>
                  <p className="event-time"><Icon name="clock" size={14} /> {event.time}</p>
                  <p className="event-location"><Icon name="mapPin" size={14} /> {event.location}</p>
                </div>
                <p className="event-description">{event.description}</p>
                
                <div className="event-footer">
                  <div className="event-meta">
                    <span className="attendees-count">
                      <Icon name="users" size={14} /> {event.attendees} attendees
                    </span>
                    {event.materials && (
                      <span className="materials-badge"><Icon name="paperclip" size={14} /> Materials</span>
                    )}
                    {event.certificate && (
                      <span className="certificate-badge"><Icon name="award" size={14} /> Certificate</span>
                    )}
                  </div>
                  {event.rating && (
                    <div className="event-rating">
                      <Icon name="star" size={14} /> {event.rating}/5
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {myEvents[activeTab].length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">
              <Icon name={activeTab === 'upcoming' ? 'calendar' : 'list'} size={32} />
            </div>
            <h3 className="empty-title">
              {activeTab === 'upcoming' ? 'No scheduled events' : 'No history available'}
            </h3>
            <p className="empty-description">
              {activeTab === 'upcoming' 
                ? 'Explore the schedule and register for events that interest you.' 
                : 'Attend events to view your history.'}
            </p>
            <button 
              className="empty-action-button"
              onClick={() => navigate('/schedule')}
            >
              {activeTab === 'upcoming' ? <><Icon name="calendar" size={16} /> View schedule</> : <><Icon name="search" size={16} /> Explore events</>}
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedEvent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} aria-label="Close"><Icon name="x" size={20} /></button>
            
            <div className="modal-header">
              <div className="modal-date">
                <div className="modal-date-main">{formatDate(selectedEvent.date)}</div>
                <div className="modal-time">{selectedEvent.time}</div>
              </div>
              <div 
                className="modal-status" 
                style={{ backgroundColor: getStatusColor(selectedEvent.status) }}
              >
                <Icon name={getStatusIcon(selectedEvent.status)} size={14} /> {getStatusText(selectedEvent.status)}
              </div>
            </div>

            <div className="modal-body">
              <h2 className="modal-title">{selectedEvent.title}</h2>
              
              <div className="modal-section">
                <h3><Icon name="user" size={18} /> Speaker</h3>
                <p>{selectedEvent.speaker}</p>
              </div>

              <div className="modal-section">
                <h3><Icon name="mapPin" size={18} /> Location and time</h3>
                <p><Icon name="calendar" size={14} /> {formatDate(selectedEvent.date)}</p>
                <p><Icon name="clock" size={14} /> {selectedEvent.time}</p>
                <p><Icon name="mapPin" size={14} /> {selectedEvent.location}</p>
              </div>

              <div className="modal-section">
                <h3><Icon name="list" size={18} /> Description</h3>
                <p>{selectedEvent.description}</p>
              </div>

              <div className="modal-section">
                <h3><Icon name="chart" size={18} /> Information</h3>
                <div className="modal-info-grid">
                  <div className="info-item">
                    <span className="info-label"><Icon name="users" size={14} /> Attendees:</span>
                    <span className="info-value">{selectedEvent.attendees}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label"><Icon name="paperclip" size={14} /> Materials:</span>
                    <span className="info-value">{selectedEvent.materials ? 'Available' : 'Not available'}</span>
                  </div>
                  {selectedEvent.certificate && (
                    <div className="info-item">
                      <span className="info-label"><Icon name="award" size={14} /> Certificate:</span>
                      <span className="info-value">Available</span>
                    </div>
                  )}
                  {selectedEvent.rating && (
                    <div className="info-item">
                      <span className="info-label"><Icon name="star" size={14} /> Rating:</span>
                      <span className="info-value"><Icon name="star" size={14} /> {selectedEvent.rating}/5</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              {activeTab === 'upcoming' ? (
                <>
                  <button 
                    className="modal-button secondary"
                    onClick={() => handleCancelEvent(selectedEvent.id)}
                  >
                    <Icon name="x" size={16} /> Cancel registration
                  </button>
                  <button 
                    className="modal-button primary"
                    onClick={() => alert('Added to calendar!')}
                  >
                    <Icon name="calendar" size={16} /> Add to calendar
                  </button>
                </>
              ) : (
                <>
                  {selectedEvent.certificate && (
                    <button 
                      className="modal-button primary"
                      onClick={() => handleDownloadCertificate(selectedEvent.id)}
                    >
                      <Icon name="award" size={16} /> Download certificate
                    </button>
                  )}
                  <button 
                    className="modal-button secondary"
                    onClick={() => alert('Thank you for your feedback!')}
                  >
                    <Icon name="star" size={16} /> Rate event
                  </button>
                </>
              )}
              <button 
                className="modal-button"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyAgenda;
