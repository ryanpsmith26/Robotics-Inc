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
		defaultValue: 'https://i.pinimg.com/originals/f0/b2/b2/f0b2b2473d5788813bed81d182e6047a.jpg'
	}
});

module.exports = Robot;
