const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: [true, 'Email is already registered.'],
      trim: true,
      validate(email) {
        if (!validator.isEmail(email)) throw new Error('Enter valid email.');
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      minlength: 7
    },
    // phone: {
    //   type: String,
    //   required: [true, 'Phone number is required.'],
    // },
    // adress: {
    //   type: String,
    //   required: [true, 'Adress is required.'],
    // },
    role: {
      type: Boolean,
      default: false,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  
  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens.push({ token });
  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      status: 'fail',
      message: 'Email or password is incorrect.'
    })
  }
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return res.status(400).json({
      status: 'fail',
      message: 'Email or password is incorrect.'
    })
  }

  return user;
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
