import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogAPI, commentsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentBody, setCommentBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [commentError, setCommentError] = useState(null);

  const fetchPost = async () => {
    try {
      const response = await blogAPI.getById(id);
      setPost(response.data);
    } catch (err) {
      setError('Failed to load blog post. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentBody.trim()) return;

    setSubmitting(true);
    setCommentError(null);

    try {
      await commentsAPI.create(id, { body: commentBody });
      setCommentBody('');
      fetchPost(); // Refresh post with new comment
    } catch (err) {
      setCommentError('Failed to post comment. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading post...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container" style={{ padding: '60px 20px' }}>
        <div className="error-message">{error || 'Post not found'}</div>
        <div className="text-center mt-20">
          <Link to="/blog" className="btn btn-secondary">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-detail-page">
      <div className="container">
        <Link to="/blog" className="back-link">← Back to Blog</Link>

        <article className="post-content glass-card fade-in">
          <div className="post-header">
            <div className="post-meta">
              <span className="post-date">{formatDate(post.createdAt)}</span>
              {post.author && (
                <span className="post-author">by {post.author.username}</span>
              )}
            </div>
            <h1 className="post-title">{post.title}</h1>
          </div>

          <div className="post-body">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>

        <section className="comments-section">
          <h2 className="comments-title">
            Comments ({post.comments?.length || 0})
          </h2>

          {isAuthenticated ? (
            <form onSubmit={handleCommentSubmit} className="comment-form glass-card">
              <div className="input-group">
                <label htmlFor="comment">Leave a comment</label>
                <textarea
                  id="comment"
                  className="input-field"
                  value={commentBody}
                  onChange={(e) => setCommentBody(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows="3"
                  required
                />
              </div>
              {commentError && <div className="error-message">{commentError}</div>}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          ) : (
            <div className="login-prompt glass-card">
              <p>
                <Link to="/login">Log in</Link> to leave a comment
              </p>
            </div>
          )}

          <div className="comments-list">
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <div key={comment._id} className="comment-card glass-card fade-in">
                  <div className="comment-header">
                    <span className="comment-author">
                      {comment.author?.username || 'Anonymous'}
                    </span>
                    <span className="comment-date">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="comment-body">{comment.body}</p>
                </div>
              ))
            ) : (
              <div className="no-comments">
                <p>No comments yet. Be the first to share your thoughts!</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogDetail;
