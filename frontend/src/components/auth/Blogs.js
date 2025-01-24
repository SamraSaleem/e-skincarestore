import React from 'react';
import './auth.css';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Ultimate Skincare Routine Guide",
      image: "https://glowgirlnutrition.com/cdn/shop/files/bookcover_8d0bf9d3-7cbb-4f56-b1ef-584d991b145b.jpg?v=1724645055",
      excerpt: "Discover the perfect morning and evening skincare routine for glowing skin. Learn about the essential steps and products for a radiant complexion.",
      date: "January 15, 2024",
      category: "Skincare Tips"
    },
    {
      id: 2,
      title: "Natural Ingredients in Skincare",
      image: "https://i0.wp.com/blog.themomsco.com/wp-content/uploads/2022/08/5c2ac-7-natural-skincare-ingredients-that-will-transform-your-skin-1-scaled-1.jpg",
      excerpt: "Learn about the power of natural ingredients and their benefits for your skin. From aloe vera to green tea, discover nature's beauty secrets.",
      date: "January 10, 2024",
      category: "Product Knowledge"
    },
    {
      id: 3,
      title: "Understanding Your Skin Type",
      image: "https://rioari.com/wp-content/uploads/2024/07/Different-type-of-skin.jpg",
      excerpt: "Learn how to identify your skin type and choose the right products for your specific needs.",
      date: "December 30, 2023",
      category: "Skin Education"
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Beauty Blog</h1>
        <p>Discover tips, tricks, and insights for your skincare journey</p>
      </div>

      <div className="content-section">
        <div className="blog-grid">
          {blogPosts.map(post => (
            <div key={post.id} className="blog-card">
              <img src={post.image} alt={post.title} className="blog-image" />
              <div className="blog-content">
                <span className="blog-category">{post.category}</span>
                <h2 className="blog-title">{post.title}</h2>
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-footer">
                  <span className="blog-date">{post.date}</span>
                  <Link to={`/blog/${post.id}`} className="read-more">Read More</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs; 