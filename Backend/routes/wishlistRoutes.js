const express = require('express');
const {getWishlist, addToWishlist, deleteWishlist } = require('../controllers/wishlistController');

const router = express.Router();
router.get('/wishlist', getWishlist);
router.post('/wishlist', addToWishlist);
router.delete('/wishlist/:id', deleteWishlist);
module.exports = router;