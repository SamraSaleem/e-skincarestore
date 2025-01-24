import React from 'react';
import Footer from '../AdminDashboard/Footer';
import '../AdminDashboard/admin.css';
import Header from '../AdminDashboard/Header';

const About = () => {
  const values = [
    {
      icon: "🌿",
      title: "Natural Ingredients",
      description: "We prioritize natural, sustainable ingredients in all our products."
    },
    {
      icon: "🐰",
      title: "Cruelty-Free",
      description: "All our products are cruelty-free and never tested on animals."
    },
    {
      icon: "♻️",
      title: "Sustainable",
      description: "Committed to eco-friendly practices and sustainable packaging."
    },
    {
      icon: "💝",
      title: "Customer First",
      description: "Your satisfaction and skin health are our top priorities."
    }
  ];

  const teamMembers = [
    {
      name: "Samra Saleem",
      role: "Admin & Founder",
      imageClass: "samra-image",
      bio: "Leading the vision of SAM E GLOW with passion for natural beauty."
    },
    {
      name: "Muskan Tariq",
      role: "Customer Experience",
      imageClass: "muskan-image",
      bio: "Expert in skincare formulation and product innovation."
    },
    {
      name: "Amna Hassan",
      role: "Seller Experience",
      imageClass: "amna-image",
      bio: "Ensuring exceptional service and customer satisfaction."
    }
  ];

  return (
    <div className="home-container">
      <Header />

      {/* Rest of your About page content */}
      <main className="main-content">
        <div className="page-container">
          <div className="about-content">
            <div className="about-story">
              <h2 style={{color: '#ef80ae'}}>SAM E GLOW Story</h2>
              <p>Founded in 2023, SAM E GLOW emerged from a passion for natural skincare and a commitment to enhancing everyone's natural beauty. Our journey began with a simple belief: everyone deserves access to high-quality, natural skincare products that work.</p>
            </div>

            <div className="mission-section">
              <h2 style={{color: '#ef80ae'}}>Our Mission</h2>
              <p>At SAM E GLOW, we're dedicated to providing premium skincare solutions that combine natural ingredients with scientific innovation. Our mission is to help everyone achieve their best skin while maintaining ethical and sustainable practices.</p>
            </div>

            <div className="values-section">
              <h2 style={{color: '#ef80ae'}}>Our Values</h2>
              <div className="values-list">
                {values.map((value, index) => (
                  <div key={index} className="value-item">
                    <i>{value.icon}</i>
                    <h3 style={{color: '#ef80ae'}}>{value.title}</h3>
                    <p>{value.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="team-section">
              <h2 style={{color: '#ef80ae'}}>Meet Our Team</h2>
              <div className="team-grid">
                {teamMembers.map((member, index) => (
                  <div key={index} className="team-member">
                    <div className={`team-member-image ${member.imageClass}`}></div>
                    <div className="team-member-info">
                      <h3 style={{color: '#ef80ae'}}>{member.name}</h3>
                      <h4>{member.role}</h4>
                      <p>{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About; 