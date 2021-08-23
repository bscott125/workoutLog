const { DataTypes } = require('sequelize');
const db = require('../db');

const Workout = db.define('workout', {
	descriptions: {
		type: DataTypes.STRING,
		allowNull: false
	},
	definitions: {
		type: DataTypes.STRING,
		allowNull: false
	},
	results: {
		type: DataTypes.STRING,
		allowNull: false
	},
	owner: {
		type: DataTypes.INTEGER
	}
});

module.exports = Workout;