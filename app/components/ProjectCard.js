import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = (props) => {
	const { project, handleDelete, displayUnassignBtn, handleUnassignRobot, robotId } = props;

	return (
		<div className="Card">
			<div className="CardFeaturedDiv">
				<h2>{project.title}</h2>
			</div>
			<div className="CardContent">
				<Link to={`/projects/single_project/${project.id}`}>
					<p>Status: {project.completed ? 'Complete' : 'Open'}</p>
					<p>Deadline: {project.deadline}</p>
					<p>Priority: {project.priority}</p>
				</Link>
			</div>
			{displayUnassignBtn ? (
				<button
					type="button"
					className="CardUnassignBtn"
					onClick={() => handleUnassignRobot(robotId, project.id)}
				>
					Unassign
				</button>
			) : (
				''
			)}
			<button type="button" className="CardDeleteBtn" onClick={() => handleDelete(project)}>
				&times;
			</button>
		</div>
	);
};

export default ProjectCard;
