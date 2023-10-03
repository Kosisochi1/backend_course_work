const express = require('express');
const detail_controll = require('./detail_controller');
const validate = require('./detail_middleWare');

const router = express.Router();
router.post(
	'/v1/details',
	validate.validateDetails,
	detail_controll.detail_controll
);
module.exports = router;
