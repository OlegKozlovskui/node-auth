const jwt = require('jsonwebtoken');

const User = require('../models/User');

const signToken = user => {
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

exports.signIn = async (req, res, next) => {

};

exports.signUp = async (req, res, next) => {
  const { email, password } = req.value.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      error: 'User already exist'
    });
  }

  const newUser = await User.create({ email, password });
  const token = signToken(newUser);

  res.status(201).json({
    success: true,
    data: newUser,
    token
  });
};

exports.getSecret = async (req, res, next) => {

};
