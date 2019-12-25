const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');

const User = require('../models/User');

// JWT Strategy
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);
    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch (err) {
    done(err, false)
  }
}));

// Local Strategy
passport.use(new LocalStrategy({
 usernameField: 'email',
}, async (email, password, done) => {
  try {
    const user = await User.findOne(email);

    if (!user) {
      return done(null, false);
    }

    const isMatch = await user.isValidPassword(password);

    if (!isMatch) {
      return done(null, false);
    }

    done(null, user);
  } catch (err) {
    done(err, false)
  }
}));
