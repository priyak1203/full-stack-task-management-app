const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors/customError');
const Menu = require('../models/menuModel');
const {
  validateAddItem,
  validateMongoId,
  validateUpdateItem,
} = require('../middlewares/validations');

// Fetch all the menu items
const getAllMenuItems = async (req, res) => {
  const items = await Menu.find({});
  const count = items.length;

  res.status(StatusCodes.OK).json({ count, items });
};

// Add an item to the menu
const addMenuItem = async (req, res) => {
  // validate inputs
  const validData = validateAddItem(req.body);

  await Menu.create(validData);
  res.status(StatusCodes.CREATED).json({ msg: 'menu item created' });
};

// Update menu item
const updateMenuItem = async (req, res) => {
  const { id: itemID } = req.params;

  // validate id
  validateMongoId(itemID);
  // validate inputs
  const validData = validateUpdateItem(req.body);

  const item = await Menu.findOneAndUpdate({ _id: itemID }, validData, {
    runValidators: true,
    new: true,
  });

  if (!item) {
    throw new NotFoundError(`No menu item with id: ${itemID}`);
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: 'menu item updated successfully', item });
};

// Delete menu item
const deleteMenuItem = async (req, res) => {
  const { id: itemID } = req.params;

  // validate id
  validateMongoId(itemID);

  // check if the item exists
  const item = await Menu.findOne({ _id: itemID });
  if (!item) {
    throw new NotFoundError(`No menu item with id: ${itemID}`);
  }

  await Menu.deleteOne();

  res.status(StatusCodes.OK).json({ msg: 'menu item removed' });
};

module.exports = {
  getAllMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
