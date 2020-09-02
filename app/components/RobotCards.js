import React from 'react';
import { Link } from 'react-router-dom';

const RobotCard = (props) => {
	const { robots } = props;

	return (
		<div className="Cards">
			{robots.map((robot) => (
				<div key={robot.id}>
					<div className="Card">
						<div className="CardFeaturedDiv">
							<img src={robot.imageUrl} className="CardImg" />
						</div>
						<div className="CardContent">
							<Link to={`/robots/${robot.id}`}>
								<h2 className="CardTitle">{robot.name}</h2>
								{/* quick fix for bug when submitting new robot */}
								<p>{robot.Projects ? robot.Projects.length : 0} projects</p>
								<p>Fuel Type: {robot.fuelType}</p>
								<p>Fuel Level: {robot.fuelLevel}%</p>
							</Link>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default RobotCard;
