const router = require('express').Router();
const { Robot, Project } = require('../db');

// GET /api/robots
router.get('/', async (req, res, next) => {
	try {
		const allRobots = await Robot.findAll();
		res.json(allRobots);
	} catch (error) {
		next(error);
	}
});

// GET /api/robots/:id
router.get('/:id', async (req, res, next) => {
	try {
		const robot = await Robot.findByPk(req.params.id, {
			include: [ { model: Project } ]
		});
		res.json(robot);
	} catch (error) {
		next(error);
	}
});

// POST /api/robots
router.post('/', async (req, res, next) => {
	try {
		console.log('req.body in express-------->', req.body);
		await Robot.create(req.body);
		res.end();
	} catch (error) {
		next(error);
	}
});

module.exports = router;
