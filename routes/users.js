const express = require('express');
const router = express.Router();

const {
  signIn,
  signUp,
  getSecret
} = require('../controllers/users');

router.route('/signup').post(signIn);
router.route('/signin').post(signUp);
router.route('/secret').get(getSecret);

module.exports = router;
