import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import AllRobots from './AllRobots';
import NewRobotForm from './NewRobotForm';
import NewProjectForm from './NewProjectForm';
import SingleRobot from './SingleRobot';

import AllProjects from './AllProjects';
import SingleProject from './SingleProject';

const Routes = () => {
	return (
		<Router>
			<div>
				<nav className="NavList">
					<Link to="/">Home</Link>
					<Link to="/robots">Robots</Link>
					<Link to="/projects">Projects</Link>
				</nav>
				<main>
					<Route path="/robots/forms/add" component={NewRobotForm} />
					<Route path="/projects/forms/add" component={NewProjectForm} />
					<Switch>
						<Route exact path="/robots/:id" component={SingleRobot} />
						<Route path="/robots" component={AllRobots} />
						<Route exact path="/projects/:id" component={SingleProject} />
						<Route path="/projects" component={AllProjects} />
					</Switch>
				</main>
			</div>
		</Router>
	);
};

export default Routes;
