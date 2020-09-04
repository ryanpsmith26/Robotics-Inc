import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import RobotCard from './RobotCard';
import { fetchRobots, deleteRobotFromDb } from '../redux/robots';
import { fetchProject, unassignProjectInDb } from '../redux/projects';

export class SingleProject extends React.Component {
	constructor(props) {
		super(props);
		this.id = this.props.match.params.id;
		this.handleDelete = this.handleDelete.bind(this);
		this.handleUnassignProject = this.handleUnassignProject.bind(this);
	}

	componentDidMount() {
		this.props.fetchProject(this.id);
		this.props.fetchRobots();
	}

	handleDelete(robot) {
		this.props.deleteRobot(robot);
	}

	handleUnassignProject(projectId, robotId) {
		this.props.unassignProject(projectId, robotId);
	}

	render() {
		const { project, robots } = this.props;

		// creating filtered robots array to pass into RobotCard component to render on robots on this project:
		const mappedProjectIds = project.Robots.map((robotProject) => robotProject.id);
		const filteredRobots = robots.filter((robot) => mappedProjectIds.includes(robot.id));

		return (
			<React.Fragment>
				<div className="FeaturedProjectDiv">
					<div className="FeaturedProjectContent">
						<h2>{project.title}</h2>
						<p>
							<strong>Status: </strong>
							{project.completed ? 'Complete' : 'Open'}
						</p>
						<p>
							<strong>Deadline: </strong>
							{project.deadline && project.deadline.slice(0, 10)}
						</p>
						<p>
							<strong>Priority: </strong>
							{project.priority}
						</p>
						<div className="EditLinkDiv">
							<Link to={`/projects/single_project/${project.id}/forms/edit`} className="EditLink">
								Edit
							</Link>
						</div>
					</div>
					<div className="FeaturedProjectDesc">
						<p>{project.description}</p>
					</div>
				</div>
				<h2>Robots assigned to this project</h2>
				{/* check if project has any robots */}
				{filteredRobots.length ? (
					filteredRobots.map((robot) => (
						<RobotCard
							key={robot.id}
							robot={robot}
							handleDelete={this.handleDelete}
							displayUnassignBtn={true}
							handleUnassignProject={this.handleUnassignProject}
							projectId={this.id}
						/>
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
		deleteRobot: (robot) => dispatch(deleteRobotFromDb(robot)),
		unassignProject: (projectId, robotId) => dispatch(unassignProjectInDb(projectId, robotId))
	};
};

export default connect(mapState, mapDispatch)(SingleProject);
