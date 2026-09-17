import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import './styles.css';

function Schedule() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState('day1');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const scheduleData = {
    day1: [
      {
        id: 1,
        time: "09:30 - 10:30",
        title: "The Future of AI in the Corporate World",
        speaker: "Élodie Martin",
        location: "Main Auditorium",
        description: "How artificial intelligence is transforming business and creating new growth opportunities.",
        category: "AI",
        level: "Intermediate",
        attendees: 250,
        registered: false
      },
      {
        id: 2,
        time: "11:00 - 12:00",
        title: "Advanced Analytics: From Theory to Practice",
        speaker: "Klára Novák",
        location: "Main Auditorium",
        description: "Advanced data analysis techniques for transforming information into actionable insights.",
        category: "Data Science",
        level: "Advanced",
        attendees: 180,
        registered: true
      },
      {
        id: 3,
        time: "14:30 - 15:30",
        title: "Blockchain for a Sustainable Future",
        speaker: "Matteo Ricci",
        location: "Innovation Room",
        description: "How blockchain technology can accelerate corporate sustainability initiatives.",
        category: "Blockchain",
        level: "Beginner",
        attendees: 120,
        registered: true
      }
    ],
    day2: [
      {
        id: 4,
        time: "09:00 - 10:00",
        title: "DevOps in the Cloud Era",
        speaker: "Henrik Larsson",
        location: "Technical Room",
        description: "Best practices for implementing DevOps in hybrid cloud and container environments.",
        category: "DevOps",
        level: "Intermediate",
        attendees: 150,
        registered: false
      }
    ]
  };

  const getCategoryColor = (category) => {
    const colors = {
      'AI': '#8B5CF6',
      'Data Science': '#06B6D4',
      'Blockchain': '#10B981',
      'DevOps': '#F59E0B'
    };
    return colors[category] || '#6B7280';
  };

  const getLevelColor = (level) => {
    const colors = {
      'Beginner': '#10B981',
      'Intermediate': '#F59E0B',
      'Advanced': '#EF4444'
    };
    return colors[level] || '#6B7280';
  };

  const handleRegister = () => {
    alert('Registration completed successfully. You will receive an email confirmation.');
  };

  const handleUnregister = () => {
    alert('Registration cancelled. You may register again at any time.');
  };

  const openModal = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="schedule-page">
      {/* Header */}
      <header className="schedule-header">
        <button 
          onClick={() => navigate(-1)}
          className="back-button"
          aria-label="Go back"
        >
          <Icon name="arrowLeft" size={20} />
        </button>
        <h1 className="page-title">Schedule</h1>
        <div className="header-decoration"></div>
      </header>

      {/* Content */}
      <div className="schedule-content">
        <div className="schedule-intro">
          <h2><Icon name="calendar" size={22} /> Event Schedule</h2>
          <p>Review the complete schedule and do not miss any important presentations.</p>
        </div>

        {/* Day Tabs */}
        <div className="day-tabs">
          <button 
            className={`day-tab ${selectedDay === 'day1' ? 'active' : ''}`}
            onClick={() => setSelectedDay('day1')}
          >
            <Icon name="calendar" size={16} /> Day 1 — 15/03
          </button>
          <button 
            className={`day-tab ${selectedDay === 'day2' ? 'active' : ''}`}
            onClick={() => setSelectedDay('day2')}
          >
            <Icon name="calendar" size={16} /> Day 2 — 16/03
          </button>
        </div>

        {/* Schedule Timeline */}
        <div className="schedule-timeline">
          {scheduleData[selectedDay].map(event => (
            <div key={event.id} className="timeline-item">
              <div className="timeline-time">
                <div className="time-badge">{event.time}</div>
              </div>
              
              <div className="timeline-content">
                <div className="event-card-schedule">
                  <div className="event-header-schedule">
                    <div className="event-badges">
                      <span 
                        className="category-badge"
                        style={{ backgroundColor: getCategoryColor(event.category) }}
                      >
                        {event.category}
                      </span>
                      <span 
                        className="level-badge"
                        style={{ backgroundColor: getLevelColor(event.level) }}
                      >
                        {event.level}
                      </span>
                    </div>
                    {event.registered && (
                      <div className="registered-badge">
                        <Icon name="check" size={14} /> Registered
                      </div>
                    )}
                  </div>

                  <h3 className="event-title-schedule">{event.title}</h3>
                  
                  <div className="event-details-schedule">
                    <p className="event-speaker"><Icon name="user" size={14} /> {event.speaker}</p>
                    <p className="event-location"><Icon name="mapPin" size={14} /> {event.location}</p>
                    <p className="event-attendees"><Icon name="users" size={14} /> {event.attendees} attendees</p>
                  </div>

                  <p className="event-description-schedule">{event.description}</p>

                  <div className="event-actions">
                    <button 
                      className="details-button"
                      onClick={() => openModal(event)}
                    >
                      <Icon name="help" size={14} /> View details
                    </button>
                    {event.registered ? (
                      <button 
                        className="unregister-button"
                        onClick={() => handleUnregister(event.id)}
                      >
                        <Icon name="x" size={14} /> Cancel registration
                      </button>
                    ) : (
                      <button
                      className="register-button"
                       onClick={() => handleRegister(event.id)}
                     >
                       <Icon name="check" size={14} /> Register
                     </button>
                   )}
                 </div>
               </div>
             </div>
           </div>
         ))}
       </div>
     </div>

     {/* Modal */}
     {selectedEvent && (
       <div className="modal-overlay" onClick={closeModal}>
         <div className="modal-content" onClick={(e) => e.stopPropagation()}>
           <button className="modal-close" onClick={closeModal} aria-label="Close"><Icon name="x" size={20} /></button>
           
           <div className="modal-header">
             <div className="modal-badges">
               <span 
                 className="modal-category-badge"
                 style={{ backgroundColor: getCategoryColor(selectedEvent.category) }}
               >
                 {selectedEvent.category}
               </span>
               <span 
                 className="modal-level-badge"
                 style={{ backgroundColor: getLevelColor(selectedEvent.level) }}
               >
                 {selectedEvent.level}
               </span>
             </div>
             {selectedEvent.registered && (
               <div className="modal-registered-badge">
                 <Icon name="check" size={14} /> You are registered
               </div>
             )}
           </div>

           <div className="modal-body">
             <h2 className="modal-title">{selectedEvent.title}</h2>
             
             <div className="modal-section">
               <h3><Icon name="clock" size={18} /> Time and Location</h3>
               <p><Icon name="calendar" size={14} /> {selectedDay === 'day1' ? 'March 15' : 'March 16'}</p>
               <p><Icon name="clock" size={14} /> {selectedEvent.time}</p>
               <p><Icon name="mapPin" size={14} /> {selectedEvent.location}</p>
             </div>

             <div className="modal-section">
               <h3><Icon name="user" size={18} /> Speaker</h3>
               <p>{selectedEvent.speaker}</p>
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
                   <span className="info-label"><Icon name="tag" size={14} /> Level:</span>
                   <span className="info-value">{selectedEvent.level}</span>
                 </div>
                 <div className="info-item">
                   <span className="info-label"><Icon name="tag" size={14} /> Category:</span>
                   <span className="info-value">{selectedEvent.category}</span>
                 </div>
               </div>
             </div>
           </div>

           <div className="modal-footer">
             {selectedEvent.registered ? (
               <button 
                 className="modal-button secondary"
                 onClick={() => {
                   handleUnregister(selectedEvent.id);
                   closeModal();
                 }}
               >
                 <Icon name="x" size={16} /> Cancel registration
               </button>
             ) : (
               <button 
                 className="modal-button primary"
                 onClick={() => {
                   handleRegister(selectedEvent.id);
                   closeModal();
                 }}
               >
                 <Icon name="check" size={16} /> Register
               </button>
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

export default Schedule;
