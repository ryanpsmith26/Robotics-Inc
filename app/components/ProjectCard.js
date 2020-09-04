import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = (props) => {
	const { project, handleDelete, displayUnassignBtn, handleUnassignRobot, robotId } = props;

	return (
		<div className="Card">
			<div className="CardFeaturedDiv CardFeaturedProjectDiv">
				<h2>{project.title}</h2>
			</div>
			<div className="CardContent">
				<Link to={`/projects/single_project/${project.id}`}>
					<p>
						<strong>Status: </strong>
						{project.completed ? 'Complete' : 'Active'}
					</p>
					<p>
						<strong>Deadline: </strong>
						{project.deadline && project.deadline.slice(0, 10)}
					</p>
					<p>
						<strong>Priority: </strong>
						{project.priority}
					</p>
				</Link>
			</div>
			{/* only display unassign button in the single robot view */}
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
			<button
				type="button"
				className="CardDeleteBtn"
				onClick={() =>
					// eslint-disable-next-line no-alert
					window.confirm(
						'This action will permanently delete the project in the database. Are you sure you want to continue?'
					) && handleDelete(project)}
			>
				&times;
			</button>
		</div>
	);
};

export default ProjectCard;
