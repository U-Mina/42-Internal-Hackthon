import React from 'react';
import ProgressBar from '../common/ProgressBar';
import './StudentDashboard.css';

// Mock data inspired by the 42 API structure (/v2/me)
const mockUser = {
    login: 'johndoe',
    displayname: 'John Doe',
    image_url: '', // Placeholder for profile picture
};

// Mock data inspired by the 'projects_users' array in the 42 API
const mockProjects = [
    {
        id: 1,
        final_mark: 125,
        status: 'finished',
        estimated_time: null,
        project: {
            id: 1314,
            name: 'Libft',
            slug: 'libft',
        },
    },
    {
        id: 2,
        final_mark: 100,
        status: 'finished',
        estimated_time: null,
        project: {
            id: 1316,
            name: 'get_next_line',
            slug: 'get-next-line',
        },
    },
    {
        id: 3,
        final_mark: null,
        status: 'in_progress',
        estimated_time: '5 hours',
        project: {
            id: 1315,
            name: 'ft_printf',
            slug: 'ft_printf',
        },
    },
    {
        id: 4,
        final_mark: null,
        status: 'in_progress',
        estimated_time: '8 hours',
        project: {
            id: 2029,
            name: 'push_swap',
            slug: 'push_swap',
        },
    },
    {
        id: 5,
        final_mark: 0,
        status: 'failed',
        estimated_time: null,
        project: {
            id: 1312,
            name: 'NetPractice',
            slug: 'netpractice',
        },
    },
];

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

interface PomodoroTask {
    id: number;
    name: string;
    completed: boolean;
}

interface ProjectStep {
    id: number;
    title: string;
    estimatedTime: string;
    completed: boolean;
}

