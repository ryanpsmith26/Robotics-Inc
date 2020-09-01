import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchRobot } from '../redux/robots';

export class SingleRobot extends React.Component {
	constructor(props) {
		super(props);
		this.id = this.props.match.params.id;
	}

	componentDidMount() {
		this.props.fetchRobot(this.id);
	}

	render() {
		// Refactor later to render RobotTitle Component
		const { robot } = this.props;
		return (
			<React.Fragment>
				<img src={robot.imageUrl} />
				<h1>{robot.name}</h1>
				<p>Fuel Type: {robot.fuelType}</p>
				<p>Fuel Level: {robot.fuelLevel}%</p>
				<h2>Projects assigned to {robot.name}</h2>
				{/* check if projects is empty on state for single robot */}
				{robot.Projects.length ? (
					robot.Projects.map((project) => (
						<div key={project.id}>
							<Link to={`/projects/${project.id}`}>
								<h2>{project.title}</h2>
							</Link>
							<p>Status: {project.completed ? 'Complete' : 'Open'}</p>
							<p>Deadline: {project.deadline}</p>
							<p>Priority: {project.priority}</p>
						</div>
					))
				) : (
					<p>There are no projects currently assigned to this robot.</p>
				)}
			</React.Fragment>
		);
	}
}

const mapState = (state) => {
	return {
		robot: state.robots.robot
	};
};

const mapDispatch = (dispatch) => {
	return {
		fetchRobot: (id) => dispatch(fetchRobot(id))
	};
};

export default connect(mapState, mapDispatch)(SingleRobot);
