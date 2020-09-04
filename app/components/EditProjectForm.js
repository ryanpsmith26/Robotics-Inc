import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateProjectInDb } from '../redux/projects';

class EditProjectForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: ''
		};

		this.id = this.props.match.params.id;
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
		const title = e.target.title.value;
		this.props.updateProject(this.id, title);
		this.setState({
			title: ''
		});
	}

	render() {
		console.log(this.state);

		return (
			<div className="FormDiv">
				<Link to={`/projects/single_project/${this.id}`}>&times;</Link>
				<form onSubmit={this.handleSubmit}>
					<label>Project Name: </label>
					<input type="text" name="title" onChange={this.handleChange} value={this.state.title} required />
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
	updateProject: (id, title) => dispatch(updateProjectInDb(id, title))
});

export default connect(mapState, mapDispatch)(EditProjectForm);
