require('dotenv').config();
const CONFIG = {
	name: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	dialect: process.env.DB_DIALECT,
};
module.exports = CONFIG;
