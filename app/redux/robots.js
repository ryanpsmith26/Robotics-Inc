import axios from 'axios';

// ACTION TYPES =========================================

const GET_ALL_ROBOTS = 'GET_ALL_ROBOTS';
const GET_ROBOT = 'GET_ROBOT';
const ADD_ROBOT = 'ADD_ROBOT';
const DELETE_ROBOT = 'DELETE_ROBOT';
const UPDATE_ROBOT = 'UPDATE_ROBOT';
const UNASSIGN_ROBOT = 'UNASSIGN_ROBOT';
const LOADING = 'LOADING';

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

// eslint-disable-next-line no-shadow
const updatedRobot = (updatedRobot) => ({
	type: UPDATE_ROBOT,
	updatedRobot
});

const unassignRobot = (unassignedRobot) => ({
	type: UNASSIGN_ROBOT,
	unassignedRobot
});

const loading = () => ({
	type: LOADING
});

// THUNK CREATORS =======================================

export const fetchRobots = () => async (dispatch) => {
	try {
		dispatch(loading());
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
		dispatch(loading());
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

export const updateRobotInDb = (id, name, fuelType) => async (dispatch) => {
	try {
		const { data: updatedRobotFromDb } = await axios.put(`/api/robots/${id}`, {
			id,
			name,
			fuelType
		});
		const action = updatedRobot(updatedRobotFromDb);
		dispatch(action);
	} catch (error) {
		console.error(error);
	}
};

export const unassignRobotInDb = (robotId, projectId) => async (dispatch) => {
	try {
		const { data: unassignedRobot } = await axios.put(`/api/robots/${robotId}/unassign/${projectId}`);
		const action = unassignRobot(unassignedRobot);
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
//	 newRobot: {},
//   loading: false
// }

const initialState = {
	allRobots: [],
	robot: {
		Projects: []
	},
	newRobot: {},
	loading: false
};

// ROBOTS SUBREDUCER ===========================================

export default function robotsReducer(state = initialState, action) {
	switch (action.type) {
		case LOADING:
			return {
				...state,
				loading: true
			};
		case GET_ALL_ROBOTS:
			return {
				...state,
				allRobots: action.robots,
				loading: false
			};
		case GET_ROBOT:
			return {
				...state,
				robot: action.robot,
				loading: false
			};
		case ADD_ROBOT:
			return {
				...state,
				allRobots: [ ...state.allRobots, action.newRobot ],
				newRobot: action.newRobot,
				loading: false
			};
		case DELETE_ROBOT:
			return {
				...state,
				allRobots: state.allRobots.filter((robot) => robot.id !== action.robot.id),
				robot: action.robot
			};
		case UPDATE_ROBOT:
			return {
				...state,
				robot: action.updatedRobot
			};
		case UNASSIGN_ROBOT:
			return {
				...state,
				robot: action.unassignedRobot
			};
		default:
			return state;
	}
}
