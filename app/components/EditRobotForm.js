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

		this.id = this.props.match.params.id;
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const nameInputField = e.target.name;
		// const fuelTypeInputField = e.target.fuelType;
		const userInput = e.target.value;
		this.setState({
			[nameInputField]: userInput
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log('this.id in form----->', this.id);
		// getting this working with just passing name down first
		this.props.updateRobot(this.id, e.target.name.value);
		this.setState({
			name: '',
			fuelType: ''
		});
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>Robot Name: </label>
				<input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
				<br />
				<label>Fuel Type: </label>
				<select name="fuelType" onChange={this.handleChange} value={this.state.fuelType}>
					<option value="">--</option>
					<option value="electric">Electric</option>
					<option value="gas">Gas</option>
					<option value="diesel">Diesel</option>
				</select>
				<br />
				<button type="submit">Save Changes</button>
			</form>
		);
	}
}

const mapState = (state) => ({
	robot: state.robots.robot
});

const mapDispatch = (dispatch) => ({
	updateRobot: (id, name) => dispatch(updateRobotInDb(id, name))
});

export default connect(mapState, mapDispatch)(EditRobotForm);
