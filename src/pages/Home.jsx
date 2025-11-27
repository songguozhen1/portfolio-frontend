import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container">
          <div className="hero-content fade-in">
            <div className="hero-avatar">
              <div className="avatar-placeholder">✨</div>
            </div>
            <h1 className="hero-title">
              Hello, I'm <span className="highlight">Your Name</span>
            </h1>
            <p className="hero-subtitle">
              A passionate developer creating beautiful digital experiences
            </p>
            <p className="hero-description">
              Welcome to my little corner of the internet! I love building things
              that make people smile. From web applications to creative projects,
              I put my heart into everything I create.
            </p>
            <div className="hero-buttons">
              <Link to="/projects" className="btn btn-primary">
                View My Work
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-grid">
            <div className="about-card glass-card fade-in">
              <div className="about-icon">💻</div>
              <h3>Web Development</h3>
              <p>Creating responsive and beautiful websites using modern technologies like React, Node.js, and more.</p>
            </div>
            <div className="about-card glass-card fade-in">
              <div className="about-icon">🎨</div>
              <h3>UI/UX Design</h3>
              <p>Designing intuitive and aesthetically pleasing user interfaces that users love to interact with.</p>
            </div>
            <div className="about-card glass-card fade-in">
              <div className="about-icon">📱</div>
              <h3>Creative Solutions</h3>
              <p>Bringing creative ideas to life through code and turning complex problems into simple solutions.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="skills-section">
        <div className="container">
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="skills-grid glass-card">
            <span className="skill-tag">React</span>
            <span className="skill-tag">Node.js</span>
            <span className="skill-tag">JavaScript</span>
            <span className="skill-tag">MongoDB</span>
            <span className="skill-tag">Express</span>
            <span className="skill-tag">CSS3</span>
            <span className="skill-tag">HTML5</span>
            <span className="skill-tag">Git</span>
            <span className="skill-tag">REST API</span>
            <span className="skill-tag">Responsive Design</span>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-card glass-card">
            <h2>Let's Work Together!</h2>
            <p>Have a project in mind? I'd love to hear about it and see how I can help bring your ideas to life.</p>
            <Link to="/contact" className="btn btn-primary">
              Contact Me
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
