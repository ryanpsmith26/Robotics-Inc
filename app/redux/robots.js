import axios from 'axios';

// ACTION TYPES =========================================

const GET_ALL_ROBOTS = 'GET_ALL_ROBOTS';
const GET_ROBOT = 'GET_ROBOT';

// ACTION CREATORS ======================================

const gotAllRobots = (robots) => ({
	type: GET_ALL_ROBOTS,
	robots
});

const gotRobot = (robot) => ({
	type: GET_ROBOT,
	robot
});

// THUNK CREATORS =======================================

export const fetchRobots = () => async (dispatch) => {
	try {
		const { data: robots } = await axios.get('/api/robots');
		const action = gotAllRobots(robots);
		dispatch(action);
	} catch (error) {
		console.error(error);
	}
};

export const fetchRobot = (robotId) => async (dispatch) => {
	try {
		const { data: robot } = await axios.get(`/api/robots/${robotId}`);
		const action = gotRobot(robot);
		dispatch(action);
	} catch (error) {
		console.error(error);
	}
};

// INITIAL STATE ========================================

// robots: {
//   allRobots: [],
//   robot: {
//     Projects: []
//   }
// }

const initialState = {
	allRobots: [],
	robot: {
		Projects: []
	}
};

// SUBREDUCER ===========================================

export default function robotsReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_ROBOTS:
			return {
				...state,
				allRobots: action.robots
			};
		case GET_ROBOT:
			return {
				...state,
				robot: action.robot
			};
		default:
			return state;
	}
}
