// src/components/AdminDashboard/deleteproduct.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from './Footer';
import './admin.css';
import Header from './Header';
import { FaTrashAlt } from 'react-icons/fa'; // Import the trash icon

const DeleteProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [message, setMessage] = useState("");  // For displaying success or error messages

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

  // Delete Product by Name
  const deleteProduct = async (productName) => {
    try {
      const encodedProductName = encodeURIComponent(productName);
      console.log("Deleting product:", encodedProductName);  // Debug log
      await axios.delete(`http://localhost:3001/api/product/delete/${encodedProductName}`);
      setMessage("Product deleted successfully!");
      setProducts(products.filter(product => product.name !== productName));  // Update state to remove deleted product
    } catch (error) {
      console.error("Error deleting product:", error);
      setMessage("Error deleting product.");
    }
  };

  // Filter products based on search query and category
  const filteredProducts = products.filter((product) => {
    const matchesSearchQuery =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter ? product.category === categoryFilter : true;

    return matchesSearchQuery && matchesCategory;
  });

  return (
    <div className="home-container">
      <Header />
      <main className="main-content">
        <h1>Products</h1>

        {message && <p className="message">{message}</p>}

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
                <div className="product-card-header">
                  <FaTrashAlt 
                    className="delete-icon"
                    onClick={() => deleteProduct(product.name)}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      cursor: 'pointer',
                      color: '#ef80ae',
                      fontSize: '1.2rem',
                      transition: 'color 0.3s ease',
                      zIndex: 1
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#d6678f'}
                    onMouseLeave={(e) => e.target.style.color = '#ef80ae'}
                  />
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
      </main>
      <Footer />
    </div>
  );
};

export default DeleteProducts;
