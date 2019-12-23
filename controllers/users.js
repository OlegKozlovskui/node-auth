const User = require('../models/User');

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

  res.status(201).json({
    success: true,
    data: newUser
  });
};

exports.getSecret = async (req, res, next) => {

};
