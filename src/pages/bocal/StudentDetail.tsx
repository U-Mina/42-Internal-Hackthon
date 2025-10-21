import React from 'react';
import { useParams } from 'react-router-dom';
import { Student, Project } from '../../types';
import ProgressBar from '../../components/common/ProgressBar';

const dummyStudentData: Student = {
    id: 1,
    name: 'John Doe',
    projects: [
        {
            id: 101,
            name: 'Project Alpha',
            progress: 80,
            deadline: new Date('2023-12-31'),
            steps: [
                { id: 's1', title: 'Step 1', completed: true, estimatedDuration: 5 },
                { id: 's2', title: 'Step 2', completed: false, estimatedDuration: 10 },
            ],
        },
        {
            id: 102,
            name: 'Project Beta',
            progress: 50,
            deadline: new Date('2024-01-15'),
            steps: [
                { id: 's3', title: 'Step A', completed: true, estimatedDuration: 8 },
                { id: 's4', title: 'Step B', completed: false, estimatedDuration: 12 },
            ],
        },
    ],
};

// Helper function to calculate overall progress
const calculateOverallProgress = (student: Student): number => {
    if (!student.projects || student.projects.length === 0) {
        return 0;
    }
    const totalProgress = student.projects.reduce((sum, project) => sum + project.progress, 0);
    return Math.round(totalProgress / student.projects.length);
};

const StudentDetail: React.FC = () => {
    const { studentId } = useParams<{ studentId: string }>();
    const [student, setStudent] = React.useState<Student | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchStudentDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/students/${studentId}`);
                const data = await response.json();
                setStudent(data);
            } catch (error) {
                console.error('Error fetching student details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentDetails();
    }, [studentId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!student) {
        return <div>Student not found.</div>;
    }

    return (
        <div>
            <h2>{student.name}'s Project Details</h2>
            <ProgressBar progress={calculateOverallProgress(student)} />
            <h3>Projects</h3>
            <ul>
                {student.projects.map((project) => (
                    <li key={project.id}>
                        <h4>{project.name}</h4>
                        {project.deadline && <p>Deadline: {new Date(project.deadline).toLocaleDateString()}</p>}
                        {project.steps && (
                            <ul>
                                {project.steps.map((step) => (
                                    <li key={step.id}>
                                        <span>{step.title} - {step.completed ? 'Completed' : 'In Progress'}</span>
                                        <p>Estimated Duration: {step.estimatedDuration} hours</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentDetail;
