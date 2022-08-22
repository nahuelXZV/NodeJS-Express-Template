const LocalStrategy = require('./strategies/local.strategy');
const JwtStrategy = require('./strategies/jwt.strategy');

const passport = require('passport');

passport.use(LocalStrategy);  // use local strategy
passport.use(JwtStrategy);    // use jwt strategy
