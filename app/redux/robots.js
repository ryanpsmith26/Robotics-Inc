import axios from 'axios';

// May refactor into independent reducers

// ACTION TYPES =========================================

const GET_ALL_ROBOTS = 'GET_ALL_ROBOTS';
const GET_ROBOT = 'GET_ROBOT';
const ADD_ROBOT = 'ADD_ROBOT';
const DELETE_ROBOT = 'DELETE_ROBOT';

// ACTION CREATORS ======================================

const gotAllRobots = (robots) => ({
	type: GET_ALL_ROBOTS,
	robots
});

const gotRobot = (robot) => ({
	type: GET_ROBOT,
	robot
});

const addedRobot = (newRobot) => ({
	type: ADD_ROBOT,
	newRobot
});

const deletedRobot = (robot) => ({
	type: DELETE_ROBOT,
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

export const addRobotToDb = (newRobot) => async (dispatch) => {
	try {
		const { data: newRobotFromDb } = await axios.post('/api/robots', newRobot);
		const action = addedRobot(newRobotFromDb);
		dispatch(action);
	} catch (error) {
		console.error(error);
	}
};

export const deleteRobotFromDb = (robot) => async (dispatch) => {
	try {
		await axios.delete('/api/robots', { data: robot });
		const action = deletedRobot(robot);
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
//   },
//	 newRobot: {}
// }

const initialState = {
	allRobots: [],
	robot: {
		Projects: []
	},
	newRobot: {}
};

// ROBOTS SUBREDUCER ===========================================

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
		case ADD_ROBOT:
			return {
				...state,
				allRobots: [ ...state.allRobots, action.newRobot ],
				newRobot: action.newRobot
			};
		case DELETE_ROBOT:
			return {
				...state,
				allRobots: state.allRobots.filter((robot) => robot.id !== action.robot.id)
				// robot: {
				// 	Projects: [ state.robot.Projects.filter((robotProject) => robotProject.id !== action.robot.id) ]
				// }
			};
		default:
			return state;
	}
}
