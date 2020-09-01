import axios from 'axios';

// ACTION TYPES =========================================

const GET_ALL_ROBOTS = 'GET_ALL_ROBOTS';

// ACTION CREATORS ======================================

const gotAllRobots = (robots) => ({
	type: GET_ALL_ROBOTS,
	robots
});

// THUNK CREATORS =======================================

export const setRobots = () => {};

export const fetchRobots = () => async (dispatch) => {
	try {
		const { data: robots } = await axios.get('/api/robots');
		const action = gotAllRobots(robots);
		dispatch(action);
	} catch (err) {
		console.error(err);
	}
};

// INITIAL STATE ========================================

// robots: {
//  allRobots: []
// }

const initialState = {
	allRobots: []
};

// SUBREDUCER ==============================================

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function robotsReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_ROBOTS:
			return {
				...state,
				allRobots: action.robots
			};
		default:
			return state;
	}
}
