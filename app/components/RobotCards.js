import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteRobotFromDb } from '../redux/robots';

class RobotCard extends Component {
	constructor(props) {
		super(props);
		// from store:
		this.allRobots = this.props.allRobots;
		// from parent:
		this.robots = this.props.robots;
		// current passing down robots arrays from two components
		// AllRobots and SingleProject
		// The tricky one is SingleProject
		this.handleDelete = this.handleDelete.bind(this);

		// from allRobots refactored:
		this.robot = this.props.robot;
	}

	handleDelete(robot) {
		this.props.deleteRobot(robot);
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

const mapState = (state) => ({
	allRobots: state.allRobots
});

const mapDispatch = (dispatch) => ({
	deleteRobot: (robot) => dispatch(deleteRobotFromDb(robot))
});

export default connect(mapState, mapDispatch)(RobotCard);
