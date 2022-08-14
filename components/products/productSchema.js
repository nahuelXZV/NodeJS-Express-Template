const validator = require('joi');

const name = validator.string().min(3).max(30);
const price = validator.number().integer().min(1);

const addProductSchema = validator.object({
  name: name.required(),
  price: price.required(),
});

const editProductSchema = validator.object({
  name: name,
  price: price,
});

//..................

module.exports = {
  addProductSchema,
  editProductSchema,
};
