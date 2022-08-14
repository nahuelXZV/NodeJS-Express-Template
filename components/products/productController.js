const model = require('./productModel');
const boomError = require('@hapi/boom');

class productController {
  constructor() {
    this.list = [];
  }

  add(data) {
    return new Promise(async (resolve, reject) => {
      if (!data['name'] || !data['price']) {
        //validate data
        console.error('[productController] No hay datos');
        reject(boomError.badRequest('No hay datos'));
      } else {
        //manipulate data
        //save data
        //const fullUser = {
        //name: username,
        //};
        await this.list.push(data)
        return resolve(data);
      }
    });
  }

  async edit(id, data) {
    // validate data
    // manipulate data
    // save data
    return this.list[id] = data;
  }

  async delete(id) {
    // validate data
    // manipulate data
    // save data
    return this.list.splice(id, 1);
  }

  async find(id) {
    // validate data
    // manipulate data
    // save data
    return this.list[id];
  }

  async getAll(filter) {
    // validate data
    // manipulate data
    // save data
    return this.list;
  }
}

module.exports = productController;
