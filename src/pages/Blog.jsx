import { useState, useEffect } from 'react';
import BlogPostCard from '../components/BlogPostCard';
import { blogAPI } from '../services/api';
import './Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await blogAPI.getAll();
        setPosts(response.data);
      } catch (err) {
        setError('Failed to load blog posts. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading blog posts...</p>
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
    <div className="blog-page">
      <section className="blog-hero">
        <div className="container">
          <h1 className="page-title">My Blog</h1>
          <p className="page-subtitle">
            Thoughts, stories, and ideas from my journey
          </p>
        </div>
      </section>

      <section className="blog-section">
        <div className="container">
          {posts.length === 0 ? (
            <div className="no-posts glass-card">
              <p>No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="blog-grid grid-2">
              {posts.map((post) => (
                <BlogPostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
