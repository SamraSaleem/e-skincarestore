import React, { useState, useEffect } from "react";
import axios from "axios";
import './admin.css';
import Footer from "./Footer";
import Header from './Header';
import { FaEdit } from 'react-icons/fa';

const UpdateProduct = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [token] = useState(localStorage.getItem("token"));
  const [imagePreview, setImagePreview] = useState(null);
  const [removeCurrentImage, setRemoveCurrentImage] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/product/get");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Handle search and filter
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  // Filter products based on search query and category
  const filteredProducts = products.filter((product) => {
    // Add null checks for product properties
    const productName = product?.name || '';
    const productDescription = product?.description || '';
    
    const matchesSearchQuery =
      productName.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
      productDescription.toLowerCase().includes((searchQuery || '').toLowerCase());
    
    const matchesCategory =
      !categoryFilter || product?.category === categoryFilter;

    return matchesSearchQuery && matchesCategory;
  });

  // Handle update button click
  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setImagePreview(`http://localhost:3001/uploads/${product.image}`);
    setShowUpdateForm(true);
    setRemoveCurrentImage(false);
  };

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedProduct(prev => ({
        ...prev,
        image: file
      }));
      // Create preview URL for the new image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setRemoveCurrentImage(true);
    }
  };

  // Add function to remove image
  const handleRemoveImage = () => {
    setImagePreview(null);
    setRemoveCurrentImage(true);
    // Reset the file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  // Handle update submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', selectedProduct.name);
    formData.append('description', selectedProduct.description);
    formData.append('price', selectedProduct.price);
    formData.append('category', selectedProduct.category);
    formData.append('stock', selectedProduct.stock);
    formData.append('removeCurrentImage', removeCurrentImage);
    
    if (selectedProduct.image instanceof File) {
      formData.append('image', selectedProduct.image);
    }

    try {
      const response = await axios.put('http://localhost:3001/api/product/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Product updated successfully!");
      setError("");
      
      // Update the products list with the updated product
      setProducts(prevProducts => 
        prevProducts.map(p => 
          p._id === selectedProduct._id ? response.data : p
        )
      );
      
      // Clean up and close form
      setTimeout(() => {
        setShowUpdateForm(false);
        setSelectedProduct(null);
        setMessage("");
        setImagePreview(null);
        setRemoveCurrentImage(false);
      }, 2000);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setError("Error updating product.");
      setMessage("");
    }
  };

  return (
    <div className="home-container">
      <Header />
      <main className="main-content">
        <h1>Update Products</h1>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        {!showUpdateForm ? (
          <>
            {/* Search and Filter Section */}
            <div className="search-filter-section">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search by name or description..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>

              <div className="category-filter">
                <select value={categoryFilter} onChange={handleCategoryFilterChange}>
                  <option value="">Filter by Category</option>
                  <option value="moisturizer">Moisturizer</option>
                  <option value="serum">Serum</option>
                  <option value="toner">Toner</option>
                  <option value="facewash">Facewash</option>
                  <option value="sunscreen">Sunscreen</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <div className="product-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div className="product-card" key={product._id}>
                    <div className="product-card-header">
                      <div 
                        className="edit-container" 
                        style={{
                          position: 'absolute',
                          top: '440px',
                          right: '10px',
                      
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          cursor: 'pointer',
                          zIndex: 1
                        }}
                        onClick={() => handleUpdateClick(product)}
                        onMouseEnter={() => setHoveredId(product._id)}
                        onMouseLeave={() => setHoveredId(null)}
                      >
                        <span style={{ 
                          color: hoveredId === product._id ? '#c82333' : '#dc3545', 
                          fontSize: '0.9rem',
                          fontWeight: '1000',
                          transition: 'color 0.3s ease'
                        }}>
                          Update
                        </span>
                        <FaEdit 
                          className="edit-icon"
                          style={{
                            color: hoveredId === product._id ? '#c82333' : '#dc3545',
                            fontSize: '1.2rem',
                            transition: 'color 0.3s ease'
                          }}
                        />
                      </div>
                    </div>
                    <img
                      src={`http://localhost:3001/uploads/${product.image}`}
                      alt={product.name}
                      className="product-image"
                    />
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Stock:</strong> {product.stock}</p>
                  </div>
                ))
              ) : (
                <p>No products found.</p>
              )}
            </div>
          </>
        ) : (
          // Update Form
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="update-form">
            <h2>Update Product: {selectedProduct?.name}</h2>
            
            <div>
              <label>Description:</label>
              <textarea
                name="description"
                value={selectedProduct?.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div>
              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={selectedProduct?.price}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Category:</label>
              <select
                name="category"
                value={selectedProduct?.category}
                onChange={handleChange}
                required
              >
                <option value="" disabled>-- Select Category --</option>
                <option value="moisturizer">Moisturizer</option>
                <option value="serum">Serum</option>
                <option value="toner">Toner</option>
                <option value="facewash">Facewash</option>
                <option value="sunscreen">Sunscreen</option>
              </select>
            </div>

            <div>
              <label>Stock:</label>
              <input
                type="number"
                name="stock"
                value={selectedProduct?.stock}
                onChange={handleChange}
                required
              />
            </div>

            <div className="image-section">
              <label>Product Image:</label>
              {imagePreview && !removeCurrentImage ? (
                <div className="current-image-container">
                  <img 
                    src={imagePreview} 
                    alt="Current product" 
                    className="current-image-preview"
                  />
                </div>
              ) : imagePreview && removeCurrentImage ? (
                <div className="new-image-preview">
                  <img 
                    src={imagePreview} 
                    alt="New product preview" 
                    className="image-preview"
                  />
                </div>
              ) : null}
              <div className="new-image-input">
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </div>
            </div>

            <div className="form-buttons">
              <button type="submit">Update Product</button>
              <button 
                type="button" 
                onClick={() => {
                  setShowUpdateForm(false);
                  setSelectedProduct(null);
                  setImagePreview(null);
                  setRemoveCurrentImage(false);
                }}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default UpdateProduct;
