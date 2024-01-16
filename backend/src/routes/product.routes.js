const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');
const upload = require('../middlewares/imageUpload');
const cors = require('cors')
const {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require('../controllers/productControllers');

router
  .route('/')
  .post(
    auth,
    isAdmin,
    addProduct
  )
  .get(getProducts);

router
  .route('/:id')
  .get(getProduct)
  .delete(auth, isAdmin, deleteProduct)
  .patch(auth, isAdmin, updateProduct);

module.exports = router;
