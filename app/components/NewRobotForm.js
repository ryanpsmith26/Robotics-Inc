import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addRobotToDb } from '../redux/robots';

class NewRobotForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: ''
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

	async handleSubmit(e) {
		e.preventDefault();
		this.props.addRobot({
			name: e.target.name.value
		});
		this.setState({
			name: ''
		});
	}

	render() {
		const { name } = this.state;
		console.log(this.props);
		return (
			<form onSubmit={this.handleSubmit}>
				<label>Robot Name</label>
				<input type="text" name="name" value={name} onChange={this.handleChange} />
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
