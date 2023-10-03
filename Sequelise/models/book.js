const { DataTypes, sequelize } = require('sequelize');
const { sequelize } = require('./');

module.exports = (sequelize, DataTypes) => {
	const BookModel = sequelize.define(
		'Book',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			year: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{ tableName: 'books' }
	);
	return BookModel;
};
