import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ProjectCard from './ProjectCard';
import { fetchProjects, deleteProjectFromDb } from '../redux/projects';

export class AllProjects extends React.Component {
	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentDidMount() {
		this.props.fetchProjects();
	}

	handleDelete(project) {
		this.props.deleteProject(project);
	}

	render() {
		const { projects, loading } = this.props;
		return (
			<React.Fragment>
				<div className="MainHeader">
					<h1>All Projects</h1>
					<Link to="/projects/forms/add">Add Project</Link>
				</div>
				<div className="Cards AllViewCards">
					{/* first check if loading is complete, when complete, check if projects is empty on state, finally if neither, render ProjectCards */}
					{loading ? (
						<div className="LoadingMessage">Loading...</div>
					) : projects.length ? (
						projects.map((project) => (
							<ProjectCard
								key={project.id}
								project={project}
								handleDelete={this.handleDelete}
								displayUnassignBtn={false}
							/>
						))
					) : (
						<p>There are no projects registered in the database.</p>
					)}
				</div>
			</React.Fragment>
		);
	}
}

const mapState = (state) => ({
	projects: state.projects.allProjects,
	loading: state.projects.loading
});

const mapDispatch = (dispatch) => ({
	fetchProjects: () => dispatch(fetchProjects()),
	deleteProject: (project) => dispatch(deleteProjectFromDb(project))
});

export default connect(mapState, mapDispatch)(AllProjects);
