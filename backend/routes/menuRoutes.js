const express = require('express');
const {
  getAllMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require('../controllers/menuController');

const router = express.Router();

router.route('/menu').get(getAllMenuItems).post(addMenuItem);
router.route('/menu/:id').patch(updateMenuItem).delete(deleteMenuItem);

module.exports = router;
