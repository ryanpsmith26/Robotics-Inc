const { green, red } = require('chalk');
const { db, Project, Robot } = require('./server/db');

const starterRobots = [
	{
		name: 'Spot',
		imageUrl: 'https://roboticsandautomationnews.com/wp-content/uploads/2020/06/boston-dynamics-spot-2.jpg'
	},
	{
		name: 'Jeff'
	},
	{
		name: 'Henry',
		fuelType: 'diesel'
	}
];

const starterProjects = [
	{
		title: 'Halloween Costume Generator',
		deadline: new Date(2020, 9, 31),
		priority: 8,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	},
	{
		title: 'Spot Learns A Christmas Trick!',
		deadline: new Date(2020, 11, 25),
		priority: 10,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	},
	{
		title: 'New Years Resolutions',
		deadline: new Date(2021, 0, 1),
		priority: 3,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	}
];

const bulkCreateRobots = (robots) => {
	for (let i = 0; i < 100; i++) {
		robots.push({ name: 'Generic John' });
	}
	return robots;
};

const oneHundredAndThreeRobots = bulkCreateRobots(starterRobots);

const bulkCreateProjects = (projects) => {
	for (let i = 0; i < 100; i++) {
		projects.push({
			title: 'A Cog In The Wheel',
			priority: 0,
			deadline: new Date(3000, 0, 1),
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
		});
	}
	return projects;
};

const oneHundredAndThreeProjects = bulkCreateProjects(starterProjects);

const seed = async () => {
	try {
		await db.sync({ force: true });

		await Promise.all([
			...oneHundredAndThreeRobots.map((robot) => {
				return Robot.create(robot);
			}),
			...oneHundredAndThreeProjects.map((project) => {
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
