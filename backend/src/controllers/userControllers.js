const User = require('../models/userModel');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = await user.generateAuthToken();

    res.status(201).json({
      status: 'success',
      message: 'User created successfully.',
      user,
      token,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    res.json({
        status: "success",
        message: "User logged in.",
        user,
        token
    })
  } catch (err) {
    res.status(400).json({
        status:"fail",
        message: 'Email or password is incorrect.',
    })
  }
};

exports.test = async(req, res, next) => {
    try {
        res.send("User is admin")
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.resetpassword = async (req,res) => {
  try {
    const {email} = req.body
    const user = await User.findOne({email})
    if(!user){
      return res.status(404).json({
        message: 'User does not exist.'
      })
    }
  } catch (err) {
    
  }
}