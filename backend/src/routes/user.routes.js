const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')
const {createUser,loginUser, test, forgetpassword, resetpassword, logoutUser, getUser} = require('../controllers/userControllers')


router.route('/me').get(auth, getUser)
router.route('/signup').post(createUser)
router.route('/login').post(loginUser)
router.route('/logout').post(auth, logoutUser)
router.route('/forgetpassword').post(forgetpassword)
router.route('/resetpassword').post(auth, resetpassword)
router.route('/test').get(auth,isAdmin,test)

module.exports = router;