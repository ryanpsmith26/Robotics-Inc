import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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

	handleSubmit(e) {
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
		return (
			<div className="FormDiv">
				<Link to="/robots">&times;</Link>
				<form onSubmit={this.handleSubmit}>
					<label>Robot Name</label>
					<input
						type="text"
						placeholder="Enter Name"
						name="name"
						value={name}
						onChange={this.handleChange}
						required
					/>
					<button className="AddNewBtn" type="submit">
						Add Robot
					</button>
				</form>
			</div>
		);
	}
}

const mapDispatch = (dispatch) => ({
	addRobot: (newRobot) => dispatch(addRobotToDb(newRobot))
});

export default connect(null, mapDispatch)(NewRobotForm);
