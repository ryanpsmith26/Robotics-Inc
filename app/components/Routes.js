import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import AllRobots from './AllRobots';
import SingleRobot from './SingleRobot';

import AllProjects from './AllProjects';

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
					<Route exact path="/robots" component={AllRobots} />
					<Route exact path="/robots/:id" component={SingleRobot} />
					<Route exact path="/projects" component={AllProjects} />
				</main>
			</div>
		</Router>
	);
};

export default Routes;
