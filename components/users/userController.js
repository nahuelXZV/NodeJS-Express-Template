const { models } = require('../../libs/sequelize');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');

class UserController {
  constructor() { }

  async add(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash
    });
    delete newUser.dataValues.password;
    delete newUser.dataValues.recoveryToken;
    return newUser;
  }

  async edit(data, id) {
    const hash = await bcrypt.hash(data.password, 10);
    const user = await this.find(id);
    const UserUpdated = await user.update({
      ...data,
      password: hash
    });
    delete UserUpdated.dataValues.password;
    delete UserUpdated.dataValues.recoveryToken;
    return UserUpdated;
  }

  async delete(id) {
    const user = await this.find(id);
    await user.destroy();
    return id;
  }

  async find(id) {
    const UserFound = await models.User.findByPk(id, {
      attributes: { exclude: ['password', 'recoveryToken'] }
    });
    if (!UserFound) {
      throw boom.notFound('User not found');
    }
    return UserFound;
  }

  async findByEmail(email) {
    const rta = await models.User.findOne({
      where: { email },
      attributes: { exclude: ['password', 'recoveryToken'] }
    });
    return rta;
  }

  async getAll() {
    const users = await models.User.findAll({
      attributes: { exclude: ['password', 'recoveryToken'] }
    });
    return users;
  }
}

module.exports = UserController;
