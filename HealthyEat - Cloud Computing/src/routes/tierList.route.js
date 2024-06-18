const express = require('express');
const path = require('path');
const { getFruitById, getFruitIncrease, getFruitDecrease, addFruit, getFruit} = require(path.join(__dirname, '../controller/userController.js'));
const router = express.Router();

router.post("/fruit/increase", getFruitIncrease);
router.post("/fruit/decrease", getFruitDecrease);
router.post("/fruit", getFruit);
router.post("/fruit/:fruit_id", getFruitById);
router.get("/add", addFruit);

module.exports = router;
