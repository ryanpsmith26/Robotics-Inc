const router = require('express').Router();
const { Robot, Project } = require('../db');

// PUT /api/robots/:id
router.put('/:id', async (req, res, next) => {
	try {
		console.log('req.body from PUT route----->', req.body);
		const [ , [ updatedRobot ] ] = await Robot.update(
			{ ...req.body },
			{
				where: {
					id: req.body.id
				},
				returning: true
			}
		);
		res.json(updatedRobot);
	} catch (error) {
		next(error);
	}
});

// GET /api/robots
router.get('/', async (req, res, next) => {
	try {
		const allRobots = await Robot.findAll({
			include: [ { model: Project } ]
		});
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
		await Robot.create(req.body);
		const newRobotId = await Robot.max('id');
		const newRobot = await Robot.findByPk(newRobotId);
		res.json(newRobot);
	} catch (error) {
		next(error);
	}
});

// DELETE /api/robots
router.delete('/', async (req, res, next) => {
	try {
		await Robot.destroy({
			where: {
				id: req.body.id
			}
		});
		res.end();
	} catch (error) {
		next(error);
	}
});

module.exports = router;
