// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models, for which you'll find some blank files in this directory:

// This is a great place to establish associations between your models
// (https://sequelize-guides.netlify.com/association-types/).
// Example:
//
// Puppy.belongsTo(Owner)

const db = require('./database');
const Project = require('./project');
const Robot = require('./robot');

Robot.belongsToMany(Project, { through: 'RobotProjects' });
Project.belongsToMany(Robot, { through: 'RobotProjects' });

module.exports = {
	// Include your models in this exports object as well!
	db,
	Project,
	Robot
};
