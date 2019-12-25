const express = require('express');
const router = require('express-promise-router')();
const password = require('password');
const passportConf = require('../utils/passport');

const { validateBody, schemas } = require('../utils/route-helpers');

const {
  signIn,
  signUp,
  getSecret
} = require('../controllers/users');

router.route(
  validateBody(schemas.authSchemas),
  password.authenticate('local', { session: false }),
  '/signin'
).post(validateBody(schemas.authSchemas), signIn);
router.route('/signup').post(validateBody(schemas.authSchemas), signUp);
router.route(password.authenticate('jwt', { session: false }), '/secret').get(getSecret);

module.exports = router;
