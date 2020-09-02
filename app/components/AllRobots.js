import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import RobotCard from './RobotCards';
import { fetchRobots } from '../redux/robots';

export class AllRobots extends React.Component {
	componentDidMount() {
		this.props.fetchRobots();
	}

	render() {
		const { robots, newRobot } = this.props;
		console.log('allrobots--->', robots);
		return (
			<React.Fragment>
				<div className="MainHeader">
					<h1>All Robots</h1>
					<Link to="/robots/forms/add">Add Robot</Link>
				</div>
				{/* add newRobot submission from state if exists */}
				{newRobot.name && <RobotCard robots={[ newRobot ]} />}
				{/* check if robots is empty on state */}
				{robots.length ? <RobotCard robots={robots} /> : <p>There are no robots registered in the database!</p>}
			</React.Fragment>
		);
	}
}

const mapState = (state) => ({
	robots: state.robots.allRobots,
	newRobot: state.robots.newRobot
});

const mapDispatch = (dispatch) => ({
	fetchRobots: () => dispatch(fetchRobots())
});

export default connect(mapState, mapDispatch)(AllRobots);
