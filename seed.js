const { green, red } = require('chalk');
const { db, Project, Robot } = require('./server/db');

const robots = [
	{
		name: 'Spot'
	},
	{
		name: 'Jeff'
	},
	{
		name: 'Henry',
		fuelType: 'diesel'
	}
];

const projects = [
	{
		title: 'My Very First Project',
		deadline: new Date(2020, 9, 31),
		priority: 8,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	},
	{
		title: 'Spot Learns A Trick!',
		deadline: new Date(2020, 11, 25),
		priority: 10,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	}
];

const seed = async () => {
	try {
		await db.sync({ force: true });

		await Promise.all([
			...robots.map((robot) => {
				return Robot.create(robot);
			}),
			...projects.map((project) => {
				return Project.create(project);
			})
		]);
		const robotsFromDb = await Robot.findAll();
		await robotsFromDb[0].addProject(1);
		await robotsFromDb[0].addProject(2);
		await robotsFromDb[2].addProject(2);
	} catch (err) {
		console.log(red(err));
	}
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
	seed()
		.then(() => {
			console.log(green('Seeding success!'));
			db.close();
		})
		.catch((err) => {
			console.error(red('Oh noes! Something went wrong!'));
			console.error(err);
			db.close();
		});
}
