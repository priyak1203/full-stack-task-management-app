const getAllMenuItems = (req, res) => {
  res.send('All menu items');
};

const addMenuItem = (req, res) => {
  res.send('Add menu item');
};

const updateMenuItem = (req, res) => {
  res.send('Update menu item');
};

const deleteMenuItem = (req, res) => {
  res.send('Add menu item');
};

module.exports = {
  getAllMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
