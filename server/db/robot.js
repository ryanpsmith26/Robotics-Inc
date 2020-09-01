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
		defaultValue: 'https://roboticsandautomationnews.com/wp-content/uploads/2020/06/boston-dynamics-spot-2.jpg'
	}
});

module.exports = Robot;
