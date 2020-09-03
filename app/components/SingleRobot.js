import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ProjectCard from './ProjectCard';
import { fetchRobot, unassignRobotInDb } from '../redux/robots';
import { fetchProjects, deleteProjectFromDb } from '../redux/projects';

export class SingleRobot extends React.Component {
	constructor(props) {
		super(props);
		this.id = this.props.match.params.id;
		this.handleDelete = this.handleDelete.bind(this);
		this.handleUnassignRobot = this.handleUnassignRobot.bind(this);
	}

	componentDidMount() {
		this.props.fetchRobot(this.id);
		this.props.fetchProjects();
	}

	handleDelete(project) {
		this.props.deleteProject(project);
	}

	handleUnassignRobot(robotId, projectId) {
		this.props.unassignRobot(robotId, projectId);
	}

	render() {
		const { robot, projects } = this.props;

		// creating filtered projects array to pass into ProjectCard component to render on projects on this robot:
		const mappedRobotIds = robot.Projects.map((robotProject) => robotProject.id);
		const filteredProjects = projects.filter((project) => mappedRobotIds.includes(project.id));

		return (
			<React.Fragment>
				<div className="FeaturedRobotDiv">
					<img className="FeaturedRobotImage" src={robot.imageUrl} />
					<div className="FeaturedRobotContent">
						<h1>{robot.name}</h1>
						<p>Fuel Type: {robot.fuelType}</p>
						<p>Fuel Level: {robot.fuelLevel}%</p>
						<div className="EditLinkDiv">
							<Link to={`/robots/single_robot/${robot.id}/forms/edit`} className="EditLink">
								Edit
							</Link>
						</div>
					</div>
				</div>
				<h2>Projects assigned to {robot.name}</h2>
				{/* check if projects is empty on state for single robot */}
				{filteredProjects.length ? (
					filteredProjects.map((project) => (
						<ProjectCard
							key={project.id}
							project={project}
							handleDelete={this.handleDelete}
							displayUnassignBtn={true}
							handleUnassignRobot={this.handleUnassignRobot}
							robotId={this.id}
						/>
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
		fetchProjects: () => dispatch(fetchProjects()),
		deleteProject: (project) => dispatch(deleteProjectFromDb(project)),
		unassignRobot: (robotId, projectId) => dispatch(unassignRobotInDb(robotId, projectId))
	};
};

export default connect(mapState, mapDispatch)(SingleRobot);
