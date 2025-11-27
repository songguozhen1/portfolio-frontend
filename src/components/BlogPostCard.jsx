import { Link } from 'react-router-dom';
import './BlogPostCard.css';

const BlogPostCard = ({ post }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Link to={`/blog/${post._id}`} className="blog-card glass-card fade-in">
      <div className="blog-meta">
        <span className="blog-date">{formatDate(post.createdAt)}</span>
        {post.author && (
          <span className="blog-author">by {post.author.username}</span>
        )}
      </div>
      <h3 className="blog-title">{post.title}</h3>
      <p className="blog-excerpt">
        {post.content.length > 150
          ? post.content.substring(0, 150) + '...'
          : post.content}
      </p>
      <span className="read-more">Read more →</span>
    </Link>
  );
};

export default BlogPostCard;
