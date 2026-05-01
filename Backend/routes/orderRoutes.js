const express = require('express');
const{getAllOrders, addOrder, deleteOrder, getAllOrdersById, updateOrder} = require("../controllers/orderController");

const router = express.Router();
router.get('/orders', getAllOrders);
router.get('/orders/:id', getAllOrdersById);
router.post('/orders', addOrder);
router.put('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);
module.exports = router;