const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-plus-token');
const { ExtractJwt } = require('passport-jwt');

const User = require('../models/User');

// JWT Strategy
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET,
  passReqToCallback: true
}, async (req, payload, done) => {
  try {
    const user = await User.findById(payload.sub);

    if (!user) {
      return done(null, false);
    }

    req.user = user;
    done(null, user);
  } catch(error) {
    done(error, false);
  }
}));

// Google Strategy
passport.use('googleStrategy', new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET_KEY,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({ "google.id": profile.id });
    if (existingUser) {
      return done(null, existingUser);
    }

    const newUser = await User.create({
      method: 'google',
      google: {
        id: profile.id,
        email: profile.emails[0].value
      }
    });

    done(null, newUser);
  } catch(error) {
    done(error, false);
  }
}));

// Local Strategy
passport.use(new LocalStrategy({
 usernameField: 'email',
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ "local.email": email });

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
