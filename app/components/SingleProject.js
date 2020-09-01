import React from 'react';
import { connect } from 'react-redux';

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
					<h3>Title: {project.title}</h3>
					<p>Status: {project.completed ? 'Complete' : 'Open'}</p>
					<p>Deadline: {project.deadline}</p>
					<p>Priority: {project.priority}</p>
					<p>Description: {project.description}</p>
				</div>
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
