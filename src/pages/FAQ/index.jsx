import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import './styles.css';

function FAQ() {
  const navigate = useNavigate();
  const [openItems, setOpenItems] = useState(new Set());
  const [activeCategory, setActiveCategory] = useState('all');

  const faqData = [
    {
      id: 1,
      category: "events",
      categoryName: "Events",
      icon: "calendar",
      question: "How can I find available events?",
      answer: "The home page lists all Accenture events scheduled for 2025. Use the date, location, or category filters to find events of interest."
    },
    {
      id: 2,
      category: "events",
      categoryName: "Events",
      icon: "calendar",
      question: "Are events free?",
      answer: "Most Accenture events are free for participants. Premium events may have a registration fee, which will be clearly identified in the event description."
    },
    {
      id: 3,
      category: "events",
      categoryName: "Events",
      icon: "calendar",
      question: "Can I attend events in other cities?",
      answer: "Yes. We offer in-person events in multiple cities and online events that can be accessed from any location. Review each event description for its delivery format."
    },
    {
      id: 4,
      category: "events",
      categoryName: "Events",
      icon: "calendar",
      question: "How will I receive updates about new events?",
      answer: "Enable push notifications and configure your interests. You will receive alerts about new events related to your preferred topics."
    },
    {
      id: 5,
      category: "app",
      categoryName: "Platform",
      icon: "qrcode",
      question: "How do I register for events?",
      answer: "Select the desired event, choose Register, provide the requested information, and confirm the registration. You will receive a confirmation email with the event details."
    },
    {
      id: 6,
      category: "app",
      categoryName: "Platform",
      icon: "qrcode",
      question: "What is the QR code scanner used for?",
      answer: "The QR code scanner supports event check-in, contact exchange with other participants, access to exclusive materials, and attendance validation for certificate issuance."
    },
    {
      id: 7,
      category: "app",
      categoryName: "Platform",
      icon: "qrcode",
      question: "How do I access the event schedule?",
      answer: "The Schedule section contains the complete agenda for your registered events, including times, speakers, and detailed activity descriptions."
    },
    {
      id: 8,
      category: "app",
      categoryName: "Platform",
      icon: "qrcode",
      question: "Can I cancel my registration?",
      answer: "Yes. You can cancel a registration up to 24 hours before the event. Open My Events in your profile and select Cancel Registration."
    },
    {
      id: 9,
      category: "networking",
      categoryName: "Networking",
      icon: "users",
      question: "How does networking work at events?",
      answer: "Use your profile QR code to exchange contact information quickly. The platform also recommends participants with similar interests and supports connections through internal chat."
    },
    {
      id: 10,
      category: "networking",
      categoryName: "Networking",
      icon: "users",
      question: "Is my data protected during networking?",
      answer: "Yes. You control which information you share. Only the data you authorize is visible to other participants."
    },
    {
      id: 11,
      category: "certificates",
      categoryName: "Certificates",
      icon: "award",
      question: "How do I receive participation certificates?",
      answer: "Certificates are generated automatically after QR-code attendance confirmation. They will be available in My Profile within 48 hours after the event."
    },
    {
      id: 12,
      category: "certificates",
      categoryName: "Certificates",
      icon: "award",
      question: "Are certificates valid for supplementary academic hours?",
      answer: "Yes. All Accenture certificates are valid for supplementary academic hours and professional development, with the applicable duration specified for each event."
    },
    {
      id: 13,
      category: "account",
      categoryName: "My Account",
      icon: "user",
      question: "How do I update my personal information?",
      answer: "Open My Profile, select Edit, and update your information. Remember to save your changes before leaving the page."
    },
    {
      id: 14,
      category: "account",
      categoryName: "My Account",
      icon: "user",
      question: "I forgot my password. How can I recover it?",
      answer: "On the sign-in page, select Forgot Password, enter your email address, and follow the instructions to reset your access password."
    },
    {
      id: 15,
      category: "account",
      categoryName: "My Account",
      icon: "user",
      question: "How do I delete my account?",
      answer: "Contact our support team using the Contact button in this section. For security reasons, account deletion must be confirmed by email."
    }
  ];

  const categories = [
    { id: 'all', name: 'All', icon: 'list', count: faqData.length },
    { id: 'events', name: 'Events', icon: 'calendar', count: faqData.filter(item => item.category === 'events').length },
    { id: 'app', name: 'Platform', icon: 'qrcode', count: faqData.filter(item => item.category === 'app').length },
    { id: 'networking', name: 'Networking', icon: 'users', count: faqData.filter(item => item.category === 'networking').length },
    { id: 'certificates', name: 'Certificates', icon: 'award', count: faqData.filter(item => item.category === 'certificates').length },
    { id: 'account', name: 'My Account', icon: 'user', count: faqData.filter(item => item.category === 'account').length }
  ];

  const filteredFAQ = activeCategory === 'all' 
    ? faqData 
    : faqData.filter(item => item.category === activeCategory);

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const handleContact = () => {
    alert('Contact us:\n\nEmail: support@accenture-events.com\nPhone: +32 2 555 01 01\n\nService hours:\nMonday to Friday: 8:00 AM to 6:00 PM\nSaturday: 9:00 AM to 2:00 PM\n\nAccenture Events 2025');
  };

  return (
    <div className="faq-page">
      {/* Header */}
      <header className="faq-header">
        <div className="header-content">
          <button className="back-button" onClick={() => navigate(-1)} aria-label="Go back">
            <Icon name="arrowLeft" size={20} />
          </button>
          <h1 className="page-title">Frequently Asked Questions</h1>
          <button className="contact-button" onClick={handleContact}>
            <Icon name="messageCircle" size={20} />
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="faq-content">
        {/* Intro */}
        <div className="faq-intro">
          <h2><Icon name="help" size={22} /> How can we help?</h2>
          <p>Find answers to the most common questions about Accenture events in 2025.</p>
        </div>

        {/* Categories Filter */}
        <div className="categories-filter">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="category-icon"><Icon name={category.icon} size={18} /></span>
              <span className="category-name">{category.name}</span>
              <span className="category-count">{category.count}</span>
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="faq-list">
          {filteredFAQ.map((item) => (
            <div key={item.id} className={`faq-item ${openItems.has(item.id) ? 'open' : ''}`}>
              <button
                className="faq-question"
                onClick={() => toggleItem(item.id)}
              >
                <div className="question-content">
                  <span className="question-icon"><Icon name={item.icon} size={18} /></span>
                  <span className="question-text">{item.question}</span>
                </div>
                <span className={`expand-icon ${openItems.has(item.id) ? 'rotated' : ''}`}>
                  <Icon name="chevronDown" size={18} />
                </span>
              </button>
              
              {openItems.has(item.id) && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="contact-section">
          <h3><Icon name="help" size={20} /> Did not find the answer?</h3>
          <p>Our team is ready to help.</p>
          <button className="contact-support-button" onClick={handleContact}>
            <Icon name="phone" size={16} /> Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
