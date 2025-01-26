const express = require('express');
const { getAllOrders, placeOrder } = require('../controllers/orderController');
const { authenticateUser } = require('../middlewares/authentication');

const router = express.Router();

router.post('/order', authenticateUser, placeOrder);
router.get('/orders', authenticateUser, getAllOrders);

module.exports = router;
