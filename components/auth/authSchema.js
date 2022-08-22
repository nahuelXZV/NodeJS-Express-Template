const validator = require('joi');

// List of atributes for user model
const email = validator.string().email();
const password = validator.string().min(7);

const loginSchema = validator.object({
  email: email.required(),
  password: password.required(),
});

module.exports = {
  loginSchema
};
