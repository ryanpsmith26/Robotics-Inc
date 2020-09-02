import React from 'react';
import { connect } from 'react-redux';

import RobotCard from './RobotCard';
import { fetchRobots } from '../redux/robots';
import { fetchProject } from '../redux/projects';

export class SingleProject extends React.Component {
	constructor(props) {
		super(props);
		this.id = this.props.match.params.id;
	}

	componentDidMount() {
		this.props.fetchProject(this.id);
		this.props.fetchRobots();
	}

	render() {
		const { project, robots } = this.props;
		const mappedProjectIds = project.Robots.map((robotProject) => robotProject.id);
		const filteredRobots = robots.filter((robot) => mappedProjectIds.includes(robot.id));
		console.log('filtered', filteredRobots);

		return (
			<React.Fragment>
				<div>
					<h2>{project.title}</h2>
					<p>Status: {project.completed ? 'Complete' : 'Open'}</p>
					<p>Deadline: {project.deadline}</p>
					<p>Priority: {project.priority}</p>
					<h3>Description: </h3>
					<p>{project.description}</p>
				</div>
				<h2>Robots assigned to this project</h2>
				{/* check if project has any robots */}
				{filteredRobots.length ? (
					filteredRobots.map((robot) => <RobotCard key={robot.id} robot={robot} />)
				) : (
					<p>There are no robots currently assigned to this project</p>
				)}
			</React.Fragment>
		);
	}
}

const mapState = (state) => {
	return {
		project: state.projects.project,
		robots: state.robots.allRobots
	};
};

const mapDispatch = (dispatch) => {
	return {
		fetchProject: (id) => dispatch(fetchProject(id)),
		fetchRobots: () => dispatch(fetchRobots())
	};
};

export default connect(mapState, mapDispatch)(SingleProject);
