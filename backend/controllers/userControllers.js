const User = require('../models/userModel');
const { sendResetPasswordMail } = require('../emails/passwordReset');

exports.getUser = async (req, res) => {
  try {
    res.send(req.user)
  } catch (err) {
    res.status(500).send()
  }
}

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
      status: 'success',
      message: 'User logged in.',
      user,
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Email or password is incorrect.',
    });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send()
  }
}

exports.forgetpassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: 'User does not exist.',
      });
    }
    const token = await user.generateAuthToken();
    sendResetPasswordMail(user.email, user._id, token);
    res.send();
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong.',
    });
  }
};

exports.resetpassword = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['password'];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid Update.',
    });
  }
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send(err);
  }
};
