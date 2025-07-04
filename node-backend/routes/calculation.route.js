const express = require('express');
const router = express.Router();
const controller = require('../controllers/calculator.controller')

router.post('/',controller.calculate );

module.exports = router;