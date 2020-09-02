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
	}

	handleDelete(robot) {
		this.props.deleteRobot(robot);
	}

	render() {
		return (
			<div className="Cards">
				{this.robots.map((robot) => (
					<div key={robot.id}>
						<div className="Card">
							<div className="CardFeaturedDiv">
								<img src={robot.imageUrl} className="CardImg" />
							</div>
							<div className="CardContent">
								<Link to={`/robots/${robot.id}`}>
									<h2 className="CardTitle">{robot.name}</h2>
									{/* fixes bug when submitting new robot */}
									<p>{robot.Projects ? robot.Projects.length : 0} projects</p>
									<p>Fuel Type: {robot.fuelType}</p>
									<p>Fuel Level: {robot.fuelLevel}%</p>
								</Link>
							</div>
							<button type="button" className="CardDeleteBtn" onClick={() => this.handleDelete(robot)}>
								&times;
							</button>
						</div>
					</div>
				))}
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
