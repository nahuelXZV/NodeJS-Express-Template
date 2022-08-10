const express = require('express');
const productsRouter = require('../components/products/productRoute');

function mainRouter(app) {

  // Lista de rutas
  const router = express.Router();  //create a router
  app.use('/api', router);        //use the router
  router.use('/products', productsRouter);  //use the productsRouter
}

module.exports = mainRouter;
