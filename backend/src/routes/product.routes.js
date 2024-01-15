const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');
const upload = require('../middlewares/imageUpload');
const {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  getProductImage
} = require('../controllers/productControllers');

router
  .route('/')
  .post(
    auth,
    isAdmin,
    upload.single('image'),
    addProduct,
    (error, req, res, next) => {
      res.status(400).send({ error: error.message });
    }
  )
  .get(getProducts);

router
  .route('/:id')
  .get(getProduct)
  .delete(auth, isAdmin, deleteProduct)
  .patch(auth, isAdmin, updateProduct);

router.route('/getProductImage/:id').get(getProductImage)

module.exports = router;
