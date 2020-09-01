import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addRobotToDb } from '../redux/robots';

class NewRobotForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: ''
			// fuelType: '',
			// imageUrl: ''
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
		this.props.addRobot({
			name: e.target.name.value
			// fuelType: e.target.fuelType.value,
			// imageUrl: e.target.imageUrl.value
		});
		this.setState({
			name: ''
			// fuelType: '',
			// imageUrl: ''
		});
	}

	render() {
		const { name, fuelType, fuelLevel, imageUrl } = this.state;
		console.log(this.state);
		return (
			<form onSubmit={this.handleSubmit}>
				<label>Name: </label>
				<input type="text" placeholder="Enter Name" name="name" value={name} onChange={this.handleChange} />
				<br />
				{/* <label>Fuel Type: </label>
				<input
					type="text"
					placeholder="electric, gas, diesel"
					name="fuelType"
					value={fuelType}
					onChange={this.handleChange}
				/>
				<br />
				<label>Avatar Image: </label>
				<input
					type="text"
					placeholder="Enter URL to image"
					name="imageUrl"
					value={imageUrl}
					onChange={this.handleChange}
				/>
				<br /> */}
				<button type="submit">Add Robot</button>
			</form>
		);
	}
}

const mapState = (state) => ({
	newRobot: state.robots.newRobot
});

const mapDispatch = (dispatch) => ({
	addRobot: (newRobot) => dispatch(addRobotToDb(newRobot))
});

export default connect(mapState, mapDispatch)(NewRobotForm);
