import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import './styles.css';

function Speakers() {
  const navigate = useNavigate();
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  const speakersData = [
    {
      id: 1,
      name: "Élodie Martin",
      role: "Chief Technology Officer",
      company: "TechCorp Europe",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b97c?w=150&h=150&fit=crop&crop=face",
      bio: "Digital transformation specialist with more than 15 years of technology leadership experience.",
      experience: "More than 15 years in technology",
      education: "PhD in Computer Science — École Polytechnique",
      presentation: "The Future of AI in the Corporate World",
      schedule: "15/03 — 9:30 AM to 10:30 AM",
      location: "Main Auditorium",
      description: "How artificial intelligence is transforming business and creating new growth opportunities.",
      topics: ["Artificial Intelligence", "Machine Learning", "Digital Transformation"],
      email: "ana.silva@techcorp.com.br",
      linkedin: "linkedin.com/in/anasilva"
    },
    {
      id: 2,
      name: "Klára Novák",
      role: "Senior Data Scientist",
      company: "DataTech Solutions",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      bio: "Data analytics and machine learning specialist focused on enterprise solutions.",
      experience: "More than 12 years in data science",
      education: "Master's Degree in Statistics — Charles University",
      presentation: "Advanced Analytics: From Theory to Practice",
      schedule: "15/03 — 11:00 AM to 12:00 PM",
      location: "Main Auditorium",
      description: "Advanced data analysis techniques for transforming information into actionable insights.",
      topics: ["Data Science", "Big Data", "Analytics", "Python"],
      email: "maria.santos@datatech.com",
      linkedin: "linkedin.com/in/mariasantos"
    },
    {
      id: 3,
      name: "Matteo Ricci",
      role: "Blockchain Architect",
      company: "CryptoInnovate",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      bio: "Blockchain architect focused on sustainable solutions and green technology innovation.",
      experience: "More than 10 years in blockchain",
      education: "Software Engineering — Politecnico di Milano",
      presentation: "Blockchain for a Sustainable Future",
      schedule: "15/03 — 2:30 PM to 3:30 PM",
      location: "Innovation Room",
      description: "How blockchain technology can accelerate corporate sustainability initiatives.",
      topics: ["Blockchain", "Sustainability", "Cryptocurrency", "DeFi"],
      email: "carlos.mendes@cryptoinnovate.com",
      linkedin: "linkedin.com/in/carlosmendes"
    },
    {
      id: 4,
      name: "Henrik Larsson",
      role: "DevOps Engineer",
      company: "CloudFirst",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      bio: "DevOps and cloud architecture specialist focused on automation and operational efficiency.",
      experience: "More than 8 years in DevOps",
      education: "Information Systems — KTH Royal Institute of Technology",
      presentation: "DevOps in the Cloud Era",
      schedule: "16/03 — 9:00 AM to 10:00 AM",
      location: "Technical Room",
      description: "Best practices for implementing DevOps in hybrid cloud and container environments.",
      topics: ["DevOps", "Cloud", "Docker", "Kubernetes"],
      email: "joao.oliveira@cloudfirst.com",
      linkedin: "linkedin.com/in/joaooliveira"
    }
  ];

  const openModal = (speaker) => {
    setSelectedSpeaker(speaker);
  };

  const closeModal = () => {
    setSelectedSpeaker(null);
  };

  const handleScheduleMeeting = (speaker) => {
    alert(`Meeting scheduled with ${speaker.name}. You will receive the details by email.`);
    closeModal();
  };

  return (
    <div className="speakers-page">
      <header className="speakers-header">
        <button 
          onClick={() => navigate(-1)}
          className="back-button"
          aria-label="Go back"
        >
          <Icon name="arrowLeft" size={20} />
        </button>
        <h1 className="page-title">Speakers</h1>
        <div className="header-decoration">
          <Icon name="users" size={24} />
        </div>
      </header>

      <div className="speakers-content">
        <div className="speakers-intro">
          <h2>Meet Our Experts</h2>
          <p>Experienced professionals who will share relevant knowledge and insights.</p>
        </div>

        <div className="speakers-grid">
          {speakersData.map(speaker => (
            <div key={speaker.id} className="speaker-card">
              <div className="speaker-avatar">
                <img 
                  src={speaker.avatar} 
                  alt={speaker.name}
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${speaker.name}&background=8B5CF6&color=fff&size=80`;
                  }}
                />
                <div className="speaker-status"></div>
              </div>
              
              <div className="speaker-info">
                <h3 className="speaker-name">{speaker.name}</h3>
                <p className="speaker-role">{speaker.role}</p>
                <p className="speaker-company">{speaker.company}</p>
                <p className="speaker-bio">{speaker.bio}</p>
                
                <div className="presentation-info">
                  <h4 className="presentation-title">
                    <Icon name="paperclip" size={16} /> {speaker.presentation}
                  </h4>
                  <p className="presentation-schedule">
                    <Icon name="clock" size={14} /> {speaker.schedule}
                  </p>
                </div>
                
                <div className="speaker-topics">
                  {speaker.topics.map(topic => (
                    <span key={topic} className="topic-tag">
                      {topic}
                    </span>
                  ))}
                </div>
                
                <button 
                  className="contact-button"
                  onClick={() => openModal(speaker)}
                >
                  <Icon name="user" size={16} />
                  <span className="button-text">View Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedSpeaker && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} aria-label="Close">
              <Icon name="x" size={24} />
            </button>
            
            <div className="modal-header">
              <img 
                src={selectedSpeaker.avatar} 
                alt={selectedSpeaker.name}
                className="modal-avatar"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${selectedSpeaker.name}&background=8B5CF6&color=fff&size=80`;
                }}
              />
              <div>
                <h2 className="modal-name">{selectedSpeaker.name}</h2>
                <p className="modal-role">{selectedSpeaker.role} | {selectedSpeaker.company}</p>
              </div>
            </div>

            <div className="modal-body">
              <div className="modal-section">
                <h3><Icon name="user" size={18} /> About the Speaker</h3>
                <p>{selectedSpeaker.bio}</p>
                <div className="modal-details">
                  <p><strong>Experience:</strong> {selectedSpeaker.experience}</p>
                  <p><strong>Education:</strong> {selectedSpeaker.education}</p>
                </div>
              </div>

              <div className="modal-section">
                <h3><Icon name="users" size={18} /> Presentation</h3>
                <div className="presentation-card">
                  <h4>{selectedSpeaker.presentation}</h4>
                  <p className="presentation-details">
                    <Icon name="calendar" size={14} /> {selectedSpeaker.schedule}<br/>
                    <Icon name="mapPin" size={14} /> {selectedSpeaker.location}
                  </p>
                  <p>{selectedSpeaker.description}</p>
                </div>
              </div>

              <div className="modal-section">
                <h3><Icon name="tag" size={18} /> Specialties</h3>
                <div className="modal-topics">
                  {selectedSpeaker.topics.map(topic => (
                    <span key={topic} className="modal-topic-tag">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="modal-section">
                <h3><Icon name="mail" size={18} /> Contact</h3>
                <div className="contact-info">
                  <p><Icon name="mail" size={14} /> {selectedSpeaker.email}</p>
                  <p><Icon name="linkedin" size={14} /> {selectedSpeaker.linkedin}</p>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="schedule-button"
                onClick={() => handleScheduleMeeting(selectedSpeaker)}
              >
                <Icon name="calendar" size={18} /> Schedule Meeting
              </button>
              <button className="close-button" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Speakers;
