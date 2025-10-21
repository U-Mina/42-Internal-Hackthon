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
    newGoalTitle: string;
    setNewGoalTitle: (value: string) => void;
    newGoalTime: string;
    setNewGoalTime: (value: string) => void;
    addGoal: () => void;
}

const ProjectGoals: React.FC<ProjectGoalsProps> = ({ steps, onToggleStep, newGoalTitle, setNewGoalTitle, newGoalTime, setNewGoalTime, addGoal }) => {
    return (
        <section className="project-goals-section">
            <div className="goals-header">
                <h2>Goals</h2>
                {/* Add New Goal Inputs */}
                                <div className="add-goal-form">
                                    <input
                                        type="text"
                                        placeholder="Write goal description..."
                                        value={newGoalTitle}
                                        onChange={(e) => setNewGoalTitle(e.target.value)}
                                        className="goal-input"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Estimated time (e.g. 2 hours)"
                                        value={newGoalTime}
                                        onChange={(e) => setNewGoalTime(e.target.value)}
                                        className="goal-input-time"
                                    />
                                    <button
                                        className="add-goal-btn"
                                        title="Add goal"
                                        onClick={addGoal}
                                    >
                                        +
                                    </button>
                                </div>
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
