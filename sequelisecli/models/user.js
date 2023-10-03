const sequelize = require('../config/sequelise');
const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');
const User = sequelize.define(
	'users',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			require: true,
		},
		Sex: {
			type: DataTypes.ENUM,
			values: ['male', 'female'],
			defaultValue: 'male',
		},
	},
	{
		timestamps: true,
		createdAt: true,
		updatedAt: true,
	}
);
User.beforeCreate(async (user, options) => {
	const hash = await bcrypt.hash(user.password, 10);
	user.password = hash;
});
User.prototype.comparePassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

module.exports = User;
