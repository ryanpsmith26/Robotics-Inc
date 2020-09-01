import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ProjectCard from './ProjectCard';
import { fetchProjects } from '../redux/projects';

export class AllProjects extends React.Component {
	componentDidMount() {
		this.props.fetchProjects();
	}

	render() {
		const { projects } = this.props;
		return (
			<React.Fragment>
				<div className="MainHeader">
					<h1>All Projects</h1>
				</div>
				{/* check if projects is empty on state */}
				{projects.length ? (
					<ProjectCard projects={projects} />
				) : (
					<p>There are no projects registered in the database.</p>
				)}
			</React.Fragment>
		);
	}
}

const mapState = (state) => {
	return {
		projects: state.projects.allProjects
	};
};

const mapDispatch = (dispatch) => {
	return {
		fetchProjects: () => dispatch(fetchProjects())
	};
};

export default connect(mapState, mapDispatch)(AllProjects);
