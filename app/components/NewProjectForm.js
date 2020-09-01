import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProjectToDb } from '../redux/projects';

class NewProjectForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: ''
		};

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
		this.props.addProject({
			title: e.target.name.value
		});
		this.setState({
			title: ''
		});
	}

	render() {
		const { title } = this.state;
		return (
			<form onSubmit={this.handleSubmit}>
				<label>Title: </label>
				<input type="text" placeholder="Enter Title" name="title" value={title} onChange={this.handleChange} />
				<br />
				<button type="submit">Add Project</button>
			</form>
		);
	}
}

const mapState = (state) => ({
	newProject: state.projects.newProject
});

const mapDispatch = (dispatch) => ({
	addProject: (newProject) => dispatch(addProjectToDb(newProject))
});

export default connect(mapState, mapDispatch)(NewProjectForm);
