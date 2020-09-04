import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import RobotCard from './RobotCard';
import { fetchRobots, deleteRobotFromDb } from '../redux/robots';

export class AllRobots extends React.Component {
	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
		this.state = {
			loading: false
		};
	}

	async componentDidMount() {
		// refactor loading to store??
		this.setState({ loading: true });
		await this.props.fetchRobots();
		this.setState({ loading: false });
	}

	handleDelete(robot) {
		this.props.deleteRobot(robot);
	}

	render() {
		const { robots } = this.props;
		return (
			<React.Fragment>
				<div className="MainHeader">
					<h1>All Robots</h1>
					<Link to="/robots/forms/add">Add Robot</Link>
				</div>
				<div className="Cards">
					{/*  first check if loading is complete, when complete, check if robots is empty on state, finally if neither, render RobotCards */}
					{this.state.loading ? (
						<div className="LoadingMessage">Loading...</div>
					) : robots.length ? (
						robots.map((robot) => (
							<RobotCard
								key={robot.id}
								robot={robot}
								handleDelete={this.handleDelete}
								displayUnassignBtn={false}
							/>
						))
					) : (
						<p>There are no robots registered in the database!</p>
					)}
				</div>
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
