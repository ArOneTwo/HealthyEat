const express = require('express');
const path = require('path');
const { userId } = require(path.join(__dirname, '../controller/controller.js'));
const router = express.Router();

router.get('/user/:id', userId);

module.exports = router;
