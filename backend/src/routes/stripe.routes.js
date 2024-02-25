const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { paymentGateway } = require('../controllers/stripeControllers');

router.route('/create-checkout-sessions').post(auth, paymentGateway);

module.exports = router;
