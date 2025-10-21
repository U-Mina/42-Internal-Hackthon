import React from 'react';
import ProgressBar from '../common/ProgressBar';

// Helper to get a class name based on project status
const getStatusClass = (status: string) => {
    switch (status) {
        case 'finished':
            return 'status-finished';
        case 'in_progress':
            return 'status-in-progress';
        case 'failed':
            return 'status-failed';
        default:
            return '';
    }
};

// For a real app, you'd calculate progress differently.
// Here we'll just use the final_mark for demonstration.
const getProgress = (status: string, mark: number | null) => {
    if (status === 'finished') return 100;
    if (status === 'in_progress') return 50; // Placeholder for in-progress
    return 0;
};

interface Project {
    id: number;
    final_mark: number | null;
    status: string;
    estimated_time: string | null;
    project: {
        id: number;
        name: string;
        slug: string;
    };
}

interface ProjectListProps {
    projects: Project[];
    onAddProject: () => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onAddProject }) => {
    return (
        <section className="projects-section">
            <div className="projects-header">
                <h2>My Projects</h2>
                <button
                    className="add-project-btn"
                    title="Add new project"
                    onClick={onAddProject}
                >
                    +
                </button>
            </div>
            <div className="project-list">
                {projects.map((p) => (
                    <div key={p.id} className={`project-item ${getStatusClass(p.status)}`}>
                        <div className="project-item-header">
                            <h3>{p.project.name}</h3>
                            <span className="estimated-time">{p.estimated_time}</span>
                        </div>
                        <p className="project-mark">
                            Mark: {p.final_mark !== null ? p.final_mark : 'In Progress'}
                        </p>
                        <ProgressBar progress={getProgress(p.status, p.final_mark)} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProjectList;
