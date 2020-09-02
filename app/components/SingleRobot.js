import React from 'react';
import { connect } from 'react-redux';

import ProjectCard from './ProjectCard';
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
		const { robot } = this.props;
		return (
			<React.Fragment>
				<div className="FeaturedRobotDiv">
					<img className="FeaturedRobotImage" src={robot.imageUrl} />
					<div className="FeaturedRobotContent">
						<h1>{robot.name}</h1>
						<p>Fuel Type: {robot.fuelType}</p>
						<p>Fuel Level: {robot.fuelLevel}%</p>
					</div>
				</div>
				<h2>Projects assigned to {robot.name}</h2>
				{/* check if projects is empty on state for single robot */}
				{robot.Projects.length ? (
					robot.Projects.map((project) => <ProjectCard key={project.id} project={project} />)
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
