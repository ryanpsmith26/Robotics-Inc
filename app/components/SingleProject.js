import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import RobotCard from './RobotCard';
import { fetchRobots, deleteRobotFromDb } from '../redux/robots';
import { fetchProject } from '../redux/projects';

export class SingleProject extends React.Component {
	constructor(props) {
		super(props);
		this.id = this.props.match.params.id;
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentDidMount() {
		this.props.fetchProject(this.id);
		this.props.fetchRobots();
	}

	handleDelete(robot) {
		this.props.deleteRobot(robot);
	}

	render() {
		const { project, robots } = this.props;

		// creating filtered robots array to pass into RobotCard component to render on robots on this project:
		const mappedProjectIds = project.Robots.map((robotProject) => robotProject.id);
		const filteredRobots = robots.filter((robot) => mappedProjectIds.includes(robot.id));

		return (
			<React.Fragment>
				<div>
					<h2>{project.title}</h2>
					<p>Status: {project.completed ? 'Complete' : 'Open'}</p>
					<p>Deadline: {project.deadline}</p>
					<p>Priority: {project.priority}</p>
					<div className="EditLinkDiv">
						<Link to="forms/edit" className="EditLink">
							Edit
						</Link>
					</div>
					<h3>Description: </h3>
					<p>{project.description}</p>
				</div>
				<h2>Robots assigned to this project</h2>
				{/* check if project has any robots */}
				{filteredRobots.length ? (
					filteredRobots.map((robot) => (
						<RobotCard key={robot.id} robot={robot} handleDelete={this.handleDelete} />
					))
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
		fetchRobots: () => dispatch(fetchRobots()),
		deleteRobot: (robot) => dispatch(deleteRobotFromDb(robot))
	};
};

export default connect(mapState, mapDispatch)(SingleProject);
