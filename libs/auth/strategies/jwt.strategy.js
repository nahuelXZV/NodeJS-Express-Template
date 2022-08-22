const config = require('../../../config/config');
const { Strategy, ExtractJwt } = require('passport-jwt');


const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // extract token from the authorization header
  secretOrKey: config.JWT_AUTH  // secret key
}

const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload); // return payload
});

module.exports = JwtStrategy;
