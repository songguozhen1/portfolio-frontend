import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <span className="footer-logo">✨ My Portfolio</span>
          <p className="footer-tagline">Creating beautiful things with love</p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>Navigation</h4>
            <Link to="/">Home</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer-column">
            <h4>Connect</h4>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} My Portfolio. Made with love</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
