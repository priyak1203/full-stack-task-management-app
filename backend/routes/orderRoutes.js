const express = require('express');
const { getAllOrders, placeOrder } = require('../controllers/orderController');

const router = express.Router();

router.post('/order', placeOrder);
router.get('/orders', getAllOrders);

module.exports = router;
