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

// PUT /api/projects/:id
router.put('/:id', async (req, res, next) => {
	try {
		await Project.update(
			// refactor to utilize params instead of sending back the whole project to lighten the req load and simplify:
			{ title: req.body.title },
			{
				where: {
					id: req.body.id
				}
			}
		);
		const updatedProject = await Project.findByPk(req.body.id, {
			include: [ { model: Robot } ]
		});
		res.json(updatedProject);
	} catch (error) {
		next(error);
	}
});

// PUT /api/projects/:id/completed
router.put('/:id/completed', async (req, res, next) => {
	try {
		const project = await Project.findByPk(req.params.id);
		const currentStatus = project.completed;

		await Project.update(
			{ completed: !currentStatus },
			{
				where: { id: req.params.id }
			}
		);
		const updatedProject = await Project.findByPk(req.params.id, {
			include: [ { model: Robot } ]
		});
		res.json(updatedProject);
	} catch (error) {
		next(error);
	}
});

// PUT /api/projects/:projectId/unassign/:robotId
router.put('/:projectId/unassign/:robotId', async (req, res, next) => {
	try {
		const { robotId, projectId } = req.params;
		const projectToUnassign = await Project.findByPk(projectId);
		await projectToUnassign.removeRobot(robotId);
		const projectIsUnassigned = await Project.findByPk(projectId, {
			include: [ { model: Robot } ]
		});
		res.json(projectIsUnassigned);
	} catch (error) {
		next(error);
	}
});

// DELETE /api/projects
router.delete('/', async (req, res, next) => {
	try {
		await Project.destroy({
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
