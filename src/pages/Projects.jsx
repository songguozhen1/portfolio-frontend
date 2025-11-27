import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { projectsAPI } from '../services/api';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsAPI.getAll();
        setProjects(response.data);
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ padding: '60px 20px' }}>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="projects-page">
      <section className="projects-hero">
        <div className="container">
          <h1 className="page-title">My Projects</h1>
          <p className="page-subtitle">
            A collection of my favorite works and creative endeavors
          </p>
        </div>
      </section>

      <section className="projects-section">
        <div className="container">
          {projects.length === 0 ? (
            <div className="no-projects glass-card">
              <p>No projects yet. Check back soon!</p>
            </div>
          ) : (
            <div className="projects-grid grid-3">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
