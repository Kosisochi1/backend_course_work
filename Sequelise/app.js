const express = require('express');
// const dbConfig = require('../Sequelise/config/config');
const router_app = require('./router_app/router');
require('dotenv').config;
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use('/', router_app);
app.listen(PORT, () => {
	console.log('server started');
});
