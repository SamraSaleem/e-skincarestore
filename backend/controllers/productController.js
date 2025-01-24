const Product = require('../models/productmodel');

// Add Product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        const image = req.file ? req.file.filename : null;

        // Validate required fields
        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({ error: 'All fields except image are required.' });
        }

        // Save the product to the database
        const product = await Product.create({ name, description, price, category, stock, image });
        res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

const getProductByName = async (req, res) => {
    try {
      const { name } = req.params;
  
      // Find product by name using a case-insensitive search
      const product = await Product.findOne({ name: new RegExp(`^${name}$`, "i") });
  
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      res.status(200).json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
const getAllProducts = async (req, res) => {
        try {
          const products = await Product.find(); // Assuming you're using Mongoose
          res.status(200).json(products);
        } catch (error) {
          res.status(500).json({ message: "Failed to fetch products", error });
        }
      }
      
const deleteProductByName = async (req, res) => {
  try {
    const { productName } = req.params;
    console.log("Attempting to delete product:", productName);  // Debug log

    const product = await Product.findOneAndDelete({ name: new RegExp(`^${productName}$`, "i") });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



const updateProduct = async (req, res) => {
  // Destructure all necessary fields from the request body
  const { name, description, price, category, stock } = req.body;
  // Handle the image if provided (using multer or similar middleware)
  const image = req.file ? req.file.filename : null; 

  try {
    // Find the product by its name
    const product = await Product.findOne({ name });
    
    // If product not found, return 404 error
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Update the product details
    product.description = description;
    product.price = price;
    product.category = category;
    product.stock = stock;
    if (image) {
      product.image = image; // Update image if new image is uploaded
    }

    // Save the updated product
    await product.save();

    // Send a response indicating the update was successful
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    // Handle any errors that occur during the update
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

// Add this new controller function
const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Error fetching categories' });
  }
};

module.exports = { addProduct, getProductByName, getAllProducts, deleteProductByName , updateProduct, getCategories };
