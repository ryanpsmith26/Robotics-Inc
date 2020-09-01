import axios from 'axios';

// ACTION TYPES =========================================

const GET_ALL_PROJECTS = 'GET_ALL_PROJECTS';

// ACTION CREATORS ======================================

const gotAllProjects = (projects) => ({
	type: GET_ALL_PROJECTS,
	projects
});

// THUNK CREATORS =======================================

export const fetchProjects = () => async (dispatch) => {
	try {
		const { data: projects } = await axios.get('/api/projects');
		const action = gotAllProjects(projects);
		dispatch(action);
	} catch (err) {
		console.error(err);
	}
};

// INITIAL STATE ========================================

// projects: {
//  allProjects: []
// }

const initialState = {
	allProjects: []
};

// SUBREDUCER ===========================================

export default function projectsReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_PROJECTS:
			return {
				...state,
				allProjects: action.projects
			};
		default:
			return state;
	}
}
