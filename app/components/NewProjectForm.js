import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
			title: e.target.title.value
		});
		this.setState({
			title: ''
		});
	}

	render() {
		const { title } = this.state;
		return (
			<div className="FormDiv">
				<Link to="/projects">&times;</Link>
				<form onSubmit={this.handleSubmit}>
					<label>Project Title </label>
					<input
						type="text"
						placeholder="Enter Title"
						name="title"
						value={title}
						onChange={this.handleChange}
						required
					/>
					<br />
					<button className="AddNewBtn" type="submit">
						Add Project
					</button>
				</form>
			</div>
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
