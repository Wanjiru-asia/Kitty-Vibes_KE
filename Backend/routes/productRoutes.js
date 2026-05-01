const express = require('express');
const {getAllProducts, getProductById, getProductByCategory, addProduct, updateProducts, deleteProducts} = require("../controllers/productController")

const router = express.Router();

router.get('/products/category/:category', getProductByCategory);
router.get('/products/:id', getProductById);
router.get('/products', getAllProducts);

router.post('/products', addProduct);
router.put('/products/:id', updateProducts);
router.delete('/products/:id', deleteProducts);

module.exports = router;