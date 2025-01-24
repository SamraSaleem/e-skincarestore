const express = require('express');
const { addProduct, getProductByName , getAllProducts, deleteProductByName, updateProduct, getCategories} = require('../controllers/productController');

const { verifyAdmin } = require('../middleware/adminMiddleware');
const upload = require('../middleware/multer');

const router = express.Router();

// Add a new product
router.post('/add', upload.single('image'), verifyAdmin, addProduct);


// Ensure the backend API accepts the name parameter
router.get('/get/:name', getProductByName);

router.get('/get', getAllProducts);

router.delete('/delete/:productName', deleteProductByName);

router.put('/update', upload.single('image'), updateProduct);

// Add this new route
router.get('/categories', verifyAdmin, getCategories);

module.exports = router;
