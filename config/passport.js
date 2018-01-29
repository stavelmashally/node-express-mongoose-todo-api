const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../app/users/user-model');
const config = require('./config');

const options = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.jwtSecret,
};

module.exports = () => {
  passport.use(new Strategy(options, (jwtPayload, done) => {
    User.findOne({ _id: jwtPayload.user._id })
      .then((user) => {
        if (user) {
            // console.log(user);
          done(null, user);
        } else {
          done(null, false);
        }
      })
      .catch(e => done(e, false));
  }));
  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', { session: false }),
  };
};
