const User = require('../models/user');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json);

const getAllUser = async (req, res, next) => {
	const users = await User.findAll();
	res.status(200).json(users);
};
const getOneUser = async (req, res) => {
	const qid = req.params.id;
	const user = await User.findOne({ where: { id: qid } });
	res.status(200).json(user);
};
const createUser = async (req, res) => {
	const reqBody = req.body;
	const existingUser = await User.findOne({ where: { email: reqBody.email }  });
	if (existingUser) {
		return res.status(409).json({
			massage: 'User already existed',
		});
	}

	const newUser = await User.create(reqBody);
	const token = await jwt.sign(
		{ email: newUser.email },
		process.env.JWT_SECRETE
	);
	return res.status(201).json({
		massage: 'success',
		newUser,
		token,
	});
};
module.exports = {
	getAllUser,
	getOneUser,
	createUser,
};
