const express = require('express');
const sequelize = require('./config/sequelise');
require('dotenv').config();
const app_router = require('./router_file/user_route');
const bodyParser = require('body-parser');

const PORT = 4500;
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use('/user', app_router);
app.use('/user/:id', app_router);
app.use('/user', app_router);

sequelize
	.authenticate()
	.then(() => {
		console.log('connected to db');
	})
	.catch((error) => {
		console.log(error);
	});

app.listen(PORT, () => {
	console.log('server started');
});
