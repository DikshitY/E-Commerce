const User = require('../models/userModel');

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user.role) {
      return res.status(401).json({
        status: 'fail',
        message: 'Unauthorized Access.',
      });
    }
    next()
  } catch (err) {
    res.status(500).send()
  }
};

module.exports = isAdmin