import React, { Component } from 'react';
import { connect } from 'react-redux';

class EditRobotForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			fuelType: ''
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
		this.props.editRobot();
		this.setState({
			name: ''
		});
	}

	render() {
		console.log(this.state);

		return (
			<form onSubmit={this.handleSubmit}>
				<label>Robot Name: </label>
				<input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
				<button type="submit">Save Changes</button>
			</form>
		);
	}
}

const mapState = (state) => {};
const mapDispatch = (dispatch) => {};

// export default connect(mapState, mapDispatch)(EditRobotForm);

export default EditRobotForm;
