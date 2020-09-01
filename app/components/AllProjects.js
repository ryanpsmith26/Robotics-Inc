import React from 'react';
import { connect } from 'react-redux';
import { fetchProjects } from '../redux/projects';

// Notice that we're exporting the AllProjects component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
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
				<div className="AllCards">
					{projects.map((project) => (
						<div key={project.id}>
							<h2>{project.title}</h2>
							<p>{project.deadline}</p>
							<p>{project.priority}</p>
						</div>
					))}
				</div>
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
