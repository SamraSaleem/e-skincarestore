import React, { useState, useEffect } from "react";
import axios from "axios";
import './admin.css';
import Footer from './Footer';
import Header from './Header';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import AddProduct from './addproduct';

const ViewProducts = () => {
  
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [hoveredId, setHoveredId] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [removeCurrentImage, setRemoveCurrentImage] = useState(false);
  const [token] = useState(localStorage.getItem("token"));
  const [showAddForm, setShowAddForm] = useState(false);

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


  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle category filter change
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

  // Handle delete
  const handleDelete = async (productName) => {
    try {
      const encodedProductName = encodeURIComponent(productName);
      await axios.delete(`http://localhost:3001/api/product/delete/${encodedProductName}`);
      
      // Fetch fresh data after deletion
      const freshData = await axios.get("http://localhost:3001/api/product/get");
      setProducts(freshData.data);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Handle update
  const handleUpdate = (product) => {
    setSelectedProduct(product);
    setImagePreview(`http://localhost:3001/uploads/${product.image}`);
    setShowUpdateForm(true);
    setRemoveCurrentImage(false);
  };

  const handleAddProduct = () => {
    setShowAddForm(true);
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
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setRemoveCurrentImage(true);
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
      
      // Update the products list with the updated product
      setProducts(prevProducts => 
        prevProducts.map(p => 
          p._id === selectedProduct._id ? response.data : p
        )
      );
      
      // Clean up and close form
      setShowUpdateForm(false);
      setSelectedProduct(null);
      setImagePreview(null);
      setRemoveCurrentImage(false);

      // Fetch fresh data after update
      const freshData = await axios.get("http://localhost:3001/api/product/get");
      setProducts(freshData.data);

    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="home-container">
      <Header />

      {/* Main Content */}
      <main className="main-content">
        <h1>Products</h1>

        {!showAddForm && !showUpdateForm ? (
          <>
            {/* Add Product Button */}
            <div 
              className="add-product-btn"
              onClick={handleAddProduct}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#d15c8a',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                alignSelf: 'flex-end',
                marginBottom: '20px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.backgroundColor = '#e66a9c';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = '#ef80ae';
              }}
            >
              <FaPlus style={{ fontSize: '1rem' }} />
              <span style={{ fontWeight: '500' }}>Add Product</span>
            </div>

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

            {/* Updated Product Grid */}
            <div className="product-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div className="product-card" key={product._id}>
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
                    
                    {/* Action Buttons Container */}
                    <div className="product-actions" style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '10px' }}>
                      {/* Update Button */}
                      <div 
                        className="edit-container" 
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          cursor: 'pointer',
                          padding: '5px 10px',
                          borderRadius: '4px'
                        }}
                        onClick={() => handleUpdate(product)}
                        onMouseEnter={() => setHoveredId(`update-${product._id}`)}
                        onMouseLeave={() => setHoveredId(null)}
                      >
                        <span style={{ 
                          color: hoveredId === `update-${product._id}` ? '#e96c07' : '#fd7e14', 
                          fontSize: '0.9rem',
                          fontWeight: '1000',
                          transition: 'color 0.3s ease'
                        }}>
                          Update
                        </span>
                        <FaEdit 
                          style={{
                            color: hoveredId === `update-${product._id}` ? '#e96c07' : '#fd7e14',
                            fontSize: '1.2rem',
                            transition: 'color 0.3s ease'
                          }}
                        />
                      </div>

                      {/* Delete Button */}
                      <div 
                        className="delete-container"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          cursor: 'pointer',
                          padding: '5px 10px',
                          borderRadius: '4px'
                        }}
                        onClick={() => handleDelete(product.name)}
                        onMouseEnter={() => setHoveredId(`delete-${product._id}`)}
                        onMouseLeave={() => setHoveredId(null)}
                      >
                        <span style={{ 
                          color: hoveredId === `delete-${product._id}` ? '#c82333' : '#dc3545', 
                          fontSize: '0.9rem',
                          fontWeight: '1000',
                          transition: 'color 0.3s ease'
                        }}>
                          Delete
                        </span>
                        <FaTrashAlt 
                          style={{
                            color: hoveredId === `delete-${product._id}` ? '#c82333' : '#dc3545',
                            fontSize: '1.2rem',
                            transition: 'color 0.3s ease'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No products found.</p>
              )}
            </div>
          </>
        ) : showAddForm ? (
          // Add Product Form
          <div>
            <AddProduct />
            <div style={{marginBottom: '20px'}}>
              <div
                onClick={() => setShowAddForm(false)}
                style={{
                  position: 'absolute',
                  top: '80px',
                  left: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <div style={{
                  width: '50px', // Increased size
                  height: '50px', // Increased size
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}>
                  <svg 
                    width="40" // Increased size
                    height="40" // Increased size
                    viewBox="0 0 24 24"
                    style={{
                      fill: 'none',
                      stroke: '#FF69B4', // Changed to pink
                      strokeWidth: '3', // Made stroke bolder
                      strokeLinecap: 'round',
                      strokeLinejoin: 'round'
                    }}
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Update Form
          <div>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="update-form">
              {/* Back Arrow Button */}
              <div style={{marginBottom: '20px'}}>
                <div
                  onClick={() => {
                    setShowUpdateForm(false);
                    setSelectedProduct(null);
                    setImagePreview(null);
                    setRemoveCurrentImage(false);
                  }}
                  style={{
                    position: 'absolute',
                    top: '80px',
                    left: '20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <div style={{
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                  }}>
                    <svg 
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      style={{
                        fill: 'none',
                        stroke: '#FF69B4',
                        strokeWidth: '3',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round'
                      }}
                    >
                      <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                  </div>
                </div>
              </div>

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
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ViewProducts;
