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

// heres what needs to happen:
// onClick we need to handleUnassign -- handleUnassign lives on the SingleRobot and is passed down
// unassignRobot needs to be thunk creator that we call IN handleUnassign
// we have to pass down TWO args: the robot, which is easy, and the project...
// in the thunk creator, we will fetch the robot and set to variable
// then we can modify the instance and do an axios update/save (I guess this could all happen in the backend too...)

// this should take care of the db, then I'll worry about rendering...
