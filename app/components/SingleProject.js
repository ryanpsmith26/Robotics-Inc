import React from 'react';
import { connect } from 'react-redux';

import RobotCards from './RobotCards';
import { fetchProject } from '../redux/projects';

export class SingleProject extends React.Component {
	constructor(props) {
		super(props);
		this.id = this.props.match.params.id;
	}

	componentDidMount() {
		this.props.fetchProject(this.id);
	}

	render() {
		const { project } = this.props;
		return (
			<React.Fragment>
				<div>
					<h2>{project.title}</h2>
					<p>Status: {project.completed ? 'Complete' : 'Open'}</p>
					<p>Deadline: {project.deadline}</p>
					<p>Priority: {project.priority}</p>
					<p>Description: {project.description}</p>
				</div>
				<h2>Robots assigned to this project</h2>
				{/* check if robots is empty on state for any project */}
				{project.Robots.length ? (
					<RobotCards robots={project.Robots} />
				) : (
					<p>There are no robots currently assigned to this project</p>
				)}
			</React.Fragment>
		);
	}
}

const mapState = (state) => {
	return {
		project: state.projects.project
	};
};

const mapDispatch = (dispatch) => {
	return {
		fetchProject: (id) => dispatch(fetchProject(id))
	};
};

export default connect(mapState, mapDispatch)(SingleProject);
