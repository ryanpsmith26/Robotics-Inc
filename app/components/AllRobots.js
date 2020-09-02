import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import RobotCard from './RobotCard';
import { fetchRobots, deleteRobotFromDb } from '../redux/robots';

export class AllRobots extends React.Component {
	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
	}
	componentDidMount() {
		this.props.fetchRobots();
	}

	handleDelete(robot) {
		this.props.deleteRobot(robot);
		this.props.fetchRobots();
	}

	render() {
		const { robots } = this.props;
		return (
			<React.Fragment>
				<div className="MainHeader">
					<h1>All Robots</h1>
					<Link to="/robots/forms/add">Add Robot</Link>
				</div>
				{/*  check if robots is empty on state */}
				{robots.length ? (
					robots.map((robot) => <RobotCard key={robot.id} robot={robot} handleDelete={this.handleDelete} />)
				) : (
					<p>There are no robots registered in the database!</p>
				)}
			</React.Fragment>
		);
	}
}

const mapState = (state) => ({
	robots: state.robots.allRobots
});

const mapDispatch = (dispatch) => ({
	fetchRobots: () => dispatch(fetchRobots()),
	deleteRobot: (robot) => dispatch(deleteRobotFromDb(robot))
});

export default connect(mapState, mapDispatch)(AllRobots);
