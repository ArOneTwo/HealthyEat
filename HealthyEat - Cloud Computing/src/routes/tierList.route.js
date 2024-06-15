const express = require('express');
const path = require('path');
const { getFruitById, getFruit, addFruit} = require(path.join(__dirname, '../controller/userController.js'));
const router = express.Router();

router.post("/fruit", getFruit);
router.post("/fruit/:id", getFruitById);
router.get("/add", addFruit);

module.exports = router;
