const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy({ usernameField: 'email' },
  async (email, password, done) => { // called when user tries to log in
    try {
      const user = await User.findOne({ email }); // look for user with the provided email
      if (!user) { 
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user); 
    } catch (error) {
      return done(error);
    }
  }
));

// serialize the user ID to save in the session for a logged-in user
passport.serializeUser((user, done) => done(null, user.id));

// deserialize the user ID from the session to retrieve user details
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
