import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRobots, updateRobotInDb } from '../redux/robots';

// first get this rendering in SingleRobot view
// then handleChange like normal
// handleSubmit we can get working by just passing a new name for
// routes will need to be modified
// then add in the logic for fuelType after that's working

class EditRobotForm extends Component {
	constructor(props) {
		super(props);

		// set single robot obj on store state in SingleRobotObj to local state
		// this lost on refresh from EditRobotForm, should consider refactoring this
		this.robot = this.props.robot;
		this.state = {
			name: '',
			fuelType: ''
			// robotToUpdate: {
			// 	name: '',
			// 	fuelType: ''
			// }
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		// may not need this:
		// this.props.fetchRobots();

		this.setState(
			{
				// robotToUpdate: this.robot
			}
		);
	}

	handleChange(e) {
		const nameInputField = e.target.name;
		const fuelTypeInputField = e.target.fuelType;
		const userInput = e.target.value;
		this.setState({
			[nameInputField]: userInput,
			robotToUpdate: {
				...this.robot,
				[nameInputField]: userInput,
				[fuelTypeInputField]: userInput
			}
		});
	}

	// handleFuelTypeChange(e) {
	// 	const inputField = e.target.fuelType;
	// 	const userInput = e.target.value;
	// 	this.setState({
	// 		[inputField]: userInput,
	// 		robotToUpdate: {
	// 			...this.robot,
	// 			[inputField]: userInput
	// 		}
	// 	});
	// }

	// note: project api route is functioning, no edits to store nor connecting up edit form.
	handleSubmit(e) {
		e.preventDefault();
		this.props.updateRobot(this.state.robotToUpdate);
		this.setState({
			name: '',
			fuelType: ''
		});
	}

	render() {
		console.log('this.state from EditRobotForm---->', this.state);
		console.log('this.props from EditRobotForm---->', this.props);

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
	// bring in single robot obj set on state in SingleRobotObj
	robots: state.robots.allRobots,
	robot: state.robots.robot
});

const mapDispatch = (dispatch) => ({
	// fetchRobots: () => dispatch(fetchRobots()),
	updateRobot: (robot) => dispatch(updateRobotInDb(robot))
});

export default connect(mapState, mapDispatch)(EditRobotForm);
