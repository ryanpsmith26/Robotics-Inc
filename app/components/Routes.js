import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from 'react-router-dom';

import Home from './Home';
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
					<NavLink to="/" activeClassName="NavActive" exact={true}>
						Home
					</NavLink>
					<NavLink to="/robots" activeClassName="NavActive">
						Robots
					</NavLink>
					<NavLink to="/projects" activeClassName="NavActive">
						Projects
					</NavLink>
				</nav>
				<main>
					<Route exact path="/" component={Home} />
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
