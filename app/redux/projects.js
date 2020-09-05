import axios from 'axios';

// ACTION TYPES =========================================

const GET_ALL_PROJECTS = 'GET_ALL_PROJECTS';
const GET_PROJECT = 'GET_PROJECT';
const ADD_PROJECT = 'ADD_PROJECT';
const DELETE_PROJECT = 'DELETE_PROJECT';
const UPDATE_PROJECT = 'UPDATE_PROJECT';
const UNASSIGN_PROJECT = 'UNASSIGN_PROJECT';
const TOGGLE_STATUS = 'TOGGLE_STATUS';
const LOADING = 'LOADING';

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

const deletedProject = (project) => ({
	type: DELETE_PROJECT,
	project
});

const updatedProject = (updatedProject) => ({
	type: UPDATE_PROJECT,
	updatedProject
});

const unassignProject = (unassignedProject) => ({
	type: UNASSIGN_PROJECT,
	unassignedProject
});

const toggledStatus = (toggledProject) => ({
	type: TOGGLE_STATUS,
	toggledProject
});

const loading = () => ({
	type: LOADING
});

// THUNK CREATORS =======================================

export const fetchProjects = () => async (dispatch) => {
	try {
		dispatch(loading());
		const { data: projects } = await axios.get('/api/projects');
		const action = gotAllProjects(projects);
		dispatch(action);
	} catch (error) {
		console.error(error);
	}
};

export const fetchProject = (projectId) => async (dispatch) => {
	try {
		dispatch(loading());
		const { data: project } = await axios.get(`/api/projects/${projectId}`);
		const action = gotProject(project);
		dispatch(action);
	} catch (error) {
		console.error(error);
	}
};

export const addProjectToDb = (newProject) => async (dispatch) => {
	try {
		dispatch(loading());
		const { data: newProjectFromDb } = await axios.post('/api/projects', newProject);
		const action = addedProject(newProjectFromDb);
		dispatch(action);
	} catch (error) {
		console.error(error);
	}
};

export const deleteProjectFromDb = (project) => async (dispatch) => {
	try {
		await axios.delete('/api/projects', { data: project });
		const action = deletedProject(project);
		dispatch(action);
	} catch (error) {
		console.error(error);
	}
};

export const updateProjectInDb = (id, updatedProjectInfo) => async (dispatch) => {
	try {
		const { title, description } = updatedProjectInfo;
		const { data: updatedRobotFromDb } = await axios.put(`/api/projects/${id}`, {
			id,
			title,
			description
		});
		const action = updatedProject(updatedRobotFromDb);
		dispatch(action);
	} catch (error) {
		console.error(error);
	}
};

export const unassignProjectInDb = (projectId, robotId) => async (dispatch) => {
	try {
		const { data: unassignedProject } = await axios.put(`/api/projects/${projectId}/unassign/${robotId}`);
		const action = unassignProject(unassignedProject);
		dispatch(action);
	} catch (error) {
		console.error(error);
	}
};

export const toggleProjectStatusInDb = (id) => async (dispatch) => {
	try {
		const { data: toggledProject } = await axios.put(`/api/projects/${id}/completed`);
		const action = toggledStatus(toggledProject);
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
//   newProject: '',
//   loading: false
// }

const initialState = {
	allProjects: [],
	project: {
		Robots: []
	},
	newProject: '',
	loading: false
};

// PROJECTS SUBREDUCER ===========================================

// eslint-disable-next-line complexity
export default function projectsReducer(state = initialState, action) {
	switch (action.type) {
		case LOADING:
			return {
				...state,
				loading: true
			};
		case GET_ALL_PROJECTS:
			return {
				...state,
				allProjects: action.projects,
				loading: false
			};
		case GET_PROJECT:
			return {
				...state,
				project: action.project,
				loading: false
			};
		case ADD_PROJECT:
			return {
				...state,
				allProjects: [ ...state.allProjects, action.newProject ],
				newProject: action.newProject,
				loading: false
			};
		case DELETE_PROJECT:
			return {
				...state,
				allProjects: state.allProjects.filter((project) => project.id !== action.project.id),
				project: action.project
			};
		case UPDATE_PROJECT:
			return {
				...state,
				project: action.updatedProject
			};
		case UNASSIGN_PROJECT:
			return {
				...state,
				project: action.unassignedProject
			};
		case TOGGLE_STATUS:
			return {
				...state,
				project: action.toggledProject
			};
		default:
			return state;
	}
}
