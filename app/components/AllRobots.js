import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import RobotCard from './RobotCard';
import { fetchRobots } from '../redux/robots';

export class AllRobots extends React.Component {
	componentDidMount() {
		this.props.fetchRobots();
	}

	render() {
		const { robots } = this.props;
		console.log('allrobots--->', robots);
		return (
			<React.Fragment>
				<div className="MainHeader">
					<h1>All Robots</h1>
					<Link to="/robots/forms/add">Add Robot</Link>
				</div>
				{robots.length ? (
					robots.map((robot) => <RobotCard key={robot.id} robot={robot} />)
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
	fetchRobots: () => dispatch(fetchRobots())
});

export default connect(mapState, mapDispatch)(AllRobots);
