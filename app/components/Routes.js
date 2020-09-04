import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';

import Home from './Home';
import NotFoundPage from './NotFoundPage';

import AllRobots from './AllRobots';
import NewRobotForm from './NewRobotForm';
import SingleRobot from './SingleRobot';
import EditRobotForm from './EditRobotForm';

import AllProjects from './AllProjects';
import NewProjectForm from './NewProjectForm';
import SingleProject from './SingleProject';
import EditProjectForm from './EditProjectForm';

const Routes = () => {
	return (
		<Router>
			<div>
				<nav>
					<div className="Container">
						<div className="NavList">
							<NavLink to="/" activeClassName="NavActive" exact={true}>
								Home
							</NavLink>
							<NavLink to="/robots" activeClassName="NavActive">
								Robots
							</NavLink>
							<NavLink to="/projects" activeClassName="NavActive">
								Projects
							</NavLink>
						</div>
					</div>
				</nav>
				<main className="Container">
					<Route path="/robots/forms/add" component={NewRobotForm} />
					<Route path="/robots/single_robot/:id/forms/edit" component={EditRobotForm} />

					<Route path="/projects/forms/add" component={NewProjectForm} />
					<Route path="/projects/single_project/:id/forms/edit" component={EditProjectForm} />

					<Switch>
						<Route path="/robots/single_robot/:id" component={SingleRobot} />
						<Route path="/robots" component={AllRobots} />

						<Route path="/projects/single_project/:id" component={SingleProject} />
						<Route path="/projects" component={AllProjects} />

						<Route exact path="/" component={Home} />
						{/* redirects all paths that do not being with "/", "/robots" or "/projects" */}
						<Route path="*" component={NotFoundPage} />
					</Switch>
				</main>
			</div>
		</Router>
	);
};

export default Routes;
