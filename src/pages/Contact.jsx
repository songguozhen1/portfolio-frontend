import { useState } from 'react';
import { contactAPI } from '../services/api';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await contactAPI.send(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <h1 className="page-title">Get In Touch</h1>
          <p className="page-subtitle">
            I'd love to hear from you! Feel free to reach out
          </p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info glass-card fade-in">
              <h2>Let's Connect!</h2>
              <p>
                Whether you have a question, a project idea, or just want to say hello,
                I'm always happy to hear from you. Fill out the form and I'll get back
                to you as soon as possible!
              </p>

              <div className="contact-methods">
                <div className="contact-method">
                  <span className="contact-icon">📧</span>
                  <div>
                    <h4>Email</h4>
                    <p>hello@example.com</p>
                  </div>
                </div>

                <div className="contact-method">
                  <span className="contact-icon">📍</span>
                  <div>
                    <h4>Location</h4>
                    <p>Your City, Country</p>
                  </div>
                </div>

                <div className="contact-method">
                  <span className="contact-icon">💬</span>
                  <div>
                    <h4>Social</h4>
                    <p>@yourusername</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper glass-card fade-in">
              <h2>Send a Message</h2>

              {success && (
                <div className="success-message">
                  Thank you for your message! I'll get back to you soon.
                </div>
              )}

              {error && <div className="error-message">{error}</div>}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="input-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="input-field"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="input-field"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="input-field"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="What would you like to say?"
                    rows="5"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-full"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
