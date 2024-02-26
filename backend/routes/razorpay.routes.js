const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth');
const { paymentGateway, paymentValidate } = require('../controllers/razorpayControllers');

router.route('/').post(auth, paymentGateway)
router.route('/validate').post(auth,paymentValidate)

module.exports = router;