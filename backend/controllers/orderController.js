const getAllOrders = (req, res) => {
  res.send('All orders');
};

const placeOrder = (req, res) => {
  res.send('Place an order');
};

module.exports = {
  getAllOrders,
  placeOrder,
};
