import React from 'react';
import { connect } from 'react-redux';

import { fetchRobot } from '../redux/robots';

export class SingleRobot extends React.Component {
	constructor(props) {
		super(props);
		this.id = this.props.match.params.id;
	}

	componentDidMount() {
		this.props.fetchRobot(this.id);
	}

	render() {
		// console.log(this.props);
		const { robot } = this.props;
		return (
			<React.Fragment>
				<img src={robot.imageUrl} />
				<h1>{robot.name}</h1>
				<p>{robot.fuelType}</p>
				<p>{robot.fuelLevel}</p>
			</React.Fragment>
		);
	}
}

const mapState = (state) => {
	return {
		robot: state.robots.robot
	};
};

const mapDispatch = (dispatch) => {
	return {
		fetchRobot: (id) => dispatch(fetchRobot(id))
	};
};

export default connect(mapState, mapDispatch)(SingleRobot);
