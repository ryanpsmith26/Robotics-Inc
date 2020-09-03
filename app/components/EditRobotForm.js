import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
		const inputField = e.target.name;
		const userInput = e.target.value;
		this.setState({
			[inputField]: userInput
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const name = e.target.name.value;
		const fuelType = e.target.fuelType.value;
		this.props.updateRobot(this.id, name, fuelType);
		this.setState({
			name: '',
			fuelType: ''
		});
	}

	render() {
		return (
			<div className="FormDiv">
				<Link to={`/robots/single_robot/${this.id}`}>&times;</Link>
				<form onSubmit={this.handleSubmit}>
					<label>Robot Name: </label>
					<input
						type="text"
						name="name"
						onChange={this.handleChange}
						value={this.state.name}
						required
						placeholder="Enter Name"
					/>
					<br />
					<label>Fuel Type: </label>
					<select name="fuelType" onChange={this.handleChange} value={this.state.fuelType} required>
						<option value="">--</option>
						<option value="electric">Electric</option>
						<option value="gas">Gas</option>
						<option value="diesel">Diesel</option>
					</select>
					<br />
					<button type="submit">Save Changes</button>
				</form>
			</div>
		);
	}
}

const mapState = (state) => ({
	robot: state.robots.robot
});

const mapDispatch = (dispatch) => ({
	updateRobot: (id, name, fuelType) => dispatch(updateRobotInDb(id, name, fuelType))
});

export default connect(mapState, mapDispatch)(EditRobotForm);
