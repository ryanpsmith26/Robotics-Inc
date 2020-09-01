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
		return (
			<React.Fragment>
				<div className="MainHeader">
					<h1>All Robots</h1>
				</div>
				{/* check if robots is empty on state */}
				{robots.length ? <RobotCard robots={robots} /> : <p>There are no robots registered in the database!</p>}
			</React.Fragment>
		);
	}
}

const mapState = (state) => {
	return {
		robots: state.robots.allRobots
	};
};

const mapDispatch = (dispatch) => {
	return {
		fetchRobots: () => dispatch(fetchRobots())
	};
};

export default connect(mapState, mapDispatch)(AllRobots);
