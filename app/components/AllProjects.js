import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchProjects } from '../redux/projects';

export class AllProjects extends React.Component {
	componentDidMount() {
		this.props.fetchProjects();
	}

	render() {
		// console.log(this.props);
		const { projects } = this.props;
		return (
			<React.Fragment>
				<div className="MainHeader">
					<h1>All Projects</h1>
					{/* <button /> */}
				</div>
				{/* check if projects is empty on state */}
				{projects.length ? (
					<div className="AllCards">
						{projects.map((project) => (
							<div key={project.id}>
								<Link to={`/projects/${project.id}`}>
									<h2>{project.title}</h2>
								</Link>
								<p>Deadline: {project.deadline}</p>
								<p>Priority: {project.priority}</p>
							</div>
						))}
					</div>
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
