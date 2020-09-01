import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchProject } from '../redux/projects';
// import { fetchRobots } from '../redux/robots';

export class SingleProject extends React.Component {
	constructor(props) {
		super(props);
		this.id = this.props.match.params.id;
	}

	componentDidMount() {
		this.props.fetchProject(this.id);
		// this.props.fetchRobots();
	}

	render() {
		// May refactor later to modularize and render a new sub-component
		// May refactor conditional for readability
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
				<h2>Robots assigned to this project</h2>
				{/* check if robots is empty on state for any project */}
				{project.Robots.length ? (
					project.Robots.map((robot) => (
						<div key={robot.id}>
							<img src={robot.imageUrl} />
							<Link to={`/robots/${robot.id}`}>
								<h3>{robot.name}</h3>
							</Link>
							{console.log('robot obj inside map---->', robot)}
							{/* <p>{} Projects</p> */}
							<p>{robot.fuelType}</p>
							<p>{robot.fuelLevel}</p>
						</div>
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
		project: state.projects.project
		// robots: state.robots.allRobots
	};
};

const mapDispatch = (dispatch) => {
	return {
		fetchProject: (id) => dispatch(fetchProject(id))
		// fetchRobots: () => dispatch(fetchRobots())
	};
};

export default connect(mapState, mapDispatch)(SingleProject);
