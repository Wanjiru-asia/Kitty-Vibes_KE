const express = require('express');
const { stkPush, mpesaCallback } = require('../controllers/paymentController');

const router = express.Router();
router.post('/payments', stkPush);
router.post('/payments/callback', mpesaCallback);

module.exports = router;