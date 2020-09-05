const router = require('express').Router();
const { Robot, Project } = require('../db');
const { default: Axios } = require('axios');

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

// PUT /api/robots/:id
router.put('/:id', async (req, res, next) => {
	try {
		await Robot.update(
			{ name: req.body.name, fuelType: req.body.fuelType },
			{
				where: {
					id: req.body.id
				}
			}
		);
		// manually retrieving updated robot rather than returning from update query, in order to serve back asssociations on object
		const updatedRobot = await Robot.findByPk(req.body.id, {
			include: [ { model: Project } ]
		});
		res.json(updatedRobot);
	} catch (error) {
		next(error);
	}
});

// PUT /api/robots/:robotId/unassign/:projectId
router.put('/:robotId/unassign/:projectId', async (req, res, next) => {
	try {
		const { robotId, projectId } = req.params;
		const robotToUnassign = await Robot.findByPk(robotId);
		await robotToUnassign.removeProject(projectId);
		const robotIsUnassigned = await Robot.findByPk(robotId, {
			include: [ { model: Project } ]
		});
		res.json(robotIsUnassigned);
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
