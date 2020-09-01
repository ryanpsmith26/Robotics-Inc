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

module.exports = router;
