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
		const { title, description } = req.body;
		if (title && description) {
			await Project.update(
				{
					title,
					description
				},
				{
					where: {
						id: req.body.id
					}
				}
			);
		}
		if (title) {
			await Project.update(
				{
					title
				},
				{
					where: {
						id: req.body.id
					}
				}
			);
		}
		if (description) {
			await Project.update(
				{
					description
				},
				{
					where: {
						id: req.body.id
					}
				}
			);
		}
		// manually retrieving updated project rather than returning from update query, in order to serve back asssociations on object
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
