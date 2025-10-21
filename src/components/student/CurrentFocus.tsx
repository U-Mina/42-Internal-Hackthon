import React from 'react';

interface CurrentFocusProps {
    project: {
        project: {
            name: string;
        };
        estimated_time: string | null;
    };
    helper: {
        name: string;
    };
}

const CurrentFocus: React.FC<CurrentFocusProps> = ({ project, helper }) => {
    return (
        <section className="current-focus-section">
            <h2>Current Focus</h2>
            <div className="current-project-card">
                <h3>{project.project.name}</h3>
                <p className="estimated-time-focus">Estimated: {project.estimated_time}</p>
                <div className="helper-line">
                    <p>Need help? <strong>{helper.name}</strong> is also on this project.</p>
                </div>
            </div>
        </section>
    );
};

export default CurrentFocus;
