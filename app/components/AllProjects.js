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
		const { projects, newProject } = this.props;
		return (
			<React.Fragment>
				<div className="MainHeader">
					<h1>All Projects</h1>
					<Link to="/projects/forms/add">Add Project</Link>
				</div>
				{/* add newProject submission from state if exists */}
				{/* {newProject.title && <ProjectCard projects={[ newProject ]} />} */}
				{/* check if projects is empty on state */}
				{projects.length ? (
					projects.map((project) => <ProjectCard key={project.id} project={project} />)
				) : (
					<p>There are no projects registered in the database.</p>
				)}
			</React.Fragment>
		);
	}
}

const mapState = (state) => ({
	projects: state.projects.allProjects
	// newProject: state.projects.newProject
});

const mapDispatch = (dispatch) => ({
	fetchProjects: () => dispatch(fetchProjects())
});

export default connect(mapState, mapDispatch)(AllProjects);
