const express = require("express");
const controllers = require("./postControllers")

const router = express.Router();

router.get('/', controllers.list);

router.get('/:id', controllers.detail);

module.exports = router;