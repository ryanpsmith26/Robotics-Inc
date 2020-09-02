import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateRobotInDb } from '../redux/robots';

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

	// need to figure out how to pass in entire robot to updateRobot
	// may need to put this form on the SingleRobot page to make it easy to access the whole robot
	// alternatively I could figure out how to pass it down into this Component! not clear how...
	handleSubmit(e) {
		e.preventDefault();
		this.props.updateRobot();
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

const mapState = (state) => ({
	robots: state.allRobots
});

const mapDispatch = (dispatch) => ({
	updateRobot: (robot) => dispatch(updateRobotInDb(robot))
});

export default connect(mapState, mapDispatch)(EditRobotForm);
