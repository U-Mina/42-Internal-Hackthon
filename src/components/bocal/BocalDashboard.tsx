import React from 'react';
import { Student } from '../../types';
import ProgressBar from '../common/ProgressBar'; // Assuming you have a ProgressBar component

// Sample data - later this will come from an API call
const mockStudents: Student[] = [
	{
		id: 1,
		name: 'Ana',
		projects: [
			{ id: 101, name: 'Libft', progress: 100 },
			{ id: 102, name: 'get_next_line', progress: 75 },
		],
	},
	{
		id: 2,
		name: 'Ben',
		projects: [
			{ id: 101, name: 'Libft', progress: 100 },
			{ id: 102, name: 'get_next_line', progress: 100 },
			{ id: 103, name: 'ft_printf', progress: 25 },
		],
	},
];

// A helper function to calculate average progress
const calculateOverallProgress = (student: Student): number => {
	if (student.projects.length === 0) {
		return 0;
	}
	const totalProgress = student.projects.reduce(
		(sum, project) => sum + project.progress,
		0
	);
	return Math.round(totalProgress / student.projects.length);
};

const BocalDashboard: React.FC = () => {
	return (
		<div>
			<h1>Bocal Dashboard</h1>
			<div>
				<h2>Student Overview</h2>
				<ul>
					{mockStudents.map((student) => (
						<li key={student.id}>
							<h3>{student.name}</h3>
							<p>Overall Progress:</p>
							<ProgressBar progress={calculateOverallProgress(student)} />
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default BocalDashboard;
