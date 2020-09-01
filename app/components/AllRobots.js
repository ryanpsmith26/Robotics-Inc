import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import RobotCard from './RobotCard';
import NewRobotForm from './NewRobotForm';
import { fetchRobots } from '../redux/robots';

export class AllRobots extends React.Component {
	componentDidMount() {
		this.props.fetchRobots();
	}

	render() {
		const { robots } = this.props;
		return (
			<React.Fragment>
				{/* <NewRobotForm /> */}
				<div className="MainHeader">
					<h1>All Robots</h1>
					<Link to="/robots/forms/add">Add Robot</Link>
				</div>
				{/* check if robots is empty on state */}
				{robots.length ? <RobotCard robots={robots} /> : <p>There are no robots registered in the database!</p>}
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
