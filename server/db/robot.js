const Sequelize = require('sequelize');
const db = require('./database');

const Robot = db.define('Robot', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	fuelType: {
		type: Sequelize.STRING,
		defaultValue: 'electric',
		validate: {
			isIn: [ [ 'electric', 'gas', 'diesel' ] ]
		}
	},
	fuelLevel: {
		type: Sequelize.FLOAT,
		defaultValue: 100,
		validate: {
			min: 0,
			max: 100
		}
	},
	imageUrl: {
		type: Sequelize.TEXT,
		defaultValue:
			'https://cdn.imgbin.com/0/19/2/imgbin-robot-cartoon-android-robot-gray-and-purple-robot-illustration-D14ZGq4nQQjhsGY5gHzRYbx0X.jpg'
	}
});

module.exports = Robot;
