const express = require('express');
const router = require('express-promise-router')();

const { validateBody, schemas } = require('../utils/route-helpers');

const {
  signIn,
  signUp,
  getSecret
} = require('../controllers/users');

router.route('/signup').post(validateBody(schemas.authSchemas), signIn);
router.route('/signin').post(validateBody(schemas.authSchemas), signUp);
router.route('/secret').get(getSecret);

module.exports = router;
