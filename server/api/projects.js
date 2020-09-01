const router = require('express').Router();
const { Robot, Project } = require('../db');

// GET /api/projects
router.get('/', async (req, res, next) => {
	try {
		const allProjects = await Project.findAll();
		res.json(allProjects);
	} catch (error) {
		next(error);
	}
});

// GET /api/projects/:id
router.get('/:id', async (req, res, next) => {
	try {
		const project = await Project.findByPk(req.params.id, {
			include: [ { model: Robot } ]
		});
		res.json(project);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
