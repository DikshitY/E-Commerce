const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')
const {createUser,loginUser, test} = require('../controllers/userControllers')


router.route('/signup').post(createUser)
router.route('/login').post(loginUser)
router.route('/resetpassword').post(resetpassword)
router.route('/test').get(auth,isAdmin,test)

module.exports = router;