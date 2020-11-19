import React from 'react';
import { Link } from 'react-router-dom';

const RobotCard = (props) => {
	const { robot, handleDelete, displayUnassignBtn, handleUnassignProject, projectId } = props;

	return (
		<div className="Card">
			<div className="CardFeaturedDiv">
				<img src={robot.imageUrl} className="CardImg" />
			</div>
			<div className="CardContent">
				<Link to={`/robots/single_robot/${robot.id}`}>
					<h2 className="CardTitle">{robot.name}</h2>
					<p>
						{/* display number of projects */}
						{robot.Projects ? robot.Projects.length : 0}
						{/* display "project" or "projects" */}
						{robot.Projects && robot.Projects.length === 1 ? ' project' : ' projects'}
					</p>
					<p>
						<strong>Fuel Type: </strong>
						{robot.fuelType}
					</p>
					<p>
						<strong>Fuel Level: </strong>
						{robot.fuelLevel}%
					</p>
				</Link>

				{displayUnassignBtn ? (
					<button
						type="button"
						className="CardUnassignBtn"
						onClick={() => handleUnassignProject(projectId, robot.id)}
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
							`This action will permanently delete ${robot.name} in the database. Are you sure you want to continue?`
						) && handleDelete(robot)}
				>
					&times;
				</button>
			</div>
		</div>
	);
};

export default RobotCard;
