import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// RobotCard should be stateless

class RobotCard extends Component {
	constructor(props) {
		super(props);

		// THIS IS USED!
		this.robot = this.props.robot;
		this.handleDelete = this.props.handleDelete;
	}

	render() {
		return (
			<div className="Card">
				<div className="CardFeaturedDiv">
					<img src={this.robot.imageUrl} className="CardImg" />
				</div>
				<div className="CardContent">
					<Link to={`/robots/${this.robot.id}`}>
						<h2 className="CardTitle">{this.robot.name}</h2>
						{/* fixes bug when submitting new robot */}
						<p>{this.robot.Projects ? this.robot.Projects.length : 0} projects</p>
						<p>Fuel Type: {this.robot.fuelType}</p>
						<p>Fuel Level: {this.robot.fuelLevel}%</p>
					</Link>
				</div>
				<button type="button" className="CardDeleteBtn" onClick={() => this.handleDelete(this.robot)}>
					&times;
				</button>
			</div>
		);
	}
}

export default RobotCard;
