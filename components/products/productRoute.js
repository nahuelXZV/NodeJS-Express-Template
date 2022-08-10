const express = require('express');
const productController = require('./productController');
const response = require("../../network/response");
const router = express.Router();
const controller = new productController();

router.get("/", async (req, res) => {
  const { name } = req.query;   //normally it use for filtering
  await controller.getAll(name)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch((err) => {
      response.error(req, res, err, 500, err);
    });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;    //used for getting the parameter
  await controller.find(id)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch((err) => {
      response.error(req, res, err, 500, err);
    });
});

router.post("/", async (req, res, next) => {
  const body = req.body;        //used for getting the body
  await controller.add(body)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
