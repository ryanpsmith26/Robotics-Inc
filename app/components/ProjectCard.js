import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = (props) => {
	const { projects } = props;
	return (
		<div className="Cards">
			{projects.map((project) => (
				<div key={project.id}>
					<div className="Card">
						<div className="CardFeaturedDiv">
							<h2>{project.title}</h2>
						</div>
						<div className="CardContent">
							<Link to={`/projects/${project.id}`}>
								<p>Status: {project.completed ? 'Complete' : 'Open'}</p>
								<p>Deadline: {project.deadline}</p>
								<p>Priority: {project.priority}</p>
							</Link>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default ProjectCard;
