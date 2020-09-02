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

	handleChange(e) {}

	handleSubmit(e) {
		e.preventDefault();
	}

	render() {
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
