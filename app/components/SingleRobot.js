import React from 'react';
import { connect } from 'react-redux';

import ProjectCard from './ProjectCard';
import { fetchRobot, fetchRobots } from '../redux/robots';
import { fetchProjects, deleteProjectFromDb } from '../redux/projects';

export class SingleRobot extends React.Component {
	constructor(props) {
		super(props);
		this.id = this.props.match.params.id;
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentDidMount() {
		this.props.fetchRobot(this.id);
		this.props.fetchProjects();
	}

	handleDelete(project) {
		this.props.deleteProject(project);
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
					robot.Projects.map((project) => (
						<ProjectCard key={project.id} project={project} handleDelete={this.handleDelete} />
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
		robot: state.robots.robot,
		projects: state.projects.allProjects
	};
};

const mapDispatch = (dispatch) => {
	return {
		fetchRobot: (id) => dispatch(fetchRobot(id)),
		fetchRobots: () => dispatch(fetchRobots()),
		fetchProjects: () => dispatch(fetchProjects()),
		deleteProject: (project) => dispatch(deleteProjectFromDb(project))
	};
};

export default connect(mapState, mapDispatch)(SingleRobot);
