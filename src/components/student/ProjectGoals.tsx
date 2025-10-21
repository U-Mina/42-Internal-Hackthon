import React from 'react';

interface ProjectStep {
    id: number;
    title: string;
    estimatedTime: string;
    completed: boolean;
}

interface ProjectGoalsProps {
    steps: ProjectStep[];
    onToggleStep: (id: number) => void;
}

const ProjectGoals: React.FC<ProjectGoalsProps> = ({ steps, onToggleStep }) => {
    return (
        <section className="project-goals-section">
            <div className="goals-header">
                <h2>Goals</h2>
            </div>

            <div className="goals-list">
                {steps.map((step) => (
                    <div key={step.id} className={`goal-item ${step.completed ? 'completed' : ''}`}>
                        <input
                            type="checkbox"
                            checked={step.completed}
                            onChange={() => onToggleStep(step.id)}
                            className="goal-checkbox"
                        />
                        <span className="goal-text">{step.title}</span>
                        <span className="goal-time">{step.estimatedTime}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProjectGoals;
