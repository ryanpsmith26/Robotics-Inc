const router = require('express').Router();
const { Project } = require('../db');

// GET /api/projects
router.get('/', async (req, res, next) => {
	try {
		const allProjects = await Project.findAll();
		res.json(allProjects);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
