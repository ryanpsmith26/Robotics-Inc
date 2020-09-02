import React, { Component } from 'react';
import { connect } from 'react-redux';

class EditProjectForm extends Component {
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
		this.props.editProject();
		this.setState({
			title: ''
		});
	}

	render() {
		console.log(this.state);

		return (
			<form onSubmit={this.handleSubmit}>
				<label>Project Name: </label>
				<input type="text" name="title" onChange={this.handleChange} value={this.state.title} />
				<button type="submit">Save Changes</button>
			</form>
		);
	}
}

const mapState = (state) => {};
const mapDispatch = (dispatch) => {};

// export default connect(mapState, mapDispatch)(EditRobotForm);

export default EditProjectForm;
