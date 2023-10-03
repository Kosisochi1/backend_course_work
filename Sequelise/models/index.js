const { Sequelize, DataTypes } = require('sequelize');
const CONFIG = require('../config/config');
const BookModel = require('./book');
const sequelize = new Sequelize(CONFIG.name, CONFIG.user, CONFIG.password, {
	host: CONFIG.host,
	dialect: CONFIG.dialect,
});
sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch((err) => {
		console.log('Unable to connect to the database:', err);
	});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.books = BookModel(sequelize, DataTypes);
db.sequelize
	.sync({ force: false })
	.then(() => {
		console.log(' successfully.');
	})
	.catch((err) => {
		console.log('table:', err);
	});
module.exports = db;
