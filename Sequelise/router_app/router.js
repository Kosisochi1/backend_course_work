const express = require('express');
const bookController = require('../bookController/bookcontroller');
const router = express.Router();

router.get('/', bookController.getAllBook);
router.post('/', bookController.addBook);

module.exports = router;
