import React from 'react';

interface ProjectTimelineProps {
    deadline: Date;
    startDate: Date;
    totalTasks: number;
    completedTasks: number;
}

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ deadline, startDate, totalTasks, completedTasks }) => {
    const calculatePace = () => {
        const today = new Date();
        const totalDuration = deadline.getTime() - startDate.getTime();
        const elapsedDuration = today.getTime() - startDate.getTime();

        if (totalDuration <= 0) return { status: 'On Track', color: 'yellow', tasksPerDay: 0 };

        const expectedProgress = (elapsedDuration / totalDuration) * 100;
        const actualProgress = (completedTasks / totalTasks) * 100;

        const remainingDays = (deadline.getTime() - today.getTime()) / (1000 * 3600 * 24);
        const remainingTasks = totalTasks - completedTasks;
        const tasksPerDay = remainingDays > 0 ? (remainingTasks / remainingDays) : remainingTasks;

        let status = 'On Track';
        let color = 'yellow';

        if (actualProgress > expectedProgress) {
            status = 'Ahead of Pace';
            color = 'green';
        } else if (expectedProgress - actualProgress > 10) { // More than 10% behind
            status = 'Behind Pace';
            color = 'red';
        }

        return { status, color, tasksPerDay: tasksPerDay.toFixed(1) };
    };

    const pace = calculatePace();

    const paceIndicatorStyle: React.CSSProperties = {
        backgroundColor: pace.color,
        color: 'white',
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 'bold',
    };

    return (
        <section className="project-timeline-section">
            <h2>Project Timeline</h2>
            <div className="timeline-content">
                <div className="deadline-info">
                    <span>Pace System Deadline</span>
                    <strong>{deadline.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
                </div>
                <div className="pace-info">
                    <span style={paceIndicatorStyle}>{pace.status}</span>
                    <p>You need to complete ~<strong>{pace.tasksPerDay}</strong> tasks/day to finish on time.</p>
                </div>
            </div>
        </section>
    );
};

export default ProjectTimeline;
