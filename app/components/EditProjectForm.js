import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProject, updateProjectInDb } from '../redux/projects';

class EditProjectForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			description: ''
		};

		this.id = this.props.match.params.id;
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	// pre-populate fields
	async componentDidMount() {
		await this.props.fetchProject(this.id);
		this.setState({
			title: this.props.project.title,
			description: this.props.project.description
		});
	}

	handleChange(e) {
		const inputField = e.target.name;
		const userInput = e.target.value;
		this.setState({
			[inputField]: userInput
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.updateProject(this.id, this.state);
		this.setState({
			title: '',
			description: ''
		});
	}

	render() {
		return (
			<div className="FormDiv">
				<Link to={`/projects/single_project/${this.id}`}>&times;</Link>
				<form onSubmit={this.handleSubmit}>
					<label>Project Name: </label>
					<input type="text" name="title" onChange={this.handleChange} value={this.state.title} />
					<label>Description: </label>
					<textarea
						type="text"
						name="description"
						onChange={this.handleChange}
						value={this.state.description}
					/>
					<button type="submit">Save Changes</button>
				</form>
			</div>
		);
	}
}

const mapState = (state) => ({
	project: state.projects.project
});

const mapDispatch = (dispatch) => ({
	fetchProject: (id) => dispatch(fetchProject(id)),
	updateProject: (id, updatedProjectInfo) => dispatch(updateProjectInDb(id, updatedProjectInfo))
});

export default connect(mapState, mapDispatch)(EditProjectForm);
