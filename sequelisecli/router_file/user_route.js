const express = require('express');
const user_controller = require('../controller_file/user_controller');
const middlleW = require('../middleWare_file/user_midlleWare');
const router = express.Router();

router.get('/', user_controller.getAllUser);
router.get('/:id', user_controller.getOneUser);
router.post('/', middlleW.createValidation, user_controller.createUser);

module.exports = router;
