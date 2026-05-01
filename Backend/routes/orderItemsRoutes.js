const express = require('express');
const {getAllOrderItems, addOrderItems, deleteOrderItems } = require('../controllers/orderItemsController');

const router = express.Router();
router.get('/orderItems', getAllOrderItems);
router.post('/orderItems', addOrderItems);
router.delete('/orderItems/:id', deleteOrderItems);
module.exports = router;