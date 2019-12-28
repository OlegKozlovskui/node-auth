const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../utils/passport');

const { validateBody, schemas } = require('../utils/route-helpers');

const {
  signIn,
  signUp,
  googleOAuth,
  getSecret
} = require('../controllers/users');

const jwtStrategy = passport.authenticate('jwt', { session: false });
const localStrategy = passport.authenticate('local', { session: false });
const googleStrategy = passport.authenticate('googleStrategy', { session: false });

router.route('/signup').post(validateBody(schemas.authSchemas), signUp);
router.route('/signin').post(validateBody(schemas.authSchemas), localStrategy, signIn);
router.route('/oauth/google').post(googleStrategy, googleOAuth);
router.route('/secret').get(jwtStrategy, getSecret);

module.exports = router;
