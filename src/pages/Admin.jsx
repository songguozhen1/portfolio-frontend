import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { projectsAPI, blogAPI, contactAPI } from '../services/api';
import './Admin.css';

const Admin = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('projects');

  // Projects state
  const [projects, setProjects] = useState([]);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    repoUrl: '',
    liveUrl: ''
  });
  const [editingProject, setEditingProject] = useState(null);

  // Blog state
  const [posts, setPosts] = useState([]);
  const [postForm, setPostForm] = useState({
    title: '',
    content: ''
  });
  const [editingPost, setEditingPost] = useState(null);

  // Messages state
  const [messages, setMessages] = useState([]);

  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch data
  useEffect(() => {
    fetchProjects();
    fetchPosts();
    fetchMessages();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await blogAPI.getAll();
      setPosts(response.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await contactAPI.getAll();
      setMessages(response.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  // Clear messages
  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  // Project handlers
  const handleProjectChange = (e) => {
    setProjectForm({
      ...projectForm,
      [e.target.name]: e.target.value
    });
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    clearMessages();

    try {
      if (editingProject) {
        await projectsAPI.update(editingProject._id, projectForm);
        setSuccess('Project updated successfully!');
      } else {
        await projectsAPI.create(projectForm);
        setSuccess('Project created successfully!');
      }
      setProjectForm({ title: '', description: '', imageUrl: '', repoUrl: '', liveUrl: '' });
      setEditingProject(null);
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  const editProject = (project) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl || '',
      repoUrl: project.repoUrl || '',
      liveUrl: project.liveUrl || ''
    });
    clearMessages();
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    setLoading(true);
    clearMessages();

    try {
      await projectsAPI.delete(id);
      setSuccess('Project deleted successfully!');
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete project');
    } finally {
      setLoading(false);
    }
  };

  const cancelEditProject = () => {
    setEditingProject(null);
    setProjectForm({ title: '', description: '', imageUrl: '', repoUrl: '', liveUrl: '' });
    clearMessages();
  };

  // Blog handlers
  const handlePostChange = (e) => {
    setPostForm({
      ...postForm,
      [e.target.name]: e.target.value
    });
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    clearMessages();

    try {
      if (editingPost) {
        await blogAPI.update(editingPost._id, postForm);
        setSuccess('Blog post updated successfully!');
      } else {
        await blogAPI.create(postForm);
        setSuccess('Blog post created successfully!');
      }
      setPostForm({ title: '', content: '' });
      setEditingPost(null);
      fetchPosts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save blog post');
    } finally {
      setLoading(false);
    }
  };

  const editPost = (post) => {
    setEditingPost(post);
    setPostForm({
      title: post.title,
      content: post.content
    });
    clearMessages();
  };

  const deletePost = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    setLoading(true);
    clearMessages();

    try {
      await blogAPI.delete(id);
      setSuccess('Blog post deleted successfully!');
      fetchPosts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete blog post');
    } finally {
      setLoading(false);
    }
  };

  const cancelEditPost = () => {
    setEditingPost(null);
    setPostForm({ title: '', content: '' });
    clearMessages();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1 className="page-title">Admin Dashboard</h1>
          <p className="welcome-msg">Welcome back, {user?.username}!</p>
        </div>

        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => { setActiveTab('projects'); clearMessages(); }}
          >
            Projects
          </button>
          <button
            className={`tab-btn ${activeTab === 'blog' ? 'active' : ''}`}
            onClick={() => { setActiveTab('blog'); clearMessages(); }}
          >
            Blog Posts
          </button>
          <button
            className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => { setActiveTab('messages'); clearMessages(); }}
          >
            Messages
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="admin-content">
          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="admin-section fade-in">
              <div className="form-section glass-card">
                <h2>{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
                <form onSubmit={handleProjectSubmit}>
                  <div className="input-group">
                    <label htmlFor="projectTitle">Title *</label>
                    <input
                      type="text"
                      id="projectTitle"
                      name="title"
                      className="input-field"
                      value={projectForm.title}
                      onChange={handleProjectChange}
                      placeholder="Project title"
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="projectDescription">Description *</label>
                    <textarea
                      id="projectDescription"
                      name="description"
                      className="input-field"
                      value={projectForm.description}
                      onChange={handleProjectChange}
                      placeholder="Describe your project"
                      rows="4"
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="projectImage">Image URL</label>
                    <input
                      type="url"
                      id="projectImage"
                      name="imageUrl"
                      className="input-field"
                      value={projectForm.imageUrl}
                      onChange={handleProjectChange}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="form-row">
                    <div className="input-group">
                      <label htmlFor="projectRepo">Repository URL</label>
                      <input
                        type="url"
                        id="projectRepo"
                        name="repoUrl"
                        className="input-field"
                        value={projectForm.repoUrl}
                        onChange={handleProjectChange}
                        placeholder="https://github.com/..."
                      />
                    </div>

                    <div className="input-group">
                      <label htmlFor="projectLive">Live Demo URL</label>
                      <input
                        type="url"
                        id="projectLive"
                        name="liveUrl"
                        className="input-field"
                        value={projectForm.liveUrl}
                        onChange={handleProjectChange}
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div className="form-buttons">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? 'Saving...' : editingProject ? 'Update Project' : 'Add Project'}
                    </button>
                    {editingProject && (
                      <button type="button" className="btn btn-secondary" onClick={cancelEditProject}>
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="list-section">
                <h2>Your Projects ({projects.length})</h2>
                {projects.length === 0 ? (
                  <div className="empty-state glass-card">
                    <p>No projects yet. Add your first project above!</p>
                  </div>
                ) : (
                  <div className="items-list">
                    {projects.map((project) => (
                      <div key={project._id} className="item-card glass-card">
                        <div className="item-info">
                          <h3>{project.title}</h3>
                          <p>{project.description.substring(0, 100)}...</p>
                          <span className="item-date">{formatDate(project.createdAt)}</span>
                        </div>
                        <div className="item-actions">
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => editProject(project)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteProject(project._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Blog Tab */}
          {activeTab === 'blog' && (
            <div className="admin-section fade-in">
              <div className="form-section glass-card">
                <h2>{editingPost ? 'Edit Blog Post' : 'Write New Post'}</h2>
                <form onSubmit={handlePostSubmit}>
                  <div className="input-group">
                    <label htmlFor="postTitle">Title *</label>
                    <input
                      type="text"
                      id="postTitle"
                      name="title"
                      className="input-field"
                      value={postForm.title}
                      onChange={handlePostChange}
                      placeholder="Post title"
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="postContent">Content *</label>
                    <textarea
                      id="postContent"
                      name="content"
                      className="input-field"
                      value={postForm.content}
                      onChange={handlePostChange}
                      placeholder="Write your blog post..."
                      rows="8"
                      required
                    />
                  </div>

                  <div className="form-buttons">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? 'Saving...' : editingPost ? 'Update Post' : 'Publish Post'}
                    </button>
                    {editingPost && (
                      <button type="button" className="btn btn-secondary" onClick={cancelEditPost}>
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="list-section">
                <h2>Your Blog Posts ({posts.length})</h2>
                {posts.length === 0 ? (
                  <div className="empty-state glass-card">
                    <p>No blog posts yet. Write your first post above!</p>
                  </div>
                ) : (
                  <div className="items-list">
                    {posts.map((post) => (
                      <div key={post._id} className="item-card glass-card">
                        <div className="item-info">
                          <h3>{post.title}</h3>
                          <p>{post.content.substring(0, 100)}...</p>
                          <span className="item-date">{formatDate(post.createdAt)}</span>
                        </div>
                        <div className="item-actions">
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => editPost(post)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deletePost(post._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="admin-section fade-in">
              <div className="list-section">
                <h2>Contact Messages ({messages.length})</h2>
                {messages.length === 0 ? (
                  <div className="empty-state glass-card">
                    <p>No messages yet.</p>
                  </div>
                ) : (
                  <div className="items-list">
                    {messages.map((message) => (
                      <div key={message._id} className="message-card glass-card">
                        <div className="message-header">
                          <div className="message-sender">
                            <strong>{message.name}</strong>
                            <span>{message.email}</span>
                          </div>
                          <span className="item-date">{formatDate(message.createdAt)}</span>
                        </div>
                        <p className="message-body">{message.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
