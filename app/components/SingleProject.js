import React from 'react';
import { connect } from 'react-redux';

import RobotCard from './RobotCard';
import { fetchRobots } from '../redux/robots';
import { fetchProject } from '../redux/projects';

export class SingleProject extends React.Component {
	constructor(props) {
		super(props);
		this.id = this.props.match.params.id;
		this.project = this.props.project;
		this.robots = this.props.robots;
	}

	componentDidMount() {
		this.props.fetchProject(this.id);
		console.log('on comp mount in single project, this.project-->', this.project);
		this.props.fetchRobots();
	}

	render() {
		console.log('inside single proj this.id', this.id);
		console.log('inside single proj RENDER this.project-->', this.project);
		console.log('inside single proj this.robots-->', this.robots);

		const mappedProjectIds = this.project.Robots.map((robotProject) => robotProject.id);
		const filteredRobots = this.robots.filter((robot) => mappedProjectIds.includes(robot.id));

		return (
			<React.Fragment>
				<div>
					<h2>{this.project.title}</h2>
					<p>Status: {this.project.completed ? 'Complete' : 'Open'}</p>
					<p>Deadline: {this.project.deadline}</p>
					<p>Priority: {this.project.priority}</p>
					<h3>Description: </h3>
					<p>{this.project.description}</p>
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
