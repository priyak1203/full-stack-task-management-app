const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors/customError');
const Menu = require('../models/menuModel');
const Order = require('../models/orderModel');
const { validateOrderItems } = require('../middlewares/validations');

const getAllOrders = async (req, res) => {
  const { userId } = req.user;
  const orders = await Order.find({ userId });
  const count = orders.length;

  res.status(StatusCodes.OK).json({ count, orders });
};

// Create order
const placeOrder = async (req, res) => {
  const { items: menuItems, status } = req.body;

  // check if all the data are provided
  if (!menuItems || menuItems.length < 1) {
    throw new BadRequestError('No menu items provided');
  }

  // menuItems :  array of single order items - [{menuItemId ,quantity}]
  // validate menuItems array
  const validMenuItems = validateOrderItems(menuItems);

  let items = [];
  let totalAmount = 0;

  for (const item of validMenuItems) {
    const dbMenuItem = await Menu.findOne({ _id: item.menuItemId });
    if (!dbMenuItem) {
      throw new NotFoundError(`No menu item with id: ${item.menuItemId}`);
    }

    const { _id, name, price } = dbMenuItem;

    const singleOrderItem = {
      quantity: item.quantity,
      menuItemId: _id,
      name,
      price,
    };

    // add item to  items list
    items = [...items, singleOrderItem];

    // calculate total
    totalAmount += item.quantity * price;
  }

  // order contains
  //  userId , items : array of single order items , total amount: total price,  status
  const order = await Order.create({
    userId: req.user.userId,
    items,
    totalAmount,
    status,
  });

  res.status(StatusCodes.CREATED).json({ order });
};

module.exports = {
  getAllOrders,
  placeOrder,
};
