const validator = require('joi');

// List of atributes for user model
const id = validator.number().integer();
const email = validator.string().email();
const password = validator.string().min(7);
const role = validator.string().min(5);

const addUserSchema = validator.object({
  email: email.required(),
  password: password.required(),
  role: role.required()
});

const editUserSchema = validator.object({
  email: email,
  password: password,
  role: role,
});

const getUserSchema = validator.object({
  id: id.required()
});

module.exports = {
  addUserSchema,
  editUserSchema,
  getUserSchema
};
