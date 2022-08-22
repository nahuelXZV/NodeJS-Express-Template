const AuthController = require('../../../components/auth/authController');
const { Strategy } = require('passport-local');

const controller = new AuthController();

const LocalStrategy = new Strategy({
  usernameField: 'email', // usernameField is the name of the field that will be used to find the user
  passwordField: 'password' // passwordField is the name of the field that will be used to find the user
},
  async (email, password, done) => {
    try {
      const user = await controller.getUser(email, password); // find user by email
      done(null, user); // return user
    } catch (error) {
      done(error, false); // return error
    }
  }
);

module.exports = LocalStrategy;
