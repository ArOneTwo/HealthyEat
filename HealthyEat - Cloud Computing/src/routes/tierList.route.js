const express = require('express');
const path = require('path');
const { getFruitById, getFruitIncrease, getFruitDecrease, addFruit, getFruit, findByClasses, addClasses} = require(path.join(__dirname, '../controller/controller.js'));
const router = express.Router();

router.post("/fruit/increase", getFruitIncrease);
router.post("/fruit/decrease", getFruitDecrease);
router.post("/fruit", getFruit);
router.post("/fruit/:fruit_id", getFruitById);
router.post("/classes/add", addClasses)
router.get("/add", addFruit);
router.get('/classes', findByClasses);


module.exports = router;

