const router = require('express').Router();
const { Robot } = require('../db');

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
		const robot = await Robot.findByPk(req.params.id);
		res.json(robot);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
