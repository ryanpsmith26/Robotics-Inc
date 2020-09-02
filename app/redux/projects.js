import axios from 'axios';

// May refactor into independent reducers

// ACTION TYPES =========================================

const GET_ALL_PROJECTS = 'GET_ALL_PROJECTS';
const GET_PROJECT = 'GET_PROJECT';
const ADD_PROJECT = 'ADD_PROJECT';

// ACTION CREATORS ======================================

const gotAllProjects = (projects) => ({
	type: GET_ALL_PROJECTS,
	projects
});

const gotProject = (project) => ({
	type: GET_PROJECT,
	project
});

const addedProject = (newProject) => ({
	type: ADD_PROJECT,
	newProject
});

// THUNK CREATORS =======================================

export const fetchProjects = () => async (dispatch) => {
	try {
		const { data: projects } = await axios.get('/api/projects');
		const action = gotAllProjects(projects);
		dispatch(action);
	} catch (error) {
		console.error(error);
	}
};

export const fetchProject = (projectId) => async (dispatch) => {
	try {
		const { data: project } = await axios.get(`/api/projects/${projectId}`);
		const action = gotProject(project);
		dispatch(action);
	} catch (error) {
		console.error(error);
	}
};

export const addProjectToDb = (newProject) => async (dispatch) => {
	try {
		const { data: newProjectFromDb } = await axios.post('/api/projects', newProject);
		const action = addedProject(newProjectFromDb);
		dispatch(action);
	} catch (error) {
		console.error(error);
	}
};

// INITIAL STATE ========================================

// projects: {
//   allProjects: [],
//   project: {
//     Robots: []
//   },
//   newProject: ''
// }

const initialState = {
	allProjects: [],
	project: {
		Robots: []
	},
	newProject: ''
};

// PROJECTS SUBREDUCER ===========================================

export default function projectsReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_PROJECTS:
			return {
				...state,
				allProjects: action.projects
			};
		case GET_PROJECT:
			return {
				...state,
				project: action.project
			};
		case ADD_PROJECT:
			return {
				...state,
				allProjects: [ ...state.allProjects, action.newProject ],
				newProject: action.newProject
			};
		default:
			return state;
	}
}