const StudentDashboard: React.FC = () => {
    // Pomodoro Timer State
    const [pomodoroTasks, setPomodoroTasks] = React.useState<PomodoroTask[]>([]);
    const [newTaskName, setNewTaskName] = React.useState('');
    const [timerRunning, setTimerRunning] = React.useState(false);
    const [timeLeft, setTimeLeft] = React.useState(25 * 60); // 25 minutes in seconds

    // Project Steps State
    const [projectSteps, setProjectSteps] = React.useState<ProjectStep[]>([]);

    const [newGoalTitle, setNewGoalTitle] = React.useState('');
    const [newGoalTime, setNewGoalTime] = React.useState('');

    const addGoal = () => {
        if (!newGoalTitle.trim()) return;
        const newStep: ProjectStep = {
            id: Date.now(),
            title: newGoalTitle,
            estimatedTime: newGoalTime || 'N/A',
            completed: false,
        };
        setProjectSteps([...projectSteps, newStep]);
        setNewGoalTitle('');
        setNewGoalTime('');
    };


    React.useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timerRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        setTimerRunning(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerRunning, timeLeft]);

    const addPomodoroTask = () => {
        if (newTaskName.trim()) {
            setPomodoroTasks([...pomodoroTasks, {
                id: Date.now(),
                name: newTaskName,
                completed: false,
            }]);
            setNewTaskName('');
        }
    };

    const toggleTaskCompletion = (id: number) => {
        setPomodoroTasks(pomodoroTasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const toggleStepCompletion = (id: number) => {
        setProjectSteps(projectSteps.map(step =>
            step.id === id ? { ...step, completed: !step.completed } : step
        ));
    };

    // Generate project steps based on project name
    const generateProjectSteps = (project: any) => {
        const steps: ProjectStep[] = [];
        const totalTime = project.estimated_time;

        switch (project.project.name.toLowerCase()) {
            case 'libft':
                steps.push(
                    { id: 1, title: 'Create Makefile', estimatedTime: '1 hour', completed: false },
                    { id: 2, title: 'Implement Part 1 functions (ft_isalpha, ft_isdigit, etc.)', estimatedTime: '2 hours', completed: false },
                    { id: 3, title: 'Implement Part 2 functions (ft_substr, ft_strjoin, etc.)', estimatedTime: '2 hours', completed: false },
                    { id: 4, title: 'Implement Bonus functions (ft_lstnew, ft_lstadd_front, etc.)', estimatedTime: '1 hour', completed: false }
                );
                break;
            case 'ft_printf':
                steps.push(
                    { id: 1, title: 'Set up project structure and basic files', estimatedTime: '30 min', completed: false },
                    { id: 2, title: 'Implement basic format specifiers (%c, %s, %d)', estimatedTime: '2 hours', completed: false },
                    { id: 3, title: 'Implement advanced format specifiers (%x, %X, %p)', estimatedTime: '1.5 hours', completed: false },
                    { id: 4, title: 'Add flags and width/precision handling', estimatedTime: '1 hour', completed: false }
                );
                break;
            case 'push_swap':
                steps.push(
                    { id: 1, title: 'Set up project and understand the problem', estimatedTime: '1 hour', completed: false },
                    { id: 2, title: 'Implement basic operations (sa, sb, ss, pa, pb)', estimatedTime: '2 hours', completed: false },
                    { id: 3, title: 'Implement sorting algorithms for small stacks', estimatedTime: '2 hours', completed: false },
                    { id: 4, title: 'Optimize for larger stacks and edge cases', estimatedTime: '3 hours', completed: false }
                );
                break;
            default:
                steps.push(
                    { id: 1, title: 'Set up project structure', estimatedTime: '30 min', completed: false },
                    { id: 2, title: 'Implement core functionality', estimatedTime: '3 hours', completed: false },
                    { id: 3, title: 'Add advanced features', estimatedTime: '2 hours', completed: false },
                    { id: 4, title: 'Testing and debugging', estimatedTime: '1.5 hours', completed: false }
                );
        }

        return steps;
    };

    const handleAddProjectClick = () => {
        // For now, this could open a project creation modal or navigate to project creation
        // Since we don't have that implemented yet, maybe just show an alert
        alert('Project creation feature coming soon!');
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // For a real app, you'd calculate progress differently.
    // Here we'll just use the final_mark for demonstration.
    const getProgress = (status: string, mark: number | null) => {
        if (status === 'finished') return 100;
        if (status === 'in_progress') return 50; // Placeholder for in-progress
        return 0;
    };

    // Find the first project that is currently in progress
    const currentProject = mockProjects.find(p => p.status === 'in_progress');
    const mockHelper = { name: 'Ana' }; // Sample helper

    // Filter to only show in_progress projects
    const inProgressProjects = mockProjects.filter(p => p.status === 'in_progress');

    // Generate project steps when current project changes
    React.useEffect(() => {
        if (currentProject) {
            const steps = generateProjectSteps(currentProject);
            setProjectSteps(steps);
        }
    }, [currentProject]);

    return (
        <div className="student-dashboard">
            <header className="profile-header">
                <div className="profile-picture">
                    {/* <img src={mockUser.image_url} alt="Profile" /> */}
                </div>
                <div className="profile-info">
                    <h1>{mockUser.displayname}</h1>
                    <p>@{mockUser.login}</p>
                </div>
            </header>

            {/* Main Content Area - Left side vertical + Right side Pomodoro */}
            <div className="main-content">
                {/* Left Side - Profile sections */}
                <div className="left-column">
                    {/* Current Focus Section */}
                    {currentProject && (
                        <section className="current-focus-section">
                        <div className="current-focus-header">
                            <h2>Current Focus</h2>
                            <button
                                className="add-project-btn"
                                title="Add new project"
                                onClick={handleAddProjectClick}
                            >
                                +
                            </button>
                        </div>
                            <div className="current-project-card">
                                <h3>{currentProject.project.name}</h3>

                                <p className="estimated-time-focus">Estimated: {currentProject.estimated_time}</p>
                                <div className="helper-line">
                                    <p>Need help? <strong>{mockHelper.name}</strong> is also on this project.</p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Project Goals Section */}
                    {currentProject && (
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
                                {projectSteps.map((step) => (
                                    <div key={step.id} className={`goal-item ${step.completed ? 'completed' : ''}`}>
                                        <input
                                            type="checkbox"
                                            checked={step.completed}
                                            onChange={() => toggleStepCompletion(step.id)}
                                            className="goal-checkbox"
                                        />
                                        <span className="goal-text">{step.title}</span>
                                        <span className="goal-time">{step.estimatedTime}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}


                    {/* My Projects Section */}
                    <section className="projects-section">
                        <div className="projects-header">
                            <h2>My Projects</h2>
                            <button
                                className="add-project-btn"
                                title="Add new project"
                                onClick={handleAddProjectClick}
                            >
                                +
                            </button>
                        </div>
                        <div className="project-list">
                            {inProgressProjects.map((p) => (
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
                </div>

                {/* Right Side - Pomodoro Timer */}
                <section className="pomodoro-section">
                    <h2>Pomodoro Timer</h2>
                    <div className={`timer-display ${timerRunning ? 'running' : ''}`}>
                        <div className="timer-time">{formatTime(timeLeft)}</div>
                    </div>
                    <div className="timer-controls">
                        <button
                            className="timer-btn start-btn"
                            onClick={() => setTimerRunning(!timerRunning)}
                        >
                            {timerRunning ? 'Stop' : 'Start'}
                        </button>
                        <button
                            className="timer-btn reset-btn"
                            onClick={() => {
                                setTimerRunning(false);
                                setTimeLeft(25 * 60);
                            }}
                        >
                            Reset
                        </button>
                    </div>

                    <div className="tasks-input">
                        <input
                            type="text"
                            value={newTaskName}
                            onChange={(e) => setNewTaskName(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addPomodoroTask()}
                            placeholder="Add a task..."
                        />
                        <button onClick={addPomodoroTask} className="add-task-btn">+</button>
                    </div>

                    <div className="tasks-list">
                        {pomodoroTasks.map((task) => (
                            <div key={task.id} className="task-item">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTaskCompletion(task.id)}
                                />
                                <span style={{
                                    textDecoration: task.completed ? 'line-through' : 'none',
                                    color: task.completed ? '#999' : '#333'
                                }}>
                                    {task.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default StudentDashboard;
