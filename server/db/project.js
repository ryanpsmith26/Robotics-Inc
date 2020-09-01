const Sequelize = require('sequelize');
const db = require('./database');

const Project = db.define('Project', {
	title: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	deadline: {
		type: Sequelize.DATE
	},
	priority: {
		type: Sequelize.INTEGER,
		validate: {
			min: 0,
			max: 10
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	description: Sequelize.TEXT
});

module.exports = Project;
