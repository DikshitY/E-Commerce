const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');
const {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require('../controllers/productControllers');

router.route('/').post(auth, isAdmin, addProduct).get(getProducts);

router
  .route('/:id')
  .get(getProduct)
  .delete(auth, isAdmin, deleteProduct)
  .patch(auth, isAdmin, updateProduct);

module.exports = router;
