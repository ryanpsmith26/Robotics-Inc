const router = require('express').Router();
const { Robot, Project } = require('../db');

// GET /api/projects
router.get('/', async (req, res, next) => {
	try {
		const allProjects = await Project.findAll({
			include: [ { model: Robot } ]
		});
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

// POST /api/projects
router.post('/', async (req, res, next) => {
	try {
		await Project.create(req.body);
		const newProjectId = await Project.max('id');
		const newProject = await Project.findByPk(newProjectId);
		res.json(newProject);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
