const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  addItemToCart,
  getCartItems,
  deleteCartItem,
  removeCartSingleItem,
  removeItems,
} = require('../controllers/cartControllers');

router
  .route('/:p_id')
  .post(auth, addItemToCart)
  .delete(auth, deleteCartItem)
  .patch(auth, removeCartSingleItem);

router.route('/').get(auth, getCartItems).delete(auth, removeItems);

module.exports = router;
